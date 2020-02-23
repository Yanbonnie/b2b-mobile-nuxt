
import qs from 'qs';
import { Toast } from 'vant'
//代理配置
let baseUrl = process.env.NODE_ENV == 'development' ? 'dev' : 'pro'
let proxyObj = {
    dev: {
        b2b: '/b2b/',
        ecwalk: '/ecwalk/'
    },
    pro: {
        b2b: '/b2b/',
        ecwalk: '/b2b/'
    }
}

export default (ctx, inject) => {
    // console.log(ctx);
    let { app, $axios, redirect, route } = ctx;
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

                    let data = res.data
                    if ((typeof data === 'string') && data.indexOf('!DOCTYPE') > -1) {
                        app.$cookiz.remove('SESSION');
                        app.$cookiz.remove('rememberMe');
                        // console.log(ctx)
                        // console.log(route.path)
                        app.router.push({
                            path: '/login'
                        });
                        // redirect('/login?to=')


                        // console.log(ctx);
                        // console.log(ctx.from.path);
                        // let _path = ctx.from.path;
                        // app.router.push({
                        //     path: '/login?to=${_path}',
                        //     query: {
                        //         to: ctx.from ? ctx.from.fullPath : route.fullPath
                        //     }
                        // })
                        // redirect(200, '/login', {
                        //     to: ctx.from ? ctx.from.fullPath : route.fullPath
                        // })
                        // reject(data)
                    } else {
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
                    Toast('请求出错了')
                    console.log(error)
                })
            })
        },
        //登录接口
        mobileWebLogin(data) {
            return app.$api.request({ method: 'post', url: 'mobileWebLogin.action', data, proxy: 'b2b' })
        },
        //跟团列表
        groupTourProduct(data) {
            return app.$api.request({ method: 'post', url: 'grouptour/groupTourProduct.json', data, proxy: 'b2b' })
        },
        //票券列表
        getTicketList(data) {
            return app.$api.request({ method: 'post', url: 'tickets/getTicketList.json', data, proxy: 'b2b' })
        },
        //邮轮列表
        getMcruisesSearchPage(data) {
            return app.$api.request({ method: 'post', url: 'cruisesShareManage/getMcruisesSearchPage.json', data, proxy: 'b2b' })
        },
        //酒店列表
        getHotelList(data) {
            return app.$api.request({ method: 'post', url: 'hotel/getHotelList.json', data, proxy: 'b2b' })
        },
        //自由行
        loadFreeTravelProduct(data) {
            return app.$api.request({ method: 'post', url: 'freeTravel/loadFreeTravelProduct.json', data, proxy: 'b2b' })
        },

        // 订单列表
        queryOrders(data) {
            return app.$api.request({ method: 'get', url: 'myOrder/p/queryOrders.json', data, proxy: 'b2b' })
        }

    })
}