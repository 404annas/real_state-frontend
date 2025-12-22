const Card = ({ children, className = "", padding = true, hover = false }) => {
  return (
    <div
      className={`
        bg-white 
        rounded-lg 
        border border-neutral-200 
        shadow-sm
        ${padding ? "p-6" : ""}
        ${hover ? "transition-shadow duration-200 hover:shadow-md" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  )
}

export default Card
