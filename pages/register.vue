<template>
  <section class="py-[50px] flex flex-col items-center justify-center px-4">
    <img src="/assets/svgs/logo-type.svg" alt="" />
    <div class="text-[32px] font-semibold text-dark mt-[70px]">Sign Up</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Manage your employees to achieve <br />
      a bigger goals for your company
    </p>
    <form class="w-full card" @submit.prevent="registerUser">
      <div class="form-group">
        <label for="name" class="text-grey">Full Name</label>
        <input
          id="name"
          type="text"
          class="input-field"
          v-model="register.name"
        />
      </div>
      <div class="form-group">
        <label for="email" class="text-grey">Email Address</label>
        <input
          id="email"
          type="email"
          class="input-field"
          v-model="register.email"
        />
      </div>
      <div class="form-group">
        <label for="password" class="text-grey">Password</label>
        <input
          id="password"
          type="password"
          class="input-field"
          v-model="register.password"
        />
      </div>
      <button type="submit" class="w-full btn btn-primary mt-[14px]">
        Continue
      </button>
    </form>
  </section>
</template>

<script>
export default {
  auth: 'guest',
  data() {
    return {
      register: {
        name: '',
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async registerUser() {
      const { name, email, password } = this.register
      try {
        await this.$axios.$post('/register', { name, email, password })

        try {
          await this.$auth.loginWith('local', {
            data: {
              email,
              password,
            },
          })
        } catch (error) {
          console.log(error)
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
