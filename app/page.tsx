"use client"

import { useEffect } from "react"

export default function Page() {
  useEffect(() => {
    // Redirect to the main React app entry point
    window.location.href = "/index.html"
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-neutral-200 border-t-primary-500 mx-auto mb-4" />
        <p className="text-neutral-600">Loading Admin Dashboard...</p>
      </div>
    </div>
  )
}
