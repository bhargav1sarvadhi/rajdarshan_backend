import { DataTypes } from 'sequelize';
import { compareSync, hashSync, genSaltSync } from 'bcrypt';

export const activityModel = (sequelize) => {
    const activityModel = sequelize.define(
        'activity_details',
        {
            id: {
                type: DataTypes.UUID,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            activity_name: {
                type: DataTypes.TEXT,
                allowNull: false,
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

    return activityModel;
};
