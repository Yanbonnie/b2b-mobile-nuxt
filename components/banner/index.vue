<template>
  <div v-if="list.length > 0">
    <van-swipe :autoplay="3000" indicator-color="white" class="van-banner">
      <van-swipe-item v-for="item in list" :key="item">
          <img :src="item" alt="">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
    props:{
        list:{
            type:Array,
            default(){
                return []
            }
        }
    },
    mounted(){
        let scrollTop = document.getElementsByClassName('van-banner')[0]?document.getElementsByClassName('van-banner')[0].offsetHeight : 0;
        this.$emit('bannerHeight',scrollTop)
    }
};
</script>

<style lang="scss" scoped>
.van-banner{
    height: 25rem;
    img{
        width: 100%;
        height: 100%;
    }
}
</style>