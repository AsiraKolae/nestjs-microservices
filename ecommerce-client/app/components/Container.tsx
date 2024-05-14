import React from 'react'

export default function Container({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto max-w-7xl px-6 lg:px-8 bg-white">
        {children}
    </div>
  )
}