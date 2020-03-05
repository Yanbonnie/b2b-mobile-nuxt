
<template>
  <div class="find">
    <Search url="/list" />
    <Banner :list="bannerList" />
    <ProductList :list="list" />
    <!-- <form>
      <input type="text" v-model="name" />
      <input type="password" v-model="psw" />
      <button @click="loginHandle">登录</button>
    </form>
    <h1>This is an about page</h1>-->
  </div>
</template>

<script>
export default {
  layout: "nav-footer",
  transition: 'moveL',
  async asyncData({ app, $axios, error }) {
    const res = await app.$api.getTicketList({
      pageSize: 5,
      pageStr: 0,
      keywords: ""
    });
    return { list: res.data.content };
  },
  data() {
    return {
      name: "ybn",
      psw: "China888",
      bannerList: [
        "http://file.gzl.cn//group1/M00/21/B1/wKkBHlw9lFOAe_KDAABj088sTvY159.jpg"
      ]
    };
  },
  components: {
    // HelloWorld
    Banner: () => import("@/components/banner/index"),
    Search: () => import("@/components/search/index"),
    ProductList: () => import("@/components/productList/index")
  },
  methods: {
    loginHandle() {
      let { name, psw } = this;
      this.$api
        .mobileWebLogin({
          username: name,
          password: psw,
          isPC: "1",
          pcCheckLogin: "1"
        })
        .then(res => {
          console.log(res);
        });
    }
  },
  mounted() {
    this.$store.commit("footer/changeNav", 1);
  }
};
</script>

<style lang="scss" scoped>
.find {
  padding-bottom: 10rem;
}
</style>
