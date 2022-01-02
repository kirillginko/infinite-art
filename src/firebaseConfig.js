import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA3kDVYEI-DMpbipjCqr7N_-n_3jcs1RBU",
  authDomain: "art-infinite-3abd8.firebaseapp.com",
  projectId: "art-infinite-3abd8",
  storageBucket: "art-infinite-3abd8.appspot.com",
  messagingSenderId: "869425653198",
  appId: "1:869425653198:web:64a4b0af56676b2320379f",
  measurementId: "G-L6ZYZX8CVT",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
