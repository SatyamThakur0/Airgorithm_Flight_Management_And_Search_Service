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
        CREATE TYPE flight_status AS ENUM ('scheduled', 'completed', 'cancelled', 'delayed');
        `);
    pgm.sql(`
        CREATE TABLE flight (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            flight_number VARCHAR(10) NOT NULL DEFAULT SUBSTRING(gen_random_uuid()::text, 1, 8),
            airplane_id UUID NOT NULL,
            source_airport_id UUID NOT NULL,
            destination_airport_id UUID NOT NULL,
            departure_time TIMESTAMPTZ NOT NULL,
            arrival_time TIMESTAMPTZ NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            booked_seats INT NOT NULL DEFAULT 0,
            status flight_status NOT NULL DEFAULT 'scheduled',
            created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (airplane_id) REFERENCES airplane(id),
            FOREIGN KEY (source_airport_id) REFERENCES airport(id),
            FOREIGN KEY (destination_airport_id) REFERENCES airport(id)
        )
    `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.sql(`
        DROP TABLE flight;
    `);
    pgm.sql(`
        DROP TYPE flight_status;
    `);
};
