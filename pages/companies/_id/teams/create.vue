<template>
  <section class="py-[70px] flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">Build New Team</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Team that can bring your company <br />
      growing bigger and bigger
    </p>
    <form class="w-full card" @submit.prevent="createTeam">
      <div class="mb-[2px] mx-auto">
        <Avatar :name="teams.name" :image="iconPreview" />
      </div>
      <div class="form-group">
        <label for="email" class="text-grey">Email Address</label>
        <input
          id="email"
          type="email"
          class="input-field disabled:bg-grey disabled:outline-none"
          :value="this.$auth.user.email"
          disabled
        />
      </div>
      <div class="form-group">
        <label for="name" class="text-grey">Team Name</label>
        <input
          id="name"
          type="text"
          class="input-field"
          v-model="teams.name"
          placeholder="Enter Team Name"
        />
      </div>
      <div class="form-group">
        <label for="status" class="text-grey">Status</label>
        <select
          id="status"
          class="appearance-none input-field form-icon-chevron_down"
          v-model="teams.status"
        >
          <option value="" disabled hidden>Select Status</option>
          <option value="1">Active</option>
          <option value="0">Inactive</option>
        </select>
      </div>
      <div class="form-group">
        <label for="icon" class="text-grey">Upload Icon</label>
        <input
          id="icon"
          type="file"
          accept="image/png, image/jpeg, image/gif, image/svg+xml"
          class="file:mr-4 file:py-[11px] file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-200 hover:file:bg-gray-300 file:transition-all file:cursor-pointer"
          @change="handleFileChange"
        />
        <span v-if="errors.icon" class="text-sm text-red-500">
          {{ errors.icon[0] }}
        </span>
      </div>
      <button type="submit" class="w-full btn btn-primary mt-[14px]">
        Create
      </button>
    </form>
  </section>
</template>

<script>
import Avatar from '@/components/Avatar'
export default {
  layout: 'form',
  components: {
    Avatar,
  },
  data() {
    return {
      iconPreview: null,
      teams: {
        name: '',
        status: '',
        icon: null,
        company_id: this.$route.params.id,
      },
      errors: {},
    }
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0]
      if (file) {
        // Store the file in state
        this.teams.icon = file

        // Create a preview of the uploaded image
        const reader = new FileReader()
        reader.onload = (e) => {
          this.iconPreview = e.target.result
        }
        reader.readAsDataURL(file)
      } else {
        this.teams.icon = null
        this.iconPreview = null
      }
    },
    async createTeam() {
      this.errors = {} // Reset errors before validating
      try {
        const formData = new FormData()
        formData.append('name', this.teams.name)
        formData.append('status', this.teams.status)
        formData.append('company_id', this.teams.company_id)
        if (this.teams.icon) {
          formData.append('icon', this.teams.icon)
        }
        await this.$axios
          .$post('/team', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            if (response.meta.code === 200) {
              this.$router.push({
                name: 'companies-id-teams',
                params: { id: this.$route.params.id },
              })
            }
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
