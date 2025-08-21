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
    pgm.sql(
        `ALTER TABLE airplane DROP COLUMN IF EXISTS capacity;`
    );
    pgm.sql(
        `ALTER TABLE airplane ADD COLUMN seat_distribution JSONB NOT NULL DEFAULT '{}';`
    );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.sql(`ALTER TABLE airplane DROP COLUMN IF EXISTS seat_distribution;`);
    pgm.sql(
        `ALTER TABLE airplane ADD COLUMN capacity INTEGER;`
    );
};
