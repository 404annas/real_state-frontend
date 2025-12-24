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
  useGetPropertyByIdQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation
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
    propertyFor: "Buy", // Add propertyFor field
    isNew: false,
    isFeatured: false,
    isTrending: false,
    street: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    latitude: "",
    longitude: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    floor: "",
    wardrobe: "",
    parking: "",
    balcony: "No",
    tv: "",
    ac: "",
    fridge: "",
    microwave: "",
    waterPurifier: "",
    curtains: "No",
    amenities: "",
    highlights: "",
    whyBookWithUs: "",
    nearbyLandmarks: "",
    rating: 5.0,
    // Owner contact information
    ownerFullName: "",
    ownerUsername: "",
    ownerPhoneNumber: "",
    ownerWhatsAppNumber: "",
    ownerEmail: "",
    ownerAgentTitle: "",
    // Images will be handled separately
    images: [],
    floorPlans: [],
    ownerAvatar: null,
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
        propertyFor: property.propertyFor || "Buy", // Add propertyFor field
        isNew: property.isNew || false,
        isFeatured: property.isFeatured || false,
        isTrending: property.isTrending || false,
        street: property.address?.street || "",
        city: property.address?.city || "",
        state: property.address?.state || "",
        country: property.address?.country || "",
        zip: property.address?.zip || "",
        latitude: property.address?.latitude || "",
        longitude: property.address?.longitude || "",
        bedrooms: property.features?.bedrooms || "",
        bathrooms: property.features?.bathrooms || "",
        sqft: property.features?.sqft || "",
        floor: property.features?.floor || "",
        wardrobe: property.features?.wardrobe || "",
        parking: property.features?.parking || "",
        balcony: property.features?.balcony || "No",
        tv: property.features?.tv || "",
        ac: property.features?.ac || "",
        fridge: property.features?.fridge || "",
        microwave: property.features?.microwave || "",
        waterPurifier: property.features?.waterPurifier || "",
        curtains: property.features?.curtains || "No",
        amenities: property.amenities?.join(", ") || "",
        highlights: property.highlights?.join(", ") || "",
        whyBookWithUs: property.whyBookWithUs?.join(", ") || "",
        nearbyLandmarks: property.nearbyLandmarks?.join(", ") || "",
        rating: property.rating || 5.0,
        // Owner contact information
        ownerFullName: property.owner?.fullName || "",
        ownerUsername: property.owner?.username || "",
        ownerPhoneNumber: property.owner?.phoneNumber || "",
        ownerWhatsAppNumber: property.owner?.whatsappNumber || "",
        ownerEmail: property.owner?.email || "",
        ownerAgentTitle: property.owner?.agentTitle || "",
        // Images are handled separately
        images: property.images || [],
        floorPlans: property.floorPlans || [],
        ownerAvatar: null, // Don't load avatar for editing - it's not part of the form data
      })
    }
  }, [isEditMode, propertyData])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Create FormData for image uploads
      const propertyData = new FormData()

      // Add all the text fields
      propertyData.append('title', formData.title)
      propertyData.append('description', formData.description)
      propertyData.append('price', Number(formData.price))
      propertyData.append('priceUnit', formData.priceUnit)
      propertyData.append('type', formData.type)
      propertyData.append('propertyFor', formData.propertyFor) // Add propertyFor field
      propertyData.append('isNew', formData.isNew)
      propertyData.append('isFeatured', formData.isFeatured)
      propertyData.append('isTrending', formData.isTrending)
      propertyData.append('address', JSON.stringify({
        street: formData.street,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        zip: formData.zip,
        latitude: Number(formData.latitude) || 0,
        longitude: Number(formData.longitude) || 0,
      }))
      propertyData.append('features', JSON.stringify({
        bedrooms: Number(formData.bedrooms) || 0,
        bathrooms: Number(formData.bathrooms) || 0,
        sqft: Number(formData.sqft) || 0,
        floor: formData.floor,
        wardrobe: Number(formData.wardrobe) || 0,
        parking: Number(formData.parking) || 0,
        balcony: formData.balcony,
        tv: Number(formData.tv) || 0,
        ac: Number(formData.ac) || 0,
        fridge: Number(formData.fridge) || 0,
        microwave: Number(formData.microwave) || 0,
        waterPurifier: Number(formData.waterPurifier) || 0,
        curtains: formData.curtains,
      }))
      propertyData.append('amenities', JSON.stringify(formData.amenities
        .split(",")
        .map((a) => a.trim())
        .filter(Boolean)))
      propertyData.append('highlights', JSON.stringify(formData.highlights
        .split(",")
        .map((h) => h.trim())
        .filter(Boolean)))
      propertyData.append('whyBookWithUs', JSON.stringify(formData.whyBookWithUs
        .split(",")
        .map((w) => w.trim())
        .filter(Boolean)))
      propertyData.append('nearbyLandmarks', JSON.stringify(formData.nearbyLandmarks
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean)))
      propertyData.append('rating', Number(formData.rating) || 5.0)

      // Add images to FormData
      if (formData.images && formData.images.length > 0) {
        for (let i = 0; i < formData.images.length; i++) {
          propertyData.append('images', formData.images[i])
        }
      }

      // Add floor plans to FormData
      if (formData.floorPlans && formData.floorPlans.length > 0) {
        for (let i = 0; i < formData.floorPlans.length; i++) {
          propertyData.append('floorPlans', formData.floorPlans[i])
        }
      }

      // Add owner avatar to FormData if exists
      if (formData.ownerAvatar) {
        propertyData.append('ownerAvatar', formData.ownerAvatar)
      }

      // Add owner details to FormData
      if (formData.ownerFullName) propertyData.append('ownerFullName', formData.ownerFullName);
      if (formData.ownerUsername) propertyData.append('ownerUsername', formData.ownerUsername);
      if (formData.ownerPhoneNumber) propertyData.append('ownerPhoneNumber', formData.ownerPhoneNumber);
      if (formData.ownerWhatsAppNumber) propertyData.append('ownerWhatsAppNumber', formData.ownerWhatsAppNumber);
      if (formData.ownerEmail) propertyData.append('ownerEmail', formData.ownerEmail);
      if (formData.ownerAgentTitle) propertyData.append('ownerAgentTitle', formData.ownerAgentTitle);

      if (isEditMode) {
        // Update property using Redux Toolkit Query
        await updateProperty({ id, body: propertyData }).unwrap()
        toast.success("Property updated successfully");
      } else {
        // Create property using Redux Toolkit Query
        await createProperty(propertyData).unwrap()
        toast.success("Property created successfully");
      }

      navigate("/properties");
    } catch (error) {
      toast.error(error?.data?.message || `Failed to ${isEditMode ? "update" : "create"} property`);
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

            <Select
              label="Available For"
              name="propertyFor"
              value={formData.propertyFor}
              onChange={handleChange}
              options={[
                { value: "Rent", label: "For Rent" },
                { value: "Buy", label: "For Buy" },
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

        {/* Status Badges */}
        <Card>
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Status Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isNew"
                checked={formData.isNew}
                onChange={(e) => setFormData({...formData, isNew: e.target.checked})}
                className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-neutral-700">New</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-neutral-700">Featured</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isTrending"
                checked={formData.isTrending}
                onChange={(e) => setFormData({...formData, isTrending: e.target.checked})}
                className="rounded border-neutral-300 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-neutral-700">Trending</span>
            </label>
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
            <Input
              label="Latitude"
              name="latitude"
              type="number"
              step="any"
              value={formData.latitude}
              onChange={handleChange}
              placeholder="28.6139"
            />
            <Input
              label="Longitude"
              name="longitude"
              type="number"
              step="any"
              value={formData.longitude}
              onChange={handleChange}
              placeholder="77.2090"
            />
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
            <Input
              label="Floor"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              placeholder="5th of 12"
            />
            <Input
              label="Wardrobe"
              name="wardrobe"
              type="number"
              value={formData.wardrobe}
              onChange={handleChange}
              placeholder="2"
            />
            <Input
              label="Parking"
              name="parking"
              type="number"
              value={formData.parking}
              onChange={handleChange}
              placeholder="1"
            />
            <Select
              label="Balcony"
              name="balcony"
              value={formData.balcony}
              onChange={handleChange}
              options={[
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
                { value: "1", label: "1" },
                { value: "2", label: "2" },
              ]}
            />
            <Input
              label="TV"
              name="tv"
              type="number"
              value={formData.tv}
              onChange={handleChange}
              placeholder="1"
            />
            <Input
              label="AC"
              name="ac"
              type="number"
              value={formData.ac}
              onChange={handleChange}
              placeholder="2"
            />
            <Input
              label="Fridge"
              name="fridge"
              type="number"
              value={formData.fridge}
              onChange={handleChange}
              placeholder="1"
            />
            <Input
              label="Microwave"
              name="microwave"
              type="number"
              value={formData.microwave}
              onChange={handleChange}
              placeholder="1"
            />
            <Input
              label="Water Purifier"
              name="waterPurifier"
              type="number"
              value={formData.waterPurifier}
              onChange={handleChange}
              placeholder="1"
            />
            <Select
              label="Curtains"
              name="curtains"
              value={formData.curtains}
              onChange={handleChange}
              options={[
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
              ]}
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
            <Textarea
              label="Why Book With Us (comma separated)"
              name="whyBookWithUs"
              value={formData.whyBookWithUs}
              onChange={handleChange}
              placeholder="24/7 security, Close to metro, Best amenities"
              rows={3}
            />
            <Textarea
              label="Nearby Landmarks (comma separated)"
              name="nearbyLandmarks"
              value={formData.nearbyLandmarks}
              onChange={handleChange}
              placeholder="Central Park, Mall, Hospital"
              rows={3}
            />
            <Input
              label="Rating"
              name="rating"
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating}
              onChange={handleChange}
              placeholder="5.0"
            />
          </div>
        </Card>

        {/* Property Images */}
        <Card>
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Property Images</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Main Property Images</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setFormData(prev => ({...prev, images: files}));
                }}
                className="w-full text-sm text-neutral-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary-50 file:text-primary-700
                  hover:file:bg-primary-100"
              />
              <p className="text-xs text-neutral-500 mt-1">Select multiple images for the property gallery</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Floor Plans</label>
              <input
                type="file"
                multiple
                accept="image/*,application/pdf"
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  setFormData(prev => ({...prev, floorPlans: files}));
                }}
                className="w-full text-sm text-neutral-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary-50 file:text-primary-700
                  hover:file:bg-primary-100"
              />
              <p className="text-xs text-neutral-500 mt-1">Upload floor plan documents (images or PDF)</p>
            </div>
          </div>
        </Card>

        {/* Owner Contact Information */}
        <Card>
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Owner Contact Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Owner Avatar</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData(prev => ({...prev, ownerAvatar: file}));
                  }
                }}
                className="w-full text-sm text-neutral-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary-50 file:text-primary-700
                  hover:file:bg-primary-100"
              />
              <p className="text-xs text-neutral-500 mt-1">Upload owner's profile picture</p>
            </div>

            <Input
              label="Owner Full Name"
              name="ownerFullName"
              value={formData.ownerFullName}
              onChange={(e) => setFormData({...formData, ownerFullName: e.target.value})}
              placeholder="John Doe"
            />
            <Input
              label="Owner Username"
              name="ownerUsername"
              value={formData.ownerUsername}
              onChange={(e) => setFormData({...formData, ownerUsername: e.target.value})}
              placeholder="johndoe"
            />
            <Input
              label="Owner Phone Number"
              name="ownerPhoneNumber"
              value={formData.ownerPhoneNumber}
              onChange={(e) => setFormData({...formData, ownerPhoneNumber: e.target.value})}
              placeholder="+1234567890"
            />
            <Input
              label="Owner WhatsApp Number"
              name="ownerWhatsAppNumber"
              value={formData.ownerWhatsAppNumber}
              onChange={(e) => setFormData({...formData, ownerWhatsAppNumber: e.target.value})}
              placeholder="+1234567890"
            />
            <Input
              label="Owner Email"
              name="ownerEmail"
              type="email"
              value={formData.ownerEmail}
              onChange={(e) => setFormData({...formData, ownerEmail: e.target.value})}
              placeholder="owner@example.com"
            />
            <Input
              label="Owner Agent Title"
              name="ownerAgentTitle"
              value={formData.ownerAgentTitle}
              onChange={(e) => setFormData({...formData, ownerAgentTitle: e.target.value})}
              placeholder="Company Agent"
            />
          </div>
        </Card>

        {/* Submit */}
        <div className="flex items-center justify-end gap-4">
          <Button type="button" variant="secondary" onClick={() => navigate("/properties")}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditMode ? "Update Property" : "Create Property"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PropertyForm
