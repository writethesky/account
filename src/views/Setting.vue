<template>
  <div class="setting">
    <BackHeadComponent title="Settings"></BackHeadComponent>
    <div class="item" @click="link('Password')">
      <svg aria-hidden="true" class="icon head">
        <use xlink:href="#icon-lock"></use>
      </svg>
      <span>Change password</span>
      <svg aria-hidden="true" class="icon foot">
        <use xlink:href="#icon-arrow-right"></use>
      </svg>
    </div>
    <div class="item" @click="changeSecure">
      <svg aria-hidden="true" class="icon head">
        <use xlink:href="#icon-security"></use>
      </svg>
      <span>Ultimate security</span>
      <span v-if="isSecure" class="foot">Enable</span>
      <span v-else class="foot">Disable</span>
    </div>
    <div class="item" @click="link('About')">
      <svg aria-hidden="true" class="icon head">
        <use xlink:href="#icon-about"></use>
      </svg>
      <span>About</span>
      <svg aria-hidden="true" class="icon foot">
        <use xlink:href="#icon-arrow-right"></use>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import BackHeadComponent from '@/components/BackHead.vue';
import store from '@/store'

@Options({
  components: {
    BackHeadComponent,
  },
})

export default class Setting extends Vue {
  get isSecure(): boolean {
    return store.state.isSecure
  }


  link(name: string): void {
    this.$router.push({name})
  }

  changeSecure(): void {
    store.commit("alert", "You need to log out and then enable or disable it on the login page")
  }
}
</script>


<style lang="less" scoped>
.item {
  height: 40px;
  line-height: 40px;
  border-top: 1px solid #d8e6dd;
  border-bottom: 1px solid #d8e6dd;
  margin-bottom: -1px;
  overflow: hidden;
  padding: 0 20px;
  text-align: left;

  .head {
    display: inline-block;
    margin-right: 10px;
  }

  span {
    text-align: left;
    display: inline-block;
  }

  .foot {
    display: inline-block;
    float: right;
    height: 100%;
  }
}
</style>