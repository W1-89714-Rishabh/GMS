create database GMS;
 use GMS;
 CREATE TABLE Diet (
    Diet_Id INT AUTO_INCREMENT PRIMARY KEY,
    Type VARCHAR(20),
    Diet_Name VARCHAR(20),
    Calories INT,
    Vegan VARCHAR(20) );
CREATE TABLE Ingredient (
     Ingredient_Id INT AUTO_INCREMENT PRIMARY KEY,
     Diet_Id INT,
     Ingredient_Name VARCHAR(50),
     FOREIGN KEY (Diet_Id) REFERENCES Diet(Diet_Id));
CREATE TABLE Exercise (
        Id INT AUTO_INCREMENT PRIMARY KEY,
        Type VARCHAR(20),
        Exercise_Name VARCHAR(20),
        Body_Type VARCHAR(20));
 create table trannie(trannie_id int Auto_increment primary key,
        name varchar(20),email varchar(30),
        password varchar(20),height DECIMAL(4,2),
        weight DECIMAL(5,2),allergies varchar(20),
        disablity varchar(20));
CREATE TABLE Disability (
         Id INT PRIMARY KEY,
         Body_Part VARCHAR(20),
         FOREIGN KEY (Id) REFERENCES Trainee(Id));
CREATE TABLE Disability (
        Id INT PRIMARY KEY,
        Body_Part VARCHAR(20),
    FOREIGN KEY (Id) REFERENCES Trannie( trannie_id ));
create table Category(
    id int auto_increment primary key,
        type varchar (20),
        foreign key (id) references Trannie(trannie_id));
create table Trainner(trainer_id int auto_increment primary key,
        name varchar(20),
        email varchar(20),
        password varchar(20)
);