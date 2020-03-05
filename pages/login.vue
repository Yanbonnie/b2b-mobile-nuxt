<template>
  <div style="padding-top: 5rem">
    <van-form @submit="loginHandle">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="psw"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="danger" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
<!--    <form>-->
<!--      <input type="text" v-model="username" />-->
<!--      <input type="password" v-model="psw" />-->
<!--      <a href="javascript:;" @click="loginHandle">登录</a>-->
<!--    </form>-->
  </div>
</template>

<script>
import md5 from "md5";
// import Vue from 'vue';
// import { Form } from 'vant';
//
// Vue.use(Form);
export default {
  transition: 'moveL',
  data() {
    return {
      username: "ybn",
      psw: "China888"
    };
  },
  methods: {
    loginHandle() {
      let { username, psw } = this;
      this.$api
        .mobileWebLogin({
          username: username,
          password: md5(psw),
          isPC: "1",
          pcCheckLogin: "1"
        })
        .then(res => {
          // console.log(res);
          if (res.resultCode) {
            this.$store.commit("setToken", 'isLogin');

            let _to = this.$route.query.to || null;
            if (_to) {
              this.$router.replace({
                path: this.$route.query.to || "/"
              });
            } else {
              this.$router.back();
            }
          }
        });
    }
  },
  mounted() {

  }
};
</script>

<style>
</style>
