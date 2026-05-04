const Jugador = require('../models/jugadores.model');

exports.getJugadores = async (req, res) => {
    try {
        const jugadores = await Jugador.getAll();
        res.json(jugadores);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener jugadores' });
    }
};

exports.createJugador = async (req, res) => {
    try {
        const { nombre, posicion } = req.body;
        if (!nombre || !posicion) return res.status(400).json({ error: 'Faltan campos obligatorios' });
        
        const id = await Jugador.create(req.body);
        res.status(201).json({ id, ...req.body });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear jugador' });
    }
};

exports.updateJugador = async (req, res) => {
    try {
        const { nombre, posicion } = req.body;
        if (!nombre || !posicion) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' });
        }

        const jugadorExistente = await Jugador.getById(req.params.id);
        if (!jugadorExistente) {
            return res.status(404).json({ error: 'Jugador no encontrado' });
        }

        await Jugador.update(req.params.id, req.body);
        res.json({ id: Number(req.params.id), ...req.body });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar jugador' });
    }
};

exports.deleteJugador = async (req, res) => {
    try {
        await Jugador.delete(req.params.id);
        res.json({ mensaje: 'Jugador eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar' });
    }
};