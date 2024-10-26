import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCnymMjQNghGVlxyE_Elopv8cF050aFCPs",
    authDomain: "health-caresync.firebaseapp.com",
    projectId: "health-caresync",
    storageBucket: "health-caresync.appspot.com",
    messagingSenderId: "794776488301",
    appId: "1:794776488301:web:371c17c5f34e82a134b264"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
const storage = getStorage(app);

export { storage };
export { firebaseConfig };
