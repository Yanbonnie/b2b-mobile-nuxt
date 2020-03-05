<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- <van-cell v-for="item in list" :key="item.orderCode" :title="item.title" /> -->
      <van-cell :value-class="item.isValid === 'Y'? 'blue': ''" :value="item.isValid === 'Y' ? '已启用' : '已停用'" is-link :label="item.operatingName + '  /  ' + item.mobile" v-for="item in list">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <span class="custom-title">{{item.accountName}}</span>
          <van-tag type="primary" v-if="item.isMain == 'Y'" round>主账号</van-tag>
        </template>
      </van-cell>
    </van-list>


  </div>
</template>

<script>
  export default {
    middleware: ['auth'],
    transition: 'moveL',
    data() {
      return {
        currentPage: 1,
        list: [],
        loading: false,
        finished: false,
      }
    },
    methods: {
      onLoad() {
        this.$api
          .loadAccount({
            currentPage: this.currentPage,
            pageSize: 5
          })
          .then(res => {
            this.list = [...this.list, ...res.content];
            this.currentPage = this.currentPage + 1;
            if (res.lastPage) {
              this.finished = true;
            }
            this.loading = false;
          });
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
  .blue{
    color: red;
  }
</style>
