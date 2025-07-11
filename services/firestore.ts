import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "@react-native-firebase/firestore";

export class FirestoreService {
  private static instance: FirestoreService;
  private db;

  private constructor() {
    this.db = getFirestore();
  }

  static getInstance() {
    if (!FirestoreService.instance) {
      FirestoreService.instance = new FirestoreService();
    }
    return FirestoreService.instance;
  }

  async fetchNestedDocument(docPath: string) {
    try {
      const docRef = doc(this.db, docPath);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
        };
      } else {
        console.warn(`Document not found at path: ${docPath}`);
        return null;
      }
    } catch (error) {
      console.error("Error fetching nested document:", error);
      throw error;
    }
  }

  async fetchContenidosByModule(moduleId: string) {
    try {
      const contenidosRef = collection(
        this.db,
        `modules/${moduleId}/contenidos`,
      );
      const querySnapshot = await getDocs(contenidosRef);

      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return results;
    } catch (error) {
      console.error("Error fetching contenidos:", error);
      throw error;
    }
  }

  async fetchPreguntasByContenido(moduleId: string, contenidoId: string) {
    try {
      const preguntasRef = collection(
        this.db,
        `modules/${moduleId}/contenidos/${contenidoId}/preguntas`,
      );
      const querySnapshot = await getDocs(preguntasRef);

      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return results;
    } catch (error) {
      console.error("Error fetching preguntas:", error);
      throw error;
    }
  }

  async fetchNestedCollection(path: string): Promise<any[]> {
    const ref = collection(this.db, path);
    const snapshot = await getDocs(ref);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }

}


