import { useState } from "react"
import Card from "./ui/Card"
import Button from "./ui/Button"
import Input from "./ui/Input"
import Textarea from "./ui/Textarea"
import { toast } from "sonner"

const InquiryForm = ({ propertyId, propertyTitle }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    propertyId: propertyId
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("http://localhost:8001/api/v1/inquiries/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success("Inquiry submitted successfully! We'll contact you soon.")
        setFormData({
          name: "",
          email: "",
          phone: "",
          description: "",
          propertyId: propertyId
        })
      } else {
        toast.error(result.message || "Failed to submit inquiry. Please try again.")
      }
    } catch (error) {
      toast.error("Failed to submit inquiry. Please try again.")
    }
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">Send Inquiry</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your full name"
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          required
        />
        <Input
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+1234567890"
          required
        />
        <Textarea
          label="Message"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Tell us about your interest in this property..."
          rows={4}
          required
        />
        <input type="hidden" name="propertyId" value={formData.propertyId} />
        <Button type="submit" fullWidth>
          Send Inquiry
        </Button>
      </form>
    </Card>
  )
}

export default InquiryForm