import firebase from "../../config/firebaseConfig";
export const socialAuth = async (provider) => {
  try {
    /* await firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION); */
    return await firebase.auth().signInWithPopup(provider);
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};

export const signOut = async () => {
  try {
    return await firebase.auth().signOut();
  } catch (err) {
    console.error(err);
    return { error: err };
  }
};
