<template>
  <section class="py-[200px] flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark mb-4">Select Companies</div>
    <div class="w-full card">
      <div class="form-group">
        <label for="companies" class="text-grey">Companies</label>
        <select
          name="companies"
          id="companies"
          class="appearance-none input-field form-icon-chevron_down"
          v-model="selectedCompany"
        >
          <option disabled value="" hidden>Select Company</option>
          <option
            v-for="company in companies"
            :value="company.id"
            :key="company.id"
          >
            {{ company.name }}
          </option>
        </select>
      </div>
      <button
        @click="openCompany"
        class="w-full btn btn-primary mt-[14px] disabled:bg-gray-300 disabled:cursor-not-allowed"
        :disabled="!selectedCompany"
      >
        Continue
      </button>
      <NuxtLink
        :to="{ name: 'companies-create' }"
        class="text-sm text-center text-blue-500 hover:text-blue-700"
        >Create New Company</NuxtLink
      >
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      companies: [],
      selectedCompany: '',
    }
  },
  async fetch() {
    try {
      const response = await this.$axios.$get('/company')
      this.companies = response.result.data
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    openCompany() {
      this.$router.push({
        name: 'companies-id',
        params: { id: this.selectedCompany },
      })
    },
  },
}
</script>
