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
export const subAttempDemoDocUser = async (
  userRef: DocumentReference<DocumentData, DocumentData>,
  currentAttemp: number,
) => {
  if (currentAttemp > 0) {
    await updateDoc(userRef, {
      attemptDemoGenerateDoc: currentAttemp - 1,
    });
  }
};
export const subAttempDemoCopyDocUser = async (
  userRef: DocumentReference<DocumentData, DocumentData>,
  currentAttemp: number,
) => {
  if (currentAttemp > 0) {
    await updateDoc(userRef, {
      attemptDemoCopyDoc: currentAttemp - 1,
    });
  }
};
