import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
// Hash password before saving
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
// Compare password method
UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
export const User = mongoose.model('User', UserSchema);
