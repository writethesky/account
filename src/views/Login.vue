<template>
  <div class="login">
    <div>
      <input v-model="username" placeholder="请输入账号" type="text"/>
      <input v-model="password" placeholder="请输入密码" type="password"/>
      <button @click="login">登录</button>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import api from "@/api";

export default class Login extends Vue {
  username = ""
  password = ""

  created() {
    if (api.token.has()) {
      this.$router.push({name: "Home"})
    }
  }

  async login() {
    await api.token.create(this.username, this.password)
    await this.$router.push({name: "Home"})
  }

}
</script>

<style lang="less" scoped>
.login {
  margin-top: 100px;
}

input {
  height: 45px;
  width: 340px;
  padding: 0 20px;
  margin: 20px auto;
  border: 1px solid;
  border-radius: 6px;
  display: block;
  font-size: 15px;
}

button {
  height: 45px;
  line-height: 45px;
  width: 340px;
  font-size: 16px;
  letter-spacing: 2px;
}
</style>
