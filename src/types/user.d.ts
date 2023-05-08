declare interface User {
    avatar?: string;
    description?: string;
    email?: string;
    first_name?: string;
    friends?: Array<string> | string;
    id: string;
    language?: string; // Is usefull?
    last_name?: string;
    password?: string;
    role: string; // Check
    status: string; // Is usefull?
    username: string;
}
