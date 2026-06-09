# TP N°4 — Optimización con memo, useMemo y useCallback

**Materia:** Taller de Lenguajes de Programación III (React Native)  
**Docente:** Rolón Lautaro Emanuel  
**Docente auxiliar:** Mereles Juliana Aracelli  
**Alumnos:** Augusto · Fabricio

---

## Descripción

Extensión del TP N°3 (Estado Global con Context API y useReducer) incorporando técnicas de **optimización de rendimiento** en React mediante `memo`, `useMemo` y `useCallback`.

---

## Estructura relevante

```
frontend/src/
├── context/
│   ├── JugadoresContext.jsx   ← useMemo + useCallback en funciones CRUD
│   └── jugadoresReducer.js    ← Reducer (sin cambios)
├── components/
│   ├── Formulario.jsx         ← memo + useCallback en envío del form
│   └── JugadorItem.jsx        ← memo para evitar rerenders
└── App.jsx                    ← useMemo en filtrado + useCallback en búsqueda
```

---

## Optimizaciones aplicadas

### `memo`

Evita que un componente se vuelva a renderizar si sus props no cambiaron.

| Componente     | Aplicación                                                      |
|----------------|-----------------------------------------------------------------|
| `JugadorItem`  | `export default memo(JugadorItem)` — no rerenderiza si el jugador no cambió |
| `Formulario`   | `export default memo(Formulario)` — no rerenderiza si las funciones del context no cambiaron |

---

### `useMemo`

Memoriza el resultado de un cálculo costoso, recalculando solo cuando cambian sus dependencias.

**En `App.jsx` — filtrado de jugadores:**
```js
const filtrados = useMemo(() =>
  listaJugadores.filter(j =>
    j.nombre.toLowerCase().includes(busqueda.toLowerCase())
  ),
  [listaJugadores, busqueda]
);
```
Sin `useMemo`, el filtro se recalcula en cada render aunque la lista y la búsqueda no hayan cambiado.

**En `JugadoresContext.jsx` — valor del Provider:**
```js
const value = useMemo(() => ({
  jugadores, cargando, error, jugadorEnEdicion,
  agregarJugador, eliminarJugador, iniciarEdicion, guardarEdicion, cancelarEdicion,
}), [jugadores, cargando, error, jugadorEnEdicion, ...]);
```
Evita que todos los consumidores del Context rerenderizen cuando el Provider lo hace por razones internas.

---

### `useCallback`

Memoriza una función para que no se recree en cada render, manteniendo la misma referencia mientras sus dependencias no cambien.

| Función              | Archivo                  | Dependencias                   |
|----------------------|--------------------------|--------------------------------|
| `handleSearchChange` | `App.jsx`                | `[setBusqueda]`                |
| `agregarJugador`     | `JugadoresContext.jsx`   | `[]`                           |
| `eliminarJugador`    | `JugadoresContext.jsx`   | `[]`                           |
| `guardarEdicion`     | `JugadoresContext.jsx`   | `[state.jugadorEnEdicion]`     |
| `iniciarEdicion`     | `JugadoresContext.jsx`   | `[dispatch]`                   |
| `cancelarEdicion`    | `JugadoresContext.jsx`   | `[dispatch]`                   |
| `enviar` (form)      | `Formulario.jsx`         | `[datos, jugadorEnEdicion, ...]` |

---

## Cómo correr el proyecto

### Backend
```bash
cd backend
npm install
node index.js
# Corre en http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm start
# Corre en http://localhost:3000
```

---

---

## Funcionalidades

- Listado de jugadores consumido desde la API REST
- Búsqueda por nombre en tiempo real (filtrado memorizado)
- Agregar, editar y eliminar jugadores
- Estado global con Context API y useReducer (del TP3)
- Componentes optimizados con memo para evitar rerenders innecesarios
- Funciones estables con useCallback para no romper la memoización de componentes hijos
