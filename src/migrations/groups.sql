CREATE SCHEMA IF NOT EXISTS "node";

CREATE TYPE permission AS ENUM ('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES');

CREATE TABLE "node".groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR (255) UNIQUE NOT NULL,
    permissions permission[] NOT NULL
);

INSERT INTO "node".groups (
    name,
    permissions
)
VALUES (
    'readers',
    '"READ"'
), (
    'writers',
    '"READ", "WRITE"'
), (
    'speakers',
    '"READ", "SHARE"'
), (
    'contributors',
    '"READ", "WRITE", "UPLOAD_FILES"'
), (
    'gods',
    '"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"'
);

CREATE TABLE "node".groups_users (
    group_id int REFERENCES "node".groups (id) ON UPDATE CASCADE ON DELETE CASCADE,
    user_id int REFERENCES "node".users (id) ON UPDATE CASCADE ON DELETE CASCADE
);
