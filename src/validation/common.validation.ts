import Joi from 'joi';
import { validateReq } from '../helpers/validation.helper';
import { CommonValidationFilter } from '../helpers/validation.helper';

export const loginValidation = (req, res, next) => {
    const loginSchema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.empty': 'Email cannot be an empty string.',
            'string.required': 'Email is required.',
        }),
        password: new CommonValidationFilter().password(),
        firebase_token: Joi.string().allow('', null),
        role: Joi.string().allow('', null),
    });
    validateReq(req, next, loginSchema);
};
export const SignupValidqtion = (req, res, next) => {
    const loginSchema = Joi.object({
        email: Joi.string().required().messages({
            'string.empty': 'Phone cannot be an empty string.',
            'string.required': 'Email is required.',
        }),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        password: new CommonValidationFilter().password(),
        firebase_token: Joi.string().allow('', null),
    });
    validateReq(req, next, loginSchema);
};

export const updateUserValidqtion = (req, res, next) => {
    const loginSchema = Joi.object({
        email: Joi.string().required().messages({
            'string.empty': 'Phone cannot be an empty string.',
            'string.required': 'Email is required.',
        }),
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
    }).unknown(true);
    validateReq(req, next, loginSchema);
};
