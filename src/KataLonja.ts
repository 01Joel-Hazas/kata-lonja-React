
 export function enviarDatosReact(vieira:number, pulpo:number, centollo:number){

  function calcularPrecioCiudades(producto:any, kilos:any, ciudad:any) {
    let precioProductoPorCiudad:any = {
      vieira: { Madrid: 500, Barcelona: 450, Lisboa: 600 },
      centollo: { Madrid: 450, Barcelona: 0, Lisboa: 500 },
      pulpo: { Madrid: 0, Barcelona: 120, Lisboa: 100 }
    };

    let preciosProducto:any = precioProductoPorCiudad[producto];
    let preciosProductoPorCiudad:any  = preciosProducto[ciudad];

    return preciosProductoPorCiudad * kilos;

  }

  let kgProductos = {
    'vieira': vieira,
    'pulpo': pulpo,
    'centollo': centollo
  };

  let kmDistancias:any = {
    'Madrid' : 800,
    'Barcelona' : 1100,
    'Lisboa' : 600
  };
  
  function calcularCosteTransporte(ciudad:any):number{
    let costeInicial:number = 5;
    let costePorKm:number = 2;

    return costeInicial + kmDistancias[ciudad]* costePorKm;
  }
  

  function calcularDeprecio(porcentaje:number, distancia:number):number{
    let porcentajeKm:number = distancia / 100;
    let result:number = porcentajeKm * porcentaje;
    return result;
  }
  
  function calcularGananciasProductos(producto:any, kilos:any, ciudad:any){
    let deprecio = calcularDeprecio(1, kmDistancias[ciudad]);
    let precioCiudad = calcularPrecioCiudades(producto, kilos, ciudad);
    let precioRebajado = precioCiudad * (100 - deprecio) / 100;
    return precioRebajado - calcularCosteTransporte(ciudad);
  }

  function calcularGananciasPorCiudades(productos:any, ciudad:any){

    let gananciasVieira:number = calcularGananciasProductos('vieira', productos.vieira, ciudad);
    let gananciasPulpo:number = calcularGananciasProductos('pulpo', productos.pulpo, ciudad);
    let gananciasCentollo:number = calcularGananciasProductos('centollo', productos.centollo, ciudad);

    console.log("Los beneficios de vieira son:" + gananciasVieira);
    console.log("Los beneficios de pulpo son:" + gananciasPulpo);
    console.log("Los beneficios de centollo son:" + gananciasCentollo);

    return gananciasVieira + gananciasPulpo + gananciasCentollo;
   
  }
  
  function calcularCiudadConMejorBeneficio(productos:any, ciudades:any){

  let gananciasCiudad = ciudades.map(function(ciudad:any){
                          return {
                            ganacia: calcularGananciasPorCiudades(productos, ciudad),
                            nombreCiudad:ciudad
                          };
                        });
                        
  return gananciasCiudad.reduce().nombreCiudad;
  
}

// console.log( "La ciudad con mejor margen de beneficio es:" + calcularCiudadConMejorBeneficio(kgProductos,kmDistancias));

}


