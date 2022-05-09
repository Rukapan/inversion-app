//FireBase Initializing
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyB9eEBkGbnzH6DocV0mvd9n3SfZS_UXVh4",
  authDomain: "inversion-9dd32.firebaseapp.com",
  databaseURL: "https://inversion-9dd32-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "inversion-9dd32",
  storageBucket: "inversion-9dd32.appspot.com",
  messagingSenderId: "209173715866",
  appId: "1:209173715866:web:cc134f7045b8b733903823"
};

export const app = initializeApp(firebaseConfig);
