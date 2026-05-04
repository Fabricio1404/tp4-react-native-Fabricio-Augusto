import React, { useState, useMemo, useCallback } from 'react';
import './App.css';
import Formulario from './components/Formulario';
import JugadorItem from './components/JugadorItem';
import { useJugadores } from './context/JugadoresContext';

function App() {
  const [busqueda, setBusqueda] = useState('');
  const { jugadores, cargando, error, iniciarEdicion } = useJugadores();
  const listaJugadores = Array.isArray(jugadores) ? jugadores : [];

  
  // Las acciones CRUD se manejan desde el Context (useJugadores)

  const filtrados = useMemo(() => listaJugadores.filter(j =>
    j.nombre.toLowerCase().includes(busqueda.toLowerCase())
  ), [listaJugadores, busqueda]);

  const handleSearchChange = useCallback((e) => setBusqueda(e.target.value), [setBusqueda]);

  return (
    <main className="page">
      <div className="bg-shape bg-shape-left" />
      <div className="bg-shape bg-shape-right" />

      <header className="hero">
        <img src="/logo-boca.png" alt="Boca" className="hero-logo" />
        <div>
          <p className="hero-kicker">Plantel Profesional</p>
          <h1 className="hero-title">Mundo Boca Gestion</h1>
        </div>
        <div className="hero-pill">{listaJugadores.length} jugadores</div>
      </header>

      <section className="toolbar">
        <input
          placeholder="Buscar jugador por nombre..."
          onChange={handleSearchChange}
          className="search-input"
        />
      </section>

        <Formulario />

      {cargando && <p className="status-text">Cargando el plantel...</p>}
      {error && <p className="status-text error-text">{error}</p>}

      <section className="players-grid">
        {filtrados.map(j => (
          <JugadorItem key={j.id} jugador={j} />
        ))}
      </section>
    </main>
  );
}

export default App;