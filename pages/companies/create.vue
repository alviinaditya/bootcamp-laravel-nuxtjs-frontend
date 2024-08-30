<template>
  <section class="py-[70px] flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">Create Company</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Empower your organization with the tools to drive success. <br />
      Achieve new milestones and growth.
    </p>
    <form class="w-full card" @submit.prevent="createCompany">
      <div class="form-group">
        <label for="company" class="text-grey">Company Name</label>
        <input
          id="company"
          type="text"
          class="input-field"
          placeholder="Input company name"
          v-model="company.name"
        />
        <span v-if="errors.name" class="text-sm text-red-500">
          {{ errors.name[0] }}
        </span>
      </div>
      <div class="form-group">
        <label for="logo" class="text-grey">Upload Logo</label>
        <input
          id="logo"
          type="file"
          accept="image/png, image/jpeg, image/gif, image/svg+xml"
          class="input-field file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          @change="handleFileChange"
        />
        <span v-if="errors.logo" class="text-sm text-red-500">
          {{ errors.logo[0] }}
        </span>
        <div v-if="logoPreview" class="mt-4">
          <img
            :src="logoPreview"
            alt="Image Preview"
            class="object-cover w-32 h-32"
          />
        </div>
      </div>
      <button type="submit" class="w-full btn btn-primary mt-[14px]">
        Create
      </button>
      <NuxtLink
        :to="{ name: 'companies' }"
        class="text-sm text-center text-blue-500 hover:text-blue-700"
        >Select Any Company</NuxtLink
      >
    </form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      logoPreview: null,
      company: {
        name: '',
        logo: null,
      },
      errors: {},
    }
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        // Store the file in state
        this.company.logo = file

        // Create a preview of the uploaded image
        const reader = new FileReader()
        reader.onload = (e) => {
          this.logoPreview = e.target.result
        }
        reader.readAsDataURL(file)
      } else {
        this.company.logo = null
        this.logoPreview = null
      }
    },
    async createCompany() {
      this.errors = {} // Reset errors before validating
      try {
        const formData = new FormData()
        formData.append('name', this.company.name)
        if (this.company.logo) {
          formData.append('logo', this.company.logo)
        }
        await this.$axios
          .$post('/company', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            this.$router.push({
              name: 'companies-id',
              params: { id: response.result.id },
            })
          })

        // Clear errors if successful
        this.errors = {}
      } catch (error) {
        if (error.response.data.errors && error.response) {
          this.errors = error.response.data.errors || {}
        } else {
          console.log(error)
        }
      }
    },
  },
}
</script>
