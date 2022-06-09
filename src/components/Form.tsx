import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { Reserva } from "../models/Reserva";
import { configColRef, reservasColRef } from "../firebaseConfig";
import fireService from "../services/fireService.js";

function Form() {
  const [nombre, setNombre] = useState("");
  const [lugar, setLugar] = useState("");
  const [personas, setPersonas] = useState("");
  const [config, setConfig] = useState({});

  //ESTO DEBERIA IR EN OTRO LADO
  const arrayLugares = ["Bariloche", "Tucuman", "Cordoba"];
  const arrayPersonas = ["2", "4", "6"];

  useEffect(() => {
    fireService.get(configColRef, setConfig, 'config');
  }, []);

  function update() {
    const reserva: Reserva = {
      nombre: nombre,
      lugar: lugar,
      personas: personas,
      uid: v4(),
    };
    fireService.update(reservasColRef, reserva);
  }

  return (
    <div>
      <div className="box2">
        <img src={config.imgUrl} className="img" alt="img" />
        <h4>Precio: {config.precio}</h4>
      </div>
      <hr />
      <div className="box">
        <label htmlFor="nombre">Nombre:</label>
        <input
          className="select"
          type="text"
          id="nombre"
          onChange={(event) => setNombre(event.target.value)}
        />
        <label className="mt">Lugar:</label>
        <select
          className="select"
          onChange={(event) => setLugar(event.target.value)}
        >
          {arrayLugares.map((el) => (
            <option value={el} key={el}>
              {" "}
              {el}{" "}
            </option>
          ))}
        </select>
        <label className="mt">Personas:</label>
        <select
          className="select"
          onChange={(event) => setPersonas(event.target.value)}
        >
          {arrayPersonas.map((el) => (
            <option value={el} key={el}>
              {" "}
              {el}{" "}
            </option>
          ))}
        </select>
        <button className="btn" onClick={() => update()}>
          Enviar
        </button>
      </div>
    </div>
  );
}

export default Form;
