<template>
  <Alert></Alert>
  <div id="nav">
    <router-link to="/">锁定</router-link>
    |
    <router-link to="/about">About</router-link>
  </div>
  <router-view/>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import Alert from '@/components/Alert.vue'; // @ is an alias to /src

@Options({
  components: {
    Alert,
  },
})
export default class App extends Vue {
}
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  user-select: none;
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

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
