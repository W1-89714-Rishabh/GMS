CREATE DATABASE GMS;
USE GMS;

CREATE TABLE Diet (
    Diet_Id INT AUTO_INCREMENT PRIMARY KEY,
    Type VARCHAR(20),
    Diet_Name VARCHAR(20),
    Calories INT,
    Vegan BOOLEAN
);

CREATE TABLE Ingredient (
    Ingredient_Id INT AUTO_INCREMENT PRIMARY KEY,
    Diet_Id INT,
    Ingredient_Name VARCHAR(50),
    FOREIGN KEY (Diet_Id) REFERENCES Diet(Diet_Id) ON DELETE CASCADE
);

CREATE TABLE Exercise (
    Exercise_Id INT AUTO_INCREMENT PRIMARY KEY,
    Type VARCHAR(20),
    Exercise_Name VARCHAR(20),
    Body_Type VARCHAR(20)
);

CREATE TABLE Trainee (
    Trainee_Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(20),
    Email VARCHAR(30) UNIQUE,
    Password VARCHAR(20),
    Height DECIMAL(4,2),
    Weight DECIMAL(5,2),
    Allergies VARCHAR(50), 
    Disability VARCHAR(50)
);

CREATE TABLE Disability (
    Disability_Id INT AUTO_INCREMENT PRIMARY KEY,
    Body_Part VARCHAR(20),
    Trainee_Id INT,
    FOREIGN KEY (Trainee_Id) REFERENCES Trainee(Trainee_Id) ON DELETE CASCADE
);

CREATE TABLE Category (
    Category_Id INT AUTO_INCREMENT PRIMARY KEY,
    Type VARCHAR(20),
    Trainee_Id INT,
    FOREIGN KEY (Trainee_Id) REFERENCES Trainee(Trainee_Id) ON DELETE CASCADE
);

CREATE TABLE Trainer (
    Trainer_Id INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(20),
    Email VARCHAR(30) UNIQUE,
    Password VARCHAR(20)
);
CREATE TABLE BMI(Trainee_Id int Primary key,Bmi DECIMAL(4,2));