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

INSERT INTO users (username, password, cohort) VALUES 
    ('mrladybug', 12345, 'FAC50'),
    ('mrsladybug', 67890, 'FAC30');

INSERT INTO facts (owner_id, text_content, about_who) VALUES 
    (1, 'She paints her black dots on', 'mrsladybug'),
    (2, 'He wears a wig!', 'mrladybug');

COMMIT;