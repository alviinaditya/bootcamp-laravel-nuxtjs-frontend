export const state = () => ({
  responsibilities: [],
  loadingResponsibilities: false,
  errorResponsibilities: null,
})

export const mutations = {
  SET_ROLES(state, responsibilities) {
    state.responsibilities = responsibilities
  },
  SET_LOADING(state, loading) {
    state.loadingResponsibilities = loading
  },
  SET_ERROR(state, error) {
    state.errorResponsibilities = error
  },
}

export const actions = {
  async fetchResponsibilities({ commit }, role_id) {
    commit('SET_LOADING', true)
    try {
      const { result } = await this.$axios.$get('/responsibility', {
        params: {
          role_id: role_id,
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
