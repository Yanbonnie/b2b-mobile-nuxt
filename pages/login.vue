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
  </div>
</template>

<script>
  import md5 from "md5";
  export default {
    transition: 'moveL',
    layout: "login",
    data() {
      return {
        username: "ybn",
        psw: "China888",
        backUrl: ''
      };
    },
    // beforeRouteEnter(to, from, next) {
    //   next(vm => {
    //     vm.backUrl = from.fullPath;
    //   })
    // },
    methods: {
      loginHandle() {
        let {username, psw} = this;
        this.$api
          .mobileWebLogin({
            username: username,
            password: md5(psw),
            isPC: "1",
            pcCheckLogin: "1"
          })
          .then(res => {
            // console.log(res);
            if (res.resultCode === 'success') {
              //ssr
              this.$store.commit("setToken", res.data);
              //spa
              // this.$cookiz.set('rememberMe2',res.data)

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
