import { STRING } from 'sequelize';
import { DataTypes } from 'sequelize';

export const statesModel = (sequelize) => {
    const statesModel = sequelize.define('states_detail', {
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
        country_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'countries_details',
                key: 'id',
            },
        },
    });
    return statesModel;
};
