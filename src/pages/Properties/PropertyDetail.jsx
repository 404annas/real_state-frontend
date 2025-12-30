"use client"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Edit, MapPin, Bed, Bath, Maximize, Eye } from "lucide-react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Badge from "../../components/ui/Badge"
import Loader from "../../components/ui/Loader"
import InquiryForm from "../../components/InquiryForm"
import { useGetPropertyByIdQuery } from "../../store/api/propertyApi"

const PropertyDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { data, isLoading } = useGetPropertyByIdQuery(id)

  if (isLoading) return <Loader fullScreen />

  const property = data?.data

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => navigate("/properties")} icon={<ArrowLeft size={20} />}>
            Back
          </Button>
        </div>
        <Button onClick={() => navigate(`/properties/${id}/edit`)} icon={<Edit size={20} />}>
          Edit Property
        </Button>
      </div>

      {/* Image Gallery */}
      <Card padding={false}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
          {property?.images?.slice(0, 4).map((image, index) => (
            <img
              key={index}
              src={image || "/placeholder.svg"}
              alt={`${property.title} ${index + 1}`}
              className="w-full h-64 object-cover rounded-lg"
            />
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-neutral-900">{property?.title}</h1>
                <div className="flex items-center gap-2 mt-2 text-neutral-600">
                  <MapPin size={18} />
                  <span>
                    {property?.address?.street}, {property?.address?.city}, {property?.address?.state}
                  </span>
                </div>
              </div>
              <Badge variant={property?.isFeatured ? "primary" : "default"}>{property?.type}</Badge>
            </div>

            <div className="flex items-center gap-6 py-4 border-y border-neutral-200">
              <div className="flex items-center gap-2">
                <Bed size={20} className="text-neutral-600" />
                <span className="text-neutral-900 font-medium">{property?.features?.bedrooms} Beds</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath size={20} className="text-neutral-600" />
                <span className="text-neutral-900 font-medium">{property?.features?.bathrooms} Baths</span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize size={20} className="text-neutral-600" />
                <span className="text-neutral-900 font-medium">{property?.features?.sqft} sqft</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye size={20} className="text-neutral-600" />
                <span className="text-neutral-900 font-medium">{property?.totalVisits} Views</span>
              </div>
            </div>

            {/* Status Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {property?.isNew && (
                <Badge variant="secondary">New</Badge>
              )}
              {property?.isFeatured && (
                <Badge variant="primary">Featured</Badge>
              )}
              {property?.isTrending && (
                <Badge variant="success">Trending</Badge>
              )}
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-3">Description</h2>
              <p className="text-neutral-600 leading-relaxed">{property?.description}</p>
            </div>

          </Card>
          
          {property?.floorPlans?.length > 0 && (
            <Card>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Floor Plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.floorPlans.map((plan, index) => (
                  <div key={index} className="border rounded-lg p-2">
                    <p className="text-sm font-medium mb-2">{plan.title}</p>
                    <img src={plan.fileUrl} alt={plan.title} className="w-full h-auto rounded" />
                    <a href={plan.fileUrl} target="_blank" className="text-xs text-primary-500 underline mt-2 block">View Full Size</a>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Property Features */}
          <Card>
            <h2 className="text-xl font-semibold text-neutral-900 mb-4">Property Features</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Bed size={18} className="text-neutral-600" />
                <span className="text-neutral-600">Bedrooms: {property?.features?.bedrooms || 0}</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath size={18} className="text-neutral-600" />
                <span className="text-neutral-600">Bathrooms: {property?.features?.bathrooms || 0}</span>
              </div>
              <div className="flex items-center gap-2">
                <Maximize size={18} className="text-neutral-600" />
                <span className="text-neutral-600">Sqft: {property?.features?.sqft || 0}</span>
              </div>
              {property?.features?.floor && (
                <div className="flex items-center gap-2">
                  <span className="text-neutral-600">Floor: {property?.features?.floor}</span>
                </div>
              )}
              {property?.features?.wardrobe && (
                <div className="flex items-center gap-2">
                  <span className="text-neutral-600">Wardrobe: {property?.features?.wardrobe}</span>
                </div>
              )}
              {property?.features?.parking && (
                <div className="flex items-center gap-2">
                  <span className="text-neutral-600">Parking: {property?.features?.parking}</span>
                </div>
              )}
              {property?.features?.balcony && (
                <div className="flex items-center gap-2">
                  <span className="text-neutral-600">Balcony: {property?.features?.balcony}</span>
                </div>
              )}
              {property?.features?.tv && (
                <div className="flex items-center gap-2">
                  <span className="text-neutral-600">TV: {property?.features?.tv}</span>
                </div>
              )}
              {property?.features?.ac && (
                <div className="flex items-center gap-2">
                  <span className="text-neutral-600">AC: {property?.features?.ac}</span>
                </div>
              )}
              {property?.features?.fridge && (
                <div className="flex items-center gap-2">
                  <span className="text-neutral-600">Fridge: {property?.features?.fridge}</span>
                </div>
              )}
              {property?.features?.microwave && (
                <div className="flex items-center gap-2">
                  <span className="text-neutral-600">Microwave: {property?.features?.microwave}</span>
                </div>
              )}
              {property?.features?.waterPurifier && (
                <div className="flex items-center gap-2">
                  <span className="text-neutral-600">Water Purifier: {property?.features?.waterPurifier}</span>
                </div>
              )}
              {property?.features?.curtains && (
                <div className="flex items-center gap-2">
                  <span className="text-neutral-600">Curtains: {property?.features?.curtains}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Amenities */}
          {property?.amenities?.length > 0 && (
            <Card>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {property?.amenities?.map((amenity, index) => (
                  <Badge key={index} variant="default">
                    {amenity}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Highlights */}
          {property?.highlights?.length > 0 && (
            <Card>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Highlights</h2>
              <ul className="space-y-2">
                {property?.highlights?.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-2 text-neutral-600">
                    <span className="text-primary-500 mt-1">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Why Book With Us */}
          {property?.whyBookWithUs?.length > 0 && (
            <Card>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Why Book With Us</h2>
              <ul className="space-y-2">
                {property?.whyBookWithUs?.map((reason, index) => (
                  <li key={index} className="flex items-start gap-2 text-neutral-600">
                    <span className="text-primary-500 mt-1">✓</span>
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Nearby Landmarks */}
          {property?.nearbyLandmarks?.length > 0 && (
            <Card>
              <h2 className="text-xl font-semibold text-neutral-900 mb-4">Nearby Landmarks</h2>
              <ul className="space-y-2">
                {property?.nearbyLandmarks?.map((landmark, index) => (
                  <li key={index} className="flex items-start gap-2 text-neutral-600">
                    <span className="text-primary-500 mt-1">📍</span>
                    <span>{landmark}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <div className="text-center">
              <p className="text-neutral-600 mb-2">Price</p>
              <p className="text-4xl font-bold text-primary-500">${property?.price}</p>
              <p className="text-neutral-600 mt-1">/ {property?.priceUnit}</p>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={property?.owner?.avatar || "/placeholder.svg"}
                className="w-12 h-12 rounded-full object-cover border"
                alt="Owner"
              />
              <h3 className="font-semibold text-neutral-900">Owner Details</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-neutral-600">Name</p>
                <p className="font-medium text-neutral-900">{property?.owner?.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600">Username</p>
                <p className="font-medium text-neutral-900">@{property?.owner?.username}</p>
              </div>
              {property?.owner?.agentTitle && (
                <div>
                  <p className="text-sm text-neutral-600">Title</p>
                  <p className="font-medium text-neutral-900">{property?.owner?.agentTitle}</p>
                </div>
              )}
              {property?.owner?.phoneNumber && (
                <div>
                  <p className="text-sm text-neutral-600">Phone</p>
                  <p className="font-medium text-neutral-900">{property?.owner?.phoneNumber}</p>
                </div>
              )}
              {property?.owner?.whatsappNumber && (
                <div>
                  <p className="text-sm text-neutral-600">WhatsApp</p>
                  <p className="font-medium text-neutral-900">{property?.owner?.whatsappNumber}</p>
                </div>
              )}
              {property?.owner?.email && (
                <div>
                  <p className="text-sm text-neutral-600">Email</p>
                  <p className="font-medium text-neutral-900">{property?.owner?.email}</p>
                </div>
              )}
            </div>
          </Card>

          {/* Inquiry Form */}
          <InquiryForm propertyId={property?._id} propertyTitle={property?.title} />

          {/* Map Section */}
          {property?.address?.latitude && property?.address?.longitude && (
            <Card>
              <h3 className="font-semibold text-neutral-900 mb-4">Location</h3>
              <div className="h-48 w-full rounded-lg overflow-hidden">
                {/* Placeholder for map - in a real implementation, you'd use a map library like Google Maps or Mapbox */}
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="mx-auto text-gray-500 mb-2" size={24} />
                    <p className="text-gray-500 text-sm">Map: {property?.address?.city}</p>
                    <p className="text-gray-400 text-xs mt-1">Lat: {property?.address?.latitude}, Lng: {property?.address?.longitude}</p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail
