import React, { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';
import jugadoresReducer, { initialState } from './jugadoresReducer';

const JugadoresContext = createContext();

export const useJugadores = () => useContext(JugadoresContext);

export const JugadoresProvider = ({ children }) => {
  const [state, dispatch] = useReducer(jugadoresReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: true });
    fetch('http://localhost:5000/jugadores')
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || 'Error al conectar con el servidor');
        }

        if (!Array.isArray(data)) {
          throw new Error('La respuesta del servidor no tiene formato de lista');
        }

        dispatch({ type: 'SET_JUGADORES', payload: data });
      })
      .catch((err) => dispatch({ type: 'SET_ERROR', payload: err.message || 'Error al conectar con el servidor' }));
  }, []);

  const agregarJugador = useCallback(async (nuevo) => {
    const res = await fetch('http://localhost:5000/jugadores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevo),
    });
    const data = await res.json();
    dispatch({ type: 'ADD_JUGADOR', payload: data });
  }, []);

  const eliminarJugador = useCallback(async (id) => {
    await fetch(`http://localhost:5000/jugadores/${id}`, { method: 'DELETE' });
    dispatch({ type: 'DELETE_JUGADOR', payload: id });
  }, []);

  const guardarEdicion = useCallback(async (datos) => {
    const id = state.jugadorEnEdicion?.id;
    if (!id) return;
    const res = await fetch(`http://localhost:5000/jugadores/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'No se pudo actualizar el jugador');
    }
    const data = await res.json();
    dispatch({ type: 'UPDATE_JUGADOR', payload: { ...state.jugadorEnEdicion, ...data } });
  }, [state.jugadorEnEdicion]);

  const iniciarEdicion = useCallback((jugador) => dispatch({ type: 'SET_EDIT', payload: jugador }), [dispatch]);
  const cancelarEdicion = useCallback(() => dispatch({ type: 'CLEAR_EDIT' }), [dispatch]);

  const value = useMemo(() => ({
    jugadores: state.jugadores,
    cargando: state.cargando,
    error: state.error,
    jugadorEnEdicion: state.jugadorEnEdicion,
    agregarJugador,
    eliminarJugador,
    iniciarEdicion,
    guardarEdicion,
    cancelarEdicion,
  }), [state.jugadores, state.cargando, state.error, state.jugadorEnEdicion, agregarJugador, eliminarJugador, iniciarEdicion, guardarEdicion, cancelarEdicion]);

  return (
    <JugadoresContext.Provider value={value}>
      {children}
    </JugadoresContext.Provider>
  );
};

export default JugadoresContext;
