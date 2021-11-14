<template>
  <div class="home" @click="is_show_add_list = false">
    <!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <div @click="logout">logout</div>
    <div>lock</div>
    <div>about</div>
    <div v-if="account_list.length" class="tip">The long press is a good habit, sometimes more than a few times to
      achieve unexpected results
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
  copy_history: any = {}
  AccountTypeEnum = AccountTypeEnum

  account_list: Array<Account> = []

  async created() {
    this.account_list = await api.account.list()
  }

  logout() {
    api.token.delete()
    this.$router.push({name: "Login"})
  }

  mousedown(id: number) {
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

  mouseup() {
    this.isTouched = false
  }

  copyPassword(id: number) {
    let copy_lists: any
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
      store.commit("alert", copyEntity.name + " was successfully copied")
    })
  }

  view(account: Account) {
    this.$router.push({name: "Detail", params: {id: account.id, type: account.type}})
  }

  async remove(id: number) {
    await api.account.delete(id)
    this.account_list = await api.account.list()
  }
}
</script>


<style lang="less" scoped>
.home {
  height: 600px;
}

.tip {
  font-size: 12px;
  padding: 20px;
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
