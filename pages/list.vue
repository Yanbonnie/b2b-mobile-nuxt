<template>
  <div class="list-wrap">
    <form action="/">
      <van-search
        v-model="keywords"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch"
        class="list-search"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </form>
    <van-tabs v-model="active" @change="tabChange" class="nav-box">
      <van-tab title="跟团"></van-tab>
      <van-tab title="票券"></van-tab>
      <van-tab title="邮轮"></van-tab>
      <van-tab title="酒店"></van-tab>
      <van-tab title="自由行"></van-tab>
    </van-tabs>
    <van-list
      v-model="list[active].loading"
      :finished="list[active].finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ul class="productListInfo" v-if="active == 0">
        <li v-for="(item,index) in list[active].data" :key="index" :title="item">
          <a href="/grouptour/402880226c4357e0016c7463bf8d49ec.html">
            <div class="left-btn">
              <i class="icon icon-check-cir"></i>
            </div>
          </a>
          <div class="right-blk">
            <a href="/grouptour/402880226c4357e0016c7463bf8d49ec.html">
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

      <!-- 票券 -->
      <ul class="ticket-list-content" v-if="active == 1">
        <li
          v-for="(item,index) in list[active].data"
          :key="index"
          :title="item.pdName"
          class="list-info"
        >
          <a href="/tickets/402880234f8477eb014f87e3956713d6.html">
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
      <!-- 邮轮 -->
      <ul class="cruise-list-content" v-if="active == 2">
        <li
          v-for="(item,index) in list[active].data"
          :key="index"
          :title="item.pdName"
          class="list-info"
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
      <!-- 酒店 -->
      <ul class="hotel-list-content" v-if="active == 3">
        <li
          v-for="(item,index) in list[active].data"
          :key="index"
          :title="item.pdName"
          class="list-info"
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
      <!-- 自由行 -->
      <ul class="productListInfo" v-if="active == 4">
        <li v-for="(item,index) in list[active].data" :key="index" :title="item">
          <a href="/grouptour/402880226c4357e0016c7463bf8d49ec.html">
            <div class="left-btn">
              <i class="icon icon-check-cir"></i>
            </div>
          </a>
          <div class="right-blk">
            <a href="/grouptour/402880226c4357e0016c7463bf8d49ec.html">
              <h4>{{item.title}}</h4>
              <ul class="infos">
                <li>{{item.travelDays+'天'}} / {{item.deptPlaceName}}出发</li>
                <!-- <li class="dates" style="width: 18rem;">团期:&nbsp;</li> -->
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
                    <li>
                      <p>建议销售价</p>
                      <div class="black">￥{{item.b2bPrice}}</div>
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
    data() {
      return {
        list: [
          {
            title: "跟团",
            loading: false,
            finished: false,
            pageStr: 0,
            data: []
          },
          {
            title: "票券",
            loading: false,
            finished: false,
            pageStr: 0,
            data: []
          },
          {
            title: "邮轮",
            loading: false,
            finished: false,
            pageStr: 0,
            data: []
          },
          {
            title: "酒店",
            loading: false,
            finished: false,
            pageStr: 0,
            data: []
          },
          {
            title: "自由行",
            loading: false,
            finished: false,
            pageStr: 0,
            data: []
          }
        ],
        apiArr: [
          "groupTourProduct",
          "getTicketList",
          "getMcruisesSearchPage",
          "getHotelList",
          "loadFreeTravelProduct"
        ],
        pageSize: 5,
        //   pageStr: 1,
        //   loading: false,
        //   finished: false,
        active: 0,
        keywords: ""
      };
    },

    methods: {
      tabChange() {
        let {active} = this;
        this.list[active].finished = false;
        this.list[active].loading = true;
        this.list[active].pageStr = 0;
        this.list[active].data = [];
        if (this.list[active].loading) {
          this.onLoad();
        }
      },
      onSearch() {
        let {active} = this;
        this.list[active].finished = false;
        this.list[active].loading = true;
        this.list[active].pageStr = 0;
        this.list[active].data = [];
        if (this.list[active].loading) {
          this.onLoad();
        }
      },
      onLoad() {
        let {pageSize, apiArr, active, list, keywords} = this;
        this.$api[apiArr[active]]({
          pageSize,
          pageStr: list[active].pageStr,
          keywords: keywords
        })
          .then(res => {
            //票券
            this.list[active].data = [...list[active].data, ...res.data.content];
            if (res.data.lastPage) {
              this.list[active].finished = true;
            }
            this.list[active].pageStr = this.list[active].pageStr + 1;
            // 加载状态结束
            this.list[active].loading = false;
          })
          .catch(() => {
            this.$toast("服务器出错了");
          });
        // 异步更新数据
        //   setTimeout(() => {
        //     for (let i = 0; i < 10; i++) {
        //       this.list.push(this.list.length + 1);
        //     }
        //     // 加载状态结束
        //     this.loading = false;

        //     // 数据全部加载完成
        //     if (this.list.length >= 40) {
        //       this.finished = true;
        //     }
        //   }, 500);
      }
    },
    mounted() {
      this.keywords = this.$route.query.keywords;
    }
  };
</script>

<style lang="scss" scoped>
</style>
