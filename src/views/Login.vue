<template>
  <div class="login">
    <div>
      <input v-model="username" placeholder="Please enter your account" type="text"/>
      <input v-model="password" placeholder="Please enter your password" type="password"/>
      <div v-if="pageMode == PageMode.Login">
        <button @click="login">Login</button>
        <div class="tip" @click="changePage">Don't have an account yet? Click here to register</div>
      </div>
      <div v-if="pageMode == PageMode.Register">
        <button @click="register">Register</button>
        <div class="tip" @click="changePage">Already got an account? Click here to login</div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import api from "@/api";

enum PageMode {
  Login,
  Register
}

export default class Login extends Vue {
  username = ""
  password = ""
  PageMode = PageMode
  pageMode = PageMode.Login

  created() {
    if (api.token.has()) {
      this.$router.push({name: "Home"})
    }
  }

  changePage() {
    switch (this.pageMode) {
      case PageMode.Login:
        this.pageMode = PageMode.Register
        break
      case PageMode.Register:
        this.pageMode = PageMode.Login
        break
    }
  }

  async login() {
    await api.token.create(this.username, this.password)
    await this.$router.push({name: "Home"})
  }

  async register() {
    await api.user.create(this.username, this.password)
    await this.login()
  }

}
</script>

<style lang="less" scoped>
.login {
  margin-top: 100px;
}

.tip {
  font-size: 14px;
  text-align: right;
  padding-right: 30px;
  line-height: 40px;
  color: #42b983;
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
  background: #42b983;
  color: white;
  border: 1px solid #1ba767;
  border-radius: 20px;
  margin-top: 10px;
}
</style>
