<template>
  <div class="relative w-full h-full">
    <!-- Close -->
    <div class="absolute right-0.5 top-0.5">
      <div class="tooltip tooltip-bottom tooltip-secondary" data-tip="Close">
        <button @click="this.$store.commit('changeWindow', 'uploadAlbum')"
          class="btn btn-sm btn-circle btn-ghost text-white flex justify-center items-center">
          <closeIcon />
        </button>
      </div>
    </div>
    <!-- Date -->
    <div class="pt-2 w-full flex justify-center items-center">
      <p class="text-2xl">{{ this.date }}</p>
    </div>
    <!-- AbleToPost -->
    <div class="w-full flex justify-center items-center">
      <p v-if="this.$store.state.userData.todayPost" class="text-2xl font-bold">You can post</p>
      <p v-else class="text-2xl font-bold">You already posted</p>
    </div>
    <!-- InputImage -->
    <div class="flex justify-center items-center w-full h-[32rem] mt-3">
      <input type="file" class="hidden" ref="input" accept="image/jpeg, image/jpg, image/png" @change="uploadFile" />
      <button @click="changeImage()"
        :class="[(this.previewImage === '' || this.$store.state.userData.previousPost.image !== undefined) ? 'w-[24rem] h-full' : 'w-max h-max']"
        class="relative group border border-dashed border-white hover:border-black shadow-2xl bg-white/10 transition duration-300 rounded flex justify-center items-center px-0.5 py-0.5 tooltip tooltip-right tooltip-secondary"
        data-tip="Today Photo">
        <div v-if="!this.$store.state.userData.todayPost"
          class="absolute z-40 w-full h-full cursor-default invisible group-hover:animate-show">
          <div class="flex w-full h-full justify-center items-center">
            <div class="text-lg text-white">
              <p>If you want to change Today Photo?</p>
              <p>Click to Upload other photo.</p>
            </div>
          </div>
        </div>
        <img v-if="this.previewImage !== ''" :src="this.previewImage"
          :class="[this.uploadingImage ? 'brightness-75 cursor-default' : '']"
          class="max-w-[24rem] max-h-[32rem] rounded shadow-2xl group-hover:brightness-75 transition duration-300" />
        <div v-else>
          <image-plus-icon />
        </div>
        <div v-if="this.uploadingImage" class="absolute">
          <loading-icon class="animate-spin text-white" />
        </div>
      </button>
    </div>
    <!-- PostButton -->
    <div class="flex justify-center items-center w-full mt-4">
      <div v-if="this.todayPost" class="form-control">
        <label class="input-group">
          <input ref="photoTitle" type="text" v-model="this.photoTitle" placeholder="Photo Title..."
            class="w-52 h-10 input input-bordered border-white text-center text-lg bg-white/0 placeholder:text-black/60">
          <button @click="onSubmit()"
            class="btn btn-primary btn-sm h-10 tooltip border text-white tooltip-right tooltip-secondary normal-case"
            data-tip="Upload">
            <upload-icon />
          </button>
        </label>
      </div>
      <div v-else>
        <p class="text-2xl w-max bg-white/30 rounded-2xl backdrop-blur px-2 py-1 border border-white shadow-2xl">{{
            this.photoTitle
        }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadTodayPhoto, deletePhoto } from "../../Firebase/storage";

import loadingIcon from "../svg/loading.svg";
import imagePlusIcon from "../svg/image-plus.svg"
import closeIcon from "../svg/close.svg";
import uploadIcon from "../svg/upload.svg"

export default {
  name: 'upload',
  components: { loadingIcon, imagePlusIcon, closeIcon, uploadIcon },
  data() {
    return {
      todayPost: true,
      date: "",
      previewImage: '',
      photoTitle: "",
      type: '',
      compBlob: '',
      uploadingImage: false,
    }
  },
  methods: {
    closeWindow() {
      this.$store.commit('changeWindow', 'uploadAlbum');
    },
    async getDate() {
      this.date = await this.$store.dispatch('getDate');
    },
    changeImage() {
      this.$refs.input.click();
    },
    async uploadFile(e) {
      this.uploadingImage = true
      let file;
      if (e.target.files[0] || e.dataTransfer.files[0]) {
        file = e.target.files[0] || e.dataTransfer.files[0];
        if (!this.todayPost) {
          this.todayPost = true;
          this.name = "";
        }
        this.type = file.type;
        this.compBlob = await this.$store.dispatch('compressImage', {
          image: file,
          size: 1,
          width: 1900
        });
        this.previewImage = URL.createObjectURL(this.compBlob);
        this.$refs.photoTitle.focus();
      }
      this.uploadingImage = false;
    },
    async onSubmit() {
      if (this.photoTitle !== "" && this.compBlob !== '') {
        this.uploadingImage = true;
        const result = await uploadTodayPhoto(this.compBlob, this.photoTitle, this.type, this.date);
        if (result) {
          if (!this.$store.state.userData.todayPost) {
            await deletePhoto();
          }
          this.uploadingImage = false;
          await this.$store.dispatch('updateProfile');
          await this.$store.dispatch('updateAlbum');
          setTimeout(() => {
            this.closeWindow();
          }, 1000);
        } else {
          this.uploadingImage = false;
          this.$store.commit('addAlertMessage', "Error!! Sorry, Please try it again.");
          this.previewImage = "";
          this.photoTitle = "";
        }
      } else {
        this.$store.commit('addAlertMessage', "Upload a photo and enter a title for the photo.")
      }
    },
  },
  created() {
    this.getDate();
    if (!this.$store.state.userData.todayPost) {
      this.todayPost = false;
      this.previewImage = this.$store.state.userData.previousPhotoImage;
      this.photoTitle = this.$store.state.userData.previousPost.name.split("-")[0];
    }
  }
}
</script>