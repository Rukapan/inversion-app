<template>
  <div class="relative w-full h-full flex justify-center">
    <div v-for="n in 4" :key="n" class="columns-1 ml-5">
      <div class="relative mt-5 rounded-2xl shadow-2xl group h-fit w-fit animate-fadeIn border"
        v-for="item in this.$store.state.allPhotos[n - 1]" :key="item">
        <img class="w-[18rem] rounded-2xl group-hover:brightness-75 transition duration-300 cursor-pointer"
          :src="item.image">
        <div class="invisible group-hover:animate-show">
          <div class="absolute top-1 left-1">
            <button @click="showUserAlbum(item.uid)"
              class="hover:ring-1 ring-primary transition duration-300 rounded-full flex justify-center items-center tooltip tooltip-right tooltip-secondary normal-case"
              :data-tip="this.$store.state.otherUsers.get(item.uid).userName">
              <img :src="this.$store.state.otherUsers.get(item.uid).profileImage" class="w-8 h-8 rounded-full" />
            </button>
          </div>
          <div class="absolute top-2 right-2 text-white text-right">
            <p class="cursor-default text-xl">{{ item.name.split("-")[0] }}</p>
            <p class="cursor-default text-xs">{{ item.date }}</p>
            <label class="swap swap-flip text-xl mt-1">
              <input type="checkbox" />
              <div class="swap-on tooltip tooltip-bottom tooltip-secondary" data-tip="clear">
                <heart-icon class="text-primary hover:scale-110 transition duration-300" />
              </div>
              <div class="swap-off tooltip tooltip-bottom tooltip-secondary" data-tip="Like">
                <heart-outline-icon class="text-primary/50 hover:scale-110 transition duration-300" />
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-center">
    <InfiniteLoading @infinite="load">
      <template #spinner>
        <span>
          <loading-icon class="animate-spin" />
        </span>
      </template>
      <template #complete>
        <span class="text-2xl text-primary">No more phot found!</span>
      </template>
    </InfiniteLoading>
  </div>
</template>

<script>
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import { getAllPhotos } from '../../Firebase/storage';

import loadingIcon from "../svg/loading.svg";
import heartOutlineIcon from "../svg/heart-outline.svg";
import heartIcon from "../svg/heart.svg";

export default {
  name: 'all-photos',
  components: {
    InfiniteLoading, loadingIcon, heartOutlineIcon, heartIcon
  },
  methods: {
    async load($state) {
      const result = await getAllPhotos();
      console.log(this.$store.state.allPhotos)
      setTimeout(() => {
        (result) ? $state.loaded() : $state.complete();
      }, 1000);
    },
    showUserAlbum(uid) {
      this.$store.dispatch('showUserAlbum', uid);
    }
  }
}
</script>