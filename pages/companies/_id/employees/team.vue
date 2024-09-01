<template>
  <section class="py-[70px] flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">Add to Team</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Add your new people to grow the <br />
      company reaching their goals
    </p>
    <div
      class="w-full card !max-w-[560px] sm:!flex-row items-center justify-between"
    >
      <div class="flex flex-row items-center gap-4">
        <Avatar :name="localEmployeeData.name" :image="photoPreview" />
        <div>
          <div class="text-lg font-semibold">{{ localEmployeeData.name }}</div>
          <p class="text-base text-grey">{{ localEmployeeData.email }}</p>
        </div>
      </div>
      <p class="text-right text-grey">{{ localEmloyeeRole }}</p>
    </div>

    <!-- Your Teams -->
    <section class="pt-[50px]">
      <!-- Section Header -->
      <div class="mb-[30px]">
        <div class="flex items-center justify-between gap-6">
          <div>
            <div class="text-xl font-medium text-dark">Select Teams</div>
            <p class="text-grey">Improve your growth</p>
          </div>
        </div>
      </div>

      <form @submit.prevent="nextStep">
        <div
          class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:gap-10 lg:gap-3 mb-[50px]"
        >
          <div
            v-for="team in teams"
            :key="team.id"
            class="items-center card py-6 md:!py-10 md:!px-[38px] !gap-y-0"
          >
            <input
              type="radio"
              :name="team.name"
              :id="team.name"
              class="absolute inset-0 checked:ring-2 ring-primary rounded-[26px] appearance-none"
              :value="team.id"
              v-model="localEmployeeData.team_id"
              @click="updateEmployeeData({ team_id: team.id })"
            />
            <Avatar :icon="team.icon" :name="team.name" />
            <div class="mt-6 mb-1 font-semibold text-center text-dark">
              {{ team.name }}
            </div>
            <p class="text-center text-grey">
              {{ team.employees_count }} People
            </p>
          </div>
        </div>
        <div class="flex justify-center">
          <button type="submit" id="continueBtn" class="btn btn-primary">
            Complete
          </button>
        </div>
      </form>
    </section>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Avatar from '~/components/Avatar.vue'
export default {
  layout: 'form',
  components: {
    Avatar,
  },
  data() {
    return {
      photoPreview: null,
      localEmployeeData: {
        ...this.$store.state.companies.employees.employeeData,
      },
      localEmloyeeRole: this.$store.state.companies.employees.employeeRole,
    }
  },
  mounted() {
    this.fetchTeams(this.$route.params.id)
    this.updatePhotoPreview(this.localEmployeeData.photo)
  },
  computed: {
    ...mapState('companies/teams', ['teams', 'loadingTeams', 'errorTeams']),
  },
  methods: {
    ...mapActions('companies/teams', ['fetchTeams']),
    ...mapActions('companies/employees', [
      'updateEmployeeData',
      'createEmployee',
    ]),
    nextStep() {
      this.createEmployee(this.localEmployeeData).then((response) => {
        if (response.code === 200) {
          this.$router.push({
            name: 'companies-id-employees',
          })
        }
      })
    },
    updatePhotoPreview(photo) {
      if (photo instanceof File) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.photoPreview = e.target.result
        }
        reader.readAsDataURL(photo)
      } else {
        this.photoPreview = null
      }
    },
    handleFileChange(event) {
      const file = event.target.files[0]
      this.localEmployeeData.photo = file || null
      this.updatePhotoPreview(file)
    },
  },
}
</script>
