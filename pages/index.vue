<template>
  <div class="home">
    <Search url="/list_pro/travel" :scrollNum="srollTopNum"/>
    <Banner :list="bannerList" @bannerHeight="getBannerHeight"/>
    <ProductList :list="list"/>
  </div>
</template>

<script>
  export default {
    layout: "nav-footer",
    transition: 'moveL',
    name: "home",
    async asyncData({app, $axios, error}) {
      const res = await app.$api.groupTourProduct({
        pageSize: 5,
        pageStr: 0,
        keywords: ""
      });
      return {list: res.data.content};
    },
    data() {
      return {
        srollTopNum: 300,
        bannerList: [
          "http://file.gzl.cn//group1/M00/27/0D/wKkBH138qhSAKKutAACz4urhjz8660.jpg",
          "http://file.gzl.cn//group1/M00/22/77/wKkBHlxWRsWAAYdQAAFqCGdb_Jg198.jpg"
        ]
      };
    },
    components: {
      Banner: () => import("@/components/banner/index"),
      Search: () => import("@/components/search/index"),
      ProductList: () => import("@/components/productList/index")
    },
    methods: {
      getBannerHeight(scroll) {
        this.srollTopNum = scroll;
      },
      //获取微信配置
      async loadConfig() {
        let res = await this.$api.loadConfig({url: this.$route.fullPath})
        console.log(res)
        const {appId, timestamp, nonceStr, signature} = res.content;
        wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId, // 必填，公众号的唯一标识
          timestamp, // 必填，生成签名的时间戳
          nonceStr, // 必填，生成签名的随机串
          signature, // 必填，签名})
        })
        wx.ready(()=>{
          console.log("准备好了")
        })
      }
    },
    async mounted() {
      this.loadConfig();

      // this.$api.getActivity({ code: "20200108001" }).then(res => {
      //   console.log(res);
      // });
    }
  };
</script>
<style lang="scss" scoped>
  .home {
    padding-bottom: 10rem;
  }
</style>
