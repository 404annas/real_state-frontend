const Textarea = ({ label, error, rows = 4, fullWidth = true, className = "", ...props }) => {
  const widthClass = fullWidth ? "w-full" : ""

  return (
    <div className={`${widthClass} ${className}`}>
      {label && <label className="block text-sm font-medium text-neutral-700 mb-1">{label}</label>}
      <textarea
        rows={rows}
        className={`
          ${widthClass}
          px-3 py-2 
          border border-neutral-300 
          rounded-lg 
          bg-white
          text-neutral-900
          placeholder-neutral-400
          transition-all duration-200
          hover:border-neutral-400
          focus:border-primary-500
          focus:ring-2 focus:ring-primary-500 focus:ring-opacity-20
          disabled:bg-neutral-100 disabled:cursor-not-allowed
          resize-none
          ${error ? "border-error focus:border-error focus:ring-error" : ""}
        `}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
    </div>
  )
}

export default Textarea
