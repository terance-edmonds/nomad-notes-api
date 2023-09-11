const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync(10);

const generateUsers = (num, role) => {
    const user = [];

    for (let i = 0; i < num; i++) {
        user.push({
            name: faker.internet.displayName(),
            email: faker.internet.email().toLowerCase(),
            password: bcrypt.hashSync('1234', salt),
            image: faker.image.avatarGitHub(),
            role: role
        });
    }

    return user;
};

module.exports = { generateUsers };
