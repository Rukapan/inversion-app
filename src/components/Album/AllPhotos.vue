<template>
  <div class="w-full h-full flex justify-center">
    <div v-for="n in 4" :key="n" class="columns-1 ml-3">
      <div class="relative mt-3 rounded shadow-xl group h-fit w-fit animate-fadeIn"
        v-for="item in this.$store.state.allPhotos[n - 1]" :key="item">
        <img class="w-[18rem] rounded group-hover:brightness-75 transition duration-300 cursor-pointer"
          :src="item.image">
        <div class="invisible group-hover:animate-show">
          <div class="absolute top-2 left-2">
            <button
              class="rounded-full tooltip tooltip-right tooltip-secondary hover:ring-1 ring-primary transition duration-500"
              :data-tip="this.$store.state.otherUsers.get(item.uid).userName">
              <img :src="this.$store.state.otherUsers.get(item.uid).profileImage" class="w-7 h-7 rounded-full" />
            </button>
          </div>
          <div class="absolute top-2 right-2 text-white text-right">
            <p class="cursor-default text-lg">{{ item.name.split("-")[0] }}</p>
            <p class="cursor-default text-xs">{{ item.date }}</p>
            <label class="swap swap-flip text-xl mt-1">
              <input type="checkbox" />
              <div class="swap-on tooltip tooltip-bottom tooltip-secondary" data-tip="clear"><svg
                  class="text-primary hover:scale-110 transition duration-300" style="width:24px;height:24px"
                  viewBox="0 0 22 22">
                  <path fill="currentColor"
                    d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                </svg></div>
              <div class="swap-off tooltip tooltip-bottom tooltip-secondary" data-tip="Like"><svg
                  class="text-primary/50 hover:scale-110 transition duration-300" style="width:24px;height:24px"
                  viewBox="0 0 22 22">
                  <path fill="currentColor"
                    d="M12.1 18.55L12 18.65L11.89 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 6 11.07 7.36H12.93C13.46 6 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55M16.5 3C14.76 3 13.09 3.81 12 5.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5C2 12.27 5.4 15.36 10.55 20.03L12 21.35L13.45 20.03C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z" />
                </svg></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-center">
    <InfiniteLoading @infinite="load">
      <template #spinner>
        <span><svg class="text-accent animate-spin" style="width:50px;height:50px" viewBox="0 0 28 28">
            <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
          </svg></span>
      </template>
      <template #complete>
        <span class="text-xl text-primary">No more phot found!</span>
      </template>
    </InfiniteLoading>
  </div>
</template>

<script>
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import { getAllPhotos } from '../../Firebase/storage'

export default {
  name: 'all-photos',
  components: {
    InfiniteLoading,
  },
  methods: {
    async load($state) {
      console.log("load....")
      const result = await getAllPhotos();
      setTimeout(() => {
        (result) ? $state.loaded() : $state.complete();
      }, 1000);
    },
  }
}
</script>