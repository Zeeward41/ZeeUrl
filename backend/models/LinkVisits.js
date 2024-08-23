import mongoose from 'mongoose'

const LinkVisitsSchema = new mongoose.Schema({
    ipAddress: {
        type: String,
        required: true
    },
    accessedAt: {
        type: Date,
        default: Date.now
    },
    link: {
        type: mongoose.Schema.ObjectId,
        ref: 'LinkUrl',
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        default: null
    }

})


export default mongoose.model('LinkVisits', LinkVisitsSchema)