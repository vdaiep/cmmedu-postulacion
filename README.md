# Postulación a cargo profesional en CMMEdu

Este proyecto fue desarrollado entre el 8 y el 10 de junio de 2022, como tarea para postular al cargo de profesional para el área de programación y sistemas del Laboratorio de Educación del Centro de Modelamiento Matemático (CMMEdu).

## 1. Instalación y deploy

La aplicación se encuentra implementada en un servidor AWS (usando Elastic Beanstalk), disponible desde la URL siguiente: <a href="https://play2.vdaiep.cl/" target="_blank">https://play2.vdaiep.cl/</a>

Para ejecutarla en un servidor local, basta con clonar este repositorio, y agregar los archivos `.env` y `db.sqlite3` (no disponibles en este repositorio a propósito por motivos de seguridad, pero como se trata de una aplicación de juego, pueden descargarse desde <a href="https://appcursos-env-db.s3.amazonaws.com/env_and_db.zip" target="_blank">aquí</a>). Los archivos deben estar al mismo nivel que `manage.py`. Luego, debe instalarse y ejecutarse usando Docker. Para instalar, se ejecuta una única vez el comando siguiente:

```
$ docker-compose build
```

Para ejecutar, aplicar:

```
$ docker-compose up
```

La aplicación quedará disponible en [localhost](http://localhost) (puerto 80).

## 2. Descripción

La aplicación consiste en un pequeño simulador de revisión de respuestas a preguntas en distintos cursos. Los datos fueron creados de manera artificial, y cargados manualmente a la base de datos.

La tecnología en back-end es Django, junto con Docker. No se uso framework de front-end, más que HTML, CSS y JavaScript (+ jQuery y una librería para la tabla). Para los datos, se usa una base de datos SQLite, pues los datos serán estáticos (y artificiales).

