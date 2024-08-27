import { firestore } from '@/services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export async function checkIdInFirestore(idNumber: string, collectionName: string): Promise<boolean> {
    const usersRef = collection(firestore, collectionName);
    const q = query(usersRef, where('licenseNumber', '==', idNumber));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

export async function getUserDetails(medicalRecordNumber: string) {
  console.log('Querying DoctorsList for Medical Record Number:', medicalRecordNumber); // Debugging statement
  const usersRef = collection(firestore, 'DoctorsList');
  const q = query(usersRef, where('licenseNumber', '==', medicalRecordNumber));
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    const userData = querySnapshot.docs[0].data();
    console.log('Fetched user data:', userData); // Debugging statement
    return userData;
  }
  console.log('No user found with Medical Record Number:', medicalRecordNumber); // Debugging statement
  return null;
}