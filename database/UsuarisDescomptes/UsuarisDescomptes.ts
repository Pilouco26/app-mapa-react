import {
  doc,
  setDoc,
  collection,
  getCountFromServer,
  getDocs,
} from 'firebase/firestore';
import {FIREBASE_DB} from '../../config/Firebase';
import 'firebase/firestore';

export async function addDiscountUser(idUser: string, idDescompte: string) {
  const db = FIREBASE_DB;
  const usersCol = collection(db, 'USUARIS_DESCOMPTES');
  const snapshot = await getCountFromServer(usersCol);
  const usersCount = snapshot.data().count;
  const userId = usersCount + 1;
  const userRef = doc(db, 'USUARIS_DESCOMPTES', userId.toString());

  await setDoc(userRef, {
    id: userId,
    idUser: idUser,
    idDescompte: idDescompte,
    actiu: true,
  });
}

export async function getAllDiscountsByIdUser(idUser: string) {
  const db = FIREBASE_DB;
  const usersCol = collection(db, 'USUARIS_DESCOMPTES');
  const discounts: string[] = [];

  try {
    const querySnapshot = await getDocs(usersCol);
    querySnapshot.docs.forEach(doc => {
      if (doc.data().idUser === idUser) {
        discounts.push(doc.data().idDescompte);
      }
    });

    return discounts.length > 0 ? discounts : null; // Return an array of discounts or null if none found
  } catch (error) {
    console.error('Error getting users:', error);
    return null;
  }
}
