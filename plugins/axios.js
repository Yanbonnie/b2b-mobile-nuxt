export default function ({$axios, app, redirect, route, store}) {
  $axios.defaults['timeout'] = 50000;

  $axios.defaults['withCredentials'] = true;
  /*
  $axios.onRequest(config => {
    let userToken = store.state.userToken;
    if (userToken) {
      config.headers.Authorization = `Bearer ${userToken}`;
    }
    // config.data = qs.stringify(config.data, {
    //   allowDots: true //Option allowDots can be used to enable dot notation
    // });
    return config;
  });

  // $axios.onResponse(response => {
  //   console.log(response)
  //   return Promise.resolve(response.data);
  // });

  $axios.onError(resError => {
    // console.log(resError.response);

    const code = parseInt(resError.response && resError.response.status) || 500

    if (code == 401 || code == 4001) {
      // console.log(route.fullPath)
      return redirect(`/entry/login?refer=${route.fullPath}`);
    }

    return Promise.reject({
      statusCode: code,
      statusText: resError.response && resError.response.statusText || '',
      guide: resError.response && resError.response.config.url || ''
    });

  });*/

}
