DROP DATABASE IF EXISTS travelapp;

CREATE DATABASE travelapp DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE travelapp;

CREATE TABLE agents (

    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    document VARCHAR(150),
    type TINYINT NOT NULL,
    data JSON
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

    group INT,
    activity TINYINT,
    activity_type TINYINT,
    agent INT NOT NULL,
    date_start DATE NOT NULL,
    date_end DATE NOT NULL,
    time_start TIME,
    time_end TIME,
    data JSON,
    PRIMARY KEY (group,activity,activity_type),
    FOREIGN KEY (group) REFERENCES activity_group(id)
    FOREIGN KEY (agent) REFERENCES agents(id)
);

CREATE TABLE passengers(

    group INT,
    activity TINYINT,
    activity_type TINYINT,
    event_ref INT,
    pax JSON,
    PRIMARY KEY (group,activity,activity_type, event_ref),
    FOREIGN KEY (group) REFERENCES activities(group),
    FOREIGN KEY (activities) REFERENCES activities(activity),
    FOREIGN KEY (activity_type) REFERENCES activities(activity_type),
    FOREIGN KEY (event_ref) REFERENCES activity_group(id)
    
);

CREATE TABLE invoices(

    id INT AUTO_INCREMENT PRIMARY KEY,
    document INT,
    payment ENUM(1,2) NOT NULL,
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
    group INT NOT NULL,
    activity TINYINT NOT NULL,
    activity_type TINYINT NOT NULL,
    invoice INT,
    amount FLOAT NOT NULL,
    concept VARCHAR(70),
    details JSON,
    FOREIGN KEY (group) REFERENCES activities(group),
    FOREIGN KEY (activities) REFERENCES activities(activity),
    FOREIGN KEY (activity_type) REFERENCES activities(activity_type),
    FOREIGN KEY (invoice) REFERENCES invoices(id)
);


CREATE TABLE inventory_items (

    id INT AUTO_INCREMENT PRIMARY KEY ,
    agent INT,
    item_type TINYINT NOT NULL,
    data JSON,
    FOREIGN KEY (agent) REFERENCES agents(id)
);



