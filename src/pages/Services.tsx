import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, MoreVertical, Package, Edit, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "@/hooks/use-toast";

interface Category {
  name: string;
  icon: string;
  description: string;
  services: number;
  status: string;
}

const initialCategories: Category[] = [
  { name: "Cleaning", icon: "🧹", description: "Home & Office Cleaning", services: 8, status: "Active" },
  { name: "Electrical", icon: "⚡", description: "Electrical Repairs & Installation", services: 12, status: "Active" },
  { name: "Plumbing", icon: "🔧", description: "Plumbing Services", services: 10, status: "Active" },
  { name: "AC Service", icon: "❄️", description: "AC Repair & Maintenance", services: 6, status: "Active" },
  { name: "Painting", icon: "🎨", description: "Home & Commercial Painting", services: 5, status: "Active" },
  { name: "Carpentry", icon: "🪚", description: "Furniture & Wood Work", services: 7, status: "Active" },
];

const services = [
  { name: "Deep Cleaning", category: "Cleaning", duration: "2 hrs", price: "₹1,200", cities: ["Mumbai", "Delhi", "Pune"], status: "Active" },
  { name: "Regular Cleaning", category: "Cleaning", duration: "1 hr", price: "₹600", cities: ["Mumbai", "Delhi"], status: "Active" },
  { name: "Electrical Wiring", category: "Electrical", duration: "3 hrs", price: "₹2,500", cities: ["Mumbai", "Bangalore"], status: "Active" },
  { name: "Light Fixture Installation", category: "Electrical", duration: "1 hr", price: "₹800", cities: ["All Cities"], status: "Active" },
  { name: "AC Installation", category: "AC Service", duration: "2 hrs", price: "₹1,500", cities: ["Mumbai", "Delhi", "Bangalore"], status: "Active" },
  { name: "Pipe Leak Repair", category: "Plumbing", duration: "1.5 hrs", price: "₹900", cities: ["All Cities"], status: "Active" },
];

