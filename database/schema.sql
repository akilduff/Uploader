CREATE DATABASE IF NOT EXISTS uploader;

USE uploader;

CREATE TABLE samplefiles (
  id int NOT NULL AUTO_INCREMENT,
  fileName varchar(75) NOT NULL,
  fileLocation varchar(200) NOT NULL,
  dataType varchar(25) NOT NULL,
  primary key (id)
);
