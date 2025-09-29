import React from 'react'
import Image from 'next/image'

interface LogoProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
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
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  }

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  }

  const textColor = variant === 'light' ? 'text-white' : 'text-gray-900'

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Your actual Tropical Stroll logo */}
      <div className={`${sizeClasses[size]} relative`}>
        {variant === 'light' ? (
          // White logo for dark backgrounds
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer circle border */}
            <circle
              cx="250"
              cy="250"
              r="240"
              stroke="#ffffff"
              strokeWidth="15"
              fill="none"
            />

            {/* Main circle background */}
            <circle
              cx="250"
              cy="250"
              r="225"
              fill="#ffffff"
            />

            {/* Walking woman silhouette */}
            <g transform="translate(180, 180)">
              {/* Head with hat */}
              <ellipse
                cx="50"
                cy="25"
                rx="18"
                ry="20"
                fill="#1e3a8a"
              />

              {/* Hat brim */}
              <ellipse
                cx="50"
                cy="20"
                rx="25"
                ry="8"
                fill="#1e3a8a"
              />

              {/* Hair flowing */}
              <path
                d="M35 30 Q25 35, 20 45 Q18 50, 25 55"
                stroke="#1e3a8a"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />

              {/* Body/torso */}
              <ellipse
                cx="50"
                cy="80"
                rx="20"
                ry="35"
                fill="#1e3a8a"
              />

              {/* Backpack */}
              <ellipse
                cx="35"
                cy="70"
                rx="12"
                ry="25"
                fill="#1e3a8a"
              />

              {/* Arms */}
              <ellipse
                cx="30"
                cy="85"
                rx="8"
                ry="20"
                fill="#1e3a8a"
                transform="rotate(-15 30 85)"
              />
              <ellipse
                cx="70"
                cy="90"
                rx="8"
                ry="18"
                fill="#1e3a8a"
                transform="rotate(20 70 90)"
              />

              {/* Legs in walking motion */}
              <ellipse
                cx="40"
                cy="140"
                rx="10"
                ry="25"
                fill="#1e3a8a"
                transform="rotate(-10 40 140)"
              />
              <ellipse
                cx="60"
                cy="135"
                rx="10"
                ry="28"
                fill="#1e3a8a"
                transform="rotate(15 60 135)"
              />
            </g>

            {/* City skyline on left */}
            <g transform="translate(50, 300)">
              <rect x="0" y="0" width="15" height="80" fill="#1e3a8a" />
              <rect x="20" y="-10" width="18" height="90" fill="#1e3a8a" />
              <rect x="45" y="10" width="12" height="70" fill="#1e3a8a" />
              <rect x="65" y="-5" width="20" height="85" fill="#1e3a8a" />
              <rect x="90" y="15" width="14" height="65" fill="#1e3a8a" />
            </g>

            {/* Palm trees on right */}
            <g transform="translate(350, 280)">
              {/* Palm tree 1 */}
              <rect x="0" y="20" width="8" height="60" fill="#1e3a8a" />
              <path
                d="M4 20 Q-10 5, -15 0 M4 20 Q-8 10, -12 5 M4 20 Q0 5, 2 0 M4 20 Q12 8, 18 5 M4 20 Q15 10, 20 8"
                stroke="#1e3a8a"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />

              {/* Palm tree 2 */}
              <rect x="40" y="30" width="6" height="50" fill="#1e3a8a" />
              <path
                d="M43 30 Q30 18, 25 15 M43 30 Q35 20, 32 18 M43 30 Q40 18, 42 15 M43 30 Q50 20, 55 18 M43 30 Q52 22, 57 20"
                stroke="#1e3a8a"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </g>

            {/* Bridge/path at bottom */}
            <path
              d="M100 400 Q250 380, 400 400"
              stroke="#1e3a8a"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
            />

            {/* Bridge supports */}
            <line x1="200" y1="390" x2="200" y2="420" stroke="#1e3a8a" strokeWidth="8" />
            <line x1="300" y1="390" x2="300" y2="420" stroke="#1e3a8a" strokeWidth="8" />
          </svg>
        ) : (
          // Navy blue logo for light backgrounds
          <svg
            viewBox="0 0 500 500"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer circle border */}
            <circle
              cx="250"
              cy="250"
              r="240"
              stroke="#1e3a8a"
              strokeWidth="15"
              fill="none"
            />

            {/* Main circle background */}
            <circle
              cx="250"
              cy="250"
              r="225"
              fill="#1e3a8a"
            />

            {/* Walking woman silhouette */}
            <g transform="translate(180, 180)">
              {/* Head with hat */}
              <ellipse
                cx="50"
                cy="25"
                rx="18"
                ry="20"
                fill="#ffffff"
              />

              {/* Hat brim */}
              <ellipse
                cx="50"
                cy="20"
                rx="25"
                ry="8"
                fill="#ffffff"
              />

              {/* Hair flowing */}
              <path
                d="M35 30 Q25 35, 20 45 Q18 50, 25 55"
                stroke="#ffffff"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />

              {/* Body/torso */}
              <ellipse
                cx="50"
                cy="80"
                rx="20"
                ry="35"
                fill="#ffffff"
              />

              {/* Backpack */}
              <ellipse
                cx="35"
                cy="70"
                rx="12"
                ry="25"
                fill="#ffffff"
              />

              {/* Arms */}
              <ellipse
                cx="30"
                cy="85"
                rx="8"
                ry="20"
                fill="#ffffff"
                transform="rotate(-15 30 85)"
              />
              <ellipse
                cx="70"
                cy="90"
                rx="8"
                ry="18"
                fill="#ffffff"
                transform="rotate(20 70 90)"
              />

              {/* Legs in walking motion */}
              <ellipse
                cx="40"
                cy="140"
                rx="10"
                ry="25"
                fill="#ffffff"
                transform="rotate(-10 40 140)"
              />
              <ellipse
                cx="60"
                cy="135"
                rx="10"
                ry="28"
                fill="#ffffff"
                transform="rotate(15 60 135)"
              />
            </g>

            {/* City skyline on left */}
            <g transform="translate(50, 300)">
              <rect x="0" y="0" width="15" height="80" fill="#ffffff" />
              <rect x="20" y="-10" width="18" height="90" fill="#ffffff" />
              <rect x="45" y="10" width="12" height="70" fill="#ffffff" />
              <rect x="65" y="-5" width="20" height="85" fill="#ffffff" />
              <rect x="90" y="15" width="14" height="65" fill="#ffffff" />
            </g>

            {/* Palm trees on right */}
            <g transform="translate(350, 280)">
              {/* Palm tree 1 */}
              <rect x="0" y="20" width="8" height="60" fill="#ffffff" />
              <path
                d="M4 20 Q-10 5, -15 0 M4 20 Q-8 10, -12 5 M4 20 Q0 5, 2 0 M4 20 Q12 8, 18 5 M4 20 Q15 10, 20 8"
                stroke="#ffffff"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
              />

              {/* Palm tree 2 */}
              <rect x="40" y="30" width="6" height="50" fill="#ffffff" />
              <path
                d="M43 30 Q30 18, 25 15 M43 30 Q35 20, 32 18 M43 30 Q40 18, 42 15 M43 30 Q50 20, 55 18 M43 30 Q52 22, 57 20"
                stroke="#ffffff"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </g>

            {/* Bridge/path at bottom */}
            <path
              d="M100 400 Q250 380, 400 400"
              stroke="#ffffff"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
            />

            {/* Bridge supports */}
            <line x1="200" y1="390" x2="200" y2="420" stroke="#ffffff" strokeWidth="8" />
            <line x1="300" y1="390" x2="300" y2="420" stroke="#ffffff" strokeWidth="8" />
          </svg>
        )}
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