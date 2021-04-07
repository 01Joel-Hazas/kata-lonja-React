"use strict";
exports.__esModule = true;
exports.enviarDatosReact = void 0;
function enviarDatosReact(vieira, pulpo, centollo) {
    function calcularPrecioCiudades(producto, kilos, ciudad) {
        var precioProductoPorCiudad = {
            vieira: { Madrid: 500, Barcelona: 450, Lisboa: 600 },
            centollo: { Madrid: 450, Barcelona: 0, Lisboa: 500 },
            pulpo: { Madrid: 0, Barcelona: 120, Lisboa: 100 }
        };
        var preciosProducto = precioProductoPorCiudad[producto];
        var preciosProductoPorCiudad = preciosProducto[ciudad];
        return preciosProductoPorCiudad * kilos;
    }
    var kgProductos = {
        'vieira': vieira,
        'pulpo': pulpo,
        'centollo': centollo
    };
    var kmDistancias = {
        'Madrid': 800,
        'Barcelona': 1100,
        'Lisboa': 600
    };
    function calcularCosteTransporte(ciudad) {
        var costeInicial = 5;
        var costePorKm = 2;
        return costeInicial + kmDistancias[ciudad] * costePorKm;
    }
    function calcularDeprecio(porcentaje, distancia) {
        var porcentajeKm = distancia / 100;
        var result = porcentajeKm * porcentaje;
        return result;
    }
    function calcularGananciasProductos(producto, kilos, ciudad) {
        var deprecio = calcularDeprecio(1, kmDistancias[ciudad]);
        var precioCiudad = calcularPrecioCiudades(producto, kilos, ciudad);
        var precioRebajado = precioCiudad * (100 - deprecio) / 100;
        return precioRebajado - calcularCosteTransporte(ciudad);
    }
    function calcularGananciasPorCiudades(productos, ciudad) {
        var gananciasVieira = calcularGananciasProductos('vieira', productos.vieira, ciudad);
        var gananciasPulpo = calcularGananciasProductos('pulpo', productos.pulpo, ciudad);
        var gananciasCentollo = calcularGananciasProductos('centollo', productos.centollo, ciudad);
        console.log("Los beneficios de vieira son:" + gananciasVieira);
        console.log("Los beneficios de pulpo son:" + gananciasPulpo);
        console.log("Los beneficios de centollo son:" + gananciasCentollo);
        return gananciasVieira + gananciasPulpo + gananciasCentollo;
    }
    function calcularCiudadConMejorBeneficio(productos, ciudades) {
        var gananciasCiudad = ciudades.map(function (ciudad) {
            return {
                ganacia: calcularGananciasPorCiudades(productos, ciudad),
                nombreCiudad: ciudad
            };
        });
        return gananciasCiudad.reduce().nombreCiudad;
    }
    // console.log( "La ciudad con mejor margen de beneficio es:" + calcularCiudadConMejorBeneficio(kgProductos,kmDistancias));
}
exports.enviarDatosReact = enviarDatosReact;
