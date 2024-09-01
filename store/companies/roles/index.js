export const state = () => ({
  roles: [],
  loadingRoles: false,
  errorRoles: null,
})

export const mutations = {
  SET_ROLES(state, roles) {
    state.roles = roles
  },
  SET_LOADING(state, loading) {
    state.loadingRoles = loading
  },
  SET_ERROR(state, error) {
    state.errorRoles = error
  },
}

export const actions = {
  async fetchRoles({ commit }, company_id) {
    commit('SET_LOADING', true)
    try {
      const { result } = await this.$axios.$get('/role', {
        params: {
          company_id: company_id,
        },
      })
      commit('SET_ROLES', result.data)
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      commit('SET_LOADING', false)
    }
  },
}
