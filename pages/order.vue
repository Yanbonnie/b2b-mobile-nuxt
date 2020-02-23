<template>
  <div class="order-page">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <!-- <van-cell v-for="item in list" :key="item.orderCode" :title="item.title" /> -->
      <ul
        class="order-list">
        <li v-for="item in list" :key="item.orderCode"  class="new-order-item order-item">
          <div class="go-details">
            <div class="order-id">
              <!-- <i class="icon icon-order-ship"></i> -->
              <span>[{{item.orderType}}]</span>
              <span class="number">订单号：{{item.orderCode}}</span>
            </div>
            <div class="title">{{item.title}}</div>
            <div class="date">
              <span class="start-date">出发日期：{{item.startTime | formatDate('YYYY-MM-DD')}}</span>
              <span class="order-date">下单日期：{{item.endTime | formatDate('YYYY-MM-DD')}}</span>
              <span class="amount">数量 × {{item.orderQuantity}}</span>
            </div>
            <div class="count">
              <ul>
                <li>
                  <p class="price">总价</p>
                  <div class="price1">￥{{item.totalAmount}}</div>
                </li>
                <li>
                  <p class="price">已支付</p>
                  <div class="price2">￥{{item.paidAmount}}</div>
                </li>
                <li class="no-border">
                  <p class="price">待支付</p>
                  <div class="price3">￥{{item.unpaidAmount}}</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="order-item-buttom">
            <div class="user-img">
              <img :src="item.supplierLogoUrl" />
            </div>
            <span class="user-name">{{item.supplierName}}</span>
            <ul class="button">
              <li class="paid">支付</li>
              <li class="change">变更</li>
              <li class="cancel">取消</li>
            </ul>
          </div>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
export default {
  layout: "nav-footer",
  middleware: 'auth',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      currentPage:1,
    };
  },
  methods: {
    onLoad() {
      this.$api
        .queryOrders({
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
    this.$store.commit("footer/changeNav", 2);
  }
};
</script>

<style>
</style>