"use client"
import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import { LayoutDashboard, Building2, Users, Settings, X } from "lucide-react"

const Sidebar = ({ onClose }) => {
  const { sidebarOpen } = useSelector((state) => state.ui)

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Building2, label: "Properties", path: "/properties" },
    { icon: Users, label: "Users", path: "/users" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ]

  const sidebarVariants = {
    open: { x: 0 },
    closed: { x: "-100%" },
  }

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <motion.aside
        initial="closed"
        animate={sidebarOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-neutral-200 z-50 lg:z-30"
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-200">
            <div className="flex items-center gap-2">
              <Building2 className="text-primary-500" size={28} />
              <span className="text-xl font-bold text-neutral-900">RealEstate</span>
            </div>
            <button onClick={onClose} className="lg:hidden text-neutral-400 hover:text-neutral-600 transition-colors">
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => window.innerWidth < 1024 && onClose()}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-primary-50 text-primary-600 font-medium"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-neutral-200">
            <div className="text-xs text-neutral-500 text-center">© 2025 RealEstate Admin</div>
          </div>
        </div>
      </motion.aside>
    </>
  )
}

export default Sidebar
