export class ApiResponse {
    data;
    message;
    ok;
    status;
    constructor(message = "success", data = null, ok = true, status = 200) {
        this.data = data;
        this.message = message;
        this.status = status;
        this.ok = ok;
    }

    toJSON = () => {
        return {
            ok: this.ok,
            data: this.data,
            status: this.status,
            message: this.message,
        };
    };
}

export class ApiError extends Error {
    status;
    stack;
    errors;
    message;
    constructor(
        status = 500,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ) {
        super(message);
        this.status = status;
        this.message = message;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

    toJSON = () => {
        return {
            ok: false,
            message: this.message,
            errors: this.errors,
            status: this.status,
        };
    };
}
