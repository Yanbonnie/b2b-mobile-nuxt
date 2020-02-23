<template>
  <div>
    <ul class="productListInfo">
      <li v-for="item in list" :key="item.pdId">
        <a href="/grouptour/ff8080814e8b2801014e90951d320f69.html">
          <div class="left-btn">
            <i class="check-btn"></i>
          </div>
          <div class="right-blk">
            <h4>
              <label for class="pType-label red">跟团游</label>{{item.pdName}}
            </h4>
            <ul class="infos">
              <li>3天/广州出发</li>
              <li class="dates">团期:2020-01-21 2020-01-25 2020-01-26 2020-01-27 2020-01-28 2020-01-29</li>
            </ul>
            <div class="supplier-price-wrp">
              <div class="supplier-wrp">
                <img src="http://file.gzl.cn/group1/M00/13/E6/wKkBHlpUm3WAcu-ZAABOefXavZs111.png" />
                <span class="provider-name">广州广之旅</span>
              </div>
              <div class="price-info">
                <ul>
                  <li>
                    <p>建议销售价</p>
                    <div class="black">￥999</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </a>
      </li>
      <div class="showEndBox" style="text-align:center;">
        <span>这是我的底线，不要再拉啦~~</span>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>