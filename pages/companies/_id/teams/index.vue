<template>
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
        <div class="text-[32px] font-semibold text-dark">My Teams</div>
      </div>
      <div class="flex items-center gap-4">
        <form class="shrink md:w-[516px] w-full">
          <input
            type="text"
            name="search"
            id="search"
            class="input-field !outline-none !border-none italic form-icon-search ring-indigo-200 focus:ring-2 transition-all duration-300 w-full"
            placeholder="Search team name"
            v-model="searchQuery"
            @input="filterTeams"
          />
        </form>
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
            <div class="text-xl font-medium text-dark">Available</div>
            <p class="text-grey">Empower company</p>
          </div>
          <NuxtLink
            :to="{ name: 'companies-id-teams-create' }"
            class="btn btn-primary"
            >Build New Team</NuxtLink
          >
        </div>
      </div>

      <!-- Team Skeleton -->
      <div
        v-if="loadingTeams"
        class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 lg:gap-3"
      >
        <div
          v-for="i in 4"
          :key="i"
          class="items-center card py-6 md:!py-10 md:!px-[38px] !gap-y-0"
        >
          <Skeleton type="circle" class="w-16 h-16" />
          <Skeleton class="h-4 mt-6 mb-2 w-28" />
          <Skeleton class="w-20 h-4 mb-4" />
          <Skeleton type="circle" class="w-20 h-6" />
        </div>
      </div>
      <!-- Team Cards -->
      <div
        v-else
        class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 lg:gap-3"
      >
        <div
          v-for="team in filteredTeams"
          :key="team.id"
          class="items-center card py-6 md:!py-10 md:!px-[38px] !gap-y-0"
        >
          <a
            href="#"
            class="absolute inset-0 focus:ring-2 ring-primary rounded-[26px]"
          ></a>
          <Avatar :icon="team.icon" :name="team.name" />
          <div class="mt-6 mb-1 font-semibold text-center text-dark">
            {{ team.name }}
          </div>
          <p class="mb-2 text-center text-grey">
            {{ team.employees_count }} People
          </p>
          <div
            class="px-4 py-1 text-xs text-center rounded-full"
            :class="
              team.status
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600'
            "
          >
            {{ team.status ? 'Active' : 'Inactive' }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Avatar from '~/components/Avatar.vue'
import { mapActions, mapState } from 'vuex'
export default {
  layout: 'dashboard',
  data() {
    return {
      searchQuery: '',
      filteredTeams: [],
    }
  },
  mounted() {
    this.fetchTeams(this.$route.params.id)
    this.filterTeams()
  },
  computed: {
    ...mapState('companies/teams', ['teams', 'loadingTeams', 'errorTeams']),
  },
  methods: {
    ...mapActions('companies/teams', ['fetchTeams']),
    filterTeams() {
      const query = this.searchQuery.toLowerCase()
      if (!query) {
        this.filteredTeams = this.teams
      }
      this.filteredTeams = this.teams.filter((team) => {
        return team.name.toLowerCase().includes(query)
      })
    },
  },
  components: {
    Avatar,
  },
}
</script>
