export type TerritoryFamily = 'diseno' | 'patronaje' | 'materiales' | 'costura' | 'ajuste' | 'exteriores' | 'comun';

const map: Record<string, TerritoryFamily> = {
  LINEUP: 'diseno', SKETCH: 'diseno', CONCEPTO: 'diseno', 'DISEÑO': 'diseno',
  IDENTIDAD: 'diseno', ESTETICA: 'diseno', EDITORIAL: 'diseno', FOTOS: 'diseno',
  PATRONAJE: 'patronaje', PLANO: 'patronaje', CORTE: 'patronaje', BIES: 'patronaje', PROTOTIPOS: 'patronaje',
  MATERIALES: 'materiales', HILO: 'materiales', FORRO: 'materiales', FORNITURAS: 'materiales',
  PUNTO: 'materiales', RELLENO: 'materiales', PARCHE: 'materiales',
  COSTURA: 'costura', ACABADOS: 'costura', CODIGOS: 'costura', PRENDA: 'costura',
  CUERPO: 'ajuste', ARREGLO: 'ajuste', AJUSTE: 'ajuste', HOLGURA: 'ajuste',
  'CEÑIDO': 'ajuste', COMODIDAD: 'ajuste', PERCHA: 'ajuste',
  EXTERIORES: 'exteriores', INTEMPERIE: 'exteriores', COLOR: 'exteriores',
  TIENDA: 'exteriores', PRECIOS: 'exteriores',
  'COMÚN': 'comun',
};

export function territoryFamily(name: string): TerritoryFamily {
  return map[name] ?? 'comun';
}

export const FAMILY_NAMES: Record<TerritoryFamily, string> = {
  diseno: 'Diseño / Concepción',
  patronaje: 'Patronaje / Construcción 2D',
  materiales: 'Materiales / Materia',
  costura: 'Costura / Ensamblaje',
  ajuste: 'Ajuste / Cuerpo y forma',
  exteriores: 'Exteriores / Contexto',
  comun: 'Común',
};
