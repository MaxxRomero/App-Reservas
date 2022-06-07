import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";

export default function Admin() {
  const [reservas, setReservas] = useState([]);
  const [file, setFile] = useState([]);
  const reservasColRef = collection(db, "reservas");

  function uploadImg(e) {
    setFile(e.target.files[0]);
    console.log("El archivo es: ", file);
  }


  useEffect(() => {
    const unsubscribe = onSnapshot(reservasColRef, snapshot => {
      const docs = snapshot.docs.map(doc => doc.data());
      setReservas(docs);   
      console.log("GUARDA QUE SE LLAMA");
    });

    return () => {
      unsubscribe();
    }
  }, []);

  return (
  <div>
    <div className="box3">
      <div>
        <label htmlFor="precio">Cambiar precio:</label>
        <input type="text" id="precio" className="input-precio" />
      </div>
      <label className="custom-file-upload">
      <input type="file" onChange={uploadImg}/>
        Cambiar imagen
      </label>
    </div>
    <h4 className="mt">Lista de reservas</h4>
    <ul>
      { reservas.map(reserva => <li key={ reserva.uid }>Nombre: { reserva.nombre }, Lugar: { reserva.lugar }, Personas: {reserva.personas }</li>) }
    </ul>
  </div>
  );
}
