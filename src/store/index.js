import { createStore } from 'vuex'
import imageCompression from "browser-image-compression";
import { getUserData } from '../Firebase/database';
import { getUserAlbum } from "../Firebase/storage";

const store = createStore({
  state() {
    return {
      screenFilter: false,
      fadeOut: false,
      windowState: new Map([
        ['login', false],
        ['tips', false],
        ['uploadAlbum', false],
        ['userAlbum', false],
        ['profile', false],
      ]),
      userData: {
        todayPost: true,
        profile: {
          userName: "Name",
          age: "Age",
          location: "Location",
        },
        previousPost: {
          date: '',
          name: '',
        }
      },
      otherUsers: new Map(),
      allPhotos: [[], [], [], []],
      photoCount: 0,
      userAlbum: [],
      showOtherUserAlbum: false,
      albumPageToken: '',
      notificationCount: 0,
      alertMessage: "",
    }
  },
  mutations: {
    addData(state, payload) {
      state[payload.name] = payload.d;
    },
    changeState(state, name) {
      state[name] = (state[name]) ? false : true;
    },
    changeWindow(state, name) {
      if (state.windowState.get(name)) {
        state.fadeOut = true;
        setTimeout(() => {
          state.windowState.forEach((v, key) => {
            state.windowState.set(key, false);
          });
          state.fadeOut = false;
          state.screenFilter = false;
        }, 100);
      } else {
        state.fadeOut = true;
        setTimeout(() => {
          state.windowState.forEach((v, key) => {
            state.windowState.set(key, false);
          });
          state.fadeOut = false;
          state.screenFilter = true;
          state.windowState.set(name, true);
        }, 100);
      }
    },
    addUserData(state, payload) {
      Object.assign(state.userData, payload);
    },
    addOtherUser(state, payload) {
      state.otherUsers.set(payload.uid, payload.d);
    },
    addAllPhotos(state, d) {
      if (state.photoCount === 4) state.photoCount = 0;
      state.allPhotos[state.photoCount].push(d);
      state.photoCount++;
    },
    addUserAlbum(state, d) {
      state.userAlbum.push(d);
      if (state.userAlbum.length > 1) {
        state.userAlbum.sort((a, b) => {
          return (a.date > b.date ? -1 : 1);
        });
      }
    },
    deleteAllPhotos(state) {
      state.allPhotos = [[], [], [], []];
    },
    deleteUserAlbum(state) {
      state.userAlbum = [];
    },
    initializeAlbumPageToken(state) {
      state.albumPageToken = '';
    },
    addAlertMessage(state, m) {
      state.alertMessage = m;
      setTimeout(() => {
        state.alertMessage = "";
      }, 5000);
    },
  },
  actions: {
    moveLink({ }, url) {
      location.href = url
    },
    getDate() {
      const date = new Date();
      const today = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
      return today
    },
    async compressImage({ }, payload) {
      let compBlob = '';
      const options = {
        maxSizeMB: payload.size,
        maxWidthOrHeight: payload.width
      };
      try {
        compBlob = await imageCompression(payload.image, options);
      } catch (error) {
        console.log("getCompressImageFileAsync is error", error);
        throw error;
      }
      return compBlob;
    },
    async showUserAlbum(state, uid = store.state.userData.uid) {
      this.commit('deleteUserAlbum');
      const result = await getUserAlbum(uid);
      if (result) {
        this.state.showOtherUserAlbum = (uid !== this.state.userData.uid) ? uid : false;
        this.commit('changeWindow', 'userAlbum');
      } else {
        this.commit('addAlertMessage', "Error!! Sorry, Please try it again.")
      }
    },
    async updateProfile() {
      await getUserData();
    },
    updateAlbum() {
      location.reload()
    }
  }
})

export default store