<template>
  <!-- UploadImage -->
  <div class="relative w-[30rem] h-[41rem] bg-base-100 rounded shadow-xl px-2 py-1">
    <!-- Date -->
    <div class="w-full flex justify-center items-center">
      <p class="text-2xl">{{ this.date }}</p>
    </div>
    <!-- AbleToPost -->
    <div class="w-full flex justify-center items-center">
      <p v-if="this.$store.state.userData.todayPost" class="text-2xl font-bold">You can post.</p>
      <p v-else class="text-2xl font-bold">You already posted.</p>
    </div>
    <!-- Close -->
    <div class="absolute top-2 right-2">
      <button
        class="btn btn-ghost btn-circle btn-sm flex justify-center items-center tooltip tooltip-bottom tooltip-secondary normal-case"
        data-tip="Close" @click="closeWindow()">
        <svg class="text-accent" style="width:25px;height:25px" viewBox="0 0 24 24">
          <path fill="currentColor"
            d="M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z" />
        </svg>
      </button>
    </div>
    <!-- InputImage -->
    <div class="flex justify-center items-center w-full h-[32rem] mt-1">
      <input type="file" class="hidden" ref="input" accept="image/jpeg, image/jpg, image/png" @change="uploadFile" />
      <button @click="changeImage()"
        :class="[(this.previewImage === '' || this.$store.state.userData.previousPost.image !== undefined) ? 'w-[24rem] h-full' : 'w-max h-max']"
        class="relative group border border-dashed border-black/30 hover:border-black/80 bg-base-100 hover:bg-base-200 transition duration-300 rounded flex justify-center items-center px-0.5 py-0.5 tooltip tooltip-right tooltip-secondary"
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
          class="max-w-[24rem] max-h-[32rem] rounded shadow-xl group-hover:brightness-75 transition duration-300" />
        <div v-else>
          <svg class="text-accent" style="width:120px;height:120px" viewBox="0 0 24 24">
            <path fill="currentColor"
              d="M5,3A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H14.09C14.03,20.67 14,20.34 14,20C14,19.32 14.12,18.64 14.35,18H5L8.5,13.5L11,16.5L14.5,12L16.73,14.97C17.7,14.34 18.84,14 20,14C20.34,14 20.67,14.03 21,14.09V5C21,3.89 20.1,3 19,3H5M19,16V19H16V21H19V24H21V21H24V19H21V16H19Z" />
          </svg>
        </div>
        <div v-if="this.uploadingImage === true" class="absolute">
          <svg class="text-white animate-spin" style="width:80px;height:80px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
          </svg>
        </div>
        <div v-if="this.successIcon === true" class="absolute w-full h-full">
          <div class="flex justify-center h-full w-full items-center checkFade text-primary">
            <svg style="width:100px;height:100px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
            </svg>
          </div>
        </div>
      </button>
    </div>
    <!-- PostButton -->
    <div class="flex justify-center items-center w-full mt-3">
      <div v-if="this.todayPost" class="form-control">
        <label class="input-group">
          <input ref="photoTitle" type="text" v-model="this.photoTitle" placeholder="Photo Title..."
            class="w-52 h-10 input input-bordered text-center text-lg">
          <button @click="onSubmit()"
            class="btn btn-primary btn-sm h-10 tooltip tooltip-right tooltip-secondary normal-case"
            data-tip="Upload"><svg class="text-white" style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M9,16V10H5L12,3L19,10H15V16H9M5,20V18H19V20H5Z" />
            </svg></button>
        </label>
      </div>
      <div v-else class="border-b border-primary">
        <p class="text-2xl">{{ this.photoTitle }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadTodayPhoto, deletePhoto } from "../../Firebase/storage";

export default {
  name: 'upload',
  data() {
    return {
      todayPost: true,
      date: "",
      previewImage: '',
      photoTitle: "",
      type: '',
      compBlob: '',
      uploadingImage: false,
      successIcon: false
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
          this.successIcon = true;
          await this.$store.dispatch('updateProfile');
          await this.$store.dispatch('updateAlbum');
          setTimeout(() => {
            this.successIcon = false;
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