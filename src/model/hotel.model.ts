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
