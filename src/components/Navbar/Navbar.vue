<template>
  <!-- Navbar -->
  <div class="h-full flex justify-center items-center space-x-2">
    <!-- Title -->
    <div class="h-full flex justify-center items-center mt-1">
      <button @click="this.reloadAlbum()"
        class="flex justify-center space-x-1.5 items-center btn btn-ghost normal-case tooltip tooltip-bottom tooltip-secondary"
        data-tip="Reload Photos">
        <img class="w-6 h-6 mt-1" src="/public/img/inversion-logo.png">
        <h1 class="flex text-3xl font-bold">Inversion</h1>
      </button>
    </div>
    <!-- Search -->
    <div class="h-full w-[16rem] flex justify-center items-center mt-2">
      <div v-if="this.searchState">
        <OnClickOutside @trigger="searchOpen()">
          <input ref="searchInput" type="search" placeholder="search..."
            class="clearCancelButton animate-fadeIn h-7 w-full text-center border-b border-primary outline-none text-lg text-black/90 caret-black/60">
        </OnClickOutside>
      </div>
    </div>
    <!-- IconMenu -->
    <div class="h-full flex justify-center items-center mt-3 space-x-2">
      <!-- SearchIcon -->
      <div class="tooltip tooltip-bottom tooltip-secondary" data-tip="Search">
        <button @click="searchOpen()" class="btn btn-ghost btn-circle btn-sm">
          <svg class="text-accent" style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
          </svg>
        </button>
      </div>
      <!-- AddAlbumIcon -->
      <div class="tooltip tooltip-bottom tooltip-secondary" data-tip="Post Photo">
        <button @click="this.$store.commit('changeWindow', 'uploadAlbum')" class="btn btn-ghost btn-circle btn-sm">
          <svg class="text-accent" style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M5,3A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14.09C14.03,20.67 14,20.34 14,20C14,19.32 14.12,18.64 14.35,18H5L8.5,13.5L11,16.5L14.5,12L16.73,14.97C17.7,14.34 18.84,14 20,14C20.34,14 20.67,14.03 21,14.09V5C21,3.89 20.1,3 19,3H5M19,16V19H16V21H19V24H21V21H24V19H21V16H19Z" />
          </svg>
        </button>
      </div>
      <!-- Notifications -->
      <div class="tooltip tooltip-bottom tooltip-secondary " data-tip="Notifications">
        <button class="btn btn-ghost btn-circle btn-sm">
          <div class="indicator">
            <span v-if="this.$store.state.notificationCount"
              class="indicator-item badge badge-primary text-xs rounded-full w-5 h-5">{{
                  this.$store.state.notificationCount
              }}</span>
            <svg class="text-accent" style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21" />
            </svg>
          </div>
        </button>
      </div>
      <!-- UserProfile -->
      <div class="tooltip tooltip-bottom tooltip-secondary" data-tip="My Profile">
        <button @click="this.$store.commit('changeWindow', 'profile')" class="btn btn-ghost btn-circle btn-sm">
          <img v-if="this.$store.state.userData.userProfileImage" :src="this.$store.state.userData.userProfileImage"
            class="rounded-full w-6 h-6 shadow">
          <img v-else src="/public/img/user-icon.png" class="rounded-full w-6 h-6 shadow">
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { OnClickOutside } from '@vueuse/components';

export default {
  name: 'navbar',
  components: { OnClickOutside },
  data() {
    return {
      searchState: false,
    }
  },
  methods: {
    searchOpen() {
      if (this.searchState) {
        this.searchState = false;
      } else {
        this.searchState = true;
        setTimeout(() => {
          this.$refs.searchInput.focus();
        }, 300);
      }
    },
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
