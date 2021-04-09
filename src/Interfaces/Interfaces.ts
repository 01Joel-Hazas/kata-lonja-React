export interface Ciudad {
  nombreCiudad: string;
  precioPescados: {
    vieiras: number;
    pulpos: number;
    centollos: number;
  };
  kmDistancia: number;
}

export interface Pescado {
  nombrePescado: string;
  cantidadKg: number;
}
