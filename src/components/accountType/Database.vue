<template>
  <div class="database">
    <div class="input-group">
      <div class="name">用户</div>
      <div class="value">
        <input type="text" placeholder="请输入账号" v-model="account_data.user" @keyup="saveValue">
      </div>
    </div>
    <div class="input-group">
      <div class="name">密码</div>
      <div class="value">
        <input type="password" placeholder="请输入密码" v-model="account_data.password" @keyup="saveValue">
      </div>
    </div>
    <div class="input-group">
      <div class="name">地址</div>
      <div class="value">
        <input type="text" placeholder="请输入地址" v-model="account_data.address" @keyup="saveValue">
      </div>
    </div>
    <div class="input-group">
      <div class="name">端口</div>
      <div class="value">
        <input type="text" placeholder="请输入地址" v-model="account_data.port" @keyup="saveValue">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

interface AccountTypeDatabase {
  user: string
  password: string
  address: string
  port: number
}


@Options({
  props: {
    account_data: !<AccountTypeDatabase>{},
  },
  emits: ["change"]
})

export default class Account extends Vue {
  account_data!: AccountTypeDatabase

  saveValue() {
    let copy_lists = [
      {name: "数据库地址", value: this.account_data.address},
      {name: "密码", value: this.account_data.password}
    ]
    this.$emit("change", this.account_data, copy_lists)
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>
