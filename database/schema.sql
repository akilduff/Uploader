CREATE DATABASE IF NOT EXISTS uploader;

USE uploader;

CREATE TABLE samplefiles (
  id int NOT NULL AUTO_INCREMENT,
  fileName varchar(100) NOT NULL,
  fileLocation varchar(250) NOT NULL,
  dataType varchar(75) NOT NULL,
  primary key (id)
);
