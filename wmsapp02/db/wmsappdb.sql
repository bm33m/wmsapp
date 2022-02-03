-- ---------------------------
-- wmsappdb.sql
-- Create new db user.
-- Connect new db user.
-- Create new database.
-- Connect to new database.
-- Create tables.
-- Use the the new database and tables.
-- Enjoy.
-- --------------------------

CREATE ROLE wmsapp02 WITH LOGIN PASSWORD 'myw23pw';

ALTER ROLE wmsapp02 CREATEDB;

\connect - wmsapp02
myw23pw
\conninfo

CREATE DATABASE wmsappdb;

\c wmsappdb

CREATE TABLE users (
userid SERIAL PRIMARY KEY,
name varchar (299) NOT NULL,
surname varchar (299),
email varchar (299) NOT NULL UNIQUE,
password varchar (299) NOT NULL,
isactive varchar (299) NOT NULL,
created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
categoryid SERIAL PRIMARY KEY,
categorycode varchar (299) NOT NULL,
name varchar (299),
isactive varchar (299) NOT NULL,
createdby varchar (299),
modifiedby text,
listdate timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE products (
productid SERIAL PRIMARY KEY,
productcode varchar (299) NOT NULL,
name varchar (299) NOT NULL,
description text,
categoryid int NOT NULL REFERENCES categories (categoryid) on delete cascade,
price float NOT NULL,
image varchar (299),
spreadsheet varchar (299),
createdby varchar (299),
modifiedby text,
listdate timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

\conninfo
\dt

-- ==============================
-- ==============================

INSERT INTO users (name, surname, email,
  password, isactive) VALUES ('Wms2022', 'Wms', 'wms2022@wmsapp.org',
  'cfb5ecd61c77226dd8c6eab6eddfeb14c6892283038d7c54401d8f0eb729c7c2+==',
  'active');

INSERT INTO categories (categorycode, name,
  isactive) VALUES ('ENG123', 'Software Engineering', 'active');

INSERT INTO products (productcode, name, description, categoryid, price,
  image, spreadsheet, createdby) VALUES ('202201-0123', 'wmsapp',
  'Warehouse managment system application.', 1, 3210.99,
  'wmsapp1.png', 'wmsapp1.txt', 'Wms2022, wms2022@wmsapp.org');

-- ===============================
-- ===============================

CREATE TABLE onlineusers (
onlineuserid SERIAL PRIMARY KEY,
email varchar (299) NOT NULL,
token varchar (299) NOT NULL,
created timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
modified timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- ================================
