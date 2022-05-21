import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDdFLieVHARjJs6bycFTj8284IKNRvnsnU",
  authDomain: "food-delivery-9924f.firebaseapp.com",
  databaseURL: "https://food-delivery-9924f-default-rtdb.firebaseio.com",
  projectId: "food-delivery-9924f",
  storageBucket: "food-delivery-9924f.appspot.com",
  messagingSenderId: "536570505811",
  appId: "1:536570505811:web:f02deeec7c75a97a9ff4a6",
};

const app = getApps.length > 0 ? getApp : initializeApp(firebaseConfig);

const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, firestore, storage };
