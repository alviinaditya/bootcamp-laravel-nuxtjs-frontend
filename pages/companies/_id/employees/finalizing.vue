<template>
  <section class="py-[70px] flex flex-col items-center justify-center px-4">
    <div class="text-[32px] font-semibold text-dark">Finalizing Profile</div>
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
        <label for="phone" class="text-grey">Phone Number</label>
        <input
          id="phone"
          type="number"
          class="input-field"
          placeholder="0888888888"
          v-model="localEmployeeData.phone"
        />
      </div>
      <div class="form-group">
        <label for="photo" class="text-grey">Upload Photo</label>
        <input
          id="photo"
          type="file"
          accept="image/png, image/jpeg, image/gif, image/svg+xml"
          class="file:mr-4 file:py-[11px] file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-200 hover:file:bg-gray-300 file:transition-all file:cursor-pointer"
          @change="handleFileChange"
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
import Avatar from '@/components/Avatar'
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
    }
  },
  mounted() {
    this.updatePhotoPreview(this.localEmployeeData.photo)
  },
  methods: {
    ...mapActions('companies/employees', ['updateEmployeeData']),
    nextStep() {
      this.updateEmployeeData(this.localEmployeeData)
      this.$router.push({
        name: 'companies-id-employees-role',
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
