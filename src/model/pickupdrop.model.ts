import { DataTypes } from 'sequelize';
import { compareSync, hashSync, genSaltSync } from 'bcrypt';

export const pickupdropModel = (sequelize) => {
    const pickupdropModel = sequelize.define(
        'pickupdrop_details',
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

    // userModel.associate = (models) => {
    //     userModel.hasMany(models, {});
    // };

    return pickupdropModel;
};
