export default function ({ store, redirect, route, app }) {
  // console.log(process.server)
  console.log(store)
  console.log(store.state.userToken,app.$cookiz.get('rememberMe2'))
  if(app.$cookiz.get('rememberMe2') && !store.state.userToken){
    console.log(1111)
    store.commit('setToken', app.$cookiz.get('rememberMe2'));
  }
}
