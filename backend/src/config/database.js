const fs = require('fs/promises');
const path = require('path');
const mysql = require('mysql2');
require('dotenv').config();

const dataFilePath = path.join(__dirname, '..', '..', 'data', 'jugadores.json');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    connectTimeout: 3000,
});

const mysqlPool = pool.promise();

let databaseModePromise = mysqlPool.query('SELECT 1')
    .then(() => 'mysql')
    .catch(() => 'file');

async function ensureDataFile() {
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true });

    try {
        await fs.access(dataFilePath);
    } catch {
        await fs.writeFile(dataFilePath, '[]', 'utf8');
    }
}

async function readJugadores() {
    await ensureDataFile();
    const content = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(content || '[]');
}

async function writeJugadores(jugadores) {
    await ensureDataFile();
    await fs.writeFile(dataFilePath, JSON.stringify(jugadores, null, 2), 'utf8');
}

async function fileQuery(sql, params = []) {
    const normalizedSql = sql.trim().toLowerCase();
    const jugadores = await readJugadores();

    if (normalizedSql === 'select * from jugadores') {
        return [jugadores];
    }

    if (normalizedSql === 'select * from jugadores where id = ?') {
        const id = Number(params[0]);
        return [jugadores.filter((jugador) => Number(jugador.id) === id)];
    }

    if (normalizedSql.startsWith('insert into jugadores')) {
        const [nombre, posicion, dorsal] = params;
        const nextId = jugadores.length > 0 ? Math.max(...jugadores.map((jugador) => Number(jugador.id) || 0)) + 1 : 1;
        const nuevoJugador = {
            id: nextId,
            nombre,
            posicion,
            dorsal: dorsal === '' || dorsal === undefined ? null : Number(dorsal),
        };

        jugadores.push(nuevoJugador);
        await writeJugadores(jugadores);

        return [{ insertId: nextId }];
    }

    if (normalizedSql.startsWith('update jugadores set')) {
        const [nombre, posicion, dorsal, id] = params;
        const jugadorIndex = jugadores.findIndex((jugador) => Number(jugador.id) === Number(id));

        if (jugadorIndex === -1) {
            return [{ affectedRows: 0 }];
        }

        jugadores[jugadorIndex] = {
            ...jugadores[jugadorIndex],
            nombre,
            posicion,
            dorsal: dorsal === '' || dorsal === undefined ? null : Number(dorsal),
            id: Number(id),
        };

        await writeJugadores(jugadores);
        return [{ affectedRows: 1 }];
    }

    if (normalizedSql.startsWith('delete from jugadores where id = ?')) {
        const id = Number(params[0]);
        const filteredJugadores = jugadores.filter((jugador) => Number(jugador.id) !== id);

        await writeJugadores(filteredJugadores);
        return [{ affectedRows: jugadores.length - filteredJugadores.length }];
    }

    throw new Error(`Consulta no soportada en modo local: ${sql}`);
}

async function query(sql, params = []) {
    const mode = await databaseModePromise;

    if (mode === 'mysql') {
        return mysqlPool.query(sql, params);
    }

    return fileQuery(sql, params);
}

module.exports = {
    query,
};