# TaskAPI - Full Stack Project

TaskAPI is a full-stack web application developed as an evolution of the previous evaluation project TaskPlanner-Pro. It allows users to manage tasks and events, including filtering, favorites, image uploads, and email-based authentication, all with a more user-friendly design.

## Table of Contents

* Project Structure
* Technologies Used
* Environment Variables
* Deployment
* Features
* Credits

## Project Structure

This GitHub repository contains two main folders:

* `/frontend`: React project with Vite
* `/backend`: REST API built with Node.js and Express

This setup keeps both the frontend and backend in a single repository, making synchronization and deployment easier.

## Technologies Used

### Frontend

* React
* Vite
* Axios

### Backend

* Node.js
* Express
* MongoDB with Mongoose

### Deployment Tools

* Vercel (frontend)
* Render (backend)

## Environment Variables

### Frontend

Currently, the project is deployed on Vercel and accessible at: [https://tfm-g2rw.vercel.app](https://tfm-g2rw.vercel.app). However, if you want to deploy it yourself, you must set the following environment variable:

```env
VITE_API_URL={server-address} 
# currently: https://tfm-6kd5.onrender.com
```

### Backend

The backend is deployed at: [https://tfm-6kd5.onrender.com](https://tfm-6kd5.onrender.com)

To deploy it, define the following environment variables:

```env
CORS_ORIGIN={frontend-address} 
# currently: https://tfm-g2rw.vercel.app

EMAIL_PASS={email-manager-password} 
# currently: "ddlo rkro bfab bgcp"

EMAIL_USER={email-provider-user} 
# currently: miguelmjimenez98@gmail.com

MONGO_DBNAME={mongo-database-name}
# currently: TFM_DB

MONGO_PASS={mongo-password} 
# currently: admin1234

MONGO_USER={mongo-username}
# currently: miguelmunnoz

NODE_ENV={environment}
# currently: prod

PORT={port}
# currently: 9999

SECRET_KEY={your-own-secret-key}
# currently: la-clave-ultra-super-mega-secreta
# Used to encrypt the JWT authentication token
```

## Deployment

### Frontend

The frontend is deployed on Vercel, using Vite as the bundler. Current deployment URL:

[https://tfm-g2rw.vercel.app](https://tfm-g2rw.vercel.app)

### Backend

The server is deployed on Render and connected to MongoDB Atlas. Deployment URL:

[https://tfm-6kd5.onrender.com](https://tfm-6kd5.onrender.com)

## Features

* User authentication
* Task and event management
* Image upload and display
* Filtering and favorites
* Email confirmation on registration

## Credits

Developed by Miguel Muñoz Jiménez as the final project for the Full Stack Web Development Master's Degree at Evolve.

Got suggestions or want to contribute? Feel free to open an issue or pull request. Thanks for your interest in TaskAPI!




# TaskAPI - Full Stack Project

**TaskAPI** es una aplicación web full-stack desarrollada como un evolutivo de la anterior evaluación **TaskPlanner-Pro**. Permite a los usuarios gestionar tareas y eventos, incluyendo funcionalidades de filtrado, favoritos, subida de imágenes y sistema de autenticación por email, con un diseño más amigable para el usuario.

---

## 📁 Tabla de Contenidos

* [Estructura del Proyecto](#estructura-del-proyecto)
* [Tecnologías Utilizadas](#tecnologías-utilizadas)
* [Variables de Entorno](#variables-de-entorno)
* [Despliegue](#despliegue)
* [Funcionalidades](#funcionalidades)
* [Créditos](#créditos)

---

## 📂 Estructura del Proyecto

Este repositorio contiene dos carpetas principales:

```
/frontend  → Proyecto React con Vite  
/backend   → API REST construida con Node.js y Express
```

Esto permite mantener tanto el frontend como el backend en un único repositorio, facilitando la sincronización y el despliegue.

---

## ⚙️ Tecnologías Utilizadas

### Frontend

* React
* Vite
* Axios

### Backend

* Node.js
* Express
* MongoDB con Mongoose

### Herramientas de despliegue

* Vercel (frontend)
* Render (backend)

---

## 🔐 Variables de Entorno

### Frontend

Actualmente, el proyecto está desplegado en Vercel:
🔗 `https://tfm-g2rw.vercel.app`

Si se quiere desplegar por uno mismo, es necesario definir la siguiente variable de entorno:

```env
VITE_API_URL={direccion-del-servidor}
# actualmente: https://tfm-6kd5.onrender.com
```

---

### Backend

Actualmente desplegado en Render:
🔗 `https://tfm-6kd5.onrender.com`

Variables necesarias:

```env
CORS_ORIGIN={direccion-del-frontend} 
//actualmente: https://tfm-g2rw.vercel.app

EMAIL_PASS={contraseña-gestor-email} 
//actualmente "ddlo rkro bfab bgcp"

EMAIL_USER={user-email-provider} 
//actualmente: miguelmjimenez98@gmail.com

MONGO_DBNAME={mongo-database-name}
//actualmente: TFM_DB

MONGO_PASS={mongo-password} 
//actualmente: admin1234

MONGO_USER={mongo-username}
//actualmente: miguelmunnoz

NODE_ENV={enviroment}
//actualmente: prod

PORT={port}
//actualmente: 9999

SECRET_KEY={your-ouw-secret-key}
//actualmente: la-clave-ultra-super-mega-secreta
//Permite cifrar el token de autenticacion JWT
```

> `SECRET_KEY` permite cifrar el token JWT de autenticación.

---

## 🚀 Despliegue

### Frontend

* Desplegado en **Vercel** usando **Vite**
* Dirección: [`https://tfm-g2rw.vercel.app`](https://tfm-g2rw.vercel.app)

### Backend

* Desplegado en **Render**
* Conexión a base de datos **MongoDB Atlas**
* Dirección: [`https://tfm-6kd5.onrender.com`](https://tfm-6kd5.onrender.com)

---

## ✨ Funcionalidades

* Autenticación de usuarios
* Gestión de tareas y eventos
* Subida y visualización de imágenes
* Filtros y favoritos
* Envío de emails de confirmación de registro

---

## 👨‍💻 Créditos

Desarrollado por **Miguel Muñoz Jiménez** como proyecto final del
**Máster en Desarrollo Web Full Stack** de **Evolve**.

¿Tienes sugerencias o quieres contribuir?
No dudes en abrir un *issue* o *pull request*.

¡Gracias por tu interés en TaskAPI! 🚀
