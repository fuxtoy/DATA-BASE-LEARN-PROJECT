-- create a table
CREATE TABLE employee (
  ID INTEGER PRIMARY KEY,
  person_name TEXT NOT NULL,
  street TEXT NOT NULL,
  city TEXT NOT NULL
);
CREATE TABLE company (
  company_name TEXT PRIMARY KEY,
  city TEXT NOT NULL
);
CREATE TABLE works (
  ID INTEGER PRIMARY KEY,
  company_name TEXT NOT NULL,
  salary TEXT NOT NULL
);
CREATE TABLE manages(
  ID INTEGER PRIMARY KEY,
  manager_id INTEGER NOT NULL
);
-- insert some values
INSERT INTO employee VALUES (1, 'Ryan', 'taipei','taipei');
INSERT INTO employee VALUES (2, 'Joanna', '基隆','基隆');
INSERT INTO employee VALUES (3, 'betty', '新竹','新竹');
INSERT INTO employee VALUES (4, 'tommy', '123','123');
INSERT INTO employee VALUES (5, 'tim', '453','453');

INSERT INTO company VALUES ( 'FirstBank','taipei');
INSERT INTO company VALUES ( 'tsmc','基隆');
INSERT INTO company VALUES ( 'meta','新竹');
INSERT INTO company VALUES ( 'apple','taipei');
INSERT INTO company VALUES ( 'SmallBank','123');

INSERT INTO works VALUES (1, 'apple', 28000);
INSERT INTO works VALUES (2, 'FirstBank',20000);
INSERT INTO works VALUES (3, 'SmallBank', 30000);
INSERT INTO works VALUES (4, 'FirstBank', 10000);
INSERT INTO works VALUES (5, 'SmallBank', 17000);

INSERT INTO manages VALUES (1, 301 );
INSERT INTO manages VALUES (2, 303);
INSERT INTO manages VALUES (3, 305);
INSERT INTO manages VALUES (4, 303);
INSERT INTO manages VALUES (5, 304);
-- fetch some values
SELECT ID 
FROM works 
WHERE company_name ='FirstBank' and salary > (SELECT salary FROM works WHERE company_name = 'SmallBank' )  ;


