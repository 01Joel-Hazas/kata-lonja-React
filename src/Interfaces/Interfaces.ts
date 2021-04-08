export interface ICiudad {
  nombreCiudad: string;
  precioPescados: {
    vieiras: number;
    pulpos: number;
    centollos: number;
  };
  kmDistancia: number;
}

export interface IPescado {
  nombrePescado: string;
  cantidadKg: number;
}
