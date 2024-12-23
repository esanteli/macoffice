CREATE DATABASE NoticiasDB;

USE NoticiasDB;

CREATE TABLE noticias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    contenido TEXT NOT NULL,
    seccion VARCHAR(255),
    tag VARCHAR(255),
    imagen VARCHAR(255),
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado BOOLEAN DEFAULT 1 -- 1 = activa, 0 = inactiva
);
