export interface ICiudad{
    nombreCiudad:string,
    precioPescados:{
        vieiras:number, 
        pulpo:number,
        centollos:number
    },
    kmDistancia: number
}

export interface IPescado{
    nombrePescado:string,
    cantidad: number
}