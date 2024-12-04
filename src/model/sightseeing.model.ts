import { DataTypes } from 'sequelize';
import { compareSync, hashSync, genSaltSync } from 'bcrypt';

export const sightseeingModel = (sequelize) => {
    const sightseeingModel = sequelize.define(
        'sightseeing_details',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            vehicle_type: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            type: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            place: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            rate: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
        },
        {
            paranoid: true,
        },
    );

    return sightseeingModel;
};
