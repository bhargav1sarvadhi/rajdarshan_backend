import Joi from 'joi';
import { validateReq } from '../helpers/validation.helper';

export const bookslotValidqtion = (req, res, next) => {
    const bookslotValidqtion = Joi.object({
        booking_date: Joi.string().required(),
        outlet_id: Joi.string().required(),
        slot_id: Joi.string().required(),
        booking_status: Joi.boolean().allow(null, ''),
        user_id: Joi.string().allow(null, ''),
        simulator_id: Joi.string().allow(null, ''),
    });
    validateReq(req, next, bookslotValidqtion);
};
export const blogsValidqtion = (req, res, next) => {  
    const blogsValidqtion = Joi.object({
        image: Joi.array()
            .items(Joi.string().allow(null, ''))
            .allow(null),
        video: Joi.array()
            .items(Joi.string().allow(null, ''))
            .allow(null),
        title: Joi.string().required(),
        discription: Joi.string().allow(''),
        type: Joi.string().required(),
        sub_title: Joi.string().allow(''),
        blog_content: Joi.array()
        .items(Joi.object().allow(null, ''))
        .allow(null)
    }).unknown(true);
    validateReq(req, next, blogsValidqtion);
};
