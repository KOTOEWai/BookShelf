"use server";

import connectToMongo from "@/lib/db";
import { BookModal } from "@/models/book";
import { Rating } from "@/models/rating";

export async function getMostReviewedBook() {
    try {
        await connectToMongo();

        // Aggregate ratings to find the bookId with the most reviews
        const mostReviewedResult = await Rating.aggregate([
            { $group: { _id: "$bookId", reviewCount: { $sum: 1 } } },
            { $sort: { reviewCount: -1 } },
            { $limit: 1 }
        ]);

        if (!mostReviewedResult || mostReviewedResult.length === 0) {
            // Fallback to the latest book if no reviews exist
            const fallbackBook = await BookModal.findOne().sort({ createdAt: -1 });
            return fallbackBook ? JSON.parse(JSON.stringify(fallbackBook)) : null;
        }

        const bookId = mostReviewedResult[0]._id;
        const book = await BookModal.findOne({ bookId: bookId });

        if (!book) {
            // Fallback if the book linked to the rating is missing
            const fallbackBook = await BookModal.findOne().sort({ createdAt: -1 });
            return fallbackBook ? JSON.parse(JSON.stringify(fallbackBook)) : null;
        }

        const bookObj = JSON.parse(JSON.stringify(book));
        bookObj.reviewCount = mostReviewedResult[0].reviewCount;

        return bookObj;
    } catch (error) {
        console.error("Error fetching most reviewed book:", error);
        return null;
    }
}
