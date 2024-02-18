import { Schema, model } from 'mongoose'

const messageSchema = new Schema(
    {
        senderId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        receiverId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        message: {
            type: String,
            require: true,
        },
    },
    { timestamps: true }
)

const Message = model('Message', messageSchema)

export default Message
