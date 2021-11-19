<template>
  <div :class="{move: message != '', shake: type=='error'}" class="alert">
    <div v-if="message != ''" :class="type" class="message">{{ message }}</div>
  </div>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import store from '@/store';

export default class Alert extends Vue {
  get message(): string {
    return store.state.alert_message
  }

  get type(): string {
    return store.state.alert_type
  }
}
</script>

<style lang="less" scoped>
.alert {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 30px;
  width: max-content;
  max-width: 90%;
  margin: auto;
  line-break: anywhere;
  z-index: 1;

  .message {
    border-radius: 5px;
    padding: 6px 15px;
    color: #fff;

    &.success {
      background-color: #42b983d0;
    }

    &.error {
      background-color: #fb6985d0;
    }

    &.info {
      background-color: #000000d0;
    }
  }


  &.move {
    animation: moveLeft 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  &.move.shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }
}

@keyframes shake {
  0% {
    transform: translate3d(0, 200px, 0);
  }
  50%, 60%, 70%, 80%, 90% {
    transform: translate3d(5px, 10px, 5px);
  }
  55%, 65%, 75%, 85%, 95% {
    transform: translate3d(-5px, 0, -5px);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes moveLeft {
  from {
    transform: translate3d(0, 200px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}

</style>