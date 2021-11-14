<template>
  <div class="email">
    <div class="input-group">
      <div class="name">Account</div>
      <div class="value">
        <input v-model="account_data.account" placeholder="Please enter your account" type="text" @keyup="saveValue">
      </div>
    </div>
    <div class="input-group">
      <div class="name">Password</div>
      <div class="value">
        <input v-model="account_data.password" placeholder="Please enter your password" type="password"
               @keyup="saveValue">
      </div>
    </div>
    <div class="input-group">
      <div class="name">Address</div>
      <div class="value">
        <input v-model="account_data.login_address" placeholder="Please enter your login address" type="text"
               @keyup="saveValue">
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
    this.$emit("change", this.account_data)
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
