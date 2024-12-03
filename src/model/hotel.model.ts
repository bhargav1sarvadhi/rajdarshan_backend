import { DataTypes } from 'sequelize';
import { compareSync, hashSync, genSaltSync } from 'bcrypt';

export const HotelModel = (sequelize) => {
    const hotelModel = sequelize.define(
        'hotel_details',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            hotel_name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            meal_plan: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            rate: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            extra_adult_with_mattress: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            extra_child_with_mattress: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            extra_child_without_mattress: {
                type: DataTypes.FLOAT,
                allowNull: true,
            },
            is_active: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            paranoid: true,
        },
    );

    // userModel.associate = (models) => {
    //     userModel.hasMany(models, {});
    // };

    return hotelModel;
};
