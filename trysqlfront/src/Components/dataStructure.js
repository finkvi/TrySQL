let DataStructure = {};


DataStructure.CAR = {
    "desc": "Таблица CAR содержит характеристики всех автомобилей, которые фирма уже продала или собирается продать в будущем"
};

DataStructure.CAR.SQL = `
CREATE TABLE IF NOT EXISTS CAR
(
      VIN STRING PRIMARY KEY
    , marque STRING                    
    , model STRING                      
    , power NUMBER
    , engine STRING
    , transmission STRING
    , color STRING
    , kilometrage NUMBER
    , year_of_make NUMBER
    , price NUMBER
    , sold_flag STRING
    )
`;

DataStructure.CAR.SampleData = `
INSERT INTO CAR VALUES
      ('WBAFW11060AL00317','BMW','F10_520d',190,'diesel','manual','gray',155000,2015,31000,'Y')
    , ('AASSDD11060AL00317','AUDI','Q7',190,'petrol','DSG','green',14000,2017,31000,'N')
`;

DataStructure.STAFF = {
    "desc": "Таблица STAFF содержит данные сотрудников фирмы"
};

DataStructure.STAFF.SQL = `
CREATE TABLE IF NOT EXISTS STAFF
(
      eim_id NUMBER PRIMARY KEY
    , first_name STRING
    , last_name STRING                      
    , sex STRING
    , experience NUMBER
    , salary NUMBER
    , CONSTRAINT CHK_Sex CHECK (sex='F' OR sex='M')
)
`;

DataStructure.STAFF.SampleData = `
INSERT INTO STAFF VALUES
      (5, 'Maria', 'Petrova','F',1.5, 1500)
    , (1, 'Ivan', 'Ivashov','M',4.5, 5500)
    , (3, 'Daria', 'Kulakova','F',2, 3500)
`;

DataStructure.CLIENT = {
    "desc": "Таблица CLIENT содержит данные корпоративных клиентов – компаний, которые покупают у фирмы автомобили"
};

DataStructure.CLIENT.SQL = `
CREATE TABLE IF NOT EXISTS CLIENT
( 
      client_id NUMBER PRIMARY KEY
    , OGRN STRING NOT NULL UNIQUE
    , name STRING
    , city STRING
)
`;

DataStructure.CLIENT.SampleData = `
INSERT INTO CLIENT VALUES
      (1, '6077746981186', 'Technoserv Consulting','Moscow')
    , (5, '5077746981185', 'Technoserv IT','Moscow')
    , (9, '9077746981189', 'Technoserv Systems','Moscow')
`;

DataStructure.DEAL = {
    "desc": "Таблица DEAL содержит сделки по продажам автомобилей"
};

DataStructure.DEAL.SQL = `
CREATE TABLE IF NOT EXISTS DEAL
(
      contract _id NUMBER PRIMARY KEY
    , VIN STRING
    , emp_id NUMBER
    , client_id NUMBER
    , deal_date DATE
)
`;

DataStructure.DEAL.SampleData = `
INSERT INTO DEAL VALUES
    (1,'WBAFW11060AL00317','5','1','13/12/2017')
`;

export default DataStructure;