const Services = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [editCategoryOpen, setEditCategoryOpen] = useState(false);
  const [manageCategoryOpen, setManageCategoryOpen] = useState(false);
  const [deleteCategoryOpen, setDeleteCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [editForm, setEditForm] = useState({ name: "", description: "", icon: "" });

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category);
    setEditForm({ name: category.name, description: category.description, icon: category.icon });
    setEditCategoryOpen(true);
  };

  const handleManageCategory = (category: Category) => {
    setSelectedCategory(category);
    setManageCategoryOpen(true);
  };

  const handleDeleteCategory = (category: Category) => {
    setSelectedCategory(category);
    setDeleteCategoryOpen(true);
  };

  const confirmEditCategory = () => {
    if (!selectedCategory) return;
    
    setCategories(prev => prev.map(c => 
      c.name === selectedCategory.name 
        ? { ...c, name: editForm.name, description: editForm.description, icon: editForm.icon }
        : c
    ));
    
    toast({
      title: "Category Updated",
      description: `${editForm.name} has been updated successfully.`,
    });
    
    setEditCategoryOpen(false);
    setSelectedCategory(null);
  };

  const confirmDeleteCategory = () => {
    if (!selectedCategory) return;
    
    setCategories(prev => prev.filter(c => c.name !== selectedCategory.name));
    
    toast({
      title: "Category Deleted",
      description: `${selectedCategory.name} has been deleted.`,
      variant: "destructive",
    });
    
    setDeleteCategoryOpen(false);
    setSelectedCategory(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Service Catalog</h1>
          <p className="text-muted-foreground mt-1">Manage service categories and offerings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate('/pricing-rules')}>
            <Package className="h-4 w-4 mr-2" />
            Pricing Rules
          </Button>
          <Button onClick={() => navigate('/services/add')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Categories</p>
            <p className="text-2xl font-bold mt-1">{categories.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Services</p>
            <p className="text-2xl font-bold mt-1">86</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Avg. Service Price</p>
            <p className="text-2xl font-bold mt-1">₹1,250</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Commission Rate</p>
            <p className="text-2xl font-bold mt-1">15%</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="categories" className="space-y-4">
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Rules</TabsTrigger>
        </TabsList>

        <TabsContent value="categories">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Card key={category.name} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{category.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{category.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover">
                        <DropdownMenuItem onClick={() => handleEditCategory(category)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Category
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleManageCategory(category)}>
                          <Package className="h-4 w-4 mr-2" />
                          Manage Services
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => handleDeleteCategory(category)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      {category.services} services
                    </div>
                    <Badge className="bg-success text-success-foreground">{category.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>All Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm">
                      <th className="pb-3 font-medium">Service Name</th>
                      <th className="pb-3 font-medium">Category</th>
                      <th className="pb-3 font-medium">Duration</th>
                      <th className="pb-3 font-medium">Base Price</th>
                      <th className="pb-3 font-medium">City Availability</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service, idx) => (
                      <tr key={idx} className="border-b last:border-0 hover:bg-muted/50">
                        <td className="py-4 font-medium">{service.name}</td>
                        <td className="py-4 text-sm">{service.category}</td>
                        <td className="py-4 text-sm text-muted-foreground">{service.duration}</td>
                        <td className="py-4 text-sm font-medium">{service.price}</td>
                        <td className="py-4 text-sm text-muted-foreground">{service.cities.join(", ")}</td>
                        <td className="py-4">
                          <Badge className="bg-success text-success-foreground">{service.status}</Badge>
                        </td>
                        <td className="py-4">
                          <div className="flex gap-2">
                            <Button size="sm" variant="ghost" onClick={() => navigate(`/services/edit/${idx + 1}`)}><Edit className="h-4 w-4" /></Button>
                            <Button size="sm" variant="ghost"><Trash2 className="h-4 w-4" /></Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle>Global Pricing Rules</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 border rounded-lg">
                  <p className="text-sm font-medium mb-2">Platform Commission</p>
                  <p className="text-2xl font-bold">15%</p>
                  <p className="text-xs text-muted-foreground mt-1">Applied to all services</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <p className="text-sm font-medium mb-2">GST Tax</p>
                  <p className="text-2xl font-bold">18%</p>
                  <p className="text-xs text-muted-foreground mt-1">Applied to all transactions</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">City-Specific Overrides</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left text-sm">
                        <th className="pb-3 font-medium">City</th>
                        <th className="pb-3 font-medium">Commission</th>
                        <th className="pb-3 font-medium">Status</th>
                        <th className="pb-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="py-4 font-medium">Ahmedabad</td>
                        <td className="py-4 text-sm">12%</td>
                        <td className="py-4">
                          <Badge className="bg-success text-success-foreground">Active</Badge>
                        </td>
                        <td className="py-4">
                          <Button size="sm" variant="outline" onClick={() => navigate('/pricing-rules')}>Edit</Button>
                        </td>
                      </tr>
                      <tr className="hover:bg-muted/50">
                        <td className="py-4 font-medium">Pune</td>
                        <td className="py-4 text-sm">13%</td>
                        <td className="py-4">
                          <Badge className="bg-success text-success-foreground">Active</Badge>
                        </td>
                        <td className="py-4">
                          <Button size="sm" variant="outline" onClick={() => navigate('/pricing-rules')}>Edit</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Category Dialog */}
      <Dialog open={editCategoryOpen} onOpenChange={setEditCategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category details below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName">Category Name</Label>
              <Input 
                id="categoryName" 
                value={editForm.name}
                onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoryDescription">Description</Label>
              <Input 
                id="categoryDescription" 
                value={editForm.description}
                onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="categoryIcon">Icon (Emoji)</Label>
              <Input 
                id="categoryIcon" 
                value={editForm.icon}
                onChange={(e) => setEditForm(prev => ({ ...prev, icon: e.target.value }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditCategoryOpen(false)}>Cancel</Button>
            <Button onClick={confirmEditCategory}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Manage Services Sheet */}
      <Sheet open={manageCategoryOpen} onOpenChange={setManageCategoryOpen}>
        <SheetContent className="sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Manage Services - {selectedCategory?.name}</SheetTitle>
            <SheetDescription>
              View and manage services in this category.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            {services
              .filter(s => s.category === selectedCategory?.name)
              .map((service, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{service.name}</p>
                    <p className="text-sm text-muted-foreground">{service.duration} • {service.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => { setManageCategoryOpen(false); navigate(`/services/edit/${idx + 1}`); }}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            {services.filter(s => s.category === selectedCategory?.name).length === 0 && (
              <p className="text-center text-muted-foreground py-8">No services in this category</p>
            )}
            <Button className="w-full" onClick={() => { setManageCategoryOpen(false); navigate('/services/add'); }}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Service
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Delete Category Dialog */}
      <Dialog open={deleteCategoryOpen} onOpenChange={setDeleteCategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedCategory?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteCategoryOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={confirmDeleteCategory}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Services;
