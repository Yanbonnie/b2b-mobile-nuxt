<template>
  <div>
    <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @search="onSearch"
      @input="onInput"
      class="van-search-box"
      :class="className + ' ' + scollName"
    >
      <div slot="action" @click="onSearch">搜索</div>
    </van-search>
  </div>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      default: ""
    },
    url: {
      type: String,
      default: ""
    },
    scrollNum: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      value: "",
      scollName: ""
    };
  },
  methods: {
    onInput(value) {
      this.value = value;
    },
    onSearch() {
      let { url, value } = this;
      if (url) {
        this.$router.push({
          path: url,
          query: {
            keywords: value
          }
        });
      }
    },
    handleScroll() {
      //获取滚动时的高度
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (!document.getElementsByClassName("van-search-box")[0]) return;
      let H = document.getElementsByClassName("van-search-box")[0].offsetHeight;
      if (H) {
        if (scrollTop > 0) {
          //滚动大于0的时候要做的操作
        }
        if (scrollTop > this.scrollNum - H) {
          this.scollName = "white-bg";
          //大于200的时候要做的操作
        } else {
          this.scollName = "";
        }
      }
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="scss" scoped>
.van-search-box {
  position: fixed;
  z-index: 2;
  left: 0;
  right: 0;
  top: 0;
  background: rgba(255, 255, 255, 0) !important;
  .van-search__content {
    background: rgba(255, 255, 255, 0.5);
  }
  &.order-search {
    //   box-shadow: 0 0.2rem 0.2rem #ccc;
    .van-search__content {
      background: #efefef;
    }
  }
  &.white-bg {
    background: #ffffff !important;
    box-shadow: 0 0 6px #cccccc;
    transition: all 0.2s ease-in;
    .van-search__content {
      background: #efefef;
    }
  }
}

.van-field__control::placeholder {
  color: #ffffff !important;
}
.van-field__control::-webkit-input-placeholder {
  color: #ffffff !important;
}
</style>