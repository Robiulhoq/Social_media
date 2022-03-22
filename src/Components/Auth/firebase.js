import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyArgYBI3LaNl9U4WanC6m2MYpqpOPf0vgQ",
  authDomain: "social-media-65e11.firebaseapp.com",
  projectId: "social-media-65e11",
  storageBucket: "social-media-65e11.appspot.com",
  messagingSenderId: "529792198487",
  appId: "1:529792198487:web:28a6812acf34fc3b5d0012"
};


export const app = initializeApp(firebaseConfig);
// export const storage =  getDatabase(app)