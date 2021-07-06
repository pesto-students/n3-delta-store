import firebase from "../../config/firebaseConfig";
const db = firebase.firestore();
const USERS = "users";

export class dbUtils {
  static addUser = async (user, cartId) => {
    let docRef;
    const { uid } = user;
    try {
      await db
        .collection(USERS)
        .doc(uid)
        .set(
          {
            ...user,
            cartId,
            wishList: [],
          },
          { merge: true }
        );
    } catch (err) {
      console.log(err);
    } finally {
      return docRef;
    }
  };
  static getUser = async (uid) => {
    let docRef = db.collection(USERS).doc(uid);
    let data = null;
    try {
      const doc = await docRef.get();
      if (doc?.exists) {
        data = doc.data();
      }
    } catch (err) {
      console.log(err);
    }
    return data;
  };

  static updateUserWishList = async (uid, payload) => {
    let docRef = db.collection(USERS).doc(uid);
    let data = null;
    try {
      const doc = await docRef.update({
        wishList: payload,
      });
      if (doc?.exists) {
        data = doc.data();
        console.log("updated user successfully", data);
      }
      return data;
    } catch (err) {
      console.log(err);
    }
    return data;
  };
}
