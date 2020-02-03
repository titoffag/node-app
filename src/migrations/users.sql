CREATE TABLE users (
    id INT PRIMARY KEY,
    login VARCHAR (255) UNIQUE NOT NULL,
    password VARCHAR (255) NOT NULL,
    age NUMERIC NOT NULL CHECK (age >= 4 AND age <= 130),
    isDeleted BOOLEAN NOT NULL
);

INSERT INTO users (
    login,
    password,
    age,
    isDeleted
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
