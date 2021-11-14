<template>
  <div class="about">
    <div class="back" @click="back">&leftarrow;</div>
    <div class="title">
      About
    </div>
    <div>Easy to manage your various account passwords.</div>
    <h4>Current support：</h4>
    <ul>
      <li>Account</li>
      <li>Email</li>
      <li>Server</li>
    </ul>
    <h4>Open Source:</h4>
    <div>https://github.com/writethesky/account</div>
  </div>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";

export default class About extends Vue {
  back() {
    this.$router.back()
  }
}
</script>

<style lang="less" scoped>
.back {
  position: fixed;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 50%;
  font-size: 24px;
}

.title {
  font-size: 28px;
  text-align: center;
  border: none;
  background-color: transparent;
  height: 60px;
  line-height: 60px;
}
</style>