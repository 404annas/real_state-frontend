import { useGetUsersQuery } from "../../store/api/userApi"
import Card from "../../components/ui/Card"
import Loader from "../../components/ui/Loader"

const Users = () => {
  const { data, isLoading, error } = useGetUsersQuery()

  if (isLoading) return <Loader fullScreen />
  if (error) return <div className="text-red-500">Error loading users: {error.message}</div>

  const users = data?.data?.users || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Users</h1>
        <p className="text-neutral-600 mt-1">Manage platform users</p>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Name</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Email</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Username</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Verified</th>
                <th className="text-left py-3 px-4 font-medium text-neutral-600">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-3 px-4">{user.fullName}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.username}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        user.isVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.isVerified ? 'Verified' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-3 px-4">User</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-8 px-4 text-center text-neutral-500">
                    No users found
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

export default Users
