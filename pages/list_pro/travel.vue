<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ul class="productListInfo">
        <li v-for="(item,index) in list" :key="index" :title="item" @click="goDetail(item.pdId)">
          <a>
            <div class="left-btn">
              <i class="icon icon-check-cir"></i>
            </div>
          </a>
          <div class="right-blk">
            <a>
              <h4>{{item.pdName}}</h4>
              <ul class="infos">
                <li>{{item.travelDays+'天'}} / {{item.deptPlaceName}}出发</li>
                <li class="dates" style="width: 18rem;">团期:&nbsp;</li>
              </ul>

              <div class="supplier-price-wrp">
                <!--  供应商-->
                <div class="supplier-wrp">
                  <img :src="item.supplierLogoUrl"/>
                  <span class="provider-name">{{item.supplierName}}</span>
                </div>
                <!--  价格-->
                <div class="price-info">
                  <ul>
                    <li v-if="item.settlePrice">
                      <p>同业价</p>
                      <div class="red">{{item.settlePrice}}</div>
                    </li>
                    <li>
                      <p>建议销售价</p>
                      <div class="black">￥{{item.salePrice}}</div>
                    </li>
                    <li v-if="item.proiftPrice">
                      <p>利润</p>
                      <div class="black">￥{{item.proiftPrice}}</div>
                    </li>
                  </ul>
                </div>
              </div>

              <ul class="labels">
                <li class="grey-label" v-for="pItem in item.pdTagNames" :key="pItem">{{pItem}}</li>
              </ul>
            </a>
          </div>
        </li>
      </ul>

    </van-list>
  </div>
</template>

<script>
  export default {
    name: "travel.vue",
    props: ['keywords'],
    key(route){
      console.log(111)
      return new Date().getTime();
    },
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
        this.$api['groupTourProduct']({
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
      },
      goDetail(id){
        this.$router.push({
          path:`/detail/travel/${id}`
        })
      }
    },
    mounted() {
      console.log("进来跟团咯")
    }
  }
</script>

<style scoped>

</style>
