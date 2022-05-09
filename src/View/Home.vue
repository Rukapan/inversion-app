<template>
  <!-- Inversion -->
  <div class="relative h-full w-full text-black select-none">
    <!-- Login -->
    <div v-if="this.$store.state.windowState.get('login')" :class="{ 'animate-fadeOut': this.$store.state.fadeOut }"
      class="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 animate-fadeIn z-40 w-[32rem] h-[32rem] flex items-center rounded-2xl drop-shadow-xl shadow-2xl border backdrop-brightness-150 backdrop-blur-3xl">
      <login />
    </div>
    <!-- Tips -->
    <div v-if="this.$store.state.windowState.get('tips')" :class="{ 'animate-fadeOut': this.$store.state.fadeOut }"
      class="fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 animate-fadeIn z-40 w-[35rem] h-[25rem] flex items-center rounded-2xl drop-shadow-xl shadow-2xl border backdrop-brightness-150 backdrop-blur-3xl">
      <tips />
    </div>
    <!-- UploadPhoto -->
    <div v-if="this.$store.state.windowState.get('uploadAlbum')"
      :class="{ 'animate-fadeOut': this.$store.state.fadeOut }"
      class="fixed bottom-[8rem] left-1/2 -translate-x-1/2 animate-fadeIn z-40 w-[30rem] h-[42rem] rounded-2xl drop-shadow-xl shadow-2xl border backdrop-brightness-150 backdrop-blur-3xl">
      <OnClickOutside @trigger="closeWindow('uploadAlbum')">
        <upload />
      </OnClickOutside>
    </div>
    <!-- UserAlbum -->
    <div v-if="this.$store.state.windowState.get('userAlbum')" :class="{ 'animate-fadeOut': this.$store.state.fadeOut }"
      class="fixed animate-fadeIn z-40 drop-shadow-2xl">
      <user-album />
    </div>
    <!-- Profile -->
    <div v-if="this.$store.state.windowState.get('profile')" :class="{ 'animate-fadeOut': this.$store.state.fadeOut }"
      class="fixed bottom-[8rem] left-1/2 -translate-x-1/2 animate-fadeIn z-40 w-[30rem] h-[40rem] rounded-2xl drop-shadow-xl shadow-2xl border backdrop-brightness-150 backdrop-blur-3xl">
      <OnClickOutside @trigger="closeWindow('profile')">
        <profile />
      </OnClickOutside>
    </div>
    <!-- Alert -->
    <div v-if="this.$store.state.alertMessage !== ''"
      class="fixed w-max h-12 flex justify-center items-center left-1/2 -translate-x-1/2 top-20 backdrop-blur-3xl backdrop-brightness-200 rounded-2xl border shadow-2xl px-3 py-2 z-50 cursor-default">
      <div class="text-primary animate-rumble">
        <alert-icon />
        <span>{{ this.$store.state.alertMessage }}</span>
      </div>
    </div>
    <!-- Main -->
    <div class="relative w-full h-full">
      <!-- ScreenFilter -->
      <div v-if="this.$store.state.screenFilter" class="fixed z-30 w-screen h-screen animate-fadeIn"
        :class="[{ 'backdrop-blur-lg': this.$store.state.windowState.get('userAlbum') || this.$store.state.windowState.get('login') }, { 'animate-fadeOut': this.$store.state.fadeOut }]">
      </div>
      <!-- Navbar -->
      <div v-if="!this.$store.state.windowState.get('login')" class="fixed left-1/2 -translate-x-1/2 bottom-8 z-40">
        <navbar />
      </div>
      <!-- AlbumComponent -->
      <div class="relative h-screen w-full bg-base-200">
        <!-- AllPhotos -->
        <div class="h-max w-full px-10 pb-36 bg-base-200">
          <all-photos />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '../components/Window/Login.vue';
import Tips from '../components/Window/Tips.vue'
import Navbar from '../components/Navbar/Navbar.vue';
import Profile from '../components/Window/Profile.vue';
import Upload from '../components/Window/Upload.vue';
import AllPhotos from '../components/Album/AllPhotos.vue';
import UserAlbum from '../components/Window/UserAlbum.vue'

import { OnClickOutside } from '@vueuse/components';

import alertIcon from "../components/svg/alert-circle-outline.svg";


export default {
  name: 'home',
  components: { Navbar, Profile, Login, Tips, Upload, AllPhotos, UserAlbum, OnClickOutside, alertIcon },
  methods: {
    closeWindow(name) {
      this.$store.commit('changeWindow', name);
    }
  }
}
</script>
