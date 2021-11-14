<template>
  <div class="detail">
    <div class="back" @click="back">&leftarrow;</div>
    <div class="title">
      <input v-model="account.title" placeholder="Please enter a name" type="text" @keyup="titleChange">
    </div>
    <AccountComponent v-if="account.type == AccountTypeEnum.Normal" :account_data="account.data"
                      @change="change"></AccountComponent>
    <EmailComponent v-if="account.type == AccountTypeEnum.Email" :account_data="account.data"
                    @change="change"></EmailComponent>
    <SSHComponent v-if="account.type == AccountTypeEnum.SSH" :account_data="account.data"
                  @change="change"></SSHComponent>
    <DatabaseComponent v-if="account.type == 'database'" :account_data="account.data"
                       @change="change"></DatabaseComponent>
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
    type: AccountTypeEnum.Normal,
    copy_lists: [],
    data: {},
  }

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

  async back() {

    let allEmpty = true
    for (let i in this.account.data) {
      if (this.account.data[i] != "") {
        allEmpty = false
        break
      }
    }
    if (this.account.title != "") {
      allEmpty = false
    }
    if (allEmpty || !this.isChanged) {
      this.$router.back()
      return
    }

    if (this.pageMode == PageMode.Create) {
      await api.account.create(this.account.title, this.account.type, this.account.data)
    } else {
      await api.account.edit(this.account.id, this.account.title, this.account.type, this.account.data)
    }

    this.$router.back()
  }

  titleChange() {
    this.isChanged = true
  }

  change(account_data: Account): void {
    this.account.data = account_data
    this.isChanged = true
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


/deep/ .input-group {
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

