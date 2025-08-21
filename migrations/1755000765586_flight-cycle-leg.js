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
        CREATE TABLE flight_cycle_leg(
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        flight_cycle_id UUID NOT NULL REFERENCES flight_cycle(id),
        leg_order INTEGER NOT NULL,
        source_airport_id UUID NOT NULL REFERENCES airport(id),
        destination_airport_id UUID NOT NULL REFERENCES airport(id),
        departure_time TIME NOT NULL,
        arrival_time TIME NOT NULL,
        departure_day_offset INTEGER NOT NULL,
        arrival_day_offset INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        flight_number VARCHAR(10) NOT NULL DEFAULT SUBSTRING(gen_random_uuid()::text, 1, 8),
        class_price_factor JSONB NOT NULL DEFAULT '{}',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
        )`)
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.sql(`DROP TABLE flight_cycle_leg`);
};
