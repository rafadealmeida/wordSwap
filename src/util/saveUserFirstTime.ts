import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../service/firebase/index';

const userRef = collection(db, `users`);

export const saveUserFirstTime = async (
  uid: string,
  email: string,
  displayName: string,
) => {
  await setDoc(doc(userRef, uid), {
    email: email,
    name: displayName,
    isDemo: false,
    isPremium: false,
    attemptDemo: 10,
  });
};
