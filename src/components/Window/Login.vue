<template>
  <!-- LoginComponent -->
  <div class="relative w-[50rem] h-[35rem] flex items-center bg-base-100 rounded border shadow-xl">
    <!-- InversionImage -->
    <img src="/public/img/inversion-shot.png" class="h-[35rem] w-[27rem] rounded-l brightness-105">
    <!-- Main -->
    <div class="w-[23rem] h-full relative flex justify-center items-center">
      <div v-if="this.loading" class="absolute bottom-1/2 z-10">
        <svg class="animate-spin text-secondary" style="width:50px;height:50px" viewBox="0 0 28 28">
          <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
        </svg>
      </div>
      <div class="w-full h-max">
        <div>
          <!-- Title -->
          <div v-if="!this.welcome">
            <div class="flex justify-center items-center space-x-2">
              <img class="h-9 w-9 mt-2" src="/public/img/inversion-logo.png">
              <h1 class="text-5xl font-bold text-center">Inversion</h1>
            </div>
            <p class="text-center text-lg">Make a life album by posting once a day.</p>
          </div>
          <!-- LoginMessage -->
          <div v-else class="space-x-4">
            <div v-if="this.signIn">
              <h1 class="text-5xl font-bold text-center animate-fadeIn">Hello</h1>
              <p v-if="this.$store.state.userData.profile.userName"
                class="text-center animate-fadeIn text-2xl font-bold">{{
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
          <div v-if="this.loginError" class="flex justify-center mt-2">
            <div class="w-64 h-16 flex justify-center items-center px-1 py-2 bg-base-200 border">
              <p class="text-center text-primary">{{ this.errorMessage }}</p>
            </div>
          </div>
          <!-- Input -->
          <div class="relative mt-5 space-y-4">
            <p v-if="this.signIn" class="w-full text-center text-2xl font-bold">Log In</p>
            <p v-else class="w-full text-center text-2xl font-bold">Create Account</p>
            <!-- Email -->
            <div class="form-control relative flex justify-center items-center">
              <label class="input-group w-64 h-9">
                <span class="w-10 flex justify-center items-center">
                  <div class="text-accent">
                    <svg style="width:20px;height:20px" viewBox="0 0 25 25">
                      <path fill="currentColor"
                        d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z" />
                    </svg>
                  </div>
                </span>
                <input type="email" placeholder="email" class="input input-bordered w-full h-full text-center"
                  pattern="^[0-9a-zA-Z]+$" v-model="email">
              </label>
            </div>
            <!-- Password -->
            <div class="form-control relative flex justify-center items-center">
              <label class="input-group w-64 h-9">
                <span class="w-10 flex justify-center items-center">
                  <div class="text-accent">
                    <svg style="width:20px;height:20px" viewBox="0 0 25 25">
                      <path fill="currentColor"
                        d="M21 18H15V15H13.3C12.2 17.4 9.7 19 7 19C3.1 19 0 15.9 0 12S3.1 5 7 5C9.7 5 12.2 6.6 13.3 9H24V15H21V18M17 16H19V13H22V11H11.9L11.7 10.3C11 8.3 9.1 7 7 7C4.2 7 2 9.2 2 12S4.2 17 7 17C9.1 17 11 15.7 11.7 13.7L11.9 13H17V16M7 15C5.3 15 4 13.7 4 12S5.3 9 7 9 10 10.3 10 12 8.7 15 7 15M7 11C6.4 11 6 11.4 6 12S6.4 13 7 13 8 12.6 8 12 7.6 11 7 11Z" />
                    </svg>
                  </div>
                </span>
                <input :type="[this.checkPw ? 'text' : 'password']" placeholder="password"
                  class="input input-bordered w-full h-full text-center" pattern="^[0-9a-zA-Z]+$" v-model="password">
                <!-- CheckPassword -->
              </label>
              <div v-if="this.checkPw" class="absolute right-16 top-2.5">
                <button @click="this.checkPw = false">
                  <svg class="text-black/50 hover:text-black" style="width:18px;height:18px" viewBox="0 0 26 26">
                    <path fill="currentColor"
                      d="M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.33,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z" />
                  </svg>
                </button>
              </div>
              <div v-else class="absolute right-16 top-2.5">
                <button @click="this.checkPw = true">
                  <svg class="text-black/50 hover:text-black" style="width:18px;height:18px" viewBox="0 0 26 26">
                    <path fill="currentColor"
                      d="M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9M12,4.5C17,4.5 21.27,7.61 23,12C21.27,16.39 17,19.5 12,19.5C7,19.5 2.73,16.39 1,12C2.73,7.61 7,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C15.76,17.5 19.17,15.36 20.82,12C19.17,8.64 15.76,6.5 12,6.5C8.24,6.5 4.83,8.64 3.18,12Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <!-- ChangeSignIn -->
          <div class="flex justify-end mt-4 mr-14">
            <button @click="changeSign()">
              <p v-if="this.signIn" class="text-sm text-black/60 hover:text-black hover:underline">Create an Account?
              </p>
              <p v-else class="text-sm text-black/60 hover:text-black hover:underline">Already has an
                Account?</p>
            </button>
          </div>
          <!-- Submit -->
          <div class="flex justify-center mt-4">
            <button @click="onSubmit()"
              class="btn btn-primary btn-sm w-24 h-10 rounded-none text-white normal-case text-lg">
              <p v-if="this.signIn">Sign In</p>
              <p v-else>Sign Up</p>
            </button>
          </div>
        </div>
        <!-- About -->
        <div class="flex justify-center mt-28">
          <p class="text-sm text-black/60">Inversion is created by <button
              @click="this.$store.dispatch('moveLink', 'https://portfolio-by-aurk.netlify.app/')"
              class="underline hover:text-black/90">Au/rK</button></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userLogin, userCreate } from '../../Firebase/auth'

export default {
  name: 'Login',
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
