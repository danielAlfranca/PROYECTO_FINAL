-- Active: 1657547555018@@127.0.0.1@3306@travelapp
DROP DATABASE IF EXISTS travelapp;

CREATE DATABASE travelapp DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE travelapp;

/* INVENTARIO */

CREATE TABLE empresas(

    id INT AUTO_INCREMENT, # 0 
    nombre VARCHAR(30)NOT NULL,# 1 
    documento VARCHAR(30),# 2
    telefonos VARCHAR(30),  # 3   
    emails VARCHAR(30), # 4
    direccion VARCHAR(60),# 5
    hidden BOOLEAN,# 6
    PRIMARY KEY (id)      
);
CREATE TABLE trabajadores(

    id INT AUTO_INCREMENT, # 0 
    nombre VARCHAR(30)NOT NULL,
    apellidos VARCHAR(60) NOT NULL,
    documento VARCHAR(30),
    telefonos VARCHAR(30),    
    emails VARCHAR(30), 
    tipo ENUM('1','2','3') NOT NULL,
    regimen ENUM('1','2') NOT NULL,
    hidden BOOLEAN,# 
    PRIMARY KEY (id)      
);

CREATE TABLE tours(

    id INT AUTO_INCREMENT, # 0 
    nombre VARCHAR(30)NOT NULL,
    inicio CHAR(5) NOT NULL,
    fin CHAR(5) NOT NULL,    
    duracion TINYINT NOT NULL, 
    destino VARCHAR(20) NOT NULL,
    hidden BOOLEAN,# 
    PRIMARY KEY (id)      
);

CREATE TABLE hoteles(

    id INT AUTO_INCREMENT, # 0 
    nombre VARCHAR(30)NOT NULL, # 1 
    tipo ENUM('1','2','3') NOT NULL, # 2
    categoria ENUM('1','2','3','4','5'), # 3 
    telefonos VARCHAR(30), # 4     
    emails VARCHAR(30), # 5 
    direccion VARCHAR(60), # 6 
    propietario INT, # 7
    hidden BOOLEAN,# 8
    PRIMARY KEY (id),
    FOREIGN KEY (propietario) REFERENCES empresas(id)    
);


/* RESERVAS */

CREATE TABLE clientes(

    id INT AUTO_INCREMENT, # 0 
    nombre VARCHAR(30)NOT NULL,
    apellidos VARCHAR(60) NOT NULL,
    telefonos VARCHAR(30),
    emails VARCHAR(30),
    PRIMARY KEY (id)    
);

CREATE TABLE paquetes(

    id INT AUTO_INCREMENT, # 0 
    destino VARCHAR(20)NOT NULL,
    pasajeros VARCHAR(10) NOT NULL,
    proveedor INT NOT NULL,
    cliente INT NOT NULL, 
    PRIMARY KEY (id),
    FOREIGN KEY (proveedor) REFERENCES empresas(id),  
    FOREIGN KEY (cliente) REFERENCES clientes(id)  
);

CREATE TABLE salidas(

    id INT AUTO_INCREMENT, # 0 
    tour INT NOT NULL,
    date_start DATE NOT NULL ,
    date_end DATE NOT NULL ,
    time_start TIME,# 4
    time_end TIME,# 5
    comments VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (tour) REFERENCES tours(id)  
);

CREATE TABLE tour_paquete(

    id INT AUTO_INCREMENT, # 0 
    pasajeros VARCHAR(10) NOT NULL,
    paquete INT NOT NULL,
    tour INT NOT NULL,
    salida INT NOT NULL,
    comments VARCHAR(255),
    PRIMARY KEY (id),    
    FOREIGN KEY (paquete) REFERENCES paquetes(id),  
    FOREIGN KEY (tour) REFERENCES tours(id),
    FOREIGN KEY (salida) REFERENCES salidas(id)
);

CREATE TABLE hotel_paquete(

    id INT AUTO_INCREMENT, # 0 
    habitaciones VARCHAR(10) NOT NULL,
    paquete INT NOT NULL,
    hotel INT NOT NULL,
    comments VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (paquete) REFERENCES paquetes(id),  
    FOREIGN KEY (hotel) REFERENCES hoteles(id) 
);

/* SALIDAS */



CREATE TABLE pasajeros_con_reserva(

    id INT AUTO_INCREMENT, # 0 
    tour INT NOT NULL,
    salida INT NOT NULL,
    pasajeros VARCHAR(10),
    PRIMARY KEY (id),
    FOREIGN KEY (tour) REFERENCES tours(id),  
    FOREIGN KEY (salida) REFERENCES salidas(id)
);

CREATE TABLE pasajeros_no_clientes(

    id INT AUTO_INCREMENT, # 0 
    salida INT NOT NULL,
    pasajeros VARCHAR(10),
    nombre VARCHAR(30)NOT NULL,
    apellidos VARCHAR(60) NOT NULL,
    telefonos VARCHAR(30),
    emails VARCHAR(30),
    proveedor INT NOT NULL,    
    PRIMARY KEY (id),
    FOREIGN KEY (salida) REFERENCES salidas(id),
    FOREIGN KEY (proveedor) REFERENCES empresas(id) 
);


CREATE TABLE operador_salida(

    id INT AUTO_INCREMENT, # 0 
    salida INT NOT NULL,    
    proveedor INT NOT NULL, 
    comments VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (salida) REFERENCES salidas(id),
    FOREIGN KEY (proveedor) REFERENCES empresas(id) 
);

CREATE TABLE guia_salida(

    id INT AUTO_INCREMENT, # 0 
    salida INT NOT NULL,    
    proveedor INT NOT NULL, 
    comments VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (salida) REFERENCES salidas(id),
    FOREIGN KEY (proveedor) REFERENCES trabajadores(id) 
);

CREATE TABLE chofer_salida(

    id INT AUTO_INCREMENT, # 0 
    salida INT NOT NULL,    
    proveedor INT NOT NULL, 
    comments VARCHAR(255),
    PRIMARY KEY (id),
    FOREIGN KEY (salida) REFERENCES salidas(id),
    FOREIGN KEY (proveedor) REFERENCES trabajadores(id)  
);



  
