<template>
  <div class="home">
    <Search url="/list" :scrollNum="srollTopNum" />
    <Banner :list="bannerList" @bannerHeight="getBannerHeight" />
    <ProductList :list="list" />
  </div>
</template>

<script>
export default {
  layout: "nav-footer",
  name: "home",
  async asyncData({ app, $axios, error }) {
    const res = await app.$api.groupTourProduct({
      pageSize: 5,
      pageStr: 0,
      keywords: ""
    });
    return { list: res.data.content };
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
    }
  },
  async mounted() {
    this.$store.commit("footer/changeNav", 0);
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