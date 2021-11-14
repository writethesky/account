<template>
  <div class="login">
    <div>
      <input v-model="password" placeholder="Please enter your password" type="password"/>

      <button @click="login">Unlock</button>


    </div>
  </div>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import api from "@/api";


export default class Lock extends Vue {
  username = ""
  password = ""

  created() {
    this.username = localStorage.getItem("username") as string
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
  background: #42b983;
  color: white;
  border: 1px solid #1ba767;
  border-radius: 20px;
  margin-top: 10px;
}
</style>
