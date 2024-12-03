import { STRING } from 'sequelize';
import { DataTypes } from 'sequelize';

export const countriesModel = (sequelize) => {
    const countriesModel = sequelize.define('countries_detail', {
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
        iso2: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return countriesModel;
};
