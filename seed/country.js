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
            description: faker.lorem.paragraphs(5),
            image: faker.image.urlLoremFlickr({ category: 'city' })
        });
    }

    return countries;
};

module.exports = { generateCountries };
