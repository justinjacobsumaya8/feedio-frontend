import User from "./User";

class IssuedToken {
    static format = (object) => {
        return {
            accessToken: object.access_token,
            refreshToken: object.refresh_token,
            expiresIn: object.expires_in,
            user: User.format(object.user),
        };
    }
}

export default IssuedToken;
