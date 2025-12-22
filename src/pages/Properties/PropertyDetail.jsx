"use client"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Edit, MapPin, Bed, Bath, Maximize, Eye } from "lucide-react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Badge from "../../components/ui/Badge"
import Loader from "../../components/ui/Loader"
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

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-neutral-900 mb-3">Description</h2>
              <p className="text-neutral-600 leading-relaxed">{property?.description}</p>
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
            <h3 className="font-semibold text-neutral-900 mb-4">Owner Details</h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-neutral-600">Name</p>
                <p className="font-medium text-neutral-900">{property?.owner?.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600">Username</p>
                <p className="font-medium text-neutral-900">@{property?.owner?.username}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetail
