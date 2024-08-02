import mongoose from 'mongoose'

const LinkUrlSchema = new mongoose.Schema({
    link_original: {
        type: String,
        trim: true,
        required: true,
        match: [/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/, 'URL invalide (http or https mandatory)']
    },
    token: {
    type: String,
    trim: true,
    unique: true,
    required: true
    },
    num_visit: {
        type: Number,
        default: 0,
    },
    num_unique_visite: {
        type: Number,
        default: 0
    },
    qr_code: {
        type: String,
        required: true,
        default: "QRCODE--fake"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },

})


export default mongoose.model('LinkUrl', LinkUrlSchema)