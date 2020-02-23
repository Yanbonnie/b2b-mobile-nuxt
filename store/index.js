export const state = () => {
  userToken: null
}

export const mutations = {
  setToken(state, token) {
    console.log('set Token')
    state.userToken = token || null;
  }
}

export const actions = {
  nuxtServerInit({ commit }, { app }) {
    const token = app.$cookiz.get('rememberMe');
    commit('setToken',token);
  }
}


export const getters = {
  isAuth(state) {
    return !!state.userToken;
  }
}