import { Ciudad, Pescado } from "./Interfaces/Interfaces";

export function enviarCiudadConMejorBeneficio(
  vieiraReact: number,
  pulpoReact: number,
  centolloReact: number
) {
  const costeInicial: number = 5;
  const costePorKm: number = 2;
  const porcentaje: number = 1;

  let ciudades: Ciudad[] = [
    {
      nombreCiudad: "Madrid",
      precioPescados: {
        vieiras: 500,
        pulpos: 0,
        centollos: 450,
      },
      kmDistancia: 800,
    },
    {
      nombreCiudad: "Barcelona",
      precioPescados: {
        vieiras: 450,
        pulpos: 120,
        centollos: 0,
      },
      kmDistancia: 1100,
    },
    {
      nombreCiudad: "Lisboa",
      precioPescados: {
        vieiras: 600,
        pulpos: 100,
        centollos: 500,
      },
      kmDistancia: 600,
    },
  ];

  let pescados: Pescado[] = [
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

  function calcularPrecioCiudades(producto: number, precioProducto: number) {
    return producto * precioProducto;
  }
  function calcularCosteTransporte(kmDistancia: number): number {
    return costeInicial + kmDistancia * costePorKm;
  }

  function calcularDeprecio(porcentaje: number, distancia: number): number {
    let porcentajeKm: number = distancia / 100;
    let deprecio: number = porcentajeKm * porcentaje;
    return deprecio;
  }

  function calcularGananciasProductos(producto: Pescado, ciudad: Ciudad) {
    let deprecio = calcularDeprecio(porcentaje, ciudad.kmDistancia);
    let precioProducto: number;

    if (producto.nombrePescado === "vieiras") {
      precioProducto = ciudad.precioPescados.vieiras;
    } else {
      if (producto.nombrePescado === "pulpo") {
        precioProducto = ciudad.precioPescados.pulpos;
      } else {
        precioProducto = ciudad.precioPescados.centollos;
      }
    }

    let precioCiudad = calcularPrecioCiudades(
      producto.cantidadKg,
      precioProducto
    );
    let precioRebajado = (precioCiudad * (100 - deprecio)) / 100;
    return precioRebajado - calcularCosteTransporte(ciudad.kmDistancia);
  }

  function calcularGananciasPorCiudades(productos: Pescado[], ciudad: Ciudad) {
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

    return gananciasVieira + gananciasPulpo + gananciasCentollo;
  }

  function calcularCiudadConMejorBeneficio(
    productos: Pescado[],
    ciudades: Ciudad[]
  ) {
    let gananciasCiudad: { ganancia: number; nombreCiudad: string }[] = [];

    gananciasCiudad = ciudades.map((ciudad) => {
      return {
        ganancia: calcularGananciasPorCiudades(productos, ciudad),
        nombreCiudad: ciudad.nombreCiudad,
      };
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

  return ciudadMejorBeneficio;
}
