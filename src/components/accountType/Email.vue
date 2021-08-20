<template>
  <div class="email">
    <div class="input-group">
      <div class="name">账号</div>
      <div class="value">
        <input type="text" placeholder="请输入账号" v-model="account_data.account" @keyup="saveValue">
      </div>
    </div>
    <div class="input-group">
      <div class="name">密码</div>
      <div class="value">
        <input type="password" placeholder="请输入密码" v-model="account_data.password" @keyup="saveValue">
      </div>
    </div>
    <div class="input-group">
      <div class="name">登录地址</div>
      <div class="value">
        <input type="text" placeholder="请输入登录地址" v-model="account_data.login_address" @keyup="saveValue">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

interface AccountTypeEmail {
  account: string
  password: string
  login_address: string
}


@Options({
  props: {
    account_data: !<AccountTypeEmail>{},
  },
  emits: ["change"]
})

export default class Account extends Vue {
  account_data!: AccountTypeEmail

  saveValue() {
    let copy_lists = [
      {name: "账号", value: this.account_data.account},
      {name: "密码", value: this.account_data.password}
    ]
    this.$emit("change", this.account_data, copy_lists)
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
