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
  Grid3X3,
  List
} from 'lucide-react';

const FirstAid = () => {
  const { addItem } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const products = [
    {
      id: 'first-aid-kit-comprehensive',
      name: 'Comprehensive First Aid Kit',
      price: 4500,
      rating: 4.8,
      reviews: 324,
      stock: 'In Stock',
      badge: 'Complete',
      description: 'Complete first aid kit for home and office use'
    },
    {
      id: 'emergency-bandages',
      name: 'Emergency Bandage Pack',
      price: 1200,
      rating: 4.7,
      reviews: 189,
      stock: 'In Stock',
      badge: 'Essential',
      description: 'Assorted bandages for wound care'
    },
    {
      id: 'antiseptic-solution',
      name: 'Antiseptic Solution Set',
      price: 850,
      rating: 4.6,
      reviews: 267,
      stock: 'In Stock',
      badge: 'Sterile',
      description: 'Antiseptic solutions for wound cleaning'
    },
    {
      id: 'emergency-splint',
      name: 'Emergency Splint Kit',
      price: 2500,
      rating: 4.5,
      reviews: 156,
      stock: 'Low Stock',
      badge: 'Emergency',
      description: 'Adjustable splints for fracture support'
    }
  ];

  const suggestions = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm.length > 0
  );

  const handleProductClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <header className="border-b border-slate-700 bg-slate-800/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/healthcare" className="flex items-center text-slate-300 hover:text-blue-400 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Healthcare
            </Link>
            <h1 className="text-2xl font-bold text-blue-400">First Aid Supplies</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search first aid supplies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="pl-10 bg-slate-800 border-slate-600 text-blue-200 placeholder-slate-400"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-slate-800 border border-slate-600 rounded-md mt-1 z-50 max-h-60 overflow-y-auto">
                  {suggestions.map((product) => (
                    <div
                      key={product.id}
                      className="p-3 hover:bg-slate-700 cursor-pointer border-b border-slate-700 last:border-b-0"
                      onClick={() => {
                        setSearchTerm(product.name);
                        setShowSuggestions(false);
                      }}
                    >
                      <div className="font-medium text-blue-300">{product.name}</div>
                      <div className="text-sm text-slate-400">{product.description}</div>
                      <div className="text-sm text-green-400">₹{product.price.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              )}
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
        </div>

        <div className={`grid gap-6 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {products.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          ).map((product) => (
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
                    <span className="text-xl font-bold text-green-400">₹{product.price.toLocaleString()}</span>
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
                        price: product.price / 83,
                        category: 'First Aid'
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
      </div>

      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default FirstAid;
