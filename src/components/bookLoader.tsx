'use client'
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react'


export default function BookSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 ">
                              <DotLottieReact
                  src="https://lottie.host/a30424c8-dc07-4d19-9014-4071a0871a8c/D0GQB7qigL.lottie"
                  loop
                  autoplay
                  className="w-40" />
       <p className="text-gray-600 text-lg">စာအုပ်အား ခဏစောင့်ပါ...</p>
      </div>

  )
}
