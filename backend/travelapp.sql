-- Active: 1657547555018@@127.0.0.1@3306@plantes
DROP DATABASE IF EXISTS travelapp;

CREATE DATABASE travelapp DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE travelapp;

CREATE TABLE agents (

    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('0','1','2') NOT NULL,
    # 0 - SIN AGENTE
    # 1 - INVENTARIO
    # 2 - RESERVAS     
);

CREATE TABLE activity_group(

    id INT AUTO_INCREMENT PRIMARY KEY,
    type TINYINT NOT NULL,
    date_start DATE NOT NULL,
    date_end DATE NOT NULL,
    time_start TIME,
    time_end TIME,
    data JSON
);

CREATE TABLE activities(

    group_id INT,
    activity_index TINYINT NOT NULL,
    activity_type TINYINT NOT NULL,
    agent INT NOT NULL,
    date_start DATE NOT NULL,
    date_end DATE NOT NULL,
    time_start TIME,
    time_end TIME,
    data JSON,
    PRIMARY KEY (group_id,activity_index,activity_type),
    FOREIGN KEY (group_id) REFERENCES activity_group(id),
    FOREIGN KEY (agent) REFERENCES agents(id)
);

CREATE TABLE passengers(

    group_id INT,
    activity_index TINYINT,
    activity_type TINYINT,
    event_ref INT,
    pax JSON,
    PRIMARY KEY (group_id,activity_index,activity_type, event_ref),
    FOREIGN KEY (group_id) REFERENCES activities(group_id),
    FOREIGN KEY (activity_index) REFERENCES activities(activity_index),
    FOREIGN KEY (activity_type) REFERENCES activities(activity_type),
    FOREIGN KEY (event_ref) REFERENCES activity_group(id)
    
);

CREATE TABLE invoices(

    id INT AUTO_INCREMENT PRIMARY KEY,
    document_id INT,
    payment_type BOOLEAN NOT NULL,
    document_type TINYINT NOT NULL,
    document_date DATE ,
    amount FLOAT NOT NULL,
    paid FLOAT NOT NULL,
    currency VARCHAR(4) NOT NULL,
    concepto VARCHAR(300),
    payer INT,
    charger INT,
    FOREIGN KEY (payer) REFERENCES agents(id),
    FOREIGN KEY (charger) REFERENCES agents(id)
);


CREATE TABLE concept_invoice(

    id INT AUTO_INCREMENT PRIMARY KEY,
    group_id INT NOT NULL,
    activity_index TINYINT NOT NULL,
    activity_type TINYINT NOT NULL,
    invoice INT,
    amount FLOAT NOT NULL,
    concept VARCHAR(70),
    details JSON,
    FOREIGN KEY (group_id) REFERENCES activities(group_id),
    FOREIGN KEY (activity_index) REFERENCES activities(activity_index),
    FOREIGN KEY (activity_type) REFERENCES activities(activity_type),
    FOREIGN KEY (invoice) REFERENCES invoices(id)
);


CREATE TABLE inventory_items (

    id INT AUTO_INCREMENT PRIMARY KEY ,
    agent INT,
    type ENUM('1','2','3','4', '5') NOT NULL,
    # 1 - EMPRESA
    # 2 - TRABAJADOR
    # 3 - HOTEL  
    # 4 - TOUR
    # 5 - PAQUETE   
    data JSON,
    hidden BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (agent) REFERENCES agents(id)
);



