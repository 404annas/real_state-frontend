"use client"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Menu, Bell, LogOut, User } from "lucide-react"
import { toggleSidebar } from "../../store/slices/uiSlice"
import { logout } from "../../store/slices/authSlice"
import { useLogoutMutation } from "../../store/api/authApi"
import { toast } from "sonner"

const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const [logoutMutation] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      // Try to call the backend logout endpoint
      await logoutMutation().unwrap()
      toast.success("Logged out successfully")
    } catch (error) {
      // If backend logout fails, still proceed with frontend logout
      toast.error("Logout failed, but you will be logged out from this session")
    } finally {
      // Always dispatch local logout and redirect
      dispatch(logout())
      navigate("/login")
    }
  }

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-[18px]">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-neutral-200">
            <div className="text-right">
              <div className="text-sm font-medium text-neutral-900">{user?.fullName}</div>
              <div className="text-xs text-neutral-500">{user?.email}</div>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <User size={20} className="text-primary-600" />
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-2 rounded-lg text-neutral-600 hover:bg-red-50 hover:text-error transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
