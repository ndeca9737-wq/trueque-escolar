export const CATEGORIAS = ['Redes e Infraestructura', 'Programación / Sistemas', 'Materias Generales', 'Herramientas de Taller']

// tipo: 'canje' | 'disponible' | 'busco'
export const PUBLICACIONES_INICIALES = [
  { id: 1, destacado: true, tipo: 'canje', cat: 'Redes e Infraestructura', accion: 'INICIAR CHAT DE CANJE →',
    titulo: 'Carpeta Completa + Laboratorios de Redes e Infraestructura (5° Año)',
    detalle: 'Ofrecido por Cande (5°P) — Incluye esquemas de topologías y guías de comandos.' },
  { id: 2, tipo: 'disponible', cat: 'Programación / Sistemas', accion: 'LO QUIERO',
    titulo: 'Kit de Desarrollo ESP32 + Módulos de Sensores',
    detalle: 'Ofrecido por Lucas (5°P) — Ideal para proyectos de Sistemas y Feria de Ciencias.' },
  { id: 3, tipo: 'disponible', cat: 'Programación / Sistemas', accion: 'CONTACTAR',
    titulo: 'Apuntes y Guías de Ejercicios de C++ / Javascript',
    detalle: 'Ofrecido por Mateo (4°B) — Código comentado y resuelto.' },
  { id: 4, tipo: 'disponible', cat: 'Materias Generales', accion: 'CONTACTAR',
    titulo: 'Libro de Lengua y Literatura 4° + Guía de Lecturas',
    detalle: 'Ofrecido por Marcos (4°A) — Completo, estado impecable.' },
  { id: 5, tipo: 'busco', cat: 'Herramientas de Taller', accion: 'TENGO UNA',
    titulo: 'Calculadora Científica Casio fx-95 o similar',
    detalle: 'Requerido por Ana (2°A) — Para clases de Matemática y Física.' },
]

export const ESTADOS = {
  canje: { etiqueta: 'EN CANJE', clase: 'trade' },
  disponible: { etiqueta: 'DISPONIBLE', clase: 'available' },
  busco: { etiqueta: 'BUSCANDO', clase: 'looking' },
}
