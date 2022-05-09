<template>
  <div class="relative w-full h-full">
    <!-- Close -->
    <div class="absolute right-0.5 top-0.5">
      <div class="tooltip tooltip-bottom tooltip-secondary" data-tip="Close">
        <button @click="this.$store.commit('changeWindow', 'profile')"
          class="btn btn-sm btn-circle btn-ghost text-white flex justify-center items-center">
          <closeIcon />
        </button>
      </div>
    </div>
    <!-- ProfileImage -->
    <div class="pt-8 flex justify-center">
      <input type="file" class="hidden" ref="input" accept="image/jpeg, image/jpg, image/png" @change="uploadFile" />
      <button @click="changeImage()"
        class="flex relative justify-center items-center group h-[14.5rem] w-[14.5rem] rounded-full border border-white hover: border-b border-whitelack transition duration-300 tooltip tooltip-right tooltip-secondary"
        data-tip="Change Icon">
        <!-- CurrentImage -->
        <img v-if="this.$store.state.userData.userProfileImage" :src="this.$store.state.userData.userProfileImage"
          :class="{ 'brightness-75': this.uploadingProfileImage }"
          class="h-[14em] w-[14rem] rounded-full shadow-2xl group-hover:brightness-75 transition duration-300" />
        <img v-else src="/public/img/user-icon.png" :class="{ 'brightness-75': this.uploadingProfileImage }"
          class="h-[14em] w-[14rem] rounded-full shadow-2xl group-hover:brightness-75 transition duration-300" />
        <div class="absolute">
          <div v-if="this.uploadingProfileImage">
            <loading-icon />
          </div>
          <div v-else class="invisible group-hover:animate-show">
            <div>
              <image-edit-icon class="text-white" />
            </div>
          </div>
        </div>
      </button>
    </div>
    <!-- UserProfile -->
    <div>
      <div class="flex justify-center pt-5">
        <p class="text-5xl font-bold">{{ this.$store.state.userData.profile.userName }}</p>
      </div>
      <div class="flex justify-center">
        <p class="text-black/70">{{ this.$store.state.userData.email }}</p>
      </div>
      <div class="flex justify-center items-center space-x-3">
        <div class="flex justify-center items-center tooltip tooltip-bottom tooltip-secondary" data-tip="Age">
          <clock-icon />
          <p class="text-xl">{{ this.$store.state.userData.profile.age }}</p>
        </div>
        <div class="flex justify-center items-center tooltip tooltip-bottom tooltip-secondary" data-tip="Location">
          <map-marker-icon />
          <p class="text-xl">{{ this.$store.state.userData.profile.location }}</p>
        </div>
      </div>
    </div>
    <!-- EditSwitch -->
    <div class="flex justify-center">
      <div class="w-[23rem] h-[15rem] px-2 py-1">
        <div class="flex justify-start space-x-2 text-sm">
          <div class="tooltip tooltip-top tooltip-secondary" data-tip="Edit Profile">
            <button @click="changeEdit('profile')" :class="[(this.editState === 'profile') ? this.focusEdit : '']"
              class="hover:scale-110 transition duration-300">
              <account-edit-icon />
            </button>
          </div>
          <div class="tooltip tooltip-top tooltip-secondary" data-tip="Setting">
            <button @click="changeEdit('setting')" :class="[(this.editState === 'setting') ? this.focusEdit : '']"
              class=" hover:scale-110 transition duration-300">
              <setting-icon />
            </button>
          </div>
          <div class="tooltip tooltip-top tooltip-secondary" data-tip="Sign Out">
            <button @click="changeEdit('signOut')" :class="[(this.editState === 'signOut') ? this.focusEdit : '']"
              class="hover:scale-110 transition duration-300">
              <logout-icon />
            </button>
          </div>
        </div>
        <!-- EditProfile -->
        <div v-if="this.editState === 'profile'"
          class="relative w-full h-[12rem] border border-white shadow-2xl rounded-xl bg-black/10 flex justify-center items-center">
          <div v-if="this.uploadingProfile" class="absolute z-40">
            <loading-icon class="animate-spin" />
          </div>
          <div class="w-full flex justify-center items-center h-full px-2 py-2"
            :class="{ uploadingProfile: this.uploadingProfileClass }">
            <div class="space-y-5">
              <div class="flex justify-center items-center space-x-1 tooltip tooltip-left tooltip-secondary"
                data-tip="UserName">
                <account-icon />
                <input type="text" :placeholder="this.$store.state.userData.profile.userName"
                  v-model="this.newProfile.userName"
                  class="w-[12rem] text-center  border-b border-white outline-none placeholder:text-black/70 bg-white/0">
                <edit-icon />
              </div>
              <div class="flex justify-center items-center space-x-1 tooltip tooltip-left tooltip-secondary"
                data-tip="Age">
                <clock-icon />
                <input type="text" :placeholder="this.$store.state.userData.profile.age" v-model="this.newProfile.age"
                  class="w-[12rem] text-center  border-b border-white outline-none placeholder:text-black/70 bg-white/0">
                <edit-icon />
              </div>
              <div class="flex justify-center items-center space-x-1  tooltip tooltip-left tooltip-secondary"
                data-tip="Location">
                <mapMarkerIcon />
                <input type="text" :placeholder="this.$store.state.userData.profile.location"
                  v-model="this.newProfile.location"
                  class="w-[12rem] text-center  border-b border-white outline-none placeholder:text-black/70 bg-white/0">
                <edit-icon />
              </div>
            </div>
            <div class="absolute bottom-1 right-1">
              <button @click="updateProfile()"
                class="flex justify-center items-center btn btn-primary btn-sm text-white normal-case">
                Save
              </button>
            </div>
          </div>
        </div>
        <!-- Setting -->
        <div v-if="this.editState === 'setting'"
          class="relative w-full h-[12rem] border border-white shadow-2xl rounded-xl bg-black/10 font-bold flex justify-center items-center">
          <div>
            <!-- DeleteAccount -->
            <div class="form-control">
              <label class="label cursor-pointer space-x-3">
                <span class="label-text text-lg text-black">Delete Account?</span>
                <input type="checkbox" class="toggle toggle-primary" v-model="this.deleteState">
              </label>
            </div>
          </div>
        </div>
        <!-- Sign Out -->
        <div v-if="this.editState === 'signOut'"
          class="relative w-full h-[12rem] border border-white shadow-2xl rounded-xl bg-black/10 flex justify-center items-center">
          <div class="w-full flex justify-center items-center h-full px-2 py-2">
            <div class="space-y-5">
              <div class="flex justify-center items-center">
                <button @click="logout()" class="btn btn-primary text-white">LogOut</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- DeleteAccountWindow -->
    <div v-if="this.deleteState"
      class="absolute bottom-1/2 right-10 w-[25rem] h-[15rem] border border-primary rounded-xl backdrop-blur-3xl bg-white/80 flex justify-center items-center shadow-2xl">
      <div v-if="deleteResult">
        <p class="text-2xl text-primary">Your account deleted. Thank you for using <span
            class="text-white">Inversion</span>!!</p>
      </div>
      <div v-else class="space-y-3">
        <p class="text-primary text-center">If you delete your account, all of your previous albums and other user data
          will be deleted.</p>
        <p class="text-primary text-lg text-center">To delete, type DELETE.</p>
        <div class="flex justify-center items-center">
          <input type="text" v-model="this.deleteInput" placeholder="DELETE"
            class="input w-28 text-center border text-black text-xl max-w-xs">
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

import loadingIcon from "../svg/loading.svg";
import closeIcon from "../svg/close.svg";
import imageEditIcon from "../svg/image-edit-outline.svg";
import clockIcon from "../svg/clock-outline.svg";
import mapMarkerIcon from "../svg/map-marker-outline.svg";
import accountEditIcon from "../svg/account-edit-outline.svg";
import settingIcon from "../svg/cog-outline.svg";
import logoutIcon from "../svg/logout-variant.svg";
import editIcon from "../svg/pencil-outline.svg";
import accountIcon from "../svg/account-outline.svg";

export default {
  name: 'profile',
  components: { loadingIcon, closeIcon, imageEditIcon, clockIcon, mapMarkerIcon, accountEditIcon, settingIcon, logoutIcon, editIcon, accountIcon },
  data() {
    return {
      editState: 'profile',
      focusEdit: ' border-b border-white border-white cursor-default scale-110',
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