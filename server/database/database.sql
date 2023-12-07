CREATE TABLE healthdeskCase(
    CaseID SERIAL PRIMARY KEY,
    StartingDate DATE NOT NULL,
    ClosingDate DATE NOT NULL,
    Stat BOOLEAN,
    CustomerID INTEGER,
    DeviceID INTEGER,
    WorkerID INTEGER,
    ErrorID INTEGER,
    BoardID INTEGER,
    FOREIGN KEY(CustomerID) 
	    REFERENCES customer(CustomerID),
    FOREIGN KEY(DeviceID) 
	    REFERENCES device(DeviceID),
    FOREIGN KEY(WorkerID) 
	    REFERENCES worker(WorkerID),
    FOREIGN KEY(ErrorID) 
	    REFERENCES tag(ErrorID)             
);


CREATE TABLE customer(
    CustomerID SERIAL PRIMARY KEY,
    CustomerFirstName CHAR(16),
    CustomerLastName CHAR(16),
    CustomerNumber CHAR(10),
    CustomerEmail CHAR(16) OPTION    
);

CREATE TABLE device(
    DeviceID SERIAL PRIMARY KEY,
    DeviceName CHAR(16),
    SerialNumber CHAR(16),
    CustomerID INTEGER,
    FOREIGN KEY(CustomerID) 
	    REFERENCES customer(CustomerID)
);

CREATE TABLE worker(
    WorkerID SERIAL PRIMARY KEY,
    WorkerLastName CHAR(16),
    WorkerFirstName CHAR(16)   
);

CREATE TABLE tag(
    ErrorID SERIAL PRIMARY KEY,
    ErrorName CHAR(16)
);