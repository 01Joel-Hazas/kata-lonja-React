import "./App.css";
import { useState } from "react";
import { enviarDatosReact } from "./KataLonja";
import "bootstrap/dist/css/bootstrap.css";

let vieira: number = 0;
let pulpo: number = 0;
let centollo: number = 0;

function KataForm() {
  const [submitting, setSubmitting] = useState(false);
  function handleSubmit(event: any) {
    // console.dir(event.target)
    event.preventDefault();

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      vieira = 0;
      vieira = event.target.elements.vieiraInput.value;
      console.log(vieira);

      pulpo = 0;
      pulpo = event.target.elements.pulpoInput.value;
      console.log(pulpo);

      centollo = 0;
      centollo = event.target.elements.centolloInput.value;
      console.log(centollo);

      // Llamada a función global de katalonja.ts
      var ciudadConMejorBeneficio = enviarDatosReact(vieira, pulpo, centollo);
      alert(
        `El lugar donde se recibira mayor beneficio será: ${ciudadConMejorBeneficio}`
      );
    }, 1000);
  }

  return (
    <div className="wrapper">
      {submitting && <div>Procesando formulario...</div>}
      <form className="col-lg-6 offset-lg-3 " onSubmit={handleSubmit}>
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
            placeholder="Introduce kg de centollo"
          />
        </div>
        <small id="help2" className="form-text text-muted">
          Introduce un valor númerico.
        </small>
        <br />

        <div className="col text-center">
          <button type="submit" className="btn btn-primary">
            ENVIAR
          </button>
        </div>
      </form>
    </div>
  );
}

export default KataForm;
