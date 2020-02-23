<template>
  <div>用户中心首页</div>
</template>

<script>
export default {
  layout: "nav-footer",
  mounted(){
    this.$store.commit('footer/changeNav',3)
  }
};
</script>

<style>
</style>