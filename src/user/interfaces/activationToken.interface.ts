import { Document } from 'mongoose';

export interface ActivationToken extends Document {
    readonly token: string
    readonly userId: string
}