<template>
  <div class="avatar">
    <img
      :src="avatarUrl"
      alt="Avatar"
      class="object-cover w-16 h-16 bg-blue-100 rounded-full"
    />
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: null,
    },
  },

  computed: {
    avatarUrl() {
      if (this.image) {
        return this.image
      } else if (this.icon) {
        const cleanedPath = this.icon.replace('public/', '')
        return `${process.env.STORAGE_URL}/${cleanedPath}`
      } else if (this.name == '') {
        return '/assets/svgs/ric-box.svg'
      } else {
        return `${process.env.IMAGE_URL}${encodeURIComponent(this.name)}`
      }
    },
  },
}
</script>
