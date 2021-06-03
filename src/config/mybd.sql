CREATE DATABASE TicketsDB;

USE TicketsDB;

CREATE TABLE Categorias(
	id int auto_increment not null,
	nombre varchar(50) not null,
    primary key(id)		
);
CREATE TABLE Personal(
	id int auto_increment not null,
    nombre varchar(50) not null,
    apellido varchar(80) not null,
    telefono varchar(10),
    direccion varchar(150),
    primary key(id)
    
);
CREATE TABLE Tickets(
	id int auto_increment not null,
    nombre varchar(50) not null,
    descripcion varchar(100),
    prioridad int not null,
    estatus varchar(3) not null,
    personalID int not null,
    categoriaID int not null,
    primary key(id),
    foreign key(personalID) references Personal(id),
    foreign key(categoriaID) references Categorias(id)
);