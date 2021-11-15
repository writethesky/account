<template>
  <div>
    <BackHeadComponent title="Change password"></BackHeadComponent>
    <div class="password">
      <input v-model="password" placeholder="Please enter your password" type="password"/>

      <button @click="changePassword">Change</button>
    </div>

  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import BackHeadComponent from '@/components/BackHead.vue';
import api from "@/api";

@Options({
  components: {
    BackHeadComponent
  }
})
export default class Password extends Vue {
  password = ""

  changePassword() {
    api.user.changePassword(this.password)
  }
}
</script>


<style lang="less" scoped>
.password {
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
