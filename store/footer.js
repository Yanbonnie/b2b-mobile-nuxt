export const state = () => {
    active: 0
}

export const mutations = {
    changeNav(state, index) {
        state.active = index;
        console.log('state.active'+state.active)
    }
}

export const getters = {
    active(state) {
      return state.active
    }
  }