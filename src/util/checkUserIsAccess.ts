import { doc, getDoc } from 'firebase/firestore';
import { db } from '../service/firebase/index';
import { subAttempDemoUser } from './subAttempDemoUser';

export const checkUserIsAccess = async (uid: string) => {
  const userRef = doc(db, `users`, uid);

  try {
    const response = await getDoc(userRef);
    const user = response.data() as UserDb;
    if (user.isDemo && user.attemptDemo > 0) {
      await subAttempDemoUser(userRef, user.attemptDemo);
      return true;
    }
    if (user.isPremium) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
