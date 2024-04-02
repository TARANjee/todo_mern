import mongoose from 'mongoose'

const TodoSchema = new mongoose.Schema({
    todo: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    status: {
        type: mongoose.SchemaTypes.Boolean,
        default: false,
        required: true,
    },
    isCreated: {
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date()
    }
})
export default mongoose.model("todos", TodoSchema)