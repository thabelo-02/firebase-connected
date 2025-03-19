import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZ5DU3D1eZd-LhWL5bgvA_FX6FAIO9-vI",
  authDomain: "mlalazi011.firebaseapp.com",
  projectId: "mlalazi011",
  storageBucket: "mlalazi011.firebasestorage.app",
  messagingSenderId: "20281717238",
  appId: "1:20281717238:web:524ae242f9a32213c4d7d7",
  measurementId: "G-S1QHE0PYM1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Initialize Firestore

export { app, analytics, db }; // Export the app, analytics, and db instances