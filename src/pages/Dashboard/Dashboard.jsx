"use client"
import { useNavigate } from "react-router-dom"
import { Building2, Users, TrendingUp, Eye } from "lucide-react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import { useGetPropertiesQuery } from "../../store/api/propertyApi"
import Loader from "../../components/ui/Loader"

const Dashboard = () => {
  const navigate = useNavigate()
  const { data, isLoading } = useGetPropertiesQuery({ limit: 5 })

  const stats = [
    {
      label: "Total Properties",
      value: data?.data?.totalResults || 0,
      icon: Building2,
      color: "text-primary-500",
      bgColor: "bg-primary-100",
    },
    {
      label: "Total Users",
      value: "0",
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      label: "Featured Properties",
      value: "0",
      icon: TrendingUp,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    {
      label: "Total Views",
      value: "0",
      icon: Eye,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
  ]

  if (isLoading) return <Loader fullScreen />

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Dashboard</h1>
          <p className="text-neutral-600 mt-1">Welcome back to your admin panel</p>
        </div>
        <Button onClick={() => navigate("/properties/new")}>Add New Property</Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} hover>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={stat.color} size={24} />
              </div>
              <div>
                <p className="text-sm text-neutral-600">{stat.label}</p>
                <p className="text-2xl font-bold text-neutral-900">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Properties */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-neutral-900">Recent Properties</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate("/properties")}>
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {data?.data?.properties?.slice(0, 5).map((property) => (
            <div
              key={property._id}
              className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
              onClick={() => navigate(`/properties/${property._id}`)}
            >
              <div className="flex items-center gap-4">
                <img
                  src={property.images?.[0] || "/placeholder.svg?height=50&width=50"}
                  alt={property.title}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-medium text-neutral-900">{property.title}</h3>
                  <p className="text-sm text-neutral-600">{property.address?.city}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-primary-500">${property.price}</p>
                <p className="text-sm text-neutral-600">{property.type}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default Dashboard
