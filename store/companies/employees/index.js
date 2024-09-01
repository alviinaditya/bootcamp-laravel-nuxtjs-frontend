export const state = () => ({
  employees: [],
  totalEmployees: 0,
  activeEmployees: 0,
  inactiveEmployees: 0,
  employeeRole: '',
  employeeData: {
    name: '',
    email: '',
    gender: '',
    age: null,
    photo: null,
    phone: '',
    role_id: '',
    team_id: '',
  },
  loadingEmployees: false,
  errorEmployees: null,
})

export const mutations = {
  UPDATE_EMPLOYEE_DATA(state, payload) {
    state.employeeData = { ...state.employeeData, ...payload }
  },
  RESET_EMPLOYEE_DATA(state) {
    state.employeeData = {
      name: '',
      email: '',
      gender: '',
      age: null,
      photo: null,
      phone: '',
      role_id: '',
      team_id: '',
    }
  },
  SET_EMPLOYEE_ROLE(state, role) {
    state.employeeRole = role
  },
  RESET_EMPLOYEE_ROLE(state) {
    state.employeeRole = ''
  },
  SET_EMPLOYEES(state, employees) {
    state.employees = employees
    state.totalEmployees = employees.length
    state.activeEmployees = employees.filter(
      (employee) => employee.is_verified
    ).length
    state.inactiveEmployees = state.totalEmployees - state.activeEmployees
  },
  VERIFY_EMPLOYEE(state, id) {
    const employee = state.employees.find((emp) => emp.id === id)
    if (employee) {
      employee.is_verified = true
      state.activeEmployees = state.employees.filter(
        (emp) => emp.is_verified
      ).length
      state.inactiveEmployees = state.totalEmployees - state.activeEmployees
    }
  },
  SET_LOADING(state, loading) {
    state.loadingEmployees = loading
  },
  SET_ERROR(state, error) {
    state.errorEmployees = error
  },
}

export const actions = {
  updateEmployeeData({ commit }, payload) {
    commit('UPDATE_EMPLOYEE_DATA', payload)
  },
  resetEmployeeData({ commit }) {
    commit('RESET_EMPLOYEE_DATA')
  },
  setEmployeeRole({ commit }, role) {
    commit('SET_EMPLOYEE_ROLE', role)
  },
  resetEmployeeRole({ commit }) {
    commit('RESET_EMPLOYEE_ROLE')
  },
  async createEmployee({ commit }, payload) {
    try {
      const formData = new FormData()

      Object.entries(payload).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value)
        }
      })
      const { meta } = await this.$axios.$post('/employee', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      commit('RESET_EMPLOYEE_DATA')
      console.log(meta)
      return meta
    } catch (error) {
      console.log(error)
    }
  },
  async fetchEmployees({ commit }, company_id) {
    commit('SET_LOADING', true)
    try {
      const { result } = await this.$axios.$get('/employee', {
        params: {
          company_id: company_id,
        },
      })
      commit('SET_EMPLOYEES', result.data)
    } catch (error) {
      commit('SET_ERROR', error)
    } finally {
      commit('SET_LOADING', false)
    }
  },
  async verifyEmployee({ commit }, id) {
    try {
      const response = await this.$axios.$post(`/employee/verify/${id}`)
      if (response.meta.code === 200) {
        commit('VERIFY_EMPLOYEE', id)
      }
    } catch (error) {
      console.error(error)
    }
  },
}
