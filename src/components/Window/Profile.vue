<template>
  <!-- Profile -->
  <div class="relative w-[30rem] h-[40rem] bg-base-100 rounded shadow-xl border">
    <!-- Close -->
    <div class="flex justify-end">
      <div class="mt-1.5 mr-1.5 tooltip tooltip-bottom tooltip-secondary" data-tip="Close">
        <button @click="this.$store.commit('changeWindow', 'profile')"
          class="btn btn-ghost btn-sm btn-circle flex justify-center items-center">
          <svg class="text-accent" style="width:25px;height:25px" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
          </svg>
        </button>
      </div>
    </div>
    <!-- ProfileImage -->
    <div class="flex justify-center">
      <input type="file" class="hidden" ref="input" accept="image/jpeg, image/jpg, image/png" @change="uploadFile" />
      <button @click="changeImage()"
        class="flex relative justify-center items-center group h-[14.5rem] w-[14.5rem] rounded-full border hover:border-black/80 transition duration-300 tooltip tooltip-right tooltip-secondary"
        data-tip="Change Icon">
        <!-- CurrentImage -->
        <img v-if="this.$store.state.userData.userProfileImage" :src="this.$store.state.userData.userProfileImage"
          :class="{ 'brightness-75': this.uploadingProfileImage }"
          class="h-[14em] w-[14rem] rounded-full shadow-xl group-hover:brightness-75 transition duration-300" />
        <img v-else src="/public/img/user-icon.png" :class="{ 'brightness-75': this.uploadingProfileImage }"
          class="h-[14em] w-[14rem] rounded-full shadow-xl group-hover:brightness-75 transition duration-300" />
        <div class="absolute">
          <div v-if="this.uploadingProfileImage">
            <svg class="text-white animate-spin" style="width:50px;height:50px" viewBox="0 0 28 28">
              <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
            </svg>
          </div>
          <div v-else class="invisible group-hover:animate-show">
            <div>
              <svg class="text-white" style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="M22.7 14.3L21.7 15.3L19.7 13.3L20.7 12.3C20.8 12.2 20.9 12.1 21.1 12.1C21.2 12.1 21.4 12.2 21.5 12.3L22.8 13.6C22.9 13.8 22.9 14.1 22.7 14.3M13 19.9V22H15.1L21.2 15.9L19.2 13.9L13 19.9M11.21 15.83L9.25 13.47L6.5 17H13.12L15.66 14.55L13.96 12.29L11.21 15.83M11 19.9V19.05L11.05 19H5V5H19V11.31L21 9.38V5C21 3.9 20.11 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H11V19.9Z" />
              </svg>
            </div>
          </div>
        </div>
      </button>
    </div>
    <!-- UserProfile -->
    <div>
      <div class="flex justify-center pt-4">
        <p class="text-4xl font-bold">{{ this.$store.state.userData.profile.userName }}</p>
      </div>
      <div class="flex justify-center">
        <p class="text-black/60">{{ this.$store.state.userData.email }}</p>
      </div>
      <div class="flex justify-center items-center space-x-3">
        <div class="flex justify-center items-center tooltip tooltip-bottom tooltip-secondary" data-tip="Age">
          <svg class=" text-accent" style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
          </svg>
          <p class="text-xl text-black/90">{{ this.$store.state.userData.profile.age }}</p>
        </div>
        <div class="flex justify-center items-center tooltip tooltip-bottom tooltip-secondary" data-tip="Location">
          <svg class=" text-accent" style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5M12,2A7,7 0 0,1 19,9C19,14.25 12,22 12,22C12,22 5,14.25 5,9A7,7 0 0,1 12,2M12,4A5,5 0 0,0 7,9C7,10 7,12 12,18.71C17,12 17,10 17,9A5,5 0 0,0 12,4Z" />
          </svg>
          <p class="text-xl">{{ this.$store.state.userData.profile.location }}</p>
        </div>
      </div>
    </div>
    <!-- EditSwitch -->
    <div class="flex justify-center mt-1">
      <div class="w-[23rem] h-[15rem] px-2 py-1">
        <div class="flex justify-start space-x-2 text-sm text-accent/60">
          <div class="tooltip tooltip-top tooltip-secondary" data-tip="Edit Profile">
            <button @click="changeEdit('profile')" :class="[(this.editState === 'profile') ? this.focusEdit : '']"
              class="hover:scale-110 transition duration-300">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="M2 17V20H10V18.11H3.9V17C3.9 16.36 7.03 14.9 10 14.9C10.96 14.91 11.91 15.04 12.83 15.28L14.35 13.76C12.95 13.29 11.5 13.03 10 13C7.33 13 2 14.33 2 17M10 4C7.79 4 6 5.79 6 8S7.79 12 10 12 14 10.21 14 8 12.21 4 10 4M10 10C8.9 10 8 9.11 8 8S8.9 6 10 6 12 6.9 12 8 11.11 10 10 10M21.7 13.35L20.7 14.35L18.65 12.35L19.65 11.35C19.86 11.14 20.21 11.14 20.42 11.35L21.7 12.63C21.91 12.84 21.91 13.19 21.7 13.4M12 18.94L18.06 12.88L20.11 14.88L14.11 20.95H12V18.94" />
              </svg>
            </button>
          </div>
          <div class="tooltip tooltip-top tooltip-secondary" data-tip="Setting">
            <button @click="changeEdit('setting')" :class="[(this.editState === 'setting') ? this.focusEdit : '']"
              class=" hover:scale-110 transition duration-300">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10M10,22C9.75,22 9.54,21.82 9.5,21.58L9.13,18.93C8.5,18.68 7.96,18.34 7.44,17.94L4.95,18.95C4.73,19.03 4.46,18.95 4.34,18.73L2.34,15.27C2.21,15.05 2.27,14.78 2.46,14.63L4.57,12.97L4.5,12L4.57,11L2.46,9.37C2.27,9.22 2.21,8.95 2.34,8.73L4.34,5.27C4.46,5.05 4.73,4.96 4.95,5.05L7.44,6.05C7.96,5.66 8.5,5.32 9.13,5.07L9.5,2.42C9.54,2.18 9.75,2 10,2H14C14.25,2 14.46,2.18 14.5,2.42L14.87,5.07C15.5,5.32 16.04,5.66 16.56,6.05L19.05,5.05C19.27,4.96 19.54,5.05 19.66,5.27L21.66,8.73C21.79,8.95 21.73,9.22 21.54,9.37L19.43,11L19.5,12L19.43,13L21.54,14.63C21.73,14.78 21.79,15.05 21.66,15.27L19.66,18.73C19.54,18.95 19.27,19.04 19.05,18.95L16.56,17.95C16.04,18.34 15.5,18.68 14.87,18.93L14.5,21.58C14.46,21.82 14.25,22 14,22H10M11.25,4L10.88,6.61C9.68,6.86 8.62,7.5 7.85,8.39L5.44,7.35L4.69,8.65L6.8,10.2C6.4,11.37 6.4,12.64 6.8,13.8L4.68,15.36L5.43,16.66L7.86,15.62C8.63,16.5 9.68,17.14 10.87,17.38L11.24,20H12.76L13.13,17.39C14.32,17.14 15.37,16.5 16.14,15.62L18.57,16.66L19.32,15.36L17.2,13.81C17.6,12.64 17.6,11.37 17.2,10.2L19.31,8.65L18.56,7.35L16.15,8.39C15.38,7.5 14.32,6.86 13.12,6.62L12.75,4H11.25Z" />
              </svg>
            </button>
          </div>
          <div class="tooltip tooltip-top tooltip-secondary" data-tip="Sign Out">
            <button @click="changeEdit('signOut')" :class="[(this.editState === 'signOut') ? this.focusEdit : '']"
              class="hover:scale-110 transition duration-300">
              <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="currentColor"
                  d="M14.08,15.59L16.67,13H7V11H16.67L14.08,8.41L15.5,7L20.5,12L15.5,17L14.08,15.59M19,3A2,2 0 0,1 21,5V9.67L19,7.67V5H5V19H19V16.33L21,14.33V19A2,2 0 0,1 19,21H5C3.89,21 3,20.1 3,19V5C3,3.89 3.89,3 5,3H19Z" />
              </svg>
            </button>
          </div>
        </div>
        <!-- EditProfile -->
        <div v-if="this.editState === 'profile'"
          class="relative w-full h-[12rem] border bg-base-100 border-black/30 flex justify-center items-center">
          <div v-if="this.uploadingProfile" class="absolute z-40">
            <svg class="animate-spin text-white" style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
            </svg>
          </div>
          <div class="w-full flex justify-center items-center h-full bg-base-100 px-2 py-2"
            :class="{ uploadingProfile: this.uploadingProfileClass }">
            <div class="space-y-5">
              <div class="flex justify-center items-center space-x-1 tooltip tooltip-left tooltip-secondary"
                data-tip="UserName">
                <svg class="text-accent" style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,6A2,2 0 0,0 10,8A2,2 0 0,0 12,10A2,2 0 0,0 14,8A2,2 0 0,0 12,6M12,13C14.67,13 20,14.33 20,17V20H4V17C4,14.33 9.33,13 12,13M12,14.9C9.03,14.9 5.9,16.36 5.9,17V18.1H18.1V17C18.1,16.36 14.97,14.9 12,14.9Z" />
                </svg>
                <input type="text" :placeholder="this.$store.state.userData.profile.userName"
                  v-model="this.newProfile.userName" class="w-[12rem] text-center border-b outline-none bg-base-100">
                <svg class="text-accent" style="width:20px;height:20px" viewBox="0 0 28 28">
                  <path fill="currentColor"
                    d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                </svg>
              </div>
              <div class="flex justify-center items-center space-x-1  tooltip tooltip-left tooltip-secondary"
                data-tip="Age">
                <svg class="text-accent" style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M12.5,7V12.25L17,14.92L16.25,16.15L11,13V7H12.5Z" />
                </svg>
                <input type="text" :placeholder="this.$store.state.userData.profile.age" v-model="this.newProfile.age"
                  class="w-[12rem] text-center border-b outline-none bg-base-100">
                <svg class="text-accent" style="width:20px;height:20px" viewBox="0 0 28 28">
                  <path fill="currentColor"
                    d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                </svg>
              </div>
              <div class="flex justify-center items-center space-x-1  tooltip tooltip-left tooltip-secondary"
                data-tip="Location">
                <svg class="text-accent" style="width:24px;height:24px" viewBox="0 0 24 24">
                  <path fill="currentColor"
                    d="M12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5M12,2A7,7 0 0,1 19,9C19,14.25 12,22 12,22C12,22 5,14.25 5,9A7,7 0 0,1 12,2M12,4A5,5 0 0,0 7,9C7,10 7,12 12,18.71C17,12 17,10 17,9A5,5 0 0,0 12,4Z" />
                </svg>
                <input type="text" :placeholder="this.$store.state.userData.profile.location"
                  v-model="this.newProfile.location" class="w-[12rem] text-center border-b outline-none bg-base-100">
                <svg class="text-accent" style="width:20px;height:20px" viewBox="0 0 28 28">
                  <path fill="currentColor"
                    d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
                </svg>
              </div>
            </div>
            <div class="absolute bottom-1 right-1">
              <button @click="updateProfile()"
                class="flex justify-center items-center btn btn-primary btn-sm shadow-lg text-white normal-case">
                Save
              </button>
            </div>
          </div>
        </div>
        <!-- Setting -->
        <div v-if="this.editState === 'setting'"
          class="relative w-full h-[12rem] border font-bold bg-base-100 border-black/30 flex justify-center items-center">
          <div>
            <!-- DeleteAccount -->
            <div class="form-control">
              <label class="label cursor-pointer space-x-3">
                <span class="label-text text-lg">Delete Account?</span>
                <input type="checkbox" class="toggle toggle-primary" v-model="this.deleteState">
              </label>
            </div>
          </div>
        </div>
        <!-- Sign Out -->
        <div v-if="this.editState === 'signOut'"
          class="relative w-full h-[12rem] border bg-base-100 border-black/30 flex justify-center items-center">
          <div class="w-full flex justify-center items-center h-full bg-base-100 px-2 py-2">
            <div class="space-y-5">
              <div class="flex justify-center items-center">
                <button @click="logout()" class="btn btn-primary shadow-lg text-white">LogOut</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- DeleteAccountWindow -->
    <div v-if="this.deleteState"
      class="absolute bottom-1/2 right-10 w-[25rem] h-[15rem] border bg-base-200 flex justify-center items-center shadow-lg">
      <div v-if="deleteResult">
        <p class="text-2xl text-primary">Your account deleted. Thank you for using <span
            class="text-black/90">Inversion</span>!!</p>
      </div>
      <div v-else class="space-y-3">
        <p class="text-primary text-center">If you delete your account, all of your previous albums and other user data
          will be deleted.</p>
        <p class="text-primary text-lg text-center">To delete, type DELETE.</p>
        <div class="flex justify-center items-center">
          <input type="text" v-model="this.deleteInput" placeholder="DELETE"
            class="input w-28 text-center border text-xl max-w-xs">
        </div>
        <div class="flex justify-center items-center space-x-5">
          <button @click="this.deleteUser()" class="btn btn-outline btn-sm h-4">Submit</button>
          <button @click="this.deleteState = false" class="btn btn-primary btn-sm h-4">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadUserData } from "../../Firebase/database";
