CREATE TABLE users(
   id   SERIAL,
   username TEXT,
   email TEXT,
   password  TEXT, 
   provider TEXT NOT NULL,      
   PRIMARY KEY (id)
);