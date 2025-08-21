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
        ALTER TABLE flight
        ADD COLUMN generated_cycle_id UUID REFERENCES flight_cycle(id) DEFAULT NULL,
        ADD COLUMN generated_leg_order INTEGER DEFAULT NULL,
        ADD COLUMN generated_for_date DATE DEFAULT NULL;

        CREATE UNIQUE INDEX unique_generated_date_and_flight_number
        ON flight (flight_number, generated_for_date);
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.sql(`
        ALTER TABLE flight
        DROP COLUMN generated_cycle_id,
        DROP COLUMN generated_leg_order,
        DROP COLUMN generated_for_date;
    `);
};
