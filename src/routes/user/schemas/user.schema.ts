import { Schema } from 'mongoose';
export const userSchema = new Schema({
    user: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, required: true }
},
{
    timestamps:true
})
