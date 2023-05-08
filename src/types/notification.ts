declare interface Notification {
    id?: number;
    timestamp?: string;
    status?: 'inbox' | 'archived';
    recipient: Array<string> | string;
    sender?: Array<string> | string;
    subject: string;
    message?: string;
    collection?: string;
    item?: string;
    // Custom
    type: 'friend_request' | 'private_message' | 'system_message';
}
