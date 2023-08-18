import { DocumentData, DocumentReference, updateDoc } from 'firebase/firestore';

export const subAttempDemoUser = async (
  userRef: DocumentReference<DocumentData, DocumentData>,
  currentAttemp: number,
) => {
  if (currentAttemp > 0) {
    await updateDoc(userRef, {
      attemptDemo: currentAttemp - 1,
    });
  }
};
