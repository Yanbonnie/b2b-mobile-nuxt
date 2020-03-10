import qs from 'qs';
import {Toast} from 'vant'
//代理配置
let baseUrl = process.env.NODE_ENV == 'development' ? 'dev' : 'pro'
let proxyObj = {
  dev: {
    b2b: '/b2b/',
    ecwalk: '/ecwalk/'
  },
  //服务端渲染
  // pro: {
  //   b2b: '/b2b/',
  //   ecwalk: '/b2b/'
  // }
  //spa
  pro: {
    b2b: 'https://m.testb2b.17ecgo.com/',
    ecwalk: 'https://m.testb2b.17ecgo.com/'
  }
}

export default (ctx, inject) => {
  let {app, $axios, redirect, route} = ctx;
  inject('api', {
    // 接口封装
    request(params) {
      return new Promise(function (resolve, reject) {
        $axios({
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            // "Content-Type": "application/json"
          },
          method: params.method,
          url: proxyObj[baseUrl][params.proxy] + params.url,
          [params.method === 'post' ? 'data' : 'params']: params.method === 'post' ? qs.stringify(params.data) : params.data
        }).then(res => {
          // console.log(res)
          let data = res.data
          if ((typeof data === 'string') && data.indexOf('!DOCTYPE') > -1) {
            // app.$cookiz.remove('SESSION');
            // app.$cookiz.remove('rememberMe');
            app.router.push({
              path: '/login'
            });
          } else {
            // console.log(data)
            resolve(data)
          }
          // if (data.resultCode === 'success') {
          //     resolve(data)
          // } else {
          //     console.log(route)
          //     if(data.indexOf('!DOCTYPE') > -1){
          //         redirect(200,'/login',{
          //             to:route.path
          //         })
          //         return;
          //     }
          //     reject(data)
          // }
        }).catch((error) => {
          if (!error.response) {  //后台没有响应，初次判断是重定向到登录页
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            app.router.push({
              path: '/login'
            });
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            // console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            // console.log('Error', error.message);
          }
          // console.log(error.config);
          // console.log(error)
          // Toast('请求出错了')
        })
      })
    },
    //登录接口
    mobileWebLogin(data) {
      return app.$api.request({method: 'post', url: 'mobileWebLogin.action', data, proxy: 'b2b'})
    },
    //登出
    mobileLoginOut(data) {
      return app.$api.request({method: 'post', url: 'logout.action', data, proxy: 'b2b'})
    },
    //跟团列表
    groupTourProduct(data) {
      return app.$api.request({method: 'post', url: 'grouptour/groupTourProduct.json', data, proxy: 'b2b'})
    },
    //票券列表
    getTicketList(data) {
      return app.$api.request({method: 'post', url: 'tickets/getTicketList.json', data, proxy: 'b2b'})
    },
    //邮轮列表
    getMcruisesSearchPage(data) {
      return app.$api.request({method: 'post', url: 'cruisesShareManage/getMcruisesSearchPage.json', data, proxy: 'b2b'})
    },
    //酒店列表
    getHotelList(data) {
      return app.$api.request({method: 'post', url: 'hotel/getHotelList.json', data, proxy: 'b2b'})
    },
    //自由行
    loadFreeTravelProduct(data) {
      return app.$api.request({method: 'post', url: 'freeTravel/loadFreeTravelProduct.json', data, proxy: 'b2b'})
    },

    // 订单列表
    queryOrders(data) {
      return app.$api.request({method: 'get', url: 'myOrder/p/queryOrders.json', data, proxy: 'b2b'})
    },

    //用户中心
    loadAccount(data) {
      return app.$api.request({method: 'get', url: 'memberCenter/p/loadAccount.json', data, proxy: 'b2b'})
    },

    loadConfig(data) {
      return app.$api.request({method: 'get', url: 'common/whechat/loadConfig.json', data, proxy: 'b2b'})
    }
  })
}
