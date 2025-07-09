import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ProductModal } from '@/components/ProductModal';
import { 
  ArrowLeft, 
  Search, 
  ShoppingCart, 
  Star, 
  Shield,
  Grid3X3,
  List
} from 'lucide-react';

const Medicines = () => {
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products = [
    {
      id: 'paracetamol-1',
      name: 'Paracetamol 500mg',
      price: 12.99,
      rating: 4.6,
      reviews: 189,
      category: 'OTC',
      stock: 'In Stock',
      badge: 'FDA Approved',
      description: '100 tablets - Pain relief and fever reducer',
      prescription: false
    },
    {
      id: 'ibuprofen-1',
      name: 'Ibuprofen 400mg',
      price: 15.99,
      rating: 4.5,
      reviews: 156,
      category: 'OTC',
      stock: 'In Stock',
      badge: 'Popular',
      description: '60 tablets - Anti-inflammatory pain relief',
      prescription: false
    },
    {
      id: 'vitamin-d-1',
      name: 'Vitamin D3 2000 IU',
      price: 24.99,
      rating: 4.8,
      reviews: 267,
      category: 'Supplements',
      stock: 'In Stock',
      badge: 'Bestseller',
      description: '120 capsules - Bone health support',
      prescription: false
    },
    {
      id: 'omega-3-1',
      name: 'Omega-3 Fish Oil',
      price: 32.99,
      rating: 4.7,
      reviews: 203,
      category: 'Supplements',
      stock: 'In Stock',
      badge: 'Premium',
      description: '90 softgels - Heart and brain health',
      prescription: false
    },
    {
      id: 'antibiotics-1',
      name: 'Amoxicillin 500mg',
      price: 45.99,
      rating: 4.9,
      reviews: 98,
      category: 'Prescription',
      stock: 'In Stock',
      badge: 'Prescription Required',
      description: '21 capsules - Antibiotic treatment',
      prescription: true
    },
    {
      id: 'cough-syrup-1',
      name: 'Herbal Cough Syrup',
      price: 18.99,
      rating: 4.4,
      reviews: 145,
      category: 'Herbal',
      stock: 'Low Stock',
      badge: 'Natural',
      description: '200ml - Natural cough relief with honey',
      prescription: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Medicines', count: products.length },
    { id: 'OTC', name: 'Over the Counter', count: products.filter(p => p.category === 'OTC').length },
    { id: 'Prescription', name: 'Prescription', count: products.filter(p => p.category === 'Prescription').length },
    { id: 'Supplements', name: 'Supplements', count: products.filter(p => p.category === 'Supplements').length },
    { id: 'Herbal', name: 'Herbal', count: products.filter(p => p.category === 'Herbal').length }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/healthcare" className="flex items-center text-slate-300 hover:text-blue-400 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back to Healthcare
              </Link>
            </div>
            <h1 className="text-2xl font-bold text-blue-400">Medicines & Pharmaceuticals</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Important Notice */}
        <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-700 rounded-lg">
          <div className="flex items-center gap-2 text-yellow-400">
            <Shield className="h-5 w-5" />
            <span className="font-semibold">Important Notice</span>
          </div>
          <p className="text-yellow-200 text-sm mt-1">
            Prescription medications require a valid prescription. Please consult with your healthcare provider before purchasing any medication.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search medicines and supplements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-600 text-blue-200 placeholder-slate-400"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="border-slate-600"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="border-slate-600"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="border-slate-600"
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-slate-800 border-slate-700 cursor-pointer"
              onClick={() => handleProductClick(product)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <div className="h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                    <div className="text-slate-400 text-sm">Product Image</div>
                  </div>
                  <Badge className={`absolute top-3 left-3 ${product.prescription ? 'bg-red-600' : 'bg-blue-600'} text-white`}>
                    {product.badge}
                  </Badge>
                </div>
                <div className="p-4">
                  <Badge variant="outline" className="text-xs mb-2 border-slate-600 text-slate-400">
                    {product.category}
                  </Badge>
                  <h3 className="font-bold text-lg mb-2 group-hover:text-blue-300 transition-colors text-blue-200">
                    {product.name}
                  </h3>
                  <p className="text-sm text-slate-400 mb-3">{product.description}</p>
                  
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-slate-600'}`} 
                      />
                    ))}
                    <span className="text-xs text-slate-400 ml-1">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-xl font-bold text-green-400">₹{(product.price * 83).toLocaleString()}</span>
                    </div>
                    <Badge 
                      variant={product.stock === "In Stock" ? "default" : "destructive"}
                      className={`text-xs ${product.stock === "In Stock" ? "bg-green-600" : ""}`}
                    >
                      {product.stock}
                    </Badge>
                  </div>
                  
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        category: product.category
                      });
                    }}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No products found matching your criteria</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          </div>
        )}
      </div>

      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Medicines;
