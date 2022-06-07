import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { v4 } from "uuid";
import { Reserva } from "../models/Reserva";

function Form() {
  const [nombre, setNombre] = useState("");
  const [lugar, setLugar] = useState("");
  const [personas, setPersonas] = useState("");
  const arrayLugares = ["Bariloche", "Tucuman", "Cordoba"];
  const arrayPersonas = ["2", "4", "6"];

  //Firebase collection
  const reservasColRef = collection(db, "reservas");

  //LLAMAR A LA CONFIG PARA SACAR EL SRC Y EL PRECIO
  const configColRef = collection(db, "config");
  const [config, setConfig] = useState({});

  useEffect(() => {
    const unsubscribe = onSnapshot(configColRef, (snapshot) => {
      const docs = snapshot.docs.map((doc) => doc.data());
      setConfig(docs);
      console.log("Esta es la config:", config);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function update() {
    const reserva: Reserva = {
      nombre: nombre,
      lugar: lugar,
      personas: personas,
      uid: v4(),
    };
    addDoc(reservasColRef, reserva);
    console.log("state:", reserva);
  }

  return (
    <div>
      <div className="box2">
        <img src="" className="img" alt="img" />
        <h4>Precio: $0000</h4>
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
