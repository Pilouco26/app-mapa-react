import {
  doc,
  setDoc,
  collection,
  getCountFromServer,
  getDocs,
} from 'firebase/firestore';
import {FIREBASE_DB} from '../../config/Firebase';
import 'firebase/firestore';

export async function createNewUserCollection(
  name: string,
  email: string,
  actiu: boolean,
) {
  const db = FIREBASE_DB;
  const usersCol = collection(db, 'USUARIS');
  const snapshot = await getCountFromServer(usersCol);
  const usersCount = snapshot.data().count;
  const userId = usersCount + 1;
  const userRef = doc(db, 'USUARIS', userId.toString());

  await setDoc(userRef, {
    id: userId,
    name: name,
    email: email,
    actiu: actiu,
  });
}
export async function getNameByEmail(email: string) {
  const db = FIREBASE_DB;
  const usersCol = collection(db, 'USUARIS');

  try {
    const querySnapshot = await getDocs(usersCol);
    const matchingUser = querySnapshot.docs.find(
      doc => doc.data().email === email,
    );

    if (matchingUser) {
      return matchingUser.data().name;
    } else {
      return null; // No user found with the given email
    }
  } catch (error) {
    console.error('Error getting users:', error);
    return null;
  }
}
export async function getIdByEmail(email: string) {
  const db = FIREBASE_DB;
  const usersCol = collection(db, 'USUARIS');

  try {
    const querySnapshot = await getDocs(usersCol);
    const matchingUser = querySnapshot.docs.find(
      doc => doc.data().email === email,
    );

    if (matchingUser) {
      return matchingUser.data().id;
    } else {
      return null; // No user found with the given email
    }
  } catch (error) {
    console.error('Error getting users:', error);
    return null;
  }
}
