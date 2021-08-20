<template>
  <div class="home" @click="is_show_add_list = false">
    <!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>-->
    <div class="tip" v-if="account_list.length">双击是一个很好的习惯，针对某些账号，多双击几次会去得意想不到的效果</div>
    <div class="account-list">
      <div class="account-item" v-for="account in account_list" :key="account.id" @dblclick="copyPassword(account.id)">
        <div>{{ account.title }}</div>
        <div class="button-box">
          <svg class="icon" aria-hidden="true" @click="view(account)">
            <use xlink:href="#icon-bianji"></use>
          </svg>
          <svg class="icon remove" aria-hidden="true" @click="remove(account)">
            <use xlink:href="#icon-del"></use>
          </svg>
        </div>

      </div>
    </div>
    <div class="add-box">
      <div v-if="is_show_add_list" class="list">
        <router-link class="item" :to="{name: 'Detail', params: {type: 'account'}}">账号</router-link>
        <router-link class="item" :to="{name: 'Detail', params: {type: 'email'}}">邮箱</router-link>
        <router-link class="item" :to="{name: 'Detail', params: {type: 'ssh'}}">服务器</router-link>
        <router-link class="item" :to="{name: 'Detail', params: {type: 'database'}}">数据库</router-link>
      </div>
      <div class="add" @click.stop="is_show_add_list = true">+</div>
    </div>

  </div>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import store, {Account} from '@/store';

// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

// @Options({
//   // components: {
//   //   HelloWorld,
//   // },
// })


export default class Home extends Vue {


  get account_list() {
    return store.state.account_list
  }

  is_show_add_list = false
  copy_history: any = {}


  created() {
    store.commit('init_account_list')
  }

  copyPassword(id: string) {

    let copy_lists: any
    let account!: Account
    for (let i in this.account_list) {
      account = this.account_list[i]
      if (account.id == id) {
        copy_lists = account.copy_lists
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
      store.commit("alert", copyEntity.name + "复制成功")
    })
  }

  view(account: Account) {
    this.$router.push({name: "Detail", params: {id: account.id, type: account.type}})
  }

  remove(account: Account) {
    store.commit('delete_account', account.id)
  }
}
</script>


<style scoped lang="less">
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
