<template>
  <!-- Main Content -->
  <div class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0">
    <!-- Top Section -->
    <section
      class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row"
    >
      <div class="flex items-center justify-between gap-4">
        <a href="#" id="toggleOpenSidebar" class="lg:hidden">
          <svg
            class="w-6 h-6 text-dark"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            ></path>
          </svg>
        </a>
        <div class="text-[32px] font-semibold text-dark">Employees</div>
      </div>
      <div class="flex items-center gap-4">
        <div class="shrink md:w-[516px] w-full">
          <input
            type="text"
            name="search"
            id="search"
            class="input-field !outline-none !border-none italic form-icon-search ring-indigo-200 focus:ring-2 transition-all duration-300 w-full"
            placeholder="Search people, team, role"
            v-model="searchQuery"
            @input="filterEmployees"
          />
        </div>
        <a
          href="#"
          class="flex-none w-[46px] h-[46px] bg-white rounded-full p-[11px] relative notification-dot"
        >
          <img src="/assets/svgs/ic-bell.svg" alt="" />
        </a>
      </div>
    </section>

    <section class="pt-[50px]">
      <!-- Section Header -->
      <div class="mb-[30px]">
        <div
          class="flex flex-col justify-between gap-6 sm:items-center sm:flex-row"
        >
          <div>
            <div class="text-xl font-medium text-dark">Statistics</div>
            <p class="text-grey">Your team powers</p>
          </div>
          <NuxtLink
            :to="{ name: 'companies-id-employees-create' }"
            class="btn btn-primary"
            >Add Employee</NuxtLink
          >
        </div>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-11">
        <div class="card !gap-y-10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-grey">In Total</p>
              <div class="text-[32px] font-bold text-dark mt-[6px]">
                {{ loadingEmployees ? '...' : totalEmployees }}
              </div>
            </div>
          </div>
        </div>
        <div class="card !gap-y-10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-grey">Active</p>
              <div class="text-[32px] font-bold text-dark mt-[6px]">
                {{ loadingEmployees ? '...' : activeEmployees }}
              </div>
            </div>
          </div>
        </div>
        <div class="card !gap-y-10">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-grey">Inactive</p>
              <div class="text-[32px] font-bold text-dark mt-[6px]">
                {{ loadingEmployees ? '...' : inactiveEmployees }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="pt-[50px]">
      <!-- Section Header -->
      <div class="mb-[30px]">
        <div class="flex items-center justify-between gap-6">
          <div>
            <div class="text-xl font-medium text-dark">People</div>
            <p class="text-grey">The rangers</p>
          </div>
        </div>
      </div>

      <div
        v-if="loadingEmployees"
        class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 lg:gap-3"
      >
        <div
          v-for="i in 4"
          :key="i"
          class="items-center card py-6 md:!py-10 md:!px-[30px] !gap-y-0"
        >
          <Skeleton type="circle" class="w-16 h-16" />
          <Skeleton class="w-20 h-4 mt-6 mb-2" />
          <Skeleton class="h-4 mb-2 w-28" />
          <Skeleton class="w-20 h-4" />
          <Skeleton type="circle" class="mt-[30px] w-20 h-6" />
        </div>
      </div>
      <div
        v-else
        class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 lg:gap-3"
      >
        <!-- Card -->
        <div
          v-for="employee in filteredEmployees"
          :key="employee.id"
          class="items-center card py-6 md:!py-10 md:!px-[30px] !gap-y-0"
        >
          <a
            href="#"
            class="absolute inset-0 focus:ring-2 ring-primary rounded-[26px]"
          ></a>
          <Avatar :icon="employee.photo" :name="employee.name" />
          <div class="mt-6 mb-1 text-xs uppercase text-primary">
            {{ employee.team.name }}
          </div>
          <div class="mb-1 font-semibold text-center text-dark">
            {{ employee.name }}
          </div>
          <p class="text-sm text-center text-grey">{{ employee.role.name }}</p>
          <div
            v-if="employee.is_verified"
            class="mt-[30px] text-success flex items-center gap-[6px]"
          >
            <img src="/assets//svgs/ic-check-circle.svg" alt="" />
            Verified
          </div>
          <button
            v-else
            @click="verifyEmployee(employee.id)"
            class="btn bg-gray-200 font-normal py-2 px-4 text-sm mt-[22px] relative z-20 hover:bg-gray-300"
          >
            Verify Now
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Avatar from '~/components/Avatar.vue'
import { mapState, mapActions } from 'vuex'
export default {
  layout: 'dashboard',
  components: {
    Avatar,
  },
  data() {
    return {
      searchQuery: '',
      filteredEmployees: [],
    }
  },
  mounted() {
    this.fetchEmployees(this.$route.params.id).then(() => {
      this.filterEmployees()
    })
  },
  computed: {
    ...mapState('companies/employees', [
      'employees',
      'totalEmployees',
      'activeEmployees',
      'inactiveEmployees',
      'loadingEmployees',
      'errorEmployees',
    ]),
  },
  methods: {
    ...mapActions('companies/employees', ['fetchEmployees', 'verifyEmployee']),
    filterEmployees() {
      const query = this.searchQuery.toLowerCase()
      if (!query) {
        this.filteredEmployees = this.employees
      }
      this.filteredEmployees = this.employees.filter((employee) => {
        return (
          employee.name.toLowerCase().includes(query) ||
          employee.team.name.toLowerCase().includes(query) ||
          employee.role.name.toLowerCase().includes(query)
        )
      })
    },
  },
}
</script>
