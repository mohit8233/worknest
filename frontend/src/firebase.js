import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAnlRwnutMO8ZOGSNRzmI_jPKdpwRpPlL0",
  authDomain: "jobfinder-795af.firebaseapp.com",
  projectId: "jobfinder-795af",
  storageBucket: "jobfinder-795af.firebasestorage.app",
  messagingSenderId: "751605513695",
  appId: "1:751605513695:web:b576aafd893e5d573d986a",
  measurementId: "G-WETLS710NE"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);