import { DataTypes } from 'sequelize';

export const citiesModel = (sequelize) => {
    const citiesModel = sequelize.define('cities_detail', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'states_details',
                key: 'id',
            },
        },
    });
    return citiesModel;
};
