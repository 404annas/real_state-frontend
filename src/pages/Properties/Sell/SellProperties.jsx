import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Plus, Search, Filter, Eye, Edit, Trash2, Home, DollarSign } from "lucide-react"
import Card from "../../../components/ui/Card"
import Button from "../../../components/ui/Button"
import Input from "../../../components/ui/Input"
import Badge from "../../../components/ui/Badge"
import Modal from "../../../components/ui/Modal"
import Loader from "../../../components/ui/Loader"
import { useGetPropertiesAdminQuery, useDeletePropertyMutation } from "../../../store/api/propertyApi"
import { toast } from "sonner"

const SellProperties = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [page, setPage] = useState(1)
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null })

  const { data, isLoading, isFetching } = useGetPropertiesAdminQuery({ page, limit: 10, search: searchTerm, propertyFor: "Sell" })
  const [deleteProperty, { isLoading: isDeleting }] = useDeletePropertyMutation()

  const handleDelete = async () => {
    try {
      await deleteProperty(deleteModal.id).unwrap()
      toast.success("Property deleted successfully")
      setDeleteModal({ open: false, id: null })
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete property")
    }
  }

  if (isLoading) return <Loader fullScreen />

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Home className="w-6 h-6 text-blue-600" />
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-neutral-900">Sell Properties</h1>
          <p className="text-neutral-600 mt-1">Manage properties for sale</p>
        </div>
        <Button onClick={() => navigate("/properties/new")} icon={<Plus size={20} />}>
          Add Sell Property
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            placeholder="Search sell properties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search size={20} />}
            className="flex-1"
          />
          <Button variant="outline" icon={<Filter size={20} />}>
            Filters
          </Button>
        </div>
      </Card>

      {/* Properties Grid */}
      {isFetching ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.properties?.map((property) => (
            <Card key={property._id} padding={false} hover>
              <img
                src={property.images?.[0] || "/placeholder.svg?height=200&width=400"}
                alt={property.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-neutral-900 text-lg">{property.title}</h3>
                  <Badge variant={property.isFeatured ? "primary" : "default"}>{property.type}</Badge>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="success">For Sale</Badge>
                  <Badge variant="secondary">{property.propertyFor}</Badge>
                </div>
                <p className="text-neutral-600 text-sm mb-3 line-clamp-2">{property.description}</p>
                <p className="text-sm text-neutral-600 mb-3">
                  📍 {property.address?.city}, {property.address?.state}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-primary-500">${property.price}</span>
                  <span className="text-sm text-neutral-600">/{property.priceUnit}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    fullWidth
                    onClick={() => navigate(`/properties/${property._id}`)}
                    icon={<Eye size={16} />}
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    fullWidth
                    onClick={() => navigate(`/properties/${property._id}/edit`)}
                    icon={<Edit size={16} />}
                  >
                    Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => setDeleteModal({ open: true, id: property._id })}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {data?.data?.pagination?.pages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </Button>
          <span className="text-sm text-neutral-600">
            Page {page} of {data?.data?.pagination?.pages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page === data?.data?.pagination?.pages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </Button>
        </div>
      )}

      {/* Delete Modal */}
      <Modal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, id: null })}
        title="Delete Property"
        footer={
          <>
            <Button variant="secondary" onClick={() => setDeleteModal({ open: false, id: null })}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete} loading={isDeleting}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-neutral-600">Are you sure you want to delete this property? This action cannot be undone.</p>
      </Modal>
    </div>
  )
}

export default SellProperties