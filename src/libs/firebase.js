import { initializeApp } from "firebase/app";
import "firebase/auth"


const firebaseConfig = {
  apiKey: "AIzaSyBe9GypczjOmkeJOGb2RA0uZaZ9C2a3JAA",
  authDomain: "barber-d4311.firebaseapp.com",
  projectId: "barber-d4311",
  storageBucket: "barber-d4311.appspot.com",
  messagingSenderId: "249558987001",
  appId: "1:249558987001:web:21e22db1e0ad7731703228",
  measurementId: "G-H04GYKPJSF"
};
const app = initializeApp(firebaseConfig);
// Initialize Firebase
export default app

