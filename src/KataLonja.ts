import { ICiudad, IPescado } from "./Interfaces/Interfaces";

export function enviarDatosReact(
  vieiraReact: number,
  pulpoReact: number,
  centolloReact: number
) {
  //  Author: Joel Hazas

  let ciudades: ICiudad[] = [
    {
      nombreCiudad: "Madrid",
      precioPescados: {
        vieiras: 500,
        pulpos: 450,
        centollos: 0,
      },
      kmDistancia: 800,
    },
    {
      nombreCiudad: "Barcelona",
      precioPescados: {
        vieiras: 450,
        pulpos: 0,
        centollos: 120,
      },
      kmDistancia: 1100,
    },
    {
      nombreCiudad: "Lisboa",
      precioPescados: {
        vieiras: 600,
        pulpos: 500,
        centollos: 100,
      },
      kmDistancia: 600,
    },
  ];

  function calcularPrecioCiudades(producto: number, precioProducto: number) {
    return producto * precioProducto;
  }
  let pescados: IPescado[] = [
    {
      nombrePescado: "vieiras",
      cantidadKg: vieiraReact,
    },

    {
      nombrePescado: "pulpo",
      cantidadKg: pulpoReact,
    },
    {
      nombrePescado: "centollo",
      cantidadKg: centolloReact,
    },
  ];

  function calcularCosteTransporte(kmDistancia: number): number {
    let costeInicial: number = 5;
    let costePorKm: number = 2;

    return costeInicial + kmDistancia * costePorKm;
  }

  function calcularDeprecio(porcentaje: number, distancia: number): number {
    let porcentajeKm: number = distancia / 100;
    let deprecio: number = porcentajeKm * porcentaje;
    return deprecio;
  }

  function calcularGananciasProductos(producto: IPescado, ciudad: ICiudad) {
    let deprecio = calcularDeprecio(1, ciudad.kmDistancia);

    let precioProducto: number =
      producto.nombrePescado === "vieiras"
        ? ciudad.precioPescados.vieiras
        : producto.nombrePescado === "pulpo"
        ? ciudad.precioPescados.pulpos
        : ciudad.precioPescados.centollos;
    let precioCiudad = calcularPrecioCiudades(
      producto.cantidadKg,
      precioProducto
    );
    let precioRebajado = (precioCiudad * (100 - deprecio)) / 100;
    return precioRebajado - calcularCosteTransporte(ciudad.kmDistancia);
  }

  function calcularGananciasPorCiudades(
    productos: IPescado[],
    ciudad: ICiudad
  ) {
    let gananciasVieira: number = calcularGananciasProductos(
      pescados[0],
      ciudad
    );
    let gananciasPulpo: number = calcularGananciasProductos(
      pescados[1],
      ciudad
    );
    let gananciasCentollo: number = calcularGananciasProductos(
      pescados[2],
      ciudad
    );

    console.log("Los beneficios de vieira son:" + gananciasVieira);
    console.log("Los beneficios de pulpo son:" + gananciasPulpo);
    console.log("Los beneficios de centollo son:" + gananciasCentollo);

    return gananciasVieira + gananciasPulpo + gananciasCentollo;
  }

  function calcularCiudadConMejorBeneficio(
    productos: IPescado[],
    ciudades: ICiudad[]
  ) {
    let gananciasCiudad: { ganancia: number; nombreCiudad: string }[] = [];
    ciudades.forEach((ciudad) => {
      gananciasCiudad.push({
        ganancia: calcularGananciasPorCiudades(productos, ciudad),
        nombreCiudad: ciudad.nombreCiudad,
      });
    });

    gananciasCiudad.sort((a, b) => {
      if (a.ganancia > b.ganancia) {
        return -1;
      }
      return a.ganancia < b.ganancia ? 1 : 0;
    });

    return gananciasCiudad[0].nombreCiudad;
  }

  let ciudadMejorBeneficio: string = calcularCiudadConMejorBeneficio(
    pescados,
    ciudades
  );
  console.log(ciudadMejorBeneficio);
  return ciudadMejorBeneficio;
}
