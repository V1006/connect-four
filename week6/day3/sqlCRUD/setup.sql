DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    profile_picture_url TEXT
);

INSERT INTO
    users (
        first_name,
        last_name,
        email,
        profile_picture_url
    )
VALUES
    (
        'George',
        'Bluth',
        'george.bluth@reqres.in',
        'https://reqres.in/img/faces/1-image.jpg'
    ),
    (
        'Janet',
        'Weaver',
        'janet.weaver@reqres.in',
        'https://reqres.in/img/faces/2-image.jpg'
    ),
    (
        'Emma',
        'Wong',
        'emma.wong@reqres.in',
        ''
    );