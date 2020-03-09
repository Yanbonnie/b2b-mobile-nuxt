<template>
  <div>
    <!-- style="overflow-x:hidden;" -->
    <div>
      <nuxt keep-alive/>
    </div>
    <div class="footer-nav">
      <ul>
        <nuxt-link tag="li" to="/">
          <van-icon name="wap-home-o" :color="navActive === 0 ? '#E3324C' : ''"/>
          首页
        </nuxt-link>
        <nuxt-link tag="li" to="/find">
          <van-icon name="hot-o" :color="navActive === 1 ? '#E3324C' : ''"/>
          发现
        </nuxt-link>

        <nuxt-link tag="li" to="/login" v-if="!$store.getters.isAuth">
          <van-icon name="description" :color="navActive === 2 ? '#E3324C' : ''"/>
          去登录
        </nuxt-link>

        <nuxt-link v-else tag="li" to="/order">
          <van-icon name="description" :color="navActive === 2 ? '#E3324C' : ''"/>
          我的订单
        </nuxt-link>
        <nuxt-link v-if="$store.getters.isAuth" tag="li" to="/member">
          <van-icon name="contact" :color="navActive === 3 ? '#E3324C' : ''"/>
          用户中心
        </nuxt-link>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      navActive() {
        return this.$store.getters['footer/active'];
      }
    },
    watch:{
      $route:{
        handler(to,from){
          if(to.path === '/'){
            this.$store.commit("footer/changeNav", 0);
          }else if(to.path === '/find'){
            this.$store.commit("footer/changeNav", 1);
          }else if(to.path === '/order'){
            this.$store.commit("footer/changeNav", 2);
          }else if(to.path === '/member'){
            this.$store.commit("footer/changeNav", 3);
          }
        },
        immediate:true
      }
    },
    mounted() {

    }
  };
</script>

<style lang="scss" scoped>
  .footer-nav {
    position: fixed;
    height: 5rem;
    left: 0;
    right: 0;
    bottom: 0;
    border-top: 0.1rem #eeeeee solid;
    z-index: 2;
    background: #ffffff;

    ul {
      display: flex;
      justify-content: space-around;
      height: 5rem;
      align-items: center;

      li {
        display: flex;
        flex-direction: column;
        align-items: center;

        i {
          font-size: 1.8rem;
        }

        &.nuxt-link-exact-active {
          color: #e3324c;
        }
      }
    }
  }
</style>
