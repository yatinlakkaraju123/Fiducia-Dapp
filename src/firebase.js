
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
import { firebaseConfig } from "./.firebaseConfig";
import {getAuth} from "firebase/auth"


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 export const storage = getStorage(app)
 export const auth = getAuth(app)