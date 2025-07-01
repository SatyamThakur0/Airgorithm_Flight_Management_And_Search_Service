import CountryRepository from "../repository/country.repository.js";

class CountryService {
    countryRepository;
    constructor() {
        this.countryRepository = new CountryRepository();
    }

    createCountryService = async (country) => {
        return this.countryRepository.createCountry(country);
    };
    deleteCountryService = async (id) => {
        return this.countryRepository.deleteCountry(id);
    };
    getAllCountriesService = async () => {
        return this.countryRepository.getAllCountries();
    };
    getCountryByIdService = async (id) => {
        return this.countryRepository.getCountryById(id);
    };
    getCountryByNameService = async (name) => {
        return this.countryRepository.getCountryByName(name);
    };
    getCountryByCodeService = async (code) => {
        return this.countryRepository.getCountryByCode(code);
    };
    updateCountryNameService = async (id, name) => {
        return this.countryRepository.updateCountryName(id, name);
    };
    updateCountryCodeService = async (id, code) => {
        return this.countryRepository.updateCountryCode(id, code);
    };
}
export default CountryService;
