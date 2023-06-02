import {getDocs, addDoc, updateDoc, deleteDoc, doc, Firestore, CollectionReference, DocumentData} from 'firebase/firestore';
import { booksCollectionRef } from '../firebase-config';
import { BookType } from '../store/booksList';

interface IBookEntities {
  name?: string
  authors?: string[]
  date?: number
  ISBN?: string
}

export const getCollectionRef = (collectionRef: CollectionReference<DocumentData>) => (
  (id: string) => doc(collectionRef, id)
);

export const fireStoreBooksApi = () => {
  const booksCollection = getCollectionRef(booksCollectionRef);

  const getBooks = async () => {
    const response = await getDocs(booksCollectionRef);
    
    return response.docs.map(doc => ({...doc.data() as BookType, id: doc.id}))
  }

  const createBook = async (values: IBookEntities) => await addDoc(booksCollectionRef, values);
  
  //@ts-ignore
  const updateBook = async (id: string, values: IBookEntities) => await updateDoc(booksCollection(id), values);
  
  const deleteBook = async (id: string) => await deleteDoc(booksCollection(id))

  return {
    get: getBooks,
    create: createBook,
    update: updateBook,
    delete: deleteBook
  }
}