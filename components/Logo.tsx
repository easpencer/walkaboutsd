import React from 'react'
import Image from 'next/image'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showText?: boolean
  variant?: 'light' | 'dark'
}

export function Logo({
  className = '',
  size = 'md',
  showText = true,
  variant = 'dark'
}: LogoProps) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  }

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  }

  const textColor = variant === 'light' ? 'text-white' : 'text-gray-900'

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* WalkAboutSD Logo */}
      <div className={`${sizeClasses[size]} relative`}>
        {/* Using the actual logo file */}
        <div className={`relative ${sizeClasses[size]} ${variant === 'light' ? 'brightness-0 invert' : ''}`}>
          <Image
            src="/images/tropical-stroll-logo.png"
            alt="WalkAboutSD"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold ${textSizes[size]} ${textColor} leading-tight`}>
            WalkAbout
          </span>
          <span className={`font-bold ${textSizes[size]} ${textColor} leading-tight text-primary-600`}>
            SD
          </span>
        </div>
      )}
    </div>
  )
}