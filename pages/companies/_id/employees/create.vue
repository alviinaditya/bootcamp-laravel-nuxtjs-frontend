<template>
  <section class="py-[70px] flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">Empower Your Team</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Add your new people to grow the <br />
      company reaching their goals
    </p>
    <form class="w-full card" @submit.prevent="nextStep">
      <div class="form-group">
        <label for="name" class="text-grey">Complete Name</label>
        <input
          id="name"
          type="text"
          class="input-field"
          placeholder="Full Name"
          v-model="localEmployeeData.name"
        />
      </div>
      <div class="form-group">
        <label for="email" class="text-grey">Email Address</label>
        <input
          id="email"
          type="email"
          class="input-field"
          placeholder="email@example.com"
          v-model="localEmployeeData.email"
        />
      </div>
      <div class="form-group">
        <label for="gender" class="text-grey">Gender</label>
        <select
          id="gender"
          class="appearance-none input-field form-icon-chevron_down"
          v-model="localEmployeeData.gender"
        >
          <option value="" hidden disabled>Select Gender</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
      </div>
      <div class="form-group">
        <label for="age" class="text-grey">Age</label>
        <input
          id="age"
          type="number"
          class="input-field"
          placeholder="Enter age"
          v-model="localEmployeeData.age"
        />
      </div>
      <button type="submit" class="w-full btn btn-primary mt-[14px]">
        Continue
      </button>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  layout: 'form',
  data() {
    return {
      localEmployeeData: {
        ...this.$store.state.companies.employees.employeeData,
      },
    }
  },
  methods: {
    ...mapActions('companies/employees', ['updateEmployeeData']),
    nextStep() {
      this.updateEmployeeData(this.localEmployeeData)
      this.$router.push({
        name: 'companies-id-employees-finalizing',
      })
      console.log(this.employeeData)
    },
  },
}
</script>
