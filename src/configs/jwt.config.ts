import { registerAs } from "@nestjs/config";

export default registerAs('jwt', () => ({
    secret: process.env.JWT_SECRET,
    expiration: process.env.JWT_EXPIRATION,
    issuer: process.env.JWT_ISSUER,
    audience: process.env.JWT_AUDIENCE,
    accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL, 10) || 3600, // default to 1 hour
    refreshTokenTtl: parseInt(process.env.JWT_REFRESH_TOKEN_TTL, 10) || 604800 // default to 7
}))