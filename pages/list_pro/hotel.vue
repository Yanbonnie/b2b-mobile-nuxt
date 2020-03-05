<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ul class="hotel-list-content">
        <li
          v-for="(item,index) in list"
          :key="index"
          :title="item.pdName"
          class="list-info"
          @click="$emit('go-detail',`/detail/hotel/${item.pdId}`)"
        >
          <h2>{{item.pdName}}</h2>
          <p>酒店地址：{{item.address}}</p>
          <div class="list-info-bar">
            <div class="info-left">
              <img src="http://file.gzl.cn/group1/M00/13/E6/wKkBHlpUm3WAcu-ZAABOefXavZs111.png"/>

              <span>{{item.supplierName}}</span>
            </div>
            <div class="info-right">
              <h3>同业价</h3>
              <span>￥21</span>
            </div>
          </div>
          <div class="labelBox">
            <b class="ha">{{item.level}}</b>
          </div>
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
        this.$api['getHotelList']({
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
