import React, { memo } from 'react';
import { useJugadores } from '../context/JugadoresContext';

const JugadorItem = ({ jugador }) => {
  const { eliminarJugador, iniciarEdicion } = useJugadores();

  return (
    <article className="player-card">
      <div className="player-dorsal">#{jugador.dorsal}</div>
      <h3 className="player-name">{jugador.nombre}</h3>
      <p className="player-position">{jugador.posicion}</p>
      <button onClick={() => iniciarEdicion(jugador)} className="btn-edit">
        EDITAR
      </button>
      <button onClick={() => eliminarJugador(jugador.id)} className="btn-delete">
        ELIMINAR
      </button>
    </article>
  );
};

export default memo(JugadorItem);