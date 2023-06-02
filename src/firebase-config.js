import { initializeApp } from "firebase/app";
import { collection,  getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBErZQmRkocMoUW7Zn6C-JLgrSeCbGNOTk",
  authDomain: "books-store-803c6.firebaseapp.com",
  projectId: "books-store-803c6",
  storageBucket: "books-store-803c6.appspot.com",
  messagingSenderId: "1088111503725",
  appId: "1:1088111503725:web:64072a605a2e64fa931264",
  measurementId: "G-7LV268QKDG"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const booksCollectionRef = collection(db, 'books');

