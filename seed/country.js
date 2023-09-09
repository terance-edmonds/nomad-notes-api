const { faker } = require('@faker-js/faker');

const generateCountries = (num) => {
    const countries = [];

    for (let i = 0; i < num; i++) {
        let country = faker.location.country();
        while (countries.find((c) => c.name == country)) {
            country = faker.location.country();
        }

        countries.push({
            name: country,
            description: faker.lorem.paragraph(),
            image: faker.image.url()
        });
    }

    return countries;
};

module.exports = { generateCountries };
