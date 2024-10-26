import { firestore } from '@/services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function checkIdInFirestore(idNumber: string): Promise<boolean> {
    const usersRef = collection(firestore, 'PatientList');
    const q = query(usersRef, where('idNumber', '==', idNumber));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

export async function getUserDetails(idNumber: string) {
  console.log('Querying PatientList for ID Number:', idNumber); // Debugging statement
  const usersRef = collection(firestore, 'PatientList');
  const q = query(usersRef, where('idNumber', '==', idNumber));
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    const userData = querySnapshot.docs[0].data();
    console.log('Fetched user data:', userData); // Debugging statement
    return userData;
  }
  console.log('No user found with ID Number:', idNumber); // Debugging statement
  return null;
}
