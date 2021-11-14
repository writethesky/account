<template>
  <Alert></Alert>
  <router-view/>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Alert from '@/components/Alert.vue';
import api from "@/api"; // @ is an alias to /src

@Options({
  components: {
    Alert,
  },
})
export default class App extends Vue {
  created() {
    if (!api.token.has()) {
      this.$router.push({name: "Login"})
    }
  }
}
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  user-select: none;
  box-sizing: border-box;
}

.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
