import mongoose from 'mongoose'
import { UserProps } from '../types/userTypes.js'
const Schema = mongoose.Schema


const userSchema = new Schema<UserProps>({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 1010
        },
        Editor: Number,
        Admin: Number
    },
    refreshToken: String
})

export const User = mongoose.model<UserProps>("User", userSchema)
