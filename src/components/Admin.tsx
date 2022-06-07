import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig.js";
import { v4 } from "uuid";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";

export default function Admin() {
  const [reservas, setReservas] = useState([]);
  const [file, setFile] = useState(null);
  const [precio, setPrecio] = useState("");
  const reservasColRef = collection(db, "reservas");
  const configColRef = doc(db, "config", 'IpzGOwuGAgKdv2NonbDf');

  useEffect(() => {
    const unsubscribe = onSnapshot(reservasColRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => doc.data());
      setReservas(docs);
      console.log("GUARDA QUE SE LLAMA");
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const uploadImage = () => {
    if (file == null) return;
    const imageRef = ref(storage, file.name + v4());
    uploadBytes(imageRef, file).then(() => {
      alert("Image Uploaded");
    });
  };

  function update() {
    uploadImage();
    const config = {
      imgUrl: file.name,
      precio: precio,
    };
    updateDoc(configColRef, config);
    console.log("config:", config);
  }

  return (
    <div>
      <div className="flex-container">
        <span>Precio actual: $0000</span>
        <div className="box3">
          <div>
            <label htmlFor="precio">Cambiar precio:</label>
            <input
              type="text"
              id="precio"
              className="input-precio"
              onChange={(event) => setPrecio(event.target.value)}
            />
          </div>
          <label className="custom-file-upload">
            <input
              type="file"
              onChange={(event) => setFile(event.target.files[0])}
            />
            Cambiar imagen
          </label>
        </div>
        <button className="btn-guardar" onClick={() => update()}>
          Guardar
        </button>
      </div>
      <h4 className="mt">Lista de reservas</h4>
      <ul>
        {reservas.map((reserva) => (
          <li key={reserva.uid}>
            Nombre: {reserva.nombre}, Lugar: {reserva.lugar}, Personas:{" "}
            {reserva.personas}
          </li>
        ))}
      </ul>
    </div>
  );
}
