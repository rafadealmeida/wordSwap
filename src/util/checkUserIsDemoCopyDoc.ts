import { doc, getDoc } from 'firebase/firestore';
import { db } from '../service/firebase/index';
import { subAttempDemoCopyDocUser } from './subAttempDemoUser';

export const checkUserIsDemoCopyDoc = async (uid: string) => {
  const userRef = doc(db, `users`, uid);

  try {
    const response = await getDoc(userRef);
    const user = response.data() as UserDb;
    if (user.isDemo && user.attemptDemoCopyDoc > 0) {
      await subAttempDemoCopyDocUser(userRef, user.attemptDemoCopyDoc);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
