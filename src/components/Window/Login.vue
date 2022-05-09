<template>
  <!-- Main -->
  <div class="w-full h-full relative flex justify-center items-center">
    <div v-if="this.loading" class="absolute bottom-1/2 z-10">
      <loading-icon class="animate-spin" />
    </div>
    <div class="w-full h-max">
      <div>
        <!-- Title -->
        <div v-if="!this.welcome">
          <div class="flex justify-center items-center space-x-1">
            <img class="h-10 w-10 mt-1.5" src="/public/img/inversion-logo.png">
            <h1 class="text-5xl font-bold text-center">Inversion</h1>
          </div>
          <p class="text-center text-lg">Make a life album by posting once a day.</p>
        </div>
        <!-- LoginMessage -->
        <div v-else class="space-x-4">
          <div v-if="this.signIn">
            <h1 class="text-5xl font-bold text-center animate-fadeIn">Hello</h1>
            <p v-if="this.$store.state.userData.profile.userName" class="text-center animate-fadeIn text-2xl font-bold">
              {{
                  this.$store.state.userData.profile.userName
              }}</p>
          </div>
          <div v-else>
            <h1 class="text-5xl font-bold animate-fadeIn text-center">Welcome</h1>
            <p class="text-center animate-fadeIn text-2xl font-bold">New User</p>
          </div>
        </div>
      </div>
      <!-- SignUp&In -->
      <div class="pt-6" :class="{ 'animate-rumble': isError }">
        <!-- ErrorMessage -->
        <div v-if="this.loginError" class="flex justify-center">
          <div
            class="max-w-full h-max flex justify-center items-center px-2 py-2 border rounded-lg bg-white/30 shadow">
            <p class="text-center text-primary">{{ this.errorMessage }}</p>
          </div>
        </div>
        <!-- Input -->
        <div class="mt-2 space-y-5">
          <p v-if="this.signIn" class="w-full text-center text-3xl font-bold">Log In</p>
          <p v-else class="w-full text-center text-3xl font-bold">Create Account</p>
          <!-- Email -->
          <div class="form-control flex justify-center items-center">
            <label class="input-group w-72 h-10">
              <span class="w-12 flex justify-center items-center">
                <div>
                  <email-icon />
                </div>
              </span>
              <input type="email" placeholder="email" class="input input-bordered w-full h-full text-lg text-center"
                pattern="^[0-9a-zA-Z]+$" v-model="email">
            </label>
          </div>
          <!-- Password -->
          <div class="form-control relative flex justify-center items-center">
            <label class="input-group relative w-72 h-10">
              <span class="w-12 flex justify-center items-center">
                <div>
                  <key-icon />
                </div>
              </span>
              <input :type="[this.checkPw ? 'text' : 'password']" placeholder="password"
                class="input input-bordered w-full h-full text-lg text-center" pattern="^[0-9a-zA-Z]+$"
                v-model="password">
            </label>
            <!-- CheckPassword -->
            <div class="absolute right-[7.5rem] top-2.5">
              <div v-if="this.checkPw">
                <button class="text-black/50 hover:text-black" @click="this.checkPw = false">
                  <eye-icon />
                </button>
              </div>
              <div v-else>
                <button class="text-black/50 hover:text-black" @click="this.checkPw = true">
                  <eye-off-icon />
                </button>
              </div>
            </div>
          </div>
        </div>
        <!-- ChangeSignIn -->
        <div class="flex justify-end mt-4 mr-14 text-sm text-black/70">
          <button @click="changeSign()">
            <p v-if="this.signIn" class="hover:text-black hover:underline">Create an Account?
            </p>
            <p v-else class="hover:text-black hover:underline">Already has an
              Account?</p>
          </button>
        </div>
        <!-- Submit -->
        <div class="flex justify-center mt-4">
          <button @click="onSubmit()"
            class="btn btn-primary btn-sm w-28 h-12 rounded-none text-white normal-case text-xl">
            <p v-if="this.signIn">Sign In</p>
            <p v-else>Sign Up</p>
          </button>
        </div>
      </div>
      <!-- About -->
      <div class="flex justify-center mt-16">
        <p class="text-sm text-black/70">Inversion is created by <button
            @click="this.$store.dispatch('moveLink', 'https://portfolio-by-aurk.netlify.app/')"
            class="underline hover:text-black tooltip tooltip-right tooltip-secondary"
            data-tip="https://portfolio-by-aurk.netlify.app">Au/rK</button></p>
      </div>
    </div>
  </div>
