import { useState, useEffect } from "react";
import { enviarCiudadConMejorBeneficio } from "./KataLonja";
import "bootstrap/dist/css/bootstrap.css";

export function KataForm() {
  const [cantidadVieiras, setCantidadVieiras] = useState(0);
  const [cantidadPulpo, setCantidadPulpo] = useState(0);
  const [cantidadCentollo, setCantidadCentollo] = useState(0);
  const [isWithValue, setIsValue] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  let mensajeCiudadBeneficio: string = "";

  useEffect(() => {
    if (isWithValue) {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);

        let ciudadConMejorBeneficio = enviarCiudadConMejorBeneficio(
          cantidadVieiras,
          cantidadPulpo,
          cantidadCentollo
        );
        mensajeCiudadBeneficio = `El lugar donde se recibira mayor beneficio será: ${ciudadConMejorBeneficio}`;
        // @ts-ignore: Object is possibly 'null'.
        document.getElementById("mensaje").innerHTML = mensajeCiudadBeneficio;
      }, 1000);
      setIsValue(false);
    }
  }, [isWithValue]);
  return (
    <div className="wrapper">
      {submitting && <div>Procesando formulario...</div>}
      <form className="col-lg-6 offset-lg-3 ">
        <h1 className="text-center"> KATA-LONJA </h1>

        <br />

        <div className="row justify-content-center">
          <label htmlFor="vieiraInput">Vieira (KG):</label>

          <input
            className="form-control"
            id="vieiraInput"
            pattern="[0-9]*"
            type="text"
            required
            onChange={(event) => {
              setCantidadVieiras(parseFloat(event.target.value));
              setIsValue(true);
            }}
            placeholder="Introduce kg de vieira"
          />
        </div>
        <small id="help" className="form-text text-muted">
          Introduce un valor númerico.
        </small>
        <br />
        <div className="row justify-content-center">
          <label htmlFor="pulpoInput">Pulpo (KG):</label>
          <input
            className="form-control"
            id="pulpoInput"
            pattern="[0-9]*"
            type="text"
            required
            onChange={(event) => {
              setCantidadPulpo(parseFloat(event.target.value));
              setIsValue(true);
            }}
            placeholder="Introduce kg de pulpo"
          />
        </div>
        <small id="help1" className="form-text text-muted">
          Introduce un valor númerico.
        </small>
        <br />
        <div className="row justify-content-center">
          <label htmlFor="centolloInput">Centollo (KG):</label>
          <input
            className="form-control"
            id="centolloInput"
            pattern="[0-9]*"
            type="text"
            required
            onChange={(event) => {
              setCantidadCentollo(parseFloat(event.target.value));
              setIsValue(true);
            }}
            placeholder="Introduce kg de centollo"
          />
        </div>
        <small id="help2" className="form-text text-muted">
          Introduce un valor númerico.
        </small>
        <br />

        <div className="col text-center">
          <hr />
          <p className="text-success" id="mensaje">
            {" "}
          </p>
        </div>
      </form>
    </div>
  );
}

export default KataForm;
