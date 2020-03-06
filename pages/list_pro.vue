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
    <!--:keep-alive-props="{ exclude: ['travel.vue','ticket.vue'] }"-->
    <nuxt-child keep-alive :keywords="keywords" :key="$route.fullPath" ref="childs" @go-detail="goDetail"></nuxt-child>
  </div>
</template>

<script>
  /*
  * 1. prop  ：keywords  目的 ：传给子页面请求的时候的keywords
  * 2. query ：keywords  目的 ：处理参数变化重新加载数据
  * 3. nuxt-child 子组件需要配置 keep-alive 和 :key="$route.fullPath"
  * 3. 特殊处理： keywords发生了变化，点击搜索，启动重定向（replace）到当前页面，并改变参数。
  * 4. 特殊处理： 切换tab的时候，请带上keywords参数跳转
  * */
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
      }
    },
    methods: {
      tabChange(name, title) {
        if (name == 0) {
          this.$router.push({
            path: `/list_pro/travel?keywords=${this.keywords}`
          })
        } else if (name == 1) {
          this.$router.push({
            path: `/list_pro/ticket?keywords=${this.keywords}`
          })
        } else if (name == 2) {
          this.$router.push({
            path: `/list_pro/cruise?keywords=${this.keywords}`
          })
        } else if (name == 3) {
          this.$router.push({
            path: `/list_pro/hotel?keywords=${this.keywords}`
          })
        } else {
          this.$router.push({
            path: `/list_pro/freetravel?keywords=${this.keywords}`
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
