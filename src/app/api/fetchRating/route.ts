/* eslint-disable @typescript-eslint/no-unused-vars */

import connectToMongo from '@/app/lib/db';
import { Rating } from '@/app/models/rating';
import { NextResponse, NextRequest } from 'next/server';

import  User from '@/app/models/user'; 

export async function GET(req: NextRequest) {
  await connectToMongo();

  const { searchParams } = new URL(req.url);
  const bookId = searchParams.get('bookId');

  if (!bookId) {
    return NextResponse.json({ error: 'bookId is required' }, { status: 400 });
  }

  try {
    const ratings = await Rating.find({ bookId }).populate('userId', 'name image');
    return NextResponse.json(ratings);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch ratings' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  await connectToMongo();

  try {
    const { bookId, userId, rating, comment } = await req.json();

    const newRating = await Rating.create({
      bookId,
      userId,
      rating,
      comment,
      createdAt: new Date()
    });

    return NextResponse.json(newRating, { status: 201 });
  } catch (error) {
    console.error('Error creating rating:', error);
    return NextResponse.json({ error: 'Failed to submit rating' }, { status: 500 });
  }
}
