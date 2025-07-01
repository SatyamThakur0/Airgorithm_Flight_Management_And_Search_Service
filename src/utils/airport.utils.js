export const AirportResponse = (airport) => {
    return {
        id: airport.airport_id,
        name: airport.airport_name,
        code: airport.airport_code,
        city: {
            id: airport.city_id,
            name: airport.city_name,
            created_at: airport.city_created_at,
            updated_at: airport.city_updated_at,
            country: {
                id: airport.country_id,
                name: airport.country_name,
                code: airport.country_code,
                created_at: airport.country_created_at,
                updated_at: airport.country_updated_at,
            },
        },
    };
};
