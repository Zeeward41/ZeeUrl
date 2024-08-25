import mongoose from 'mongoose'

const LinkVisitsSchema = new mongoose.Schema({
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
    },
    visitorId: {
        type: String,
        required: true
    }

})


export default mongoose.model('LinkVisits', LinkVisitsSchema)