<template>
  <!-- Inversion -->
  <div class="relative h-full w-full bg-base-200 text-black/90 select-none">
    <!-- Login -->
    <div v-if="this.$store.state.windowState.get('login')" :class="{ 'animate-fadeOut': this.$store.state.fadeOut }"
      class="fixed top-1/2 left-1/2 translate-x-[-25rem] translate-y-[-17.5rem] z-40">
      <login />
    </div>
    <!-- Tips -->
    <div v-if="this.$store.state.windowState.get('tips')" :class="{ 'animate-fadeOut': this.$store.state.fadeOut }"
      class="fixed top-1/2 left-1/2 animate-fadeIn translate-x-[-18rem] translate-y-[-15rem] z-40">
      <tips />
    </div>
    <!-- UploadPhoto -->
    <div v-if="this.$store.state.windowState.get('uploadAlbum')"
      :class="{ 'animate-fadeOut': this.$store.state.fadeOut }"
      class="fixed top-1/2 left-1/2 animate-fadeIn translate-x-[-15rem] translate-y-[-21rem] z-40">
      <OnClickOutside @trigger="closeWindow('uploadAlbum')">
        <upload />
      </OnClickOutside>
    </div>
    <!-- Profile -->
    <div v-if="this.$store.state.windowState.get('profile')" :class="{ 'animate-fadeOut': this.$store.state.fadeOut }"
      class="fixed top-1/2 left-1/2 animate-fadeIn translate-x-[-14.9rem] translate-y-[-21rem] z-40">
      <OnClickOutside @trigger="closeWindow('profile')">
        <profile />
      </OnClickOutside>
    </div>
    <!-- Alert -->
    <div v-if="this.$store.state.alertMessage !== ''"
      class="fixed w-max h-10 flex justify-center items-center right-1/2 translate-x-[8rem] top-20 alert alert-error shadow-xl border z-50 cursor-default">
      <div class="text-primary  animate-rumble">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none"
          viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ this.$store.state.alertMessage }}</span>
      </div>
    </div>
    <!-- Main -->
    <div class="relative w-full h-full bg-base-200">
      <!-- DownLight -->
      <div v-if="this.$store.state.screenLight" class="fixed z-30 w-full bg-black/40 animate-fadeIn"
        :class="[this.$store.state.windowState.get('login') ? 'h-screen' : 'h-full', { 'animate-fadeOut': this.$store.state.fadeOut }]">
      </div>
      <!-- TopNavbar -->
      <div class="flex justify-center fixed h-16 w-full border-b z-20 bg-base-100">
        <navbar />
      </div>
      <!-- AlbumComponent -->
      <div class="h-full w-full bg-base-200">
        <!-- AllPhotos -->
        <div v-if="this.$store.state.compState.get('allPhotos')" class="h-full w-full pt-[4rem]">
          <all-photos />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Login from '../components/Window/Login.vue';
import Tips from '../components/Window/tips.vue'
import Navbar from '../components/Navbar/Navbar.vue';
import Profile from '../components/Window/Profile.vue';
import Upload from '../components/Window/Upload.vue';
import AllPhotos from '../components/Album/AllPhotos.vue';

import { OnClickOutside } from '@vueuse/components';

export default {
  name: 'home',
  components: { Navbar, Profile, Login, Tips, Upload, AllPhotos, OnClickOutside },
  methods: {
    closeWindow(name) {
      this.$store.commit('changeWindow', name);
    }
  }
}
</script>
