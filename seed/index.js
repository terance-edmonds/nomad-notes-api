const fs = require('fs');
const Country = require('../database/models/country');
const Story = require('../database/models/story');
const User = require('../database/models/user');
const { generateCountries } = require('./country');
const { generateStories } = require('./story');
const { generateUsers } = require('./user');
const userUtils = require('../utils/user');

const seedUsers = async (num, role, name, result) => {
    return new Promise((resolve) => {
        const users = generateUsers(num, role);

        if (result?.[name]) return true;

        User.insertMany(users, { ordered: false })
            .then((docs) => {
                console.log(
                    `${docs.length} "${name}" records have been inserted into the database.`
                );
                return resolve(true);
            })
            .catch((err) => {
                console.error(err);
                console.error(
                    `${
                        err.writeErrors?.length ?? 0
                    } errors occurred during the insertMany operation.`
                );
                return resolve(false);
            });
    });
};

const seedStories = async (num, approved, name, result) => {
    return new Promise((resolve) => {
        const stories = generateStories(num, approved);

        if (result?.[name]) return true;

        Story.insertMany(stories, { ordered: false })
            .then((docs) => {
                console.log(
                    `${docs.length} "${name}" records have been inserted into the database.`
                );
                return resolve(true);
            })
            .catch((err) => {
                console.error(err);
                console.error(
                    `${
                        err.writeErrors?.length ?? 0
                    } errors occurred during the insertMany operation.`
                );
                return resolve(false);
            });
    });
};

const seedCountries = async (num, name, result) => {
    return new Promise((resolve) => {
        const countries = generateCountries(num);

        if (result?.[name]) return true;

        Country.insertMany(countries, { ordered: false })
            .then((docs) => {
                console.log(
                    `${docs.length} "${name}" records have been inserted into the database.`
                );
                return resolve(true);
            })
            .catch((err) => {
                console.error(err);
                console.error(
                    `${
                        err.writeErrors?.length ?? 0
                    } errors occurred during the insertMany operation.`
                );
                return resolve(false);
            });
    });
};

const seedDB = () => {
    fs.readFile('seed/seed.json', async function (err, content) {
        if (err) throw err;

        let result = JSON.parse(content) || {};

        let [admin, user, stories, approved_stories, countries] = await Promise.all([
            seedUsers(15, userUtils.roles.ADMIN, 'admin', result),
            seedUsers(15, userUtils.roles.USER, 'user', result),
            seedStories(10, false, 'stories', result),
            seedStories(20, true, 'approved_stories', result),
            seedCountries(15, 'countries', result)
        ]);

        fs.writeFile(
            'seed/seed.json',
            JSON.stringify({
                ...result,
                admin,
                user,
                stories,
                approved_stories,
                countries
            }),
            function (err) {
                if (err) throw err;
            }
        );
    });
};

module.exports = seedDB;
