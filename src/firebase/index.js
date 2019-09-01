import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyAgQpAlW0BLI7gO2NJaVLl-48HFxa8ZoUU",
  authDomain: "cryptopolice-task.firebaseapp.com",
  databaseURL: "https://cryptopolice-task.firebaseio.com",
  projectId: "cryptopolice-task",
  storageBucket: "cryptopolice-task.appspot.com",
  messagingSenderId: "714637935601",
  appId: "1:714637935601:web:bc3847968d483e10"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
