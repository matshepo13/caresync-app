import { firestore } from '@/services/firebase';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

export async function checkIdInFirestore(idNumber: string): Promise<boolean> {
    const usersRef = collection(firestore, 'PatientList');
    const q = query(usersRef, where('idNumber', '==', idNumber));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

export async function getUserDetails(id: string) {
  console.log('Querying PatientList for ID:', id);
  const usersRef = collection(firestore, 'PatientList');
  const userDoc = doc(usersRef, id);
  const userSnapshot = await getDoc(userDoc);
  
  if (userSnapshot.exists()) {
    const userData = userSnapshot.data();
    console.log('Fetched user data:', userData);
    return userData;
  }
  console.log('No user found with ID:', id);
  return null;
}
