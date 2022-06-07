import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebaseConfig.js";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";

export default function Admin() {
  const [reservas, setReservas] = useState([]);
  const [file, setFile] = useState(null);
  const [precio, setPrecio] = useState("");
  const [urlImg, setUrlImg] = useState("");
  const reservasColRef = collection(db, "reservas");

  const configColRef = doc(db, "config", 'IpzGOwuGAgKdv2NonbDf');
  const [config, setConfig] = useState({});

  useEffect(() => {
    const unsubReservas = onSnapshot(reservasColRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => doc.data());
      setReservas(docs);
      console.log("GUARDA QUE SE LLAMA");
    });

    const unsubConfig = onSnapshot(configColRef, (snapshot) => {
      console.log("snapshot:", snapshot.data());
      const data = snapshot.data();
      setConfig(data);
    });

    return () => {
      unsubReservas();
    };
  }, []);


  const uploadImage = () => {
    if (file == null) return;
    const imageRef = ref(storage, file.name);
    uploadBytes(imageRef, file).then((snapshot) => {
      console.log("Imagen cargada");
      getDownloadURL(snapshot.ref).then(url => {
        setUrlImg(url);
      }); 
    });
  };

  function update() {
    uploadImage();
    const config = {
      imgUrl: urlImg,
      precio: precio,
    };
    updateDoc(configColRef, config);
    console.log("config:", config);
  }

  return (
    <div>
      <div className="flex-container">
        <span>Precio actual: {config.precio}</span>
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
