<template>
  <div class="alert" :class="{move: message != ''}">
    <div v-if="message != ''" class="success">{{ message }}</div>
  </div>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import store from '@/store';

export default class Alert extends Vue {
  // message = store.state.alert_message
  get message() {
    return store.state.alert_message
  }
}
</script>

<style scoped lang="less">
.alert {
  position: fixed;
  right: 0;

  .success {
    background-color: #42b983;
    padding: 6px 15px;
    color: #fff;
  }

  &.move {
    animation: moveLeft 1s;
  }
}

@keyframes moveLeft {
  from {
    right: -100px;
  }
  to {
    right: 0;
  }
}

</style>