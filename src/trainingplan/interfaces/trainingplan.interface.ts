import { Document } from 'mongoose';

export interface TrainingPlan extends Document {
    readonly _id: String
    readonly name: String
    readonly description: String
    readonly duration: number
    readonly intensity: number
    readonly userId: String
}