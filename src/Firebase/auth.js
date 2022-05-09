import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser } from "firebase/auth";
import { getUserData, uploadUserData, removeUserData } from './database';
import { deleteUserStorage } from "./storage";

//Use store
import store from '../store';

let firstUse = false;

//Auth
const auth = getAuth();
onAuthStateChanged(auth, async (user) => {
  if (user) {
    store.commit('addUserData', {
      uid: auth.currentUser.uid,
      email: auth.currentUser.email
    });
    if (!firstUse) await getUserData(auth.currentUser.uid);
  } else {
    store.commit('changeWindow', 'login');
  }
});

//SignIn
export const userLogin = async (email, password) => {
  let loginMessage;
  await signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      loginMessage = "login";
      setTimeout(() => {
        store.commit('changeWindow', 'login');
      }, 3000);
    })
    .catch((error) => {
      console.log(error)
      loginMessage = error.code;
    });
  return loginMessage;
};


//SingUp
export const userCreate = async (email, password) => {
  firstUse = true;
  let loginMessage;
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async () => {
      loginMessage = "createdAccount"
      store.commit('addUserData', {
        uid: auth.currentUser.uid,
        email: auth.currentUser.email
      });
      setTimeout(() => {
        store.commit('changeWindow', 'tips');
        uploadUserData();
      }, 3000);
    })
    .catch((error) => {
      firstUse = false;
      loginMessage = error.code;
    });
  return loginMessage;
}


//SignOut
export const signOut = () => {
  auth.signOut()
    .then(() => {
      store.dispatch('moveLink', 'https://inversion-app-by-aurk.netlify.app/');
    })
    .catch((error) => {
      console.log(error);
    })
};


//DeleteUser
export const deleteAccount = async () => {
  let result = false;
  const removeData = await removeUserData();
  const deletePhotos = await deleteUserStorage();
  if (removeData && deletePhotos) {
    await deleteUser(auth.currentUser).then(async () => {
      result = true;
    }).catch((error) => {
      console.log(error);
      if (error.code === "auth/requires-recent-login") {
        store.commit('addAlertMessage', "Sorry, Please re-login.");
        store.commit('changeWindow', 'login');
      }
      result = false;
    })
  }
  return result;
}
