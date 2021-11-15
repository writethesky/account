<template>
  <div class="about">
    <BackHeadComponent title="About"></BackHeadComponent>
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
import {Options, Vue} from "vue-class-component";
import BackHeadComponent from '@/components/BackHead.vue';

@Options({
  components: {
    BackHeadComponent
  }
})
export default class About extends Vue {
  back() {
    this.$router.back()
  }
}
</script>
