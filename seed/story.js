const { faker } = require('@faker-js/faker');

const generateStories = (num) => {
    const stories = [];

    for (let i = 0; i < num; i++) {
        stories.push({
            title: faker.lorem.sentence(5),
            review: faker.lorem.paragraph(),
            country: faker.location.country(),
            location: faker.location.street(),
            when: new Date().toISOString(),
            image: faker.image.url()
        });
    }

    return stories;
};

module.exports = { generateStories };