</template>

<script>
import { userLogin, userCreate } from '../../Firebase/auth';

import loadingIcon from "../svg/loading.svg";
import emailIcon from "../svg/email-outline.svg";
import keyIcon from "../svg/key-outline.svg";
import eyeIcon from "../svg/eye-outline.svg";
import eyeOffIcon from "../svg/eye-off-outline.svg";

export default {
  name: 'Login',
  components: { loadingIcon, emailIcon, keyIcon, eyeIcon, eyeOffIcon },
  data() {
    return {
      signIn: false,
      email: "",
      password: "",
      checkPw: false,
      loginError: false,
      isError: false,
      errorMessage: "",
      loading: false,
      welcome: false,
    }
  },
  methods: {
    changeSign() {
      this.email = "";
      this.password = "";
      this.checkPw = false;
      this.isError = false;
      this.signIn = (this.signIn) ? false : true;
      this.loginError = false;
    },
    async onSubmit() {
      this.loading = true
      this.isError = false;
      if (this.signIn) {
        const lm = await userLogin(this.email, this.password);
        this.loading = false;
        switch (lm) {
          case 'login':
            this.welcome = true;
            break;
          case 'auth/user-not-found':
            this.isError = true;
            this.loginError = true;
            this.email = "",
              this.password = "",
              this.errorMessage = "Unknown Email. Check again or SignUp.";
            break;
          case 'auth/invalid-email':
            this.isError = true
            this.loginError = true;
            this.email = "",
              this.password = "",
              this.errorMessage = "Please enter your exact email.";
            break;
          case 'auth/wrong-password':
            this.isError = true
            this.loginError = true;
            this.email = "",
              this.password = "",
              this.errorMessage = "The email address exists, but the password is incorrect.";
            break;
          default:
            this.isError = true
            this.loginError = true;
            this.email = "",
              this.password = "",
              this.errorMessage = "Check again or SignUp."
        }
      } else {
        const lm = await userCreate(this.email, this.password);
        this.loading = false;
        switch (lm) {
          case 'createdAccount':
            this.welcome = true;
            break;
          case 'auth/invalid-email':
            this.isError = true
            this.loginError = true;
            this.email = "",
              this.password = "",
              this.errorMessage = "Please enter your exact email.";
            break;
          case 'auth/email-already-in-use':
            this.isError = true
            this.loginError = true;
            this.email = "",
              this.password = "",
              this.errorMessage = "Your Email account is already exists.Please SignIn.";
            break;
          case 'auth/weak-password':
            this.isError = true
            this.loginError = true;
            this.email = "",
              this.password = "",
              this.errorMessage = "Please enter a password of at least 6 single-byte alphanumeric characters.";
            break;
          case 'auth/email-already-exists':
            this.isError = true
            this.loginError = true;
            this.email = "",
              this.password = "",
              this.errorMessage = "Your Email account is already exists.Please SignIn.";
            break;
          case 'auth/invalid-password':
            this.isError = true
            this.loginError = true;
            this.email = "",
              this.password = "",
              this.errorMessage = "Please enter a password of at least 6 single-byte alphanumeric characters.";
            break;
          default:
            this.isError = true
            this.loginError = true;
            this.email = "",
              this.password = "",
              this.errorMessage = "Check again or SignIn."
        }
      }
    }
  }
}
</script>
