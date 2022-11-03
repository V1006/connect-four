-- comment

DROP TABLE IF EXISTS cities;  -- checks if the table already exists and if so deletes it
CREATE TABLE cities (
    id SERIAL primary key, -- always have this line in any table
    name VARCHAR(255) NOT NULL,
    state VARCHAR(255),
    population INT,
    country VARCHAR
);

-- CRUD

-- CREATE
-- insert adds a row
INSERT INTO cities (name, country, population) VALUES ('Berlin', 'Germany', 3610156);
INSERT INTO cities (name, country, population) VALUES ('Hamburg', 'Germany', 1774242);
INSERT INTO cities (name, country, population) VALUES ('Munch', 'Germany', 1450381);
INSERT INTO cities (name, country, population) VALUES ('Tokyo', 'Japan', 13617445);
INSERT INTO cities (name, country, population) VALUES ('Sydney', 'Australia', 4921000);

-- READ
-- SELECT * FROM cities;
-- SELECT * FROM cities WHERE country = 'Germany';


-- UPDATE
UPDATE cities SET name = 'Munich' WHERE name = 'Munch';


-- DELETE
DELETE FROM cities WHERE country <> 'Germany';

SELECT * FROM cities;