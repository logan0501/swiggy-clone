import { auth, db } from "../utils/constants/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ERROR, SUCCESS } from "../utils/constants/userCurrentLocationStatus";

export const createAccount = async (name, email, phoneNumber) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      phoneNumber
    );
    if (user) {
      const data = { name, email, phoneNumber };
      await setDoc(doc(db, "users", phoneNumber), data);
      return { status: SUCCESS, uid: user.uid };
    }
  } catch (error) {
    return { status: ERROR, error };
  }
};

export const loginUserWithPhoneNumber = async (phoneNumber) => {
  try {
    const docRef = doc(db, "users", phoneNumber);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { status: SUCCESS, data: docSnap.data() };
    } else {
      return { status: ERROR, error: "No User found" };
    }
  } catch (error) {
    return { status: ERROR, error };
  }
};
