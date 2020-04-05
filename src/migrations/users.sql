CREATE SCHEMA IF NOT EXISTS "node";

CREATE TABLE "node".users (
    id SERIAL PRIMARY KEY,
    login VARCHAR (255) UNIQUE NOT NULL,
    password VARCHAR (255) NOT NULL,
    age NUMERIC NOT NULL CHECK (age >= 4 AND age <= 130),
    isdeleted BOOLEAN NOT NULL
);

INSERT INTO "node".users (
    login,
    password,
    age,
    isdeleted
)
VALUES (
    'tim-cook@apple.com',
    'iphone',
    59,
    FALSE
), (
    'bill-gates@microsoft.com',
    'windows',
    64,
    FALSE
), (
    'jeff-bezos@amazon.com',
    'dollars',
    56,
    FALSE
), (
    'elon-musk@tesla.com',
    'rockets',
    48,
    TRUE
), (
    'mark-zuckerberg@facebook.com',
    'harvard',
    35,
    FALSE
);
