import { onSnapshot } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { storage } from "../firebaseConfig.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const fireService = {

  //Get docs of collections from firebase
   get: function(colref, set, type) {
    onSnapshot(colref, (snapshot) => {
      let docs = [];
      type === 'config' ? docs = snapshot.data() : docs = snapshot.docs.map((doc) => doc.data());
      console.log("EL DOC SERIA:", docs);
      set(docs);
    });
   },

   //Update new doc to firebase
    update: function(colref, doc) {
    const docToUpdate = doc;
    updateDoc(colref, docToUpdate);
    console.log("doc:", doc);
  },


   //Upload img to firebase
   uploadImage: function(file, set) {
    if (file == null) return;
    const imageRef = ref(storage, file.name);
    uploadBytes(imageRef, file).then((snapshot) => {
      console.log("Imagen cargada");
      getDownloadURL(snapshot.ref).then(url => {
        set(url);
      }); 
    });
  }
}

export default fireService;
