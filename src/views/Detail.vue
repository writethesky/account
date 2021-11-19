<template>
  <div class="detail">
    <div class="back" @click="back">&leftarrow;</div>
    <div class="title">
      <input v-model="account.title" placeholder="Please enter a title" type="text" @keyup="changed">
    </div>
    <svg v-if="isSecure" aria-hidden="true" class="icon secure" @click="secureTip">
      <use xlink:href="#icon-security"></use>
    </svg>
    <AccountComponent v-if="account.type == AccountTypeEnum.Normal" :account_data="account.data"
                      @change="change"></AccountComponent>
    <EmailComponent v-if="account.type == AccountTypeEnum.Email" :account_data="account.data"
                    @change="change"></EmailComponent>
    <SSHComponent v-if="account.type == AccountTypeEnum.SSH" :account_data="account.data"
                  @change="change"></SSHComponent>
    <DatabaseComponent v-if="account.type == 'database'" :account_data="account.data"
                       @change="change"></DatabaseComponent>
    <textarea v-model="account.description" class="description" placeholder="description"
              @keyup="changed"></textarea>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import AccountComponent from '@/components/accountType/Account.vue'; // @ is an alias to /src
import EmailComponent from '@/components/accountType/Email.vue';
import SSHComponent from '@/components/accountType/SSH.vue';
import DatabaseComponent from '@/components/accountType/Database.vue';
import api from "@/api";
import {Account, AccountTypeEnum} from "@/type";
import store from '@/store'

enum PageMode {
  Create,
  Edit
}

@Options({
  components: {
    AccountComponent,
    EmailComponent,
    SSHComponent,
    DatabaseComponent,
  },
})

export default class Detail extends Vue {
  pageMode = 0
  isChanged = false
  account: Account = {
    id: 0,
    title: "",
    description: "",
    type: AccountTypeEnum.Normal,
    copy_lists: [],
    data: {},
  }

  get isSecure(): boolean {
    return store.state.isSecure
  }

  // eslint-disable-next-line
  get AccountTypeEnum() {
    return AccountTypeEnum
  }

  async created(): Promise<void> {
    let accountID = parseInt(this.$route.params["id"] as string)
    this.account.type = parseInt(this.$route.params.type as string)

    if ("" == this.$route.params["id"] || "undefined" == typeof (this.$route.params["id"])) {
      this.pageMode = PageMode.Create
    } else {
      this.pageMode = PageMode.Edit
    }

    if (this.pageMode == PageMode.Create) {
      return
    }
    this.account = await api.account.info(accountID)
  }

  async back(): Promise<void> {

    let allEmpty = true
    for (let i in this.account.data) {
      if (this.account.data[i] != "") {
        allEmpty = false
        break
      }
    }
    if (this.account.title != "" || this.account.description != "") {
      allEmpty = false
    }
    if (allEmpty || !this.isChanged) {
      this.$router.back()
      return
    }

    if (this.pageMode == PageMode.Create) {
      await api.account.create(this.account)
    } else {
      await api.account.edit(this.account)
    }

    this.$router.back()
  }

  changed(): void {
    this.isChanged = true
  }

  change(account_data: Account): void {
    this.account.data = account_data
    this.isChanged = true
  }

  secureTip(): void {
    store.commit("alert", {
      "type": "info",
      "message": "Ultimate security is protecting you",
    })
  }
}
</script>

<style lang="less" scoped>

.secure {
  color: #42b983;
  position: fixed;
  bottom: 100px;
  font-size: 58px;
  left: 0;
  right: 0;
  margin: auto;
  opacity: 0.5;
}

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


  input {
    font-size: 28px;
    text-align: center;
    border: none;
    width: 300px;
    background-color: transparent;
    height: 60px;

    &:focus {
      outline: none;
      border-bottom: 1px solid #42b983;
    }
  }
}

.description {
  width: -webkit-fill-available;
  margin: 20px;
  height: 100px;
  padding: 10px;
  font-size: 16px;
  resize: none;
}


:deep(.input-group) {
  line-height: 30px;
  margin: 20px;
  overflow: hidden;

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

