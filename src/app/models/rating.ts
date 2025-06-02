import mongoose from "mongoose";

const RatingSchema = new mongoose.Schema({
    rating: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookId: { type: String, required: true },
    comment: { type: String  },
},{
    timestamps: true
})
export const Rating = mongoose.models.Rating || mongoose.model('Rating', RatingSchema);