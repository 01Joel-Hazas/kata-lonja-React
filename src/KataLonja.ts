import { ICiudad, IPescado } from "./Interfaces/Interfaces";

export function enviarDatosReact(
  vieira: number,
  pulpo: number,
  centollo: number
) {
  let ciudades: ICiudad[] = [
    {
      nombreCiudad: "Madrid",
      precioPescados: {
        vieiras: 500,
        pulpo: 450,
        centollos: 0,
      },
      kmDistancia: 800,
    },
    {
      nombreCiudad: "Barcelona",
      precioPescados: {
        vieiras: 450,
        pulpo: 0,
        centollos: 120,
      },
      kmDistancia: 1100,
    },
    {
      nombreCiudad: "Lisboa",
      precioPescados: {
        vieiras: 600,
        pulpo: 500,
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
      cantidad: vieira,
    },

    {
      nombrePescado: "pulpo",
      cantidad: pulpo,
    },
    {
      nombrePescado: "centollo",
      cantidad: centollo,
    },
  ];

  function calcularCosteTransporte(kmDistancia: number): number {
    let costeInicial: number = 5;
    let costePorKm: number = 2;

    return costeInicial + kmDistancia * costePorKm;
  }

  function calcularDeprecio(porcentaje: number, distancia: number): number {
    let porcentajeKm: number = distancia / 100;
    let result: number = porcentajeKm * porcentaje;
    return result;
  }

  function calcularGananciasProductos(producto: IPescado, ciudad: ICiudad) {
    let deprecio = calcularDeprecio(1, ciudad.kmDistancia);

    let precioProd: number =
      producto.nombrePescado === "vieiras"
        ? ciudad.precioPescados.vieiras
        : producto.nombrePescado === "pulpo"
        ? ciudad.precioPescados.pulpo
        : ciudad.precioPescados.centollos;
    let precioCiudad = calcularPrecioCiudades(producto.cantidad, precioProd);
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

    return gananciasCiudad[2].nombreCiudad;
  }

  let resultado: string = calcularCiudadConMejorBeneficio(pescados, ciudades);
  console.log(resultado);
  return resultado;
}
