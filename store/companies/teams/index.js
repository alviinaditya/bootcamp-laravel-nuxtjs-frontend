export const state = () => ({
  teams: [],
  totalTeams: 0,
  loadingTeams: false,
  errorTeams: null,
})

export const mutations = {
  SET_TEAMS(state, teams) {
    state.teams = teams
    state.totalTeams = teams.length
  },
  SET_LOADING(state, loading) {
    state.loadingTeams = loading
  },
  SET_ERROR(state, error) {
    state.errorTeams = error
  },
}

export const actions = {
  async fetchTeams({ commit }, company_id) {
    commit('SET_LOADING', true)
    try {
      const { result } = await this.$axios.$get('/team', {
        params: {
          company_id: company_id,
        },
      })
      commit('SET_TEAMS', result.data)
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      commit('SET_LOADING', false)
    }
  },
}
