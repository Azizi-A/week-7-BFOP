BEGIN;

DROP TABLE IF EXISTS users, facts CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    cohort VARCHAR(5)
);

CREATE TABLE facts (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES users(id),
    text_content TEXT NOT NULL,
    about_who VARCHAR(100)
);

COMMIT;