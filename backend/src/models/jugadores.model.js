const db = require('../config/database');

const Jugador = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM jugadores');
        return rows;
    },
    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM jugadores WHERE id = ?', [id]);
        return rows[0];
    },
    create: async (data) => {
        const { nombre, posicion, dorsal } = data;
        const [result] = await db.query(
            'INSERT INTO jugadores (nombre, posicion, dorsal) VALUES (?, ?, ?)',
            [nombre, posicion, dorsal]
        );
        return result.insertId;
    },
    update: async (id, data) => {
        const { nombre, posicion, dorsal } = data;
        await db.query(
            'UPDATE jugadores SET nombre = ?, posicion = ?, dorsal = ? WHERE id = ?',
            [nombre, posicion, dorsal, id]
        );
    },
    delete: async (id) => {
        await db.query('DELETE FROM jugadores WHERE id = ?', [id]);
    }
};

module.exports = Jugador;