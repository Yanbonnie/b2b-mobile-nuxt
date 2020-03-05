<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ul class="ticket-list-content">
        <li
          v-for="(item,index) in list"
          :key="index"
          :title="item.pdName"
          class="list-info"
          @click="$emit('go-detail',`/detail/ticket/${item.pdId}`)"
        >
          <a>
            <h2>{{item.pdName}}</h2>
            <p>
              <b>产品ID：</b>

              <span>{{item.pdShortNum}}</span>
            </p>
            <p>景点地址：{{item.address}}</p>
            <div class="list-info-bar">
              <div class="info-left">
                <img src="http://file.gzl.cn/group1/M00/13/E6/wKkBHlpUm3WAcu-ZAABOefXavZs111.png"/>
                <span>{{item.supplierName}}</span>
              </div>
              <div class="info-right">
                <h3>建议零售价</h3>
                <span>￥{{item.salePrice}}</span>
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
    name: "ticket.vue",
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
        this.$api['getTicketList']({
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
