import mongoose from 'mongoose'
import { UserProps } from '../types/registerTypes'
const Schema = mongoose.Schema


const userSchema = new Schema<UserProps>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

export const User = mongoose.model<UserProps>("User", userSchema)
