<template>
  <div class="home" @click="is_show_add_list = false">
    <!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <div class="tool-btn">
      <svg v-if="isSecure" aria-hidden="true" class="icon secure" @click="secureTip">
        <use xlink:href="#icon-security"></use>
      </svg>
      <svg aria-hidden="true" class="icon logout" @click="logout">
        <use xlink:href="#icon-exit"></use>
      </svg>
      <svg aria-hidden="true" class="icon lock" @click="lock">
        <use xlink:href="#icon-lock"></use>
      </svg>
      <svg aria-hidden="true" class="icon setting" @click="setting">
        <use xlink:href="#icon-setting"></use>
      </svg>
    </div>


    <div v-if="account_list.length" class="tip">The long press is a good habit, sometimes more than a few times to
      achieve unexpected results
    </div>
    <div v-if="!account_list.length" class="empty">╮(๑•́ ₃•̀๑)╭Empty！<br><br> click on the plus sign below to create it
    </div>
    <div class="account-list">
      <div v-for="account in account_list" :key="account.id" class="account-item"
           @touchstart.stop="mousedown(account.id)" @mousedown.stop="mousedown(account.id)" @touchend.stop="mouseup"
           @mouseup.stop="mouseup" @contextmenu.prevent>
        <div>{{ account.title }}</div>
        <div class="button-box">
          <svg aria-hidden="true" class="icon" @click="view(account)">
            <use xlink:href="#icon-bianji"></use>
          </svg>
          <svg aria-hidden="true" class="icon remove" @click="remove(account.id)">
            <use xlink:href="#icon-del"></use>
          </svg>
        </div>

      </div>
    </div>
    <div class="add-box">
      <div v-if="is_show_add_list" class="list">
        <router-link :to="{name: 'Detail', params: {type: AccountTypeEnum.Normal}}" class="item">Account</router-link>
        <router-link :to="{name: 'Detail', params: {type: AccountTypeEnum.Email}}" class="item">Email</router-link>
        <router-link :to="{name: 'Detail', params: {type: AccountTypeEnum.SSH}}" class="item">Server</router-link>
        <router-link :to="{name: 'Detail', params: {type: 'database'}}" class="item">Database</router-link>
      </div>
      <div class="add" @click.stop="is_show_add_list = true">+</div>
    </div>

  </div>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import {Account, AccountTypeEnum} from '@/type'
import api from "@/api";
import store from "@/store";


export default class Home extends Vue {
  isTouched = false
  touchStartTime = new Date().getTime()
  is_show_add_list = false
  copy_history: Record<number, number> = {}
  AccountTypeEnum = AccountTypeEnum
  account_list: Array<Account> = []

  get isSecure(): boolean {
    return store.state.isSecure
  }

  async created(): Promise<void> {
    this.account_list = await api.account.list()
  }

  secureTip(): void {
    store.commit("alert", {
      "type": "info",
      "message": "Ultimate security is protecting you",
    })
  }

  logout(): void {
    api.token.delete()
    this.$router.push({name: "Login"})
  }

  lock(): void {
    api.token.delete()
    this.$router.push({name: "Lock"})
  }

  setting(): void {
    this.$router.push({name: "Setting"})
  }

  about(): void {
    this.$router.push({name: "About"})
  }

  mousedown(id: number): void {
    const longTouchDuration = 1000
    this.touchStartTime = new Date().getTime()
    this.isTouched = true

    setTimeout(() => {
      if (!this.isTouched) {
        return
      }
      if (new Date().getTime() - this.touchStartTime < longTouchDuration) {
        return;
      }
      this.copyPassword(id)
    }, longTouchDuration)
  }

  mouseup(): void {
    this.isTouched = false
  }

  copyPassword(id: number): void {
    let copy_lists!: Array<Record<string, string>>
    let account!: Account
    for (let i in this.account_list) {
      account = this.account_list[i]
      if (account.id == id) {
        switch (account.type) {
          case AccountTypeEnum.Normal:
            copy_lists = [
              {name: "account", value: account.data.account},
              {name: "password", value: account.data.password},
            ]
            break;
          case AccountTypeEnum.Email:
            copy_lists = [
              {name: "login address", value: account.data.login_address},
              {name: "account", value: account.data.account},
              {name: "password", value: account.data.password}
            ]
            break;
          case AccountTypeEnum.SSH:
            copy_lists = [
              {
                name: "login command",
                value: account.data.user + '@' + account.data.address + ':' + account.data.port
              },
              {name: "password", value: account.data.password}
            ]
            break
          default:
            return
        }
        break
      }
    }


    if (!Object.prototype.hasOwnProperty.call(this.copy_history, account.id)) {
      this.copy_history[account.id] = 0
    }

    let index = this.copy_history[account.id]
    let copyEntity = copy_lists[index]

    window.navigator.clipboard.writeText(copyEntity.value).then(() => {
      this.copy_history[account.id] = (index + 1) % copy_lists.length
      store.commit("alert", {
        "type": "success",
        "message": copyEntity.name + " was successfully copied",
      })
    })
  }

  view(account: Account): void {
    this.$router.push({name: "Detail", params: {id: account.id, type: account.type}})
  }

  async remove(id: number): Promise<void> {
    await api.account.delete(id)
    this.account_list = await api.account.list()
  }
}
</script>


<style lang="less" scoped>
.home {
  height: 600px;
}

.empty {
  font-size: 20px;
  opacity: 0.5;
  padding: 50px;
}

.tool-btn {
  height: 50px;
  line-height: 50px;

  svg {
    font-size: 20px;
    margin: 0 10px;

    &.secure {
      color: #42b983;
    }

    &.logout {
      color: #fb6985;
    }

    &.lock {
      color: #da8d3a;
    }

    &.setting {
      color: #90b33c;
    }
  }
}

.tip {
  font-size: 12px;
  padding: 0px 20px 20px;
  color: #da8d3a;
}

.account-list {
  .account-item {
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    margin-top: -1px;
    border: 1px solid #42b983;
    color: #42b983;
    position: relative
  }

  .button-box {
    position: absolute;
    right: 5px;
    top: 0;

    svg {
      //float: left;
      margin: 0 4px;

      &.remove {
        color: #fb6985;
      }
    }
  }
}

.add-box {
  position: fixed;
  right: 20px;
  bottom: 20px;

  .add {
    width: 50px;
    height: 50px;
    background: #42b983;
    line-height: 50px;
    border-radius: 50%;
    font-size: 32px;
    color: white;
    float: right;
  }

  .list {
    overflow: hidden;
    animation: toTop 1s;
    bottom: 79px;
    right: 20px;
    position: fixed;

    .item {
      color: #42b983;
      border-bottom: 1px solid #42b983;
      margin: 3px;
      padding: 0px 4px;
      text-align: right;
      width: fit-content;
      float: right;
      clear: both;
      text-decoration: none;
    }
  }
}

@keyframes toTop {
  from {
    bottom: -79px;
  }
  to {
    bottom: 79px;
  }
}

</style>
