<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ul class="cruise-list-content">
        <li
          v-for="(item,index) in list"
          :key="index"
          :title="item.pdName"
          class="list-info"
          @click="$emit('go-detail',`/detail/cruise/${item.pdId}`)"
        >
          <a>
            <h2>{{item.pdName}}</h2>
            <ul class="schedule">
              <li>{{item.travelDays}}天/{{item.deptPlaceName}}出发</li>
              <li>B2B邮轮</li>
              <li class="dates">最近班期：{{item.departureDaysList}}</li>
            </ul>
            <div class="list-info-bar">
              <div class="info-left">
                <img :src="item.supplierLogoUrl"/>
                <span>{{item.supplierName}}</span>
              </div>
              <div class="info-right">
                <ul class="price-tag">
                  <li class="profit">
                    <span>建议销售价</span>
                    <div class="price trade-price">￥200</div>
                  </li>
                </ul>
              </div>
            </div>
          </a>
        </li>
      </ul>

    </van-list>
  </div>
</template>

<script>
  export default {
    name: "hotel.vue",
    props: ['keywords'],
    data() {
      return {
        pageSize: 5,
        pageStr: 0,
        loading: false,
        finished: false,
        list: []
      }
    },
    methods: {
      onSearch() {
        this.finished = false;
        this.loading = true;
        this.pageStr = 0;
        this.list = [];
        if (this.loading) {
          this.onLoad();
        }
      },
      onLoad() {
        let {pageSize, list, pageStr, keywords} = this;
        this.$api['getMcruisesSearchPage']({
          pageSize,
          pageStr: pageStr,
          keywords: keywords
        })
          .then(res => {
            //票券
            this.list = [...list, ...res.data.content];
            if (res.data.lastPage) {
              this.finished = true;
            }
            this.pageStr = this.pageStr + 1;
            // 加载状态结束
            this.loading = false;
          })
          .catch(() => {
            this.$toast("服务器出错了");
          });
      }
    }
  }
</script>

<style scoped>

</style>
