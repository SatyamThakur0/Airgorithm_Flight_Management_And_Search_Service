/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => { 
    pgm.sql(`
        CREATE TABLE airplane (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(50) NOT NULL,
        code VARCHAR(10) NOT NULL,
        capacity INT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )
    `);
    pgm.sql(`
        CREATE INDEX index_airplane_name ON airplane (name);
    `);
    pgm.sql(`
        CREATE INDEX index_airplane_code ON airplane (code);    
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.sql(`
        DROP INDEX index_airplane_code;
    `);
    pgm.sql(`
        DROP INDEX index_airplane_name;
    `);
    pgm.sql(`
        DROP TABLE airplane;
    `);
};
