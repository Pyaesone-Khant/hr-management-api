import * as Joi from "joi"

export default Joi.object({
    NODE_ENV: Joi.string()
        .valid("development", "production", "test", "provision")
        .default("development"),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().port().default(5432),
    DB_NAME: Joi.string().required(),
    DB_USER: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    API_VERSION: Joi.string().required(),
})