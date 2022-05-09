<template>
  <div class="relative flex w-screen h-screen">
    <div v-if="loading" class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
      <loading-icon class="animate-spin text-white" />
    </div>
    <div class="absolute top-8 left-1/2 -translate-x-1/2">
      <div v-if="this.$store.state.showOtherUserAlbum" class="flex justify-center items-center space-x-3">
        <img :src="this.$store.state.otherUsers.get(this.$store.state.showOtherUserAlbum).profileImage"
          class="w-12 h-12 rounded-full border shadow-2xl">
        <p class="text-3xl font-bold">{{ this.$store.state.otherUsers.get(this.$store.state.showOtherUserAlbum).userName
        }}</p>
      </div>
      <div v-else class="flex justify-center items-center space-x-3">
        <img :src="this.$store.state.userData.userProfileImage" class="w-12 h-12 rounded-full border shadow-2xl">
        <p class="text-3xl font-bold">{{ this.$store.state.userData.profile.userName }}</p>
      </div>
    </div>
    <div class="absolute top-8 right-3">
      <button @click="this.$store.commit('changeWindow', 'userAlbum')"
        class="btn btn-circle text-white bg-black/10 hover:bg-black/50 shadow-2xl backdrop-blur flex justify-center items-center">
        <close-icon />
      </button>
    </div>
    <div class="absolute top-1/2 -translate-y-1/2 left-3">
      <button @mousedown="photoScroll('left')" @mouseup="stopScroll"
        class="btn btn-circle bg-black/10 backdrop-blur text-white shadow-2xl hover:bg-black/50 text-lg">◀</button>
    </div>
    <div class="absolute top-1/2 -translate-y-1/2 right-3">
      <button @mousedown="photoScroll('right')" @mouseup="stopScroll"
        class="btn btn-circle bg-black/10 backdrop-blur text-white shadow-2xl hover:bg-black/50 text-lg">▶</button>
    </div>
    <div v-if="!loading" ref="album" class="flex flex-row-reverse items-center overflow-x-hidden px-10 animate-fadeIn">
      <div v-for="item in this.$store.state.userAlbum" :key="item" class="space-y-3 ml-10">
        <div class="flex justify-center">
          <p class="text-2xl border w-max rounded-3xl px-2 py-1 bg-white/50 shadow-2xl">{{ item.date }}</p>
        </div>
        <img :src="item.image" class="max-w-[25rem] max-h-[30rem] rounded-2xl border shadow-2xl">
        <div class="flex justify-center">
          <p class="text-2xl border w-max rounded-3xl px-2 py-1 bg-white/50 shadow-2xl">{{ item.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loadingIcon from "../svg/loading.svg";
import closeIcon from "../svg/close.svg";

export default {
  name: 'user-album',
  components: { loadingIcon, closeIcon },
  data() {
    return {
      loading: false,
      userAlbum: [],
      photoN: 0,
      scrollInterval: null
    }
  },
  methods: {
    photoScroll(d) {
      this.scrollInterval = setInterval(() => {
        this.$refs.album.scrollLeft += (d === 'right') ? 5 : -5;
      }, 1);
    },
    stopScroll() {
      clearInterval(this.scrollInterval);
    }
  },
  created() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
</script>