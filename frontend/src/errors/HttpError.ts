class HttpError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class UnauthorizedError extends HttpError {}

export class ForbiddenError extends HttpError {}

export class BadRequestError extends HttpError {}

export class NotFoundError extends HttpError {}
