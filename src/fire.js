// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "@firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBudnEXUel7BIPJzjZn2RjJYM5N0qbjt-M",
  authDomain: "salon-hunt-f9f6d.firebaseapp.com",
  projectId: "salon-hunt-f9f6d",
  storageBucket: "salon-hunt-f9f6d.appspot.com",
  messagingSenderId: "248032850429",
  appId: "1:248032850429:web:48a54675400b27337ce994",
  measurementId: "G-SGTXE6GTNF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();
const storage = getStorage();
export {database};
export {storage};
export default app;