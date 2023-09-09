const Country = require('../database/models/country');
const Story = require('../database/models/story');
const User = require('../database/models/user');
const { generateCountries } = require('./country');
const { generateStories } = require('./story');
const { generateUsers } = require('./user');

const seedUsers = async (num, role) => {
    const users = generateUsers(num, role);

    User.insertMany(users, { ordered: false })
        .then((docs) => console.log(`${docs.length} records have been inserted into the database.`))
        .catch((err) => {
            console.error(err);
            console.error(
                `${err.writeErrors?.length ?? 0} errors occurred during the insertMany operation.`
            );
        });
};

const seedStories = async (num) => {
    const stories = generateStories(num);

    Story.insertMany(stories, { ordered: false })
        .then((docs) => console.log(`${docs.length} records have been inserted into the database.`))
        .catch((err) => {
            console.error(err);
            console.error(
                `${err.writeErrors?.length ?? 0} errors occurred during the insertMany operation.`
            );
        });
};

const seedCountries = async (num) => {
    const countries = generateCountries(num);

    Country.insertMany(countries, { ordered: false })
        .then((docs) => console.log(`${docs.length} records have been inserted into the database.`))
        .catch((err) => {
            console.error(err);
            console.error(
                `${err.writeErrors?.length ?? 0} errors occurred during the insertMany operation.`
            );
        });
};

const seedDB = () => {
    // seedUsers(15, userUtils.roles.ADMIN);
    // seedUsers(15, userUtils.roles.USER);

    // seedStories(20);

    seedCountries(15);
};

module.exports = seedDB;
