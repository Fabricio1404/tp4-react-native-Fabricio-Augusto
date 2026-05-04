# TP2 - Gestion de Jugadores (React + Node.js + MySQL)

Aplicacion web para gestionar un plantel de futbol.

Permite:
- Ver jugadores registrados.
- Buscar jugadores por nombre.
- Agregar nuevos jugadores.
- Editar jugadores existentes.
- Eliminar jugadores.

## Tecnologias

### Frontend
- React
- CSS

### Backend
- Node.js
- Express
- MySQL (`mysql2`)
- `dotenv` para variables de entorno

## Estructura del proyecto

```text
tp2-react-native-Fabricio-Augusto/
	backend/
		index.js
		src/
			config/database.js
			controllers/
			models/
			routes/
	frontend/
		src/
			App.jsx
			App.css
			components/
```

## Requisitos previos

- Node.js instalado
- npm instalado
- MySQL corriendo localmente
- Base de datos creada (por ejemplo: `jugadores_db`)

## Configuracion de la base de datos

En `backend` crear el archivo `.env` con este formato:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=jugadores_db
```

Crear tabla `jugadores` (si todavia no existe):

```sql
CREATE TABLE jugadores (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(100) NOT NULL,
	posicion VARCHAR(50) NOT NULL,
	dorsal INT
);
```

## Instalacion (muy importante)

Tenes que instalar dependencias en ambos lados, frontend y backend.

### 1) Instalar dependencias del backend

```bash
cd backend
npm i
```

### 2) Instalar dependencias del frontend

En otra terminal, o luego de terminar el paso anterior:

```bash
cd frontend
npm i
```

## Como iniciar el proyecto

Necesitas 2 terminales abiertas.

### Terminal 1 - Backend

```bash
cd backend
node index.js
```

Deberias ver:

```text
Servidor corriendo en puerto 5000
```

### Terminal 2 - Frontend

```bash
cd frontend
npm start
```

Luego abrir:

```text
http://localhost:3000
```

## Como usar la pagina

1. Escribir nombre, posicion y dorsal en el formulario.
2. Presionar "AGREGAR AL PLANTEL" para crear un jugador.
3. Usar el buscador para filtrar por nombre.
4. Presionar "EDITAR" en una card para modificar datos.
5. Guardar cambios con "GUARDAR CAMBIOS" o cancelar.
6. Presionar "ELIMINAR" para borrar un jugador.

## Endpoints principales del backend

- `GET /jugadores` -> lista todos los jugadores
- `POST /jugadores` -> crea un jugador
- `PUT /jugadores/:id` -> actualiza un jugador
- `DELETE /jugadores/:id` -> elimina un jugador

## Problemas comunes

### `npm start` falla en frontend
- Verificar que corriste `npm i` dentro de `frontend`.
- Verificar que estas parado en la carpeta correcta (`frontend`).

### No carga jugadores / error de servidor
- Verificar que el backend este corriendo en puerto `5000`.
- Verificar datos de MySQL en `backend/.env`.
- Verificar que exista la base y tabla `jugadores`.

### Error de conexion a MySQL
- Revisar `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`.
- Confirmar que el servicio de MySQL este iniciado.

## Scripts utiles

### Frontend
- `npm start` -> modo desarrollo
- `npm run build` -> build de produccion

### Backend
- `node index.js` -> iniciar API

## Autor

Fabricio Augusto