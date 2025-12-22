"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Mail, Lock, Building2 } from "lucide-react"
import { useLoginMutation } from "../../store/api/authApi"
import { setCredentials } from "../../store/slices/authSlice"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import { toast } from "sonner"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await login(formData).unwrap()
      dispatch(
        setCredentials({
          user: result.data.user,
          accessToken: result.data.accessToken,
        }),
      )
      toast.success("Login successful!")
      navigate("/dashboard")
    } catch (error) {
      toast.error(error?.data?.message || "Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-neutral-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-2xl mb-4">
            <Building2 className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900">Welcome Back</h1>
          <p className="text-neutral-600 mt-2">Sign in to your admin account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="admin@example.com"
              value={formData.email}
              onChange={handleChange}
              icon={<Mail size={20} />}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              icon={<Lock size={20} />}
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-neutral-600">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary-500 hover:text-primary-600">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" fullWidth loading={isLoading}>
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary-500 hover:text-primary-600 font-medium">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
