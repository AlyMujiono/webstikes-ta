import { getAuth } from "firebase-admin/auth";
import firebase_admin_app from "./adminConfig";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { auth } from "firebase-admin";

// const db = getFirestore(firebase_app);
var authentication = getAuth(firebase_admin_app);
export default async function createAccount(
  email: any,
  password: any,
  name: any
) {
  let result = null;
  let error = null;

	console.log(
		"data email ",
		email,
		" data password ",
		password,
		" data name ",
		name
	);
	console.log("get auth ", auth());
  // try {
    // await authentication
    //   .createUser({
    //     email: email,
    //     emailVerified: false,
    //     password: password,
    //     displayName: name,
    //   })
    //   .then((userRecord) => {
    //     // See the UserRecord reference doc for the contents of userRecord.
    //     result = userRecord;
    //     console.log("Successfully created new user:", userRecord.uid);
    //   })
    //   .catch((errors) => {
    //     error = errors;
    //     console.log("Error creating new user:", error);
    //   });
  // } catch (e) {
  //   error = e;
  // }

  return { result, error };
}
