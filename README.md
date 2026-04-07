# RetroScore

¡Bienvenido a **RetroScore**! Este es un proyecto Full-Stack compuesto por una API REST construida con Node.js y Express, y una aplicación web Frontend construida con Angular.

## Estructura del Proyecto

El proyecto está dividido en dos directorios principales:

- **API RetroScore Actual**: Contiene el código del backend (Node.js, Express, MongoDB).
- **WEB RetroScore Actual**: Contiene el código del frontend (Angular 18).

---

## 1. Backend (API RetroScore Actual)

La API está construida con **Node.js** y **Express**. Utiliza **MongoDB** como base de datos (con Mongoose) y proporciona endpoints para gestionar usuarios, carritos de compra y productos (camisetas).

### Tecnologías Utilizadas
- **Node.js** & **Express**
- **MongoDB** & **Mongoose** (Base de datos en `mongodb://localhost:27018/RetroscoreDB`)
- **JSON Web Tokens (JWT)** para autenticación
- **Bcrypt** para el cifrado de contraseñas
- **Cors**, **Morgan** y **Body-Parser** para manejo de middleware

### Instalación y Ejecución

1. Abre una terminal y navega al directorio de la API:
   ```bash
   cd "API RetroScore Actual"
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor (por defecto se ejecuta en `http://localhost:3000`):
   - Modo normal:
     ```bash
     npm run serve
     ```
   - Modo desarrollo (con --watch):
     ```bash
     npm run develop
     ```

*Nota: Asegúrate de tener MongoDB ejecutándose en el puerto `27018`. Si la base de datos está vacía al iniciar, el servidor insertará automáticamente los datos desde `jerseys.json`.*

### Principales Rutas (Endpoints)
- `/Users`: Registro, login y gestión de usuarios.
- `/Jerseys`: Endpoints para obtener o modificar el catálogo de camisetas.
- `/cart`: Gestión del carrito de la compra de los usuarios.

---

## 2. Frontend (WEB RetroScore Actual)

El frontend de la aplicación web está construido utilizando **Angular 18**.

### Tecnologías Utilizadas
- **Angular 18**
- **TypeScript**
- **RxJS**
- **Karma & Jasmine** para pruebas

### Instalación y Ejecución

1. Abre una terminal y navega al directorio del proyecto web:
   ```bash
   cd "WEB RetroScore Actual"
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo de Angular:
   ```bash
   npm start
   ```
   También puedes usar directamente el CLI de Angular:
   ```bash
   ng serve
   ```
4. Abre tu navegador y navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si haces cambios en los archivos fuente.

### Construcción (Build)

Para realizar una build de producción del frontend:
```bash
npm run build
```
Los archivos de salida se almacenarán en la carpeta `dist/` (o la carpeta especificada en `angular.json`).

---

## Autor
Desarrollado para RetroScore.
