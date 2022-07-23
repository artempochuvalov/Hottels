const BaseJoi = require("joi");
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.avoidHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        avoidHTML: {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.avoidHTML', {value});
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension);

module.exports.hotelSchema = Joi.object({
    hotel: Joi.object({
        title: Joi.string().required().avoidHTML(),
        price: Joi.number().required().min(0),
        location: Joi.string().required().avoidHTML(),
        description: Joi.string().required().avoidHTML(),
    }).required(),
    deleteImages: Joi.array()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required().avoidHTML(),
    }).required()
});