import { uploadProfileImage } from '../../Firebase/storage'
import { signOut, deleteAccount } from "../../Firebase/auth";

export default {
  name: 'profile',
  data() {
    return {
      editState: 'profile',
      focusEdit: 'border-b border-black/90 text-accent cursor-default scale-110',
      newProfile: {
        userName: "",
        age: "",
        location: ""
      },
      uploadingProfileImage: false,
      uploadingProfile: false,
      uploadingProfileClass: 'brightness-50 cursor-default',
      file: '',
      deleteState: false,
      deleteInput: "",
      deleteResult: false,
    }
  },
  methods: {
    changeEdit(name) {
      this.editState = name;
    },
    changeImage() {
      this.$refs.input.click();
    },
    async uploadFile(e) {
      this.uploadingProfileImage = true
      let file;
      if (e.target.files[0] || e.dataTransfer.files[0]) {
        file = e.target.files[0] || e.dataTransfer.files[0];
        const type = file.type;
        const compBlob = await this.$store.dispatch('compressImage', {
          image: file,
          size: 0.2,
          width: 500
        });
        const result = await uploadProfileImage(compBlob, type);
        if (result) {
          this.$store.commit('addUserData', {
            userProfileImage: URL.createObjectURL(compBlob)
          });
        } else {
          this.$store.commit('addAlertMessage', "Error!! Sorry, try it again.");
        }
      } this.uploadingProfileImage = false;
    },
    async updateProfile() {
      if (this.newProfile.userName !== "" && this.newProfile.age !== "" && this.newProfile.location !== "") {
        this.uploadingProfile = true;
        const result = await uploadUserData(this.newProfile.userName, this.newProfile.age, this.newProfile.location);
        if (result) {
          await this.$store.dispatch('updateProfile');
        } else {
          this.$store.commit('addAlertMessage', "Error!! Sorry, try it again.");
        }
        this.newProfile = {
          userName: "",
          age: null,
          location: ""
        }
        this.uploadingProfile = false;
      } else {
        this.$store.commit('addAlertMessage', "Please fill in all fields.")
      }
    },
    logout() {
      signOut();
    },
    async deleteUser() {
      if (this.deleteInput === "DELETE") {
        this.deleteResult = await deleteAccount();
        if (this.deleteResult) {
          setTimeout(() => {
            this.$store.dispatch('moveLink', 'https://inversion-app-by-aurk.netlify.app/');
          }, 4000);
        } else {
          this.$store.commit('addAlertMessage', "Error!! Sorry, Please re-login.");
        }
      }
    }
  }
}
</script>