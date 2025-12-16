'use client';
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function RatingForm({ bookId ,userId , refreshRatings }: { bookId: string , userId:string | undefined ,refreshRatings: () =>void }) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('/api/fetchRating', {
      method: 'POST',
      body: JSON.stringify({ bookId,userId, rating, comment }),
      headers: { 'Content-Type': 'application/json' },
    });

    
    toast.success("Rating submitted successfully!", { position: "top-right" });
    setRating(0);
    setComment('');
    refreshRatings();
  };
   
  

  return (
   <>
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => setRating(star)}
            className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </button>
        ))}
      </div>
      <textarea
        placeholder="Leave a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded">
        Submit Rating
      </button>
    </form>
    
   </>
  );
}
