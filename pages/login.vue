<template>
  <section class="py-[50px] flex flex-col items-center justify-center px-4">
    <img src="/assets/svgs/logo-type.svg" alt="" />
    <div class="text-[32px] font-semibold text-dark mt-[70px]">Sign In</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-grey">
      Manage your employees to achieve <br />
      a bigger goals for your company
    </p>
    <form @submit.prevent="loginUser" class="w-full card">
      <div class="form-group">
        <label for="email" class="text-grey">Email Address</label>
        <input
          id="email"
          type="email"
          placeholder="email@example.com"
          class="input-field"
          v-model="login.email"
        />
      </div>
      <div class="form-group">
        <label for="password" class="text-grey">Password</label>
        <input
          id="password"
          type="password"
          placeholder="🞄🞄🞄🞄🞄🞄🞄🞄"
          class="input-field"
          v-model="login.password"
        />
      </div>
      <button type="submit" class="w-full btn btn-primary mt-[14px]">
        Sign In
      </button>
    </form>
  </section>
</template>
<script>
export default {
  auth: 'guest',
  data() {
    return {
      login: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async loginUser() {
      try {
        await this.$auth.loginWith('local', {
          data: this.login,
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
