const APP = {
    // App Name
    NAME: process.env.REACT_APP_PUBLIC_APP_NAME ?? "Feedio",

    // Backend URL
    API_URL: process.env.REACT_APP_PUBLIC_API_URL,

    // Cookie Key for Access Token
    ACCESS_TOKEN_KEY: process.env.REACT_APP_PUBLIC_ACCESS_TOKEN_KEY ?? "backend-api.access-token",
    REFRESH_TOKEN_KEY: process.env.REACT_APP_PUBLIC_REFRESH_TOKEN_KEY ?? "backend-api.refresh-token",

    // OAuth Credentials
    BACKEND_API_CLIENT_ID: process.env.REACT_APP_BACKEND_API_CLIENT_ID,
    BACKEND_API_CLIENT_SECRET: process.env.REACT_APP_BACKEND_API_CLIENT_SECRET,
};

export default APP;