/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
/* eslint-disable indent */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const csv = require('csv-parser');
        const fs = require('fs');
        const path = require('path');
        const csvFilePath = path.join(
            __dirname,
            '../',
            './src/uploads/states.csv',
        );
        const data = [];
        const headers = ['id', 'name', 'country_id'];
        await new Promise((resolve, reject) => {
            fs.createReadStream(csvFilePath)
                .pipe(csv({ headers }))
                .on('data', (raw) => {
                    const { id, name, country_id } = raw;
                    data.push({
                        id,
                        name,
                        country_id,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    });
                })
                .on('end', () => {
                    resolve();
                })
                .on('error', (error) => {
                    reject(error);
                });
        });
        return queryInterface.bulkInsert('states_details', data, {});
    },

    async down(queryInterface, Sequelize) {},
};

// 'use strict';
// const fs = require('fs');
// const path = require('path');

// module.exports = {
//     up: async (queryInterface, Sequelize) => {
//         try {
//             const files = ['../src/uploads/state_details.json'];

//             for (const file of files) {
//                 const jsonData = fs.readFileSync(path.join(__dirname, file));
//                 const data = JSON.parse(jsonData);
//                 const insertdata = [];
//                 data.map((raw) => {
//                     const {
//                         id,
//                         name,
//                         country_id,
//                         country_code,
//                         country_name,
//                         state_code,
//                         latitude,
//                         longitude,
//                     } = raw;

//                     insertdata.push({
//                         id,
//                         name,
//                         country_id,
//                         country_code,
//                         country_name,
//                         state_code,
//                         latitude,
//                         longitude,
//                         createdAt: new Date(),
//                         updatedAt: new Date(),
//                     });
//                 });
//                 const tableName = path.basename(file, '.json');
//                 await queryInterface.bulkInsert(tableName, insertdata, {});
//             }

//             return Promise.resolve();
//         } catch (error) {
//             console.error('Error seeding data:', error);
//             throw error;
//         }
//     },

//     down: async (queryInterface, Sequelize) => {
//         try {
//             const tables = ['City', 'State', 'Country'];
//             for (const table of tables) {
//                 await queryInterface.bulkDelete(table, null, {});
//             }

//             return Promise.resolve();
//         } catch (error) {
//             console.error('Error deleting seeded data:', error);
//             throw error;
//         }
//     },
// };
