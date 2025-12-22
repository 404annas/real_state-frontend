"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import Select from "../../components/ui/Select"
import Textarea from "../../components/ui/Textarea"
import Loader from "../../components/ui/Loader"
import {
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useGetPropertyByIdQuery,
} from "../../store/api/propertyApi"
import { toast } from "sonner"

const PropertyForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = !!id

  const { data: propertyData, isLoading: isLoadingProperty } = useGetPropertyByIdQuery(id, {
    skip: !isEditMode,
  })

  const [createProperty, { isLoading: isCreating }] = useCreatePropertyMutation()
  const [updateProperty, { isLoading: isUpdating }] = useUpdatePropertyMutation()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    priceUnit: "Month",
    type: "Apartment",
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    amenities: "",
    highlights: "",
  })

  useEffect(() => {
    if (isEditMode && propertyData?.data) {
      const property = propertyData.data
      setFormData({
        title: property.title || "",
        description: property.description || "",
        price: property.price || "",
        priceUnit: property.priceUnit || "Month",
        type: property.type || "Apartment",
        street: property.address?.street || "",
        city: property.address?.city || "",
        state: property.address?.state || "",
        country: property.address?.country || "",
        zip: property.address?.zip || "",
        bedrooms: property.features?.bedrooms || "",
        bathrooms: property.features?.bathrooms || "",
        sqft: property.features?.sqft || "",
        amenities: property.amenities?.join(", ") || "",
        highlights: property.highlights?.join(", ") || "",
      })
    }
  }, [isEditMode, propertyData])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const propertyData = {
      title: formData.title,
      description: formData.description,
      price: Number(formData.price),
      priceUnit: formData.priceUnit,
      type: formData.type,
      address: {
        street: formData.street,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zip: formData.zip,
      },
      features: {
        bedrooms: Number(formData.bedrooms) || 0,
        bathrooms: Number(formData.bathrooms) || 0,
        sqft: Number(formData.sqft) || 0,
      },
      amenities: formData.amenities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean),
      highlights: formData.highlights
        .split(",")
        .map((h) => h.trim())
        .filter(Boolean),
    }

    try {
      if (isEditMode) {
        await updateProperty({ id, ...propertyData }).unwrap()
        toast.success("Property updated successfully")
      } else {
        await createProperty(propertyData).unwrap()
        toast.success("Property created successfully")
      }
      navigate("/properties")
    } catch (error) {
      toast.error(error?.data?.message || `Failed to ${isEditMode ? "update" : "create"} property`)
    }
  }

  if (isLoadingProperty) return <Loader fullScreen />

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={() => navigate("/properties")} icon={<ArrowLeft size={20} />}>
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">{isEditMode ? "Edit Property" : "Add New Property"}</h1>
          <p className="text-neutral-600 mt-1">Fill in the property details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card>
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Property Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Modern Apartment in Downtown"
              required
              fullWidth
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="2500"
                required
              />
              <Select
                label="Price Unit"
                name="priceUnit"
                value={formData.priceUnit}
                onChange={handleChange}
                options={[
                  { value: "Month", label: "Per Month" },
                  { value: "Night", label: "Per Night" },
                ]}
              />
            </div>

            <Select
              label="Property Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              options={[
                { value: "Apartment", label: "Apartment" },
                { value: "Lodge", label: "Lodge" },
                { value: "Condo", label: "Condo" },
                { value: "Suite", label: "Suite" },
                { value: "Luxue", label: "Luxue" },
              ]}
              fullWidth
            />

            <div className="md:col-span-2">
              <Textarea
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the property..."
                rows={4}
                required
              />
            </div>
          </div>
        </Card>

        {/* Address */}
        <Card>
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Address</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Input
                label="Street Address"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="123 Main Street"
              />
            </div>
            <Input label="City" name="city" value={formData.city} onChange={handleChange} placeholder="New York" />
            <Input label="State" name="state" value={formData.state} onChange={handleChange} placeholder="NY" />
            <Input label="Country" name="country" value={formData.country} onChange={handleChange} placeholder="USA" />
            <Input label="ZIP Code" name="zip" value={formData.zip} onChange={handleChange} placeholder="10001" />
          </div>
        </Card>

        {/* Features */}
        <Card>
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Bedrooms"
              name="bedrooms"
              type="number"
              value={formData.bedrooms}
              onChange={handleChange}
              placeholder="3"
            />
            <Input
              label="Bathrooms"
              name="bathrooms"
              type="number"
              value={formData.bathrooms}
              onChange={handleChange}
              placeholder="2"
            />
            <Input
              label="Square Feet"
              name="sqft"
              type="number"
              value={formData.sqft}
              onChange={handleChange}
              placeholder="1500"
            />
          </div>
        </Card>

        {/* Additional Details */}
        <Card>
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Additional Details</h2>
          <div className="space-y-4">
            <Input
              label="Amenities (comma separated)"
              name="amenities"
              value={formData.amenities}
              onChange={handleChange}
              placeholder="Gym, Swimming Pool, Parking"
            />
            <Textarea
              label="Highlights (comma separated)"
              name="highlights"
              value={formData.highlights}
              onChange={handleChange}
              placeholder="Modern design, Great location, Pet friendly"
              rows={3}
            />
          </div>
        </Card>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4">
          <Button type="button" variant="secondary" onClick={() => navigate("/properties")}>
            Cancel
          </Button>
          <Button type="submit" loading={isCreating || isUpdating}>
            {isEditMode ? "Update Property" : "Create Property"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PropertyForm
