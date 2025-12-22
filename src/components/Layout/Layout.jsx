"use client"

import { useEffect } from "react"
import { Outlet } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Sidebar from "./Sidebar"
import Header from "./Header"
import { setSidebarOpen } from "../../store/slices/uiSlice"

const Layout = () => {
  const dispatch = useDispatch()
  const { sidebarOpen } = useSelector((state) => state.ui)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        dispatch(setSidebarOpen(false))
      } else {
        dispatch(setSidebarOpen(true))
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [dispatch])

  return (
    <div className="min-h-screen bg-neutral-50">
      <Sidebar onClose={() => dispatch(setSidebarOpen(false))} />

      <div className={`transition-all duration-300 ${sidebarOpen ? "lg:ml-64" : "ml-0"}`}>
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
