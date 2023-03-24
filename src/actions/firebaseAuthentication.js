import { auth, db } from "../constants/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ERROR, SUCCESS } from "../constants/userCurrentLocationStatus";

export const createAccount = async (name, email, phoneNumber) => {
  try {
    const message = await createUserWithEmailAndPassword(
      auth,
      email,
      phoneNumber
    );
    const { user } = message;
    if (user) {
      const data = { name, email, phoneNumber };
      await setDoc(doc(db, "users", phoneNumber), data);
      return { status: SUCCESS, data };
    } else {
      throw new Error("User Already Exist");
    }
  } catch (error) {
    return { status: ERROR, error: "Email already Exist." };
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
