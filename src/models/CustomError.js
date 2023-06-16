import axios from "axios";

class CustomError {
    static CANCELLATION_MESSAGE = "Request Cancelled";
    static UNKNOWN_ERROR_MESSAGE = "Something went wrong. Please try again later.";

    static format = (object = {}) => {
        let errorObject = {};

        if (axios.isCancel(object)) {
            errorObject = {
                status: 499,
                message: CustomError.CANCELLATION_MESSAGE
            };
        } else if (object.response) {
            errorObject = {
                ...object.response.data,
                status: object.response.status,
                message: object.response.data.message
            };
        } else if (object.request) {
            errorObject = {
                ...object,
                status: object.request.status,
                message: CustomError.UNKNOWN_ERROR_MESSAGE
            };
        } else {
            errorObject = {
                ...object,
                status: 0,
                message: CustomError.UNKNOWN_ERROR_MESSAGE
            };
        }

        if (!errorObject.message) {
            errorObject.message = CustomError.UNKNOWN_ERROR_MESSAGE;
        }

        // Filter SQLSTATE error messages
        if (errorObject.message.includes("SQLSTATE")) {
            errorObject.message = "Database error. Please contact your administrator.";
        }

        return errorObject;
    };

    static isCancel(object = {}) {
        if (object.message === CustomError.CANCELLATION_MESSAGE) {
            return true;
        }

        return false;
    }
}

export default CustomError;
