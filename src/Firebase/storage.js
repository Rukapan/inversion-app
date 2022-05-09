//Storage
import { getStorage, ref, getDownloadURL, uploadBytes, getMetadata, deleteObject, list, listAll } from "firebase/storage";
import { updatePreviousPost } from "./database";
import { app } from './firebase.js'
const storage = getStorage(app);

//Use store
import store from '../store';

//StoragePath
const appPath = "gs://inversion-9dd32.appspot.com/users/";

//Get
//getImageFunction
async function getImage(ref) {
  let image;
  await getDownloadURL(ref)
    .then((url) => {
      image = url;
    })
    .catch((error) => {
      console.log(error);
      image = false;
    });
  return image;
}

//GetMetadataFunction
async function getImageMetadata(ref) {
  let metadata;
  await getMetadata(ref)
    .then((d) => {
      metadata = d;
    })
    .catch((error) => {
      console.log(error);
    });
  return metadata
}

//Get a Photo
export const getPhoto = async (name) => {
  const userId = store.state.userData.uid;
  const path = appPath + userId + '/album/' + name;
  const url = await getImage(ref(storage, path));
  return url;
}


//getProfileImage
export const getProfileImage = async () => {
  const userId = store.state.userData.uid;
  const path = appPath + userId + "/profileImage";
  const url = await getImage(ref(storage, path));
  return url;
}

//GetAlbum
//GetAllPhotos
export const getAllPhotos = async () => {
  let result = true;
  if (store.state.albumPageToken !== undefined) {
    let currentPage = {};
    const listRef = ref(storage, 'allPhotos/');
    if (store.state.albumPageToken !== '') {
      currentPage = await list(listRef, { maxResults: 16, pageToken: store.state.albumPageToken, });
    } else {
      currentPage = await list(listRef, { maxResults: 16 });
    }
    await currentPage.items.forEach(async (itemRef) => {
      //Get Image
      const imageUrl = await getImage(itemRef);
      const metadata = await getImageMetadata(itemRef);
      const otherUid = metadata.customMetadata.uid
      if (!store.state.otherUsers.has(otherUid)) {
        const profileImagePath = appPath + otherUid + "/profileImage";
        let profileUrl = await getImage(ref(storage, profileImagePath));
        if (!profileUrl) profileUrl = '/public/img/user-icon.png';
        store.commit('addOtherUser', {
          uid: otherUid,
          d: {
            userName: metadata.customMetadata.userName,
            profileImage: profileUrl
          }
        });
      }
      store.commit('addAllPhotos', {
        image: imageUrl,
        name: metadata.name,
        date: metadata.timeCreated.slice(0, 10).split("-").join("/"),
        uid: metadata.customMetadata.uid
      });
    });
    store.commit('addData', {
      name: 'albumPageToken',
      d: currentPage.nextPageToken,
    });
  } else {
    result = false;
  }
  return result;
}

//Get UserAlbum
export const getUserAlbum = async (userId) => {
  let result;
  const listRef = ref(storage, 'users/' + userId + '/album/');
  await listAll(listRef)
    .then(async (res) => {
      result = true;
      res.items.forEach(async (itemRef) => {
        const imageUrl = await getImage(itemRef);
        const metadata = await getImageMetadata(itemRef);
        store.commit('addUserAlbum', {
          image: imageUrl,
          name: metadata.name.split("-")[0],
          date: metadata.timeCreated.slice(0, 10).split("-").join("/")
        });
      });
    })
    .catch((error) => {
      result = false;
      console.log(error);
    });
  return result;
}


//Upload
//UploadImageFunction
async function uploadImage(storageRef, file, metadata) {
  let result = false
  await uploadBytes(storageRef, file, metadata).then(() => {
    result = true;
    console.log('Uploaded a blob or file!');
  }).catch((error) => {
    console.log(error);
  });
  return result;
}

//UploadProfileImage
export const uploadProfileImage = async (file, type) => {
  const userId = store.state.userData.uid;
  const storageRef = ref(storage, 'users/' + userId + '/profileImage');
  const metadata = {
    contentType: type
  }
  const result = await uploadImage(storageRef, file, metadata);
  return result;
}

//UploadTodayPhoto
export const uploadTodayPhoto = async (file, name, type, today) => {
  const date = today.split("/");
  let photoName = name + "-" + date[0] + "_" + date[1] + "_" + date[2];
  const userId = store.state.userData.uid;
  let storageRef = ref(storage, 'users/' + userId + '/album/' + photoName);
  const metadata = {
    contentType: type,
    customMetadata: {
      'uid': userId,
      'userName': store.state.userData.profile.userName
    }
  }
  const result = await uploadImage(storageRef, file, metadata);
  await updatePreviousPost({
    date: date[0] + "/" + date[1] + "/" + date[2],
    name: photoName
  });
  photoName += "-" + userId;
  storageRef = ref(storage, 'allPhotos/' + photoName);
  await uploadImage(storageRef, file, metadata);
  return result;
}



//Delete
//Delete Photo
export const deletePhoto = async () => {
  const userId = store.state.userData.uid;
  const deleteRef = ref(storage, 'users/' + userId + '/album/' + store.state.userData.previousPost.name);
  deleteObject(deleteRef).then(() => {
    console.log("Success Delete Photo");
  }).catch((error) => {
    console.log(error);
  });
}

//DeleteUserStorage
export const deleteUserStorage = async () => {
  const userId = store.state.userData.uid;
  const listRef = ref(storage, 'users/' + userId + '/album/');
  listAll(listRef)
    .then((res) => {
      res.items.forEach((itemRef) => {
        deleteObject(itemRef).then(() => {
          console.log("Delete Photo");
        }).catch((error) => {
          console.log(error);
        })
      })
    })
    .catch((error) => {
      console.log(error);
    })
  return true;
}