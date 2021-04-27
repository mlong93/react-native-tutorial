import Firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyD4eadGoCHQhTfALf-9stMUTp4Z_2s35eE",
    authDomain: "first-expo-app-1f19a.firebaseapp.com",
    databaseURL: "https://first-expo-app-1f19a-default-rtdb.firebaseio.com",
    projectId: "first-expo-app-1f19a",
    storageBucket: "first-expo-app-1f19a.appspot.com",
    messagingSenderId: "361857857574",
    appId: "1:361857857574:web:c632e72ef2f08c7a778ee7",
    measurementId: "G-CZTWG13RBC"
};

const app = Firebase.initializeApp(firebaseConfig);
export const db = app.database();