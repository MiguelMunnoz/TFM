# 📗 TaskAPI - Full Stack Project (ENGLISH)

## Table of Contents
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Features](#features)
- [Credits](#credits)

## Project Structure

This GitHub repository contains two main folders:

- `/frontend`: React project using Vite  
- `/backend`: REST API built with Node.js and Express  

This setup allows you to maintain both frontend and backend in a single repository, easing synchronization and deployment.

## Technologies Used

**Frontend**

- React  
- Vite  
- Axios  

**Backend**

- Node.js  
- Express  
- MongoDB with Mongoose  

**Deployment Tools**

- Vercel (frontend)  
- Render (backend)  

## Environment Variables

### Frontend

Currently, the project is deployed on Vercel and accessible at:  
https://tfm-g2rw.vercel.app  

If you want to deploy it yourself, define the following environment variable:

```bash
VITE_API_URL={server-address}
// currently: https://tfm-6kd5.onrender.com
```

### Backend

The backend is deployed at:  
https://tfm-6kd5.onrender.com  

Required environment variables for deployment:

```bash
CORS_ORIGIN={frontend-address} 
// currently: https://tfm-g2rw.vercel.app

EMAIL_PASS={email-provider-password} 
// currently: "ddlo rkro bfab bgcp"

EMAIL_USER={email-provider-user} 
// currently: miguelmjimenez98@gmail.com

MONGO_DBNAME={mongo-database-name} 
// currently: TFM_DB

MONGO_PASS={mongo-password} 
// currently: admin1234

MONGO_USER={mongo-username} 
// currently: miguelmunnoz

NODE_ENV={environment} 
// currently: prod

PORT={port} 
// currently: 9999

SECRET_KEY={your-own-secret-key} 
// currently: la-clave-ultra-super-mega-secreta
// Used to encrypt JWT authentication token
```

## Deployment

### Frontend

The frontend is deployed on Vercel using Vite as bundler. Current deployment URL:

https://tfm-g2rw.vercel.app

### Backend

The server is deployed on Render and connected to MongoDB Atlas. Deployment URL:

https://tfm-6kd5.onrender.com

## Features

- User authentication  
- Task and event management  
- Image upload and display  
- Filters and favorites  
- Email confirmation on registration  

## Credits

Developed by Miguel Muñoz Jiménez as the final project for the Full Stack Web Development Master at Evolve.

Have suggestions or want to contribute? Feel free to open an issue or pull request. Thanks for your interest in TaskAPI!

---

# 📘 TaskAPI - Proyecto Full Stack (ESPAÑOL)

## Tabla de Contenidos
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Variables de Entorno](#variables-de-entorno)
- [Despliegue](#despliegue)
- [Funcionalidades](#funcionalidades)
- [Créditos](#créditos)

## Estructura del Proyecto

Este repositorio de GitHub contiene dos carpetas principales:

- `/frontend`: Proyecto React con Vite
- `/backend`: API REST construida con Node.js y Express

Esto permite mantener tanto el frontend como el backend en un único repositorio, facilitando la sincronización y el despliegue.

## Tecnologías Utilizadas

**Frontend**

- React  
- Vite  
- Axios  

**Backend**

- Node.js  
- Express  
- MongoDB con Mongoose  

**Herramientas de despliegue**

- Vercel (frontend)  
- Render (backend)  

## Variables de Entorno

### Frontend

Actualmente, el proyecto está desplegado en Vercel y puede accederse desde:  
https://tfm-g2rw.vercel.app  

Si quieres desplegarlo tú mismo, necesitas definir la siguiente variable de entorno:

```bash
VITE_API_URL={direccion-del-servidor}
// actualmente: https://tfm-6kd5.onrender.com
```

### Backend

El backend está desplegado en:  
https://tfm-6kd5.onrender.com  

Las variables de entorno necesarias para desplegar son:

```bash
CORS_ORIGIN={direccion-del-frontend} 
// actualmente: https://tfm-g2rw.vercel.app

EMAIL_PASS={contraseña-gestor-email} 
// actualmente: "ddlo rkro bfab bgcp"

EMAIL_USER={user-email-provider} 
// actualmente: miguelmjimenez98@gmail.com

MONGO_DBNAME={mongo-database-name} 
// actualmente: TFM_DB

MONGO_PASS={mongo-password} 
// actualmente: admin1234

MONGO_USER={mongo-username} 
// actualmente: miguelmunnoz

NODE_ENV={environment} 
// actualmente: prod

PORT={port} 
// actualmente: 9999

SECRET_KEY={your-own-secret-key} 
// actualmente: la-clave-ultra-super-mega-secreta
// Permite cifrar el token de autenticación JWT
```

## Despliegue

### Frontend

El frontend se despliega en Vercel, usando Vite como empaquetador. La dirección de despliegue actual es:

https://tfm-g2rw.vercel.app

### Backend

El servidor se despliega en Render y se conecta a MongoDB Atlas. Dirección de despliegue:

https://tfm-6kd5.onrender.com

## Funcionalidades

- Autenticación de usuarios  
- Gestión de tareas y eventos  
- Subida y visualización de imágenes  
- Filtros y favoritos  
- Envío de emails de confirmación de registro  

## Créditos

Desarrollado por Miguel Muñoz Jiménez como proyecto final del Máster en Desarrollo Web Full Stack de Evolve.

¿Tienes sugerencias o quieres contribuir? No dudes en abrir un issue o pull request. ¡Gracias por tu interés en TaskAPI!
