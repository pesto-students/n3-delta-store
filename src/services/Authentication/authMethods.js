import firebase from '../../config/firebaseConfig';

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const emailProvider = new firebase.auth.EmailAuthProvider();