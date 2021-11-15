<template>
  <div>
    <div class="back" @click="back">&leftarrow;</div>
    <div class="title">
      {{ title }}
    </div>
  </div>
</template>
<script lang="ts">

import {Options, Vue} from "vue-class-component";

@Options({
  props: {
    title: ""
  },
  emits: ["change"]
})


export default class BackHead extends Vue {
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