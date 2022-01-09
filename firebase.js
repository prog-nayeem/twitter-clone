import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCgHBa7ZJKom18Mr1Si2QKjIIg9FmANkgM',
  authDomain: 'twitter-clone-cb1e3.firebaseapp.com',
  projectId: 'twitter-clone-cb1e3',
  storageBucket: 'twitter-clone-cb1e3.appspot.com',
  messagingSenderId: '754315557061',
  appId: '1:754315557061:web:6e5021f56f740f456918ac',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;

export { db, storage };
