import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Mail, Phone, MapPin, Calendar, Edit, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserProfileData {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  location: string;
  bio: string;
  joinDate: string;
}

export const UserProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user profile data - in real app, this would come from API/database
  const [profileData, setProfileData] = useState<UserProfileData>({
    fullName: user?.username === 'admin' ? 'Administrator' : 'John Doe',
    email: user?.username === 'admin' ? 'admin@institution.edu' : 'john.doe@institution.edu',
    phone: '+1 (555) 123-4567',
    department: user?.username === 'admin' ? 'IT Administration' : 'Computer Science',
    location: 'Main Campus, Building A',
    bio: user?.username === 'admin' 
      ? 'System administrator responsible for managing institutional data and user access.'
      : 'Student interested in AI and machine learning. Active participant in campus activities.',
    joinDate: '2023-01-15'
  });

  const [editData, setEditData] = useState<UserProfileData>(profileData);

  const handleEdit = () => {
    setEditData(profileData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  return (
    <Card className="backdrop-blur-sm bg-card/95 border-0 shadow-elegant">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 bg-gradient-primary">
              <AvatarFallback className="text-white font-semibold text-lg">
                {getInitials(profileData.fullName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl flex items-center space-x-2">
                {profileData.fullName}
                <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'}>
                  {user?.role === 'admin' ? 'Administrator' : 'User'}
                </Badge>
              </CardTitle>
              <CardDescription className="text-base">
                {profileData.department}
              </CardDescription>
            </div>
          </div>
          
          {!isEditing ? (
            <Button onClick={handleEdit} variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button onClick={handleSave} variant="default" size="sm">
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center">
              <User className="h-5 w-5 mr-2 text-primary" />
              Personal Information
            </h3>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="fullName"
                    value={editData.fullName}
                    onChange={(e) => setEditData({...editData, fullName: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">{profileData.fullName}</p>
                )}
              </div>

              <div>
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>Email</span>
                </Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={editData.email}
                    onChange={(e) => setEditData({...editData, email: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">{profileData.email}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Phone</span>
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    value={editData.phone}
                    onChange={(e) => setEditData({...editData, phone: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">{profileData.phone}</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-primary" />
              Institution Details
            </h3>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="department">Department</Label>
                {isEditing ? (
                  <Input
                    id="department"
                    value={editData.department}
                    onChange={(e) => setEditData({...editData, department: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">{profileData.department}</p>
                )}
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                {isEditing ? (
                  <Input
                    id="location"
                    value={editData.location}
                    onChange={(e) => setEditData({...editData, location: e.target.value})}
                    className="mt-1"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground mt-1">{profileData.location}</p>
                )}
              </div>

              <div>
                <Label className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Join Date</span>
                </Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {new Date(profileData.joinDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="space-y-3">
          <Label htmlFor="bio">Bio</Label>
          {isEditing ? (
            <Textarea
              id="bio"
              value={editData.bio}
              onChange={(e) => setEditData({...editData, bio: e.target.value})}
              rows={4}
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className="text-sm text-muted-foreground p-3 bg-muted/50 rounded-md">
              {profileData.bio}
            </p>
          )}
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{user?.role === 'admin' ? '150+' : '25'}</div>
            <div className="text-sm text-muted-foreground">
              {user?.role === 'admin' ? 'Documents Managed' : 'Questions Asked'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{user?.role === 'admin' ? '500+' : '12'}</div>
            <div className="text-sm text-muted-foreground">
              {user?.role === 'admin' ? 'User Queries' : 'Files Uploaded'}
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">98%</div>
            <div className="text-sm text-muted-foreground">Response Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {Math.floor((Date.now() - new Date(profileData.joinDate).getTime()) / (1000 * 60 * 60 * 24))}
            </div>
            <div className="text-sm text-muted-foreground">Days Active</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};