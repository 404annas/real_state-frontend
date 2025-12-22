const Loader = ({ size = "md", fullScreen = false }) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        <div className={`animate-spin rounded-full border-4 border-neutral-200 border-t-primary-500 ${sizes[size]}`} />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className={`animate-spin rounded-full border-4 border-neutral-200 border-t-primary-500 ${sizes[size]}`} />
    </div>
  )
}

export default Loader
