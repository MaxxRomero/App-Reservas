import React, { useEffect, useState } from "react";
import { reservasColRef, configColRef } from "../firebaseConfig";
import fireService from "../services/fireService.js";
import { Config } from "../models/Config";

export default function Admin() {
  const [reservas, setReservas] = useState([]);
  const [file, setFile] = useState(null);
  const [precio, setPrecio] = useState("");
  const [urlImg, setUrlImg] = useState("");
  const [config, setConfig] = useState({});

  useEffect(() => {
    fireService.get(reservasColRef, setReservas);
    fireService.get(configColRef, setConfig, 'config');
  }, []);


  function update() {
    fireService.uploadImage(file, setUrlImg);
    const config: Config = {
      imgUrl: urlImg,
      precio: precio,
    };
    //ARREGLAR ESTO FIXME:, TIENE QUE HABER UN LOADING O QUIZA NO CARGAR LA IMAGEN CUANDO SE UPDATEA Y HACERLO EN OTRO MOMENTO
    urlImg === '' ? alert("ESPERANDO QUE CARGUE LA IMAGEN") : fireService.update(configColRef, config);
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
