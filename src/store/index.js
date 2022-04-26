import { createStore } from 'vuex'
import imageCompression from "browser-image-compression";
import { getUserData } from '../Firebase/database';

const store = createStore({
  state() {
    return {
      screenLight: false,
      fadeOut: false,
      windowState: new Map([
        ['login', false],
        ['tips', false],
        ['uploadAlbum', false],
        ['profile', false],
      ]),
      compState: new Map([
        ['allPhotos', false],
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
      myAlbum: [],
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
      console.log("firstUser")
    },
    changeWindow(state, name) {
      if (state.windowState.get(name)) {
        state.fadeOut = true;
        setTimeout(() => {
          state.windowState.forEach((v, key) => {
            state.windowState.set(key, false);
          });
          state.fadeOut = false;
          state.screenLight = false;
        }, 100);
      } else {
        state.fadeOut = true;
        setTimeout(() => {
          state.windowState.forEach((v, key) => {
            state.windowState.set(key, false);
          });
          state.fadeOut = false;
          state.screenLight = true;
          state.windowState.set(name, true);
        }, 100);
      }
    },
    changeComp(state, name) {
      if (state.compState.get(name)) {
        state.compState.forEach((v, key) => {
          state.compState.set(key, false);
        });
      } else {
        state.compState.forEach((v, key) => {
          state.compState.set(key, false);
        });
        state.compState.set(name, true);
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
    deleteAllPhotos(state) {
      state.allPhotos = [[], [], [], []];
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
    async updateProfile() {
      await getUserData();
    },
    updateAlbum() {
      this.commit('changeComp', 'allPhotos');
      this.commit('initializeAlbumPageToken');
      this.commit('deleteAllPhotos');
      setTimeout(() => {
        this.commit('changeComp', 'allPhotos');
      }, 100);
    }
  }
})

export default store