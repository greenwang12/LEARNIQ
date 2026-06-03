import { initializeApp } from "firebase/app";

import { getFirestore }
from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAM7ZswouIl1v4y94VqguKRdDKSX9uMb5s",
  authDomain: "learniq-6455f.firebaseapp.com",
  projectId: "learniq-6455f",
  storageBucket: "learniq-6455f.firebasestorage.app",
  messagingSenderId: "334650651193",
  appId: "1:334650651193:web:0df256df91697e2fae53e8"
};

const app =
  initializeApp(firebaseConfig);

export const db =
  getFirestore(app);