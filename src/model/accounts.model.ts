import { STRING } from 'sequelize';
import { DataTypes } from 'sequelize';

export const accountsDetailsModel = (sequelize) => {
    const accountsDetailsModel = sequelize.define('account_details', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        trip_id: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        discriptions: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        category: {
            type: DataTypes.ENUM,
            allowNull: true,
            values: ['B2b', 'Marketing', 'Expenses', 'Sales'],
        },
        paid_by: {
            type: DataTypes.ENUM,
            allowNull: true,
            values: ['Yash', 'Jaydip', 'Bhargav'],
        },
        remark: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_by: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        role: {
            type: DataTypes.ENUM,
            values: ['0', '1', '2'],
        },
    });
    return accountsDetailsModel;
};
