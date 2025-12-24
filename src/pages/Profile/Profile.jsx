import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Card from "../../components/ui/Card"
import Button from "../../components/ui/Button"
import Input from "../../components/ui/Input"
import { toast } from "sonner"
import Loader from "../../components/ui/Loader"

const Profile = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    whatsappNumber: "",
    agentTitle: "",
    avatar: ""
  })
  const [avatarFile, setAvatarFile] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const response = await fetch('http://localhost:8001/api/v1/users/profile', { // This endpoint might need to be created
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const result = await response.json();
          setUser(result.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');

      // First, update the profile details
      const profileResponse = await fetch('http://localhost:8001/api/v1/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fullName: user.fullName,
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
          whatsappNumber: user.whatsappNumber,
          agentTitle: user.agentTitle
        })
      });

      const profileResult = await profileResponse.json();

      if (!profileResponse.ok) {
        throw new Error(profileResult.message || 'Failed to update profile details');
      }

      // Then, if there's an avatar file, update it separately
      if (avatarFile) {
        const avatarFormData = new FormData();
        avatarFormData.append('avatar', avatarFile);

        const avatarResponse = await fetch('http://localhost:8001/api/v1/users/profile/avatar', {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`
            // Don't set Content-Type - let browser set it with boundary
          },
          body: avatarFormData
        });

        const avatarResult = await avatarResponse.json();

        if (!avatarResponse.ok) {
          throw new Error(avatarResult.message || 'Failed to update avatar');
        }
      }

      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error(error.message || 'Error updating profile');
      console.error('Error updating profile:', error);
    }
  };

  if (loading) return <Loader fullScreen />

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">Profile</h1>
        <p className="text-neutral-600 mt-1">Manage your profile information</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={user.avatar || "/placeholder.svg?height=100&width=100"}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-neutral-200"
              />
              <label className="absolute bottom-0 right-0 bg-primary-500 text-white p-2 rounded-full cursor-pointer hover:bg-primary-600 transition">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleAvatarChange}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </label>
            </div>
            <div>
              <p className="text-sm text-neutral-600">Upload a photo</p>
              <p className="text-xs text-neutral-500">JPG, GIF or PNG. Max size 5MB</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              name="fullName"
              value={user.fullName}
              onChange={handleInputChange}
              placeholder="John Doe"
              required
            />
            <Input
              label="Username"
              name="username"
              value={user.username}
              onChange={handleInputChange}
              placeholder="johndoe"
              required
            />
          </div>

          <Input
            label="Email"
            name="email"
            type="email"
            value={user.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Phone Number"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleInputChange}
              placeholder="+1234567890"
            />
            <Input
              label="WhatsApp Number"
              name="whatsappNumber"
              value={user.whatsappNumber}
              onChange={handleInputChange}
              placeholder="+1234567890"
            />
          </div>

          <Input
            label="Agent Title"
            name="agentTitle"
            value={user.agentTitle}
            onChange={handleInputChange}
            placeholder="Company Agent"
          />

          <div className="flex items-center justify-end gap-4 pt-4">
            <Button type="button" variant="secondary" onClick={() => navigate("/settings")}>
              Cancel
            </Button>
            <Button type="submit">
              Update Profile
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Profile