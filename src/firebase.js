import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { ref } from "vue";

const firebaseConfig = {
  apiKey: "AIzaSyBj-WIYzkzaktnBONUFnOR55jHd7cl-3gc",
  authDomain: "vue-3-test-ba17e.firebaseapp.com",
  projectId: "vue-3-test-ba17e",
  storageBucket: "vue-3-test-ba17e.appspot.com",
  messagingSenderId: "881169191974",
  appId: "1:881169191974:web:5c6b765af02517b12882e7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const usersCollection = collection(db, "users");

// Add user to database
export const addUser = async (userInfo) => {
  try {
    const docRef = await addDoc(usersCollection, userInfo);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Update user
export const editUser = async (id, userInfo) => {
  await setDoc(doc(usersCollection, id), userInfo);
  console.log("updated");
};

// Delete user
export const deleteUser = async (id) => {
  await deleteDoc(doc(usersCollection, id));
  console.log("deleted");
};

export let stopRealtime = null;

// Load users in realtime
export const setUsers = () => {
  const users = ref([]);
  stopRealtime = onSnapshot(usersCollection, (snapshot) => {
    users.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });
  return users;
};
