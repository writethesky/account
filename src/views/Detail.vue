<template>
  <div class="detail">
    <div class="back" @click="$router.back()">&leftarrow;</div>
    <div class="title">
      <input type="text" v-model="account.title" placeholder="起个名称">
    </div>
    <AccountComponent v-if="account.type == 'account'" :account_data="account.data" @change="change"></AccountComponent>
    <EmailComponent v-if="account.type == 'email'" :account_data="account.data" @change="change"></EmailComponent>
    <SSHComponent v-if="account.type == 'ssh'" :account_data="account.data" @change="change"></SSHComponent>
    <DatabaseComponent v-if="account.type == 'database'" :account_data="account.data"
                       @change="change"></DatabaseComponent>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import store, {Account, CopyItem} from '@/store';
import AccountComponent from '@/components/accountType/Account.vue'; // @ is an alias to /src
import EmailComponent from '@/components/accountType/Email.vue';
import SSHComponent from '@/components/accountType/SSH.vue';
import DatabaseComponent from '@/components/accountType/Database.vue';
import {v1 as uuidv1} from 'uuid';


@Options({
  components: {
    AccountComponent,
    EmailComponent,
    SSHComponent,
    DatabaseComponent,
  },
})

export default class Detail extends Vue {
  account: Account = {
    id: "",
    title: "",
    type: "",
    copy_lists: [],
    data: {},
  }

  unmounted() {
    if (!this.account.title) {
      return
    }
    store.commit("create_account", this.account)
  }

  created(): void {

    this.account.type = this.$route.params.type.toString()
    if ("" == this.$route.params.id || typeof (this.$route.params.id) == "undefined") {

      this.account.id = uuidv1();
      return;
    }
    for (let i in store.state.account_list) {
      if (store.state.account_list[i].id == this.$route.params.id) {
        this.account = store.state.account_list[i]
        return
      }

    }
  }

  change(account_data: Account, copy_lists: CopyItem[]): void {
    this.account.data = account_data
    this.account.copy_lists = copy_lists

  }
}
</script>

<style scoped lang="less">
.back {
  position: fixed;
  top: 0;
  left: 0;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
}

.title {


  input {
    font-size: 30px;
    text-align: center;
    border: none;
    width: 300px;
    background-color: transparent;

    &:focus {
      outline: none;
      border-bottom: 1px solid #42b983;
    }
  }
}


/deep/ .input-group {
  height: 30px;
  line-height: 30px;
  margin: 20px;

  .name {
    float: left;
    width: 80px;
    text-align: right;
    padding-right: 10px;
  }

  .value {
    float: left;

    input {
      width: 200px;
      border: none;
      height: 30px;
      border: none;
      padding: 0 10px;
      font-size: 16px;
      background-color: transparent;

      &:focus {
        border-bottom: 1px solid #42b983;
        border-radius: 5px;
        outline: none;
      }
    }
  }
}
</style>

