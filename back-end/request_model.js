const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const requestSchema = new Schema(
    {
        Name: { type: String, required: true },
        Address: { type: String, required: true },
        Email: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        id_req: { type: Schema.Types.ObjectId},
        
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model('Request', requestSchema);