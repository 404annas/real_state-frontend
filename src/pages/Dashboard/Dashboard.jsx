"use client"
import { useNavigate } from "react-router-dom"
import { Building2, Users, MessageCircle, Eye } from "lucide-react"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Loader from "../../components/ui/Loader"
import { useState, useEffect } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Dashboard = () => {
  const navigate = useNavigate()
  const [propertiesData, setPropertiesData] = useState(null)
  const [usersData, setUsersData] = useState(null)
  const [inquiriesData, setInquiriesData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        // Fetch properties
        const propertiesResponse = await fetch(`${API_URL}/properties/admin/all?limit=5`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const propertiesResult = await propertiesResponse.json();
        setPropertiesData(propertiesResult);

        // Fetch users
        const usersResponse = await fetch(`${API_URL}/users`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const usersResult = await usersResponse.json();
        setUsersData(usersResult);

        // Fetch inquiries
        const inquiriesResponse = await fetch(`${API_URL}/inquiries`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const inquiriesResult = await inquiriesResponse.json();
        setInquiriesData(inquiriesResult);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate stats
  const totalProperties = propertiesData?.data?.pagination?.total || 0
  const totalUsers = usersData?.data?.pagination?.total || 0
  const totalInquiries = inquiriesData?.data?.pagination?.total || 0

  // Calculate total views from properties
  const totalViews = propertiesData?.data?.properties?.reduce((sum, property) => sum + (property.totalVisits || 0), 0) || 0

  const stats = [
    {
      label: "Total Properties",
      value: totalProperties,
      icon: Building2,
      color: "text-primary-500",
      bgColor: "bg-primary-100",
    },
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
    {
      label: "Total Inquiries",
      value: totalInquiries,
      icon: MessageCircle,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      label: "Total Views",
      value: totalViews,
      icon: Eye,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
  ]

  if (loading) return <Loader fullScreen />

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
          {propertiesData?.data?.properties?.slice(0, 5).map((property) => (
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
