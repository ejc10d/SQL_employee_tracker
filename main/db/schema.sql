-- creates a new version of the db 
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

-- selecting the db
USE employee_db;

-- creates the tables for us to populate with seeded data
CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(40) NOT NULL,
    department_id INT NOT NULL,
    salary DECIMAL NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(id),
    PRIMARY KEY (id)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    manager_id INT,
    PRIMARY KEY (id)
);

SHOW TABLES;