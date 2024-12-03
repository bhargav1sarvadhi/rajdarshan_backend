import { STRING } from 'sequelize';
import { DataTypes } from 'sequelize';

export const tripDetailsModel = (sequelize) => {
    const tripDetailsModel = sequelize.define('trip_details', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        trip_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        destination: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        starting_place: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        customer_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        customer_phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        departure_place: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        arrival_place: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        departure_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        return_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        departure_ticket: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        return_ticket: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        resort_name: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        resort_details: {
            type: DataTypes.JSONB,
            allowNull: true,
        },
        room_category: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        day: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        night: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        total_amount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        paid_amount: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        adult: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        children: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        resort_start: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        vehicle: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        meal_plan: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        inclusion: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        remark: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_by: {
            type: DataTypes.UUID,
            allowNull: true,
        },
    });
    return tripDetailsModel;
};
