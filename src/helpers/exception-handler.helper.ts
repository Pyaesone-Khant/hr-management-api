import { BadRequestException, ConflictException, ForbiddenException, InternalServerErrorException, NotFoundException, RequestTimeoutException, UnauthorizedException } from "@nestjs/common";

export function handleException(statusCode: 400 | 401 | 403 | 404 | 408 | 409 | 500, error?: string) {
    switch (statusCode) {
        case 400:
            throw new BadRequestException(error)
        case 401:
            throw new UnauthorizedException(error)
        case 403:
            throw new ForbiddenException(error)
        case 404:
            throw new NotFoundException(error)
        case 408:
            throw new RequestTimeoutException(error)
        case 409:
            throw new ConflictException(error)
        case 500:
            throw new InternalServerErrorException(error)
        default:
            throw new Error(error)
    }
}