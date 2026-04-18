import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIRE_APIKEY,
  authDomain: "vingo-65b91.firebaseapp.com",
  projectId: "vingo-65b91",
  storageBucket: "vingo-65b91.firebasestorage.app",
  messagingSenderId: "147663770055",
  appId: "1:147663770055:web:244e292034d269b68ec9e2",
  measurementId: "G-HPC5B1N36B",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);         
const analytics = getAnalytics(app);

export { app, auth, analytics };
