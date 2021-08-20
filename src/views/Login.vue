<template>
  <div class="login">
    <div>
      <input type="password" placeholder="请输入访问密码" v-model="password" @keyup="login"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import store from "@/store";


export default class Login extends Vue {
  realPassword = "123456"
  password = ""

  login(): void {
    if (this.realPassword == this.password) {
      store.commit("alert", "密码正确")
      this.$router.push({name: "Home"})
      return
    }
    if (this.password.length >= this.realPassword.length) {
      store.commit("alert", "密码错误")
      return
    }
  }

}
</script>

<style scoped lang="less">
input {
  height: 45px;
  width: 300px;
  padding: 0 20px;
  margin-top: 180px;
}
</style>
