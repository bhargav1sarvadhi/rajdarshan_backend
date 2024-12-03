'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            'user_details',
            [
                {
                    id: '3f7c3f4e-1bc9-4b83-bca2-4d6b8a5f2c94',
                    first_name: 'Admin',
                    last_name: 'Sky Holidays',
                    email: 'skyholidays@gmail.com',
                    password: bcrypt.hashSync('Sky@@##12', 12),
                    role: '1',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null,
                },
                {
                    id: '3f7c3f4e-1bc9-4b83-bca2-4d6b8a5f2c97',
                    first_name: 'Admin',
                    last_name: 'Sky Link IT Hub',
                    email: 'skylinkithub@gmail.com',
                    password: bcrypt.hashSync('Skylink@@##12', 12),
                    role: '0',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    deletedAt: null,
                },
            ],
            {},
        );
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete(
            'user_auth_details',
            { email: 'skyholidays@gmail.com' },
            {},
        );
    },
};
