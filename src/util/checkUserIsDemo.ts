import { doc, getDoc } from 'firebase/firestore';
import { db } from '../service/firebase/index';
import { subAttempDemoDocUser } from './subAttempDemoUser';

export const checkUserIsDemo = async (uid: string) => {
  const userRef = doc(db, `users`, uid);

  try {
    const response = await getDoc(userRef);
    const user = response.data() as UserDb;
    if (user.isDemo && user.attemptDemoGenerateDoc > 0) {
      await subAttempDemoDocUser(userRef, user.attemptDemoGenerateDoc);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};
