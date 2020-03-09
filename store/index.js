// export const state = () => {
//   userToken: null
// }
export const state = () => ({
  userToken: null
})

export const mutations = {
  setToken(state, token) {
    state.userToken = token || null;
  }
}

export const actions = {
  nuxtServerInit({ commit }, { app }) {
    const token = app.$cookiz.get('rememberMe');
    console.log("服务端渲染",token)
    commit('setToken',token);
  }
}


export const getters = {
  isAuth(state) {
    return !!state.userToken;
  }
}
