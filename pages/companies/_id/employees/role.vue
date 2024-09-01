<template>
  <section class="py-[70px] flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">Give a Role</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Complete the information to make it more <br />
      easier when introduce to team
    </p>
    <form class="w-full card" @submit.prevent="nextStep">
      <div class="flex flex-col items-center mb-[14px]">
        <Avatar :name="localEmployeeData.name" :image="photoPreview" />
        <div class="mt-6 mb-1 text-lg font-semibold">
          {{ localEmployeeData.name }}
        </div>
        <p class="text-base text-grey">{{ localEmployeeData.email }}</p>
      </div>
      <div class="form-group">
        <label for="role" class="text-grey">Select Role</label>
        <select
          id="role"
          class="appearance-none input-field form-icon-chevron_down"
          v-model="localEmployeeData.role_id"
          @change="getResponsibilities"
        >
          <template v-if="loadingRoles">
            <option value="">Loading...</option>
          </template>
          <template v-else>
            <option disabled value="" hidden>Select Role</option>
            <option v-for="role in roles" :key="role.id" :value="role.id">
              {{ role.name }}
            </option>
          </template>
        </select>
      </div>

      <!-- Responsibilities -->
      <section>
        <Loader v-if="loadingResponsibilities" />
        <div v-else class="flex flex-col gap-4 mt-[10px]">
          <label for="" class="text-grey"> Responsibilities </label>
          <div
            v-for="res in responsibilities"
            :key="res.id"
            class="flex items-start md:items-center gap-[6px]"
          >
            <img src="/assets/svgs/ic-check-circle.svg" alt="" />
            <span class="text-sm text-dark">
              {{ res.name }}
            </span>
          </div>
        </div>
      </section>
      <button type="submit" class="w-full btn btn-primary mt-[14px]">
        Continue
      </button>
    </form>
  </section>
</template>

<script>
import Loader from '@/components/Loader'
import Avatar from '@/components/Avatar'
import { mapActions, mapState } from 'vuex'
export default {
  layout: 'form',
  components: { Loader, Avatar },
  data() {
    return {
      photoPreview: null,
      localEmployeeData: {
        ...this.$store.state.companies.employees.employeeData,
      },
      localEmloyeeRole: this.$store.state.companies.employees.employeeRole,
    }
  },
  computed: {
    ...mapState('companies/roles', ['roles', 'loadingRoles', 'errorRoles']),
    ...mapState('companies/roles/responsibilities', [
      'responsibilities',
      'loadingResponsibilities',
      'errorResponsibilities',
    ]),
  },
  mounted() {
    this.fetchRoles(this.$route.params.id)
    this.updatePhotoPreview(this.localEmployeeData.photo)
  },
  methods: {
    ...mapActions('companies/roles', ['fetchRoles']),
    ...mapActions('companies/roles/responsibilities', [
      'fetchResponsibilities',
    ]),
    ...mapActions('companies/employees', [
      'updateEmployeeData',
      'setEmployeeRole',
    ]),
    nextStep() {
      this.updateEmployeeData(this.localEmployeeData)
      this.setEmployeeRole(this.localEmloyeeRole)
      this.$router.push({
        name: 'companies-id-employees-team',
      })
    },
    getResponsibilities(event) {
      this.fetchResponsibilities(event.target.value)
      const selectedRole = this.roles.find(
        (role) => role.id == event.target.value
      )
      this.localEmloyeeRole = selectedRole.name
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
