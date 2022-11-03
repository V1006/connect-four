DROP TABLE IF EXISTS actors;  -- checks if the table already exists and if so deletes it
CREATE TABLE actors (
    id SERIAL primary key, -- always have this line in any table
    name VARCHAR(255) NOT NULL,
    age INT,
    number_of_oscars INT
    
);

INSERT INTO actors (name, age, number_of_oscars) VALUES ('Leonardo DiCaprio',41,1);
INSERT INTO actors (name, age, number_of_oscars) VALUES ('Jennifer Lawrence',25,1);
INSERT INTO actors (name, age, number_of_oscars) VALUES ('Samuel L. Jackson',67,0);
INSERT INTO actors (name, age, number_of_oscars) VALUES ('Meryl Streep',66,3);
INSERT INTO actors (name, age, number_of_oscars) VALUES ('John Cho',43,0);


--Which actors have more than one oscar?

SELECT * FROM actors WHERE number_of_oscars > 1;

-- Which actors are older than 30 years old?

SELECT * FROM actors WHERE age > 30;

