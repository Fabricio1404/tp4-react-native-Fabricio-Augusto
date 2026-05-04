import React, { useEffect, useState, useCallback, memo } from 'react';
import { useJugadores } from '../context/JugadoresContext';

const POSICIONES = ['Arquero', 'Defensor', 'Mediocampista', 'Delantero'];

const Formulario = () => {
  const { agregarJugador, guardarEdicion, jugadorEnEdicion, cancelarEdicion } = useJugadores();
  const [datos, setDatos] = useState({ nombre: '', posicion: '', dorsal: '' });

  useEffect(() => {
    if (jugadorEnEdicion) {
      setDatos({
        nombre: jugadorEnEdicion.nombre || '',
        posicion: jugadorEnEdicion.posicion || '',
        dorsal: jugadorEnEdicion.dorsal || ''
      });
      return;
    }

    setDatos({ nombre: '', posicion: '', dorsal: '' });
  }, [jugadorEnEdicion]);

  const enviar = useCallback(async (e) => {
    e.preventDefault();
    if (!datos.nombre || !datos.posicion) return alert('Completá los campos obligatorios');
    try {
      if (jugadorEnEdicion) {
        await guardarEdicion(datos);
      } else {
        await agregarJugador(datos);
      }
      setDatos({ nombre: '', posicion: '', dorsal: '' });
    } catch (err) {
      alert(err.message || 'Error al guardar');
    }
  }, [datos, jugadorEnEdicion, agregarJugador, guardarEdicion]);

  return (
    <form onSubmit={enviar} className="player-form">
      <input
        placeholder="Nombre del Jugador"
        value={datos.nombre}
        onChange={e => setDatos({...datos, nombre: e.target.value})}
        className="player-input"
      />
      <select
        value={datos.posicion}
        onChange={e => setDatos({...datos, posicion: e.target.value})}
        className="player-input player-select"
      >
        <option value="">Seleccionar posición</option>
        {POSICIONES.map((posicion) => (
          <option key={posicion} value={posicion}>
            {posicion}
          </option>
        ))}
      </select>
      <input
        placeholder="Dorsal"
        type="number"
        value={datos.dorsal}
        onChange={e => setDatos({...datos, dorsal: e.target.value})}
        className="player-input"
      />
      <button type="submit" className="btn-main">
        {jugadorEnEdicion ? 'GUARDAR CAMBIOS' : 'AGREGAR AL PLANTEL'}
      </button>
      {jugadorEnEdicion && (
        <button type="button" className="btn-muted" onClick={cancelarEdicion}>
          CANCELAR
        </button>
      )}
    </form>
  );
};

export default memo(Formulario);