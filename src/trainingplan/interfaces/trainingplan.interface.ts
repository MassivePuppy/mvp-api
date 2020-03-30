import { Document } from 'mongoose';

export interface TrainingPlan extends Document {
    readonly _id: string
    readonly name: string
    readonly description: string
    readonly duration: number
    readonly intensity: number
}