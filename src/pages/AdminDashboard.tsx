import { useState } from 'react';
import { useData, InstitutionalData } from '@/contexts/DataContext';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit2, Trash2, FileText, AlertCircle, HelpCircle, MessageSquare } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const AdminDashboard = () => {
  const { institutionalData, addInstitutionalData, updateInstitutionalData, deleteInstitutionalData, chatMessages } = useData();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InstitutionalData | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'notice' as 'circular' | 'notice' | 'faq',
  });

  const resetForm = () => {
    setFormData({ title: '', content: '', type: 'notice' });
    setEditingItem(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      updateInstitutionalData(editingItem.id, formData);
      toast({
        title: "Updated successfully",
        description: "The item has been updated.",
      });
    } else {
      addInstitutionalData(formData);
      toast({
        title: "Added successfully",
        description: "New item has been added to the knowledge base.",
      });
    }
    
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (item: InstitutionalData) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      content: item.content,
      type: item.type,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteInstitutionalData(id);
    toast({
      title: "Deleted successfully",
      description: "The item has been removed from the knowledge base.",
    });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'circular': return <FileText className="h-4 w-4" />;
      case 'notice': return <AlertCircle className="h-4 w-4" />;
      case 'faq': return <HelpCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'circular': return 'default';
      case 'notice': return 'secondary';
      case 'faq': return 'outline';
      default: return 'default';
    }
  };

  // Get recent user queries for dashboard stats
  const userQueries = chatMessages.filter(msg => msg.isUser);
  const recentQueries = userQueries.slice(-10);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage institutional data and monitor chatbot interactions
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{institutionalData.length}</div>
              <p className="text-xs text-muted-foreground">
                Across all categories
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">User Queries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userQueries.length}</div>
              <p className="text-xs text-muted-foreground">
                Total questions asked
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Circular, Notice, FAQ
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Knowledge Base Management</CardTitle>
                    <CardDescription>
                      Add, edit, and manage institutional documents
                    </CardDescription>
                  </div>
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        onClick={() => {
                          resetForm();
                          setIsDialogOpen(true);
                        }}
                      variant="gradient"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add New
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>
                          {editingItem ? 'Edit Document' : 'Add New Document'}
                        </DialogTitle>
                        <DialogDescription>
                          {editingItem 
                            ? 'Update the document information below.'
                            : 'Add a new document to the knowledge base.'
                          }
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                              id="title"
                              value={formData.title}
                              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                              placeholder="Document title"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="type">Type</Label>
                            <Select
                              value={formData.type}
                              onValueChange={(value: 'circular' | 'notice' | 'faq') => 
                                setFormData({ ...formData, type: value })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="circular">Circular</SelectItem>
                                <SelectItem value="notice">Notice</SelectItem>
                                <SelectItem value="faq">FAQ</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="content">Content</Label>
                          <Textarea
                            id="content"
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            placeholder="Document content..."
                            rows={6}
                            required
                          />
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              resetForm();
                              setIsDialogOpen(false);
                            }}
                          >
                            Cancel
                          </Button>
                          <Button type="submit" variant="gradient">
                            {editingItem ? 'Update' : 'Add'} Document
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {institutionalData.map((item) => (
                    <div
                      key={item.id}
                      className="border border-border rounded-lg p-4 hover:shadow-soft transition-smooth"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          {getTypeIcon(item.type)}
                          <h3 className="font-semibold text-foreground">{item.title}</h3>
                          <Badge variant={getTypeBadgeVariant(item.type) as any}>
                            {item.type.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm mb-2">
                        {item.content.substring(0, 200)}
                        {item.content.length > 200 && '...'}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Updated: {new Date(item.updatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                  
                  {institutionalData.length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No documents added yet. Click "Add New" to get started.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent User Queries</CardTitle>
                <CardDescription>Latest questions from users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentQueries.map((query) => (
                    <div key={query.id} className="text-sm">
                      <p className="text-foreground">{query.content}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(query.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                  
                  {recentQueries.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                      No queries yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => {
                    resetForm();
                    setIsDialogOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Document
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  View All Chats
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};