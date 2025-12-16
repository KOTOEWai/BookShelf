'use client'

import * as React from 'react'
import { Eye, EyeOff } from 'lucide-react' // for icons
import { Input } from './input'
import { Button } from './button'

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export function PasswordInput({ className, ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = React.useState(false)

  return (
    <div className="relative">
      <Input
        type={showPassword ? 'text' : 'password'}
        className={`pr-10 ${className}`}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setShowPassword((prev) => !prev)}
        className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-gray-600" />
        ) : (
          <Eye className="h-4 w-4 text-gray-600" />
        )}
      </Button>
    </div>
  )
}
