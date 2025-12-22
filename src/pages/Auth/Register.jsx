"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Mail, Lock, User, Building2 } from "lucide-react"
import { useRegisterMutation, useVerifyOtpMutation } from "../../store/api/authApi"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import { toast } from "sonner"

const Register = () => {
  const navigate = useNavigate()
  const [register, { isLoading: isRegistering }] = useRegisterMutation()
  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation()

  const [step, setStep] = useState(1) // 1: Register, 2: Verify OTP
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    otp: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await register({
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }).unwrap()
      toast.success("Registration successful! Check your email for OTP.")
      setStep(2)
    } catch (error) {
      toast.error(error?.data?.message || "Registration failed")
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    try {
      await verifyOtp({
        email: formData.email,
        otp: formData.otp,
      }).unwrap()
      toast.success("Email verified! You can now login.")
      navigate("/login")
    } catch (error) {
      toast.error(error?.data?.message || "OTP verification failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-neutral-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-500 rounded-2xl mb-4">
            <Building2 className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900">Create Account</h1>
          <p className="text-neutral-600 mt-2">
            {step === 1 ? "Sign up for admin access" : "Verify your email address"}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {step === 1 ? (
            <form onSubmit={handleRegister} className="space-y-6">
              <Input
                label="Full Name"
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                icon={<User size={20} />}
                required
              />

              <Input
                label="Username"
                type="text"
                name="username"
                placeholder="johndoe"
                value={formData.username}
                onChange={handleChange}
                icon={<User size={20} />}
                required
              />

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

              <Button type="submit" fullWidth loading={isRegistering}>
                Create Account
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="text-center mb-6">
                <p className="text-neutral-600">
                  We've sent a 6-digit code to <strong>{formData.email}</strong>
                </p>
              </div>

              <Input
                label="OTP Code"
                type="text"
                name="otp"
                placeholder="123456"
                value={formData.otp}
                onChange={handleChange}
                maxLength={6}
                required
              />

              <Button type="submit" fullWidth loading={isVerifying}>
                Verify OTP
              </Button>

              <Button type="button" variant="ghost" fullWidth onClick={() => setStep(1)}>
                Back to Registration
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-neutral-600">
              Already have an account?{" "}
              <Link to="/login" className="text-primary-500 hover:text-primary-600 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
