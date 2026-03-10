const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visaCardSchema = new Schema(
    {
        Name: { type: String, required: true },
        CardNumber: { type: Number, required: true, unique: true },
        CVV: { type: Number, required: true },
        id_card: { type: Schema.Types.ObjectId},
    },
    {
        timestamps: true
    }
);

const VisaCard = mongoose.model('VisaCard', visaCardSchema);
module.exports = VisaCard;