<template>
  <div class="list-wrap">
    <form action="/">
      <van-search
        v-model="keywords"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch"
        class="list-search"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </form>
    <van-tabs v-model="active" @change="tabChange" class="nav-box">
      <van-tab title="跟团"></van-tab>
      <van-tab title="票券"></van-tab>
      <van-tab title="邮轮"></van-tab>
      <van-tab title="酒店"></van-tab>
      <van-tab title="自由行"></van-tab>
    </van-tabs>
    <nuxt-child keep-alive :keywords="keywords" ref="childs" @go-detail="goDetail"></nuxt-child>
  </div>
</template>

<script>
  export default {
    name: "index.vue",
    data() {
      return {
        active: 0,
        keywords: ''
      }
    },
    watch: {
      //监听路由的变化
      $route: {
        handler(to, from) {
          if (to.name === 'list_pro-travel') {
            this.active = 0;
          } else if (to.name === 'list_pro-ticket') {
            this.active = 1;
          } else if (to.name === 'list_pro-cruise') {
            this.active = 2;
          } else if (to.name === 'list_pro-hotel') {
            this.active = 3;
          } else if (to.name === 'list_pro-freetravel') {
            this.active = 4;
          }
        },
        //第一次进入也执行监听
        immediate: true
      },
      keywords(){
        this.onSearch();
      }
    },
    methods: {
      tabChange(name, title) {
        if (name == 0) {
          this.$router.push({
            path: '/list_pro/travel'
          })
        } else if (name == 1) {
          this.$router.push({
            path: '/list_pro/ticket'
          })
        } else if (name == 2) {
          this.$router.push({
            path: '/list_pro/cruise'
          })
        } else if (name == 3) {
          this.$router.push({
            path: '/list_pro/hotel'
          })
        } else {
          this.$router.push({
            path: '/list_pro/freetravel'
          })
        }
      },
      //父组件调用子组件的方法
      onSearch() {
        this.$refs['childs'].onSearch()
      },
      //父组件监听子组件派发的事件
      goDetail(path) {
        this.$router.push({
          path
        })
      }
    },
    mounted() {
      this.keywords = this.$route.query.keywords;
    }
  }
</script>

<style scoped>

</style>
