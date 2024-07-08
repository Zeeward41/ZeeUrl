import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        match: [/^[A-Za-z0-9]{3,16}$/]
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid email']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    birthday: {
        type: Date,
        default: null
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        // match: [/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W).{8,20}$/],
        minlength: 6,
        // select: false est utilisé pour que le champ ne soit pas inclus par défaut dans les requêtes de sélection
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

export default mongoose.model('User', UserSchema)