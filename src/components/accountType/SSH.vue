<template>
  <div class="ssh">
    <div class="input-group">
      <div class="name">User</div>
      <div class="value">
        <input v-model="account_data.user" placeholder="Please enter your user" type="text" @keyup="saveValue">
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
        <input v-model="account_data.address" placeholder="Please enter your address" type="text" @keyup="saveValue">
      </div>
    </div>
    <div class="input-group">
      <div class="name">Port</div>
      <div class="value">
        <input v-model.number="account_data.port" placeholder="Please enter your port" type="text" @keyup="saveValue">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

interface AccountTypeSSH {
  user: string
  password: string
  address: string
  port: number
}


@Options({
  props: {
    account_data: !<AccountTypeSSH>{},
  },
  emits: ["change"]
})

export default class Account extends Vue {
  account_data!: AccountTypeSSH

  saveValue(): void {
    this.$emit("change", this.account_data)
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

</style>
