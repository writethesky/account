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

      <div class="security">
        <div :class="{checked: isSecure}" class="checkbox">
          <svg aria-hidden="true" class="icon" @click="secure">
            <use xlink:href="#icon-security"></use>
          </svg>
          <span @click="secure">Ultimate security</span>
        </div>

        <div class="prompt">Secure data transmission in extreme circumstances (e.g. your computer communications may be
          monitored).<br> Click the icon to enable or disable
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import store from '@/store'
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
  isSecure = false

  created() {
    if (api.token.has()) {
      this.$router.push({name: "Home"})
    }

    this.isSecure = localStorage.getItem("secure") === true.toString()
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

  secure() {
    this.isSecure = !this.isSecure
    localStorage.setItem("secure", this.isSecure.toString())
    store.commit("setSecure", this.isSecure)
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

.security {
  .checkbox {
    &.checked {
      color: #42b983;
    }


    svg {
      font-size: 55px;
      display: block;
      margin: 40px auto 0;

    }

    span {
      font-size: 18px;

    }
  }


  .prompt {
    padding: 0 20px;
    font-size: 14px;
  }
}
</style>
