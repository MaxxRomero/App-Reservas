import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBuuImfXybjx2opswYwOLE6p4Zf8rdUVoU",
  authDomain: "prueba-b2d6c.firebaseapp.com",
  projectId: "prueba-b2d6c",
  storageBucket: "prueba-b2d6c.appspot.com",
  messagingSenderId: "855327251831",
  appId: "1:855327251831:web:e89f3d05c2acab5f811572",
  measurementId: "G-9H87Y19V4D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const storage = getStorage(app);

export const db = getFirestore(app);

