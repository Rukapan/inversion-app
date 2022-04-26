//Setting DataBase
import { app } from './firebase.js';
import { getProfileImage, getPhoto } from './storage.js';
import { getDatabase, ref, set, child, get, remove } from "firebase/database";
const database = getDatabase(app);

//Use store
import store from '../store';


//Get UserData
export const getUserData = async (userId = store.state.userData.uid) => {
  const dbRef = ref(getDatabase());
  await get(child(dbRef, `users/${userId}`)).then(async (snapshot) => {
    if (snapshot.exists()) {
      let image = await getProfileImage();
      if (!image) image = '/public/img/user-icon.png';
      const date = await store.dispatch('getDate');
      const userData = snapshot.val();
      store.commit('addUserData', userData);
      let ablePost = true
      if (date === userData.previousPost.date) {
        ablePost = false;
        const previousPhotoUrl = await getPhoto(userData.previousPost.name);
        store.commit('addUserData', {
          previousPhotoImage: previousPhotoUrl,
        });
      }
      store.commit('addUserData', {
        todayPost: ablePost,
        userProfileImage: image
      });
    } else {
      console.log("No userData available");
    }
  }).catch((error) => {
    store.commit('addAlertMessage', "Error!! Please re-load App.");
    console.error(error);
  });
}

//Upload UserData
export const uploadUserData = async (currentUserName = store.state.userData.profile.userName, currentAge = store.state.userData.profile.age, currentLocation = store.state.userData.profile.location, currentPreviousPostDate = store.state.userData.previousPost.date, currentPhotoName = store.state.userData.previousPost.name) => {
  let result = false;
  const userId = store.state.userData.uid
  await set(ref(database, 'users/' + userId), {
    profile: {
      userName: currentUserName,
      age: currentAge,
      location: currentLocation,
    },
    previousPost: {
      date: currentPreviousPostDate,
      name: currentPhotoName,
    }
  })
    .then(() => {
      result = true;
      console.log("UserProfileUpdated!!")
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
}

//Update PreviousPost
export const updatePreviousPost = async (todayPost) => {
  const userPath = store.state.userData.uid + '/previousPost';
  await set(ref(database, 'users/' + userPath), todayPost)
    .then(() => {
      console.log("UpdatePreviousPost");
    })
    .catch((error) => {
      console.log(error);
    })
}

//RemoveUserData
export const removeUserData = async () => {
  let result;
  const db = getDatabase();
  const userId = store.state.userData.uid;
  await remove(ref(db, 'users/' + userId))
    .then(() => {
      result = true;
    })
    .catch((error) => {
      console.log(error);
      result = false;
    });
  return result;
}
