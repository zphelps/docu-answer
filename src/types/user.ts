export interface User {
    id: string;
    displayName: string;
    email: string;
    avatarURL: string;
    googleAccessToken: string;

    [key: string]: any;
}
