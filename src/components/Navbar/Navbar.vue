<template>
  <!-- IconMenu -->
  <div
    class="h-full flex justify-center items-center mt-3 space-x-5 backdrop-blur-3xl backdrop-brightness-200 rounded-2xl border shadow-2xl px-3 py-2">
    <!-- SearchIcon -->
    <div class="tooltip tooltip-top tooltip-secondary" data-tip="Search">
      <button @click="searchOpen()" class="btn btn-ghost btn-circle btn-sm">
        <magnify-icon />
      </button>
    </div>
    <!-- AddAlbumIcon -->
    <div class="tooltip tooltip-top tooltip-secondary" data-tip="Post Photo">
      <button @click="this.$store.commit('changeWindow', 'uploadAlbum')" class="btn btn-ghost btn-circle btn-sm">
        <plus-icon />
      </button>
    </div>
    <!-- UserAlbumIcon -->
    <div class="tooltip tooltip-top tooltip-secondary" data-tip="My Album">
      <button @click="this.$store.dispatch('showUserAlbum')" class="btn btn-ghost btn-circle btn-sm">
        <image-multiple-icon />
      </button>
    </div>
    <!-- Notifications -->
    <div class="tooltip tooltip-top tooltip-secondary " data-tip="Notifications">
      <button class="btn btn-ghost btn-circle btn-sm">
        <div class="indicator">
          <span v-if="this.$store.state.notificationCount"
            class="indicator-item badge badge-primary text-xs rounded-full w-5 h-5">{{
                this.$store.state.notificationCount
            }}</span>
          <notification-icon />
        </div>
      </button>
    </div>
    <!-- UserProfile -->
    <div class="tooltip tooltip-top tooltip-secondary" data-tip="My Profile">
      <button @click="this.$store.commit('changeWindow', 'profile')" class="btn btn-ghost btn-circle">
        <img v-if="this.$store.state.userData.userProfileImage" :src="this.$store.state.userData.userProfileImage"
          class="rounded-full w-9 h-9 shadow-2xl">
        <img v-else src="/public/img/user-icon.png" class="rounded-full w-6 h-6 shadow">
      </button>
    </div>
  </div>
</template>

<script>
import { OnClickOutside } from '@vueuse/components';

import magnifyIcon from "../svg/magnify.svg";
import plusIcon from "../svg/plus-circle-outline.svg";
import imageMultipleIcon from "../svg/image-multiple-outline.svg";
import notificationIcon from "../svg/bell-outline.svg";

export default {
  name: 'navbar',
  components: { OnClickOutside, magnifyIcon, plusIcon, imageMultipleIcon, notificationIcon },
  data() {
    return {
      searchState: false,
    }
  },
  methods: {
    async reloadAlbum() {
      this.$store.dispatch('updateAlbum');
    }
  }
}
</script>

<style>
.clearCancelButton::-webkit-search-cancel-button {
  -webkit-appearance: none;
}
</style>
