import mongoose, { Schema } from 'mongoose';
const TicketSchema = new Schema({
    name: { type: String, required: true },
    status: { type: String, required: true },
    description: { type: String, required: true },
    assignedUser: { type: Schema.Types.ObjectId, ref: 'User', required: false }
});
export const Ticket = mongoose.model('Ticket', TicketSchema);
