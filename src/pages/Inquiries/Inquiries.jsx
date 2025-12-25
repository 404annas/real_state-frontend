import Card from "../../components/ui/Card"
import Loader from "../../components/ui/Loader"
import { useState, useEffect } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const response = await fetch(`${API_URL}/inquiries`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch inquiries');
        }

        const result = await response.json();
        setInquiries(result.data?.inquiries || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  if (loading) return <Loader fullScreen />
  if (error) return <div className="text-red-500">Error loading inquiries: {error}</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Inquiries</h1>
        <p className="text-neutral-600 mt-1">Manage property inquiries</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Name</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Email</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Phone</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Property</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Message</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Date</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length > 0 ? (
                inquiries.map((inquiry) => (
                  <tr key={inquiry._id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-3 px-4">{inquiry.name}</td>
                    <td className="py-3 px-4">{inquiry.email}</td>
                    <td className="py-3 px-4">{inquiry.phone}</td>
                    <td className="py-3 px-4">{inquiry.propertyId?.title || 'N/A'}</td>
                    <td className="py-3 px-4 max-w-xs truncate">{inquiry.description}</td>
                    <td className="py-3 px-4">{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-8 px-4 text-center text-neutral-500">
                    No inquiries found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default Inquiries