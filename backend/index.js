require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jugadoresRoutes = require('./src/routes/jugadores.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/jugadores', jugadoresRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});