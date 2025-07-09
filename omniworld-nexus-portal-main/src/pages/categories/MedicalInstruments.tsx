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
  Filter,
  Grid3X3,
  List
} from 'lucide-react';

const MedicalInstruments = () => {
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products = [
    {
      id: 'stethoscope-1',
      name: 'Digital Stethoscope Pro',
      price: 299.99,
      originalPrice: 399.99,
      rating: 4.8,
      reviews: 124,
      category: 'Diagnostic',
      stock: 'In Stock',
      badge: 'Bestseller',
      description: 'Advanced digital stethoscope with noise cancellation and recording capabilities'
    },
    {
      id: 'bp-monitor-1',
      name: 'Automated Blood Pressure Monitor',
      price: 159.99,
      rating: 4.7,
      reviews: 89,
      category: 'Monitoring',
      stock: 'In Stock',
      badge: 'FDA Approved',
      description: 'Professional-grade automated BP monitor with large display'
    },
    {
      id: 'otoscope-1',
      name: 'LED Otoscope Set',
      price: 89.99,
      rating: 4.6,
      reviews: 156,
      category: 'Diagnostic',
      stock: 'Low Stock',
      badge: 'Popular',
      description: 'Complete otoscope set with LED illumination and multiple specula'
    },
    {
      id: 'thermometer-1',
      name: 'Infrared Thermometer',
      price: 45.99,
      rating: 4.5,
      reviews: 203,
      category: 'Diagnostic',
      stock: 'In Stock',
      badge: 'New',
      description: 'Non-contact infrared thermometer with instant readings'
    },
    {
      id: 'pulse-ox-1',
      name: 'Pulse Oximeter',
      price: 79.99,
      rating: 4.9,
      reviews: 267,
      category: 'Monitoring',
      stock: 'In Stock',
      badge: 'Top Rated',
      description: 'Fingertip pulse oximeter with OLED display'
    },
    {
      id: 'surgical-kit-1',
      name: 'Basic Surgical Kit',
      price: 199.99,
      rating: 4.7,
      reviews: 98,
      category: 'Surgical',
      stock: 'In Stock',
      badge: 'Professional',
      description: 'Complete basic surgical instrument kit for minor procedures'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Instruments', count: products.length },
    { id: 'Diagnostic', name: 'Diagnostic Tools', count: products.filter(p => p.category === 'Diagnostic').length },
    { id: 'Monitoring', name: 'Monitoring Devices', count: products.filter(p => p.category === 'Monitoring').length },
    { id: 'Surgical', name: 'Surgical Instruments', count: products.filter(p => p.category === 'Surgical').length }
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
            <h1 className="text-2xl font-bold text-blue-400">Medical Instruments</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search medical instruments..."
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
                  <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
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
                      {product.originalPrice && (
                        <span className="text-sm text-slate-500 line-through">₹{(product.originalPrice * 83).toLocaleString()}</span>
                      )}
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

export default MedicalInstruments;
