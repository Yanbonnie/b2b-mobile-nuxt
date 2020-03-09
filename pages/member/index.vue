<template>
  <div>
    <div class="info"></div>
    <van-cell icon="like-o" title="我的收藏" is-link value=""/>
    <van-cell icon="notes-o" to="/member/accountManage" title="账号管理" is-link value=""/>
    <van-cell icon="coupon-o" title="优惠券" is-link value=""/>
    <p class="title">安全设置</p>
    <van-cell title="登录密码" is-link value="">
      <van-icon slot="icon" class="iconfont" class-prefix="icon" name="lock" color="#4a4a4a" size="2rem" style="position: relative;left: -0.2rem"/>
    </van-cell>
    <van-cell icon="" title="支付密码" is-link value="">
      <van-icon slot="icon" class="iconfont" class-prefix="icon" name="auth" color="#4a4a4a"/>
    </van-cell>

    <van-button round block type="danger" @click="loginOut" class="logout">
      退出登录
    </van-button>
    <!--    <van-cell icon="" title="退出账号" @click="loginOut" is-link value="">-->
    <!--      <van-icon slot="icon" class="iconfont" class-prefix="icon" name="logout" color="#4a4a4a"/>-->
    <!--    </van-cell>-->
  </div>
</template>

<script>
  export default {
    layout: "nav-footer",
    transition: 'moveL',
    middleware: ['auth'],
    methods: {
      loginOut() {
        this.$store.commit('setToken', null)
        //spa
        // this.$cookiz.remove('rememberMe2')
        this.$api.mobileLoginOut({isAnon: 1}).then(res => {
          console.log(res)
        })
      }
    },
    mounted() {
    }
  };
</script>

<style lang="scss" scoped>
  .info {
    height: 15rem;
    background: #ff503f;
  }

  .title {
    padding-left: 1.8rem;
    font-size: 1.2rem;
    background: #efefef;
    line-height: 3rem;
  }

  .logout {
    width: 90%;
    margin: 5rem auto 0;
  }
</style>
