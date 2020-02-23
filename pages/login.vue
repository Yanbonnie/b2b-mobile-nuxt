<template>
  <div>
    <form>
      <input type="text" v-model="name" />
      <input type="password" v-model="psw" />
      <a href="javascript:;" @click="loginHandle">登录</a>
    </form>
  </div>
</template>

<script>
import md5 from "md5";
export default {
  async asyncData({ app }) {
    const rememberMe = app.$cookiz.get("rememberMe");
    console.log(rememberMe);
    return { rememberMe };
  },
  data() {
    return {
      name: "ybn",
      psw: "China888"
    };
  },
  methods: {
    loginHandle() {
      let { name, psw } = this;
      this.$api
        .mobileWebLogin({
          username: name,
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
    // console.log(this.$route.query);
    console.log(this.$cookiz.get("SESSION"));

    console.log(document.cookie);
  }
};
</script>

<style>
</style>