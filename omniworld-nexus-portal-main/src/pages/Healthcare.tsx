import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import { Cart } from "@/components/Cart";
import { Notifications } from "@/components/Notifications";
import { ProductModal } from "@/components/ProductModal";
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  Star,
  ArrowLeft,
  Stethoscope,
  Pill,
  Activity,
  Shield,
  Award,
  Users,
  Bell,
  ChevronLeft,
  ChevronRight,
  Microscope,
  Thermometer,
  Syringe,
  Bandage,
  Headphones,
  Store
} from "lucide-react";
import { Link } from "react-router-dom";

const Healthcare = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addItem, getTotalItems, notifications } = useCart();

  const categories = [
    { name: "Medical Instruments", icon: Stethoscope, count: "450+ Items", gradient: "from-blue-600 to-blue-800", href: "/healthcare/medical-instruments" },
    { name: "Medicines", icon: Pill, count: "800+ Items", gradient: "from-blue-700 to-blue-900", href: "/healthcare/medicines" },
    { name: "Diagnostic", icon: Activity, count: "320+ Items", gradient: "from-cyan-600 to-cyan-800", href: "/healthcare/diagnostic" },
    { name: "Monitoring", icon: Microscope, count: "280+ Items", gradient: "from-indigo-600 to-indigo-800", href: "/healthcare/monitoring" },
    { name: "Surgical Tools", icon: Syringe, count: "600+ Items", gradient: "from-slate-600 to-slate-800", href: "/healthcare/surgical" },
    { name: "Lab Equipment", icon: Thermometer, count: "150+ Items", gradient: "from-teal-600 to-teal-800", href: "/healthcare/lab-equipment" },
    { name: "First Aid", icon: Bandage, count: "200+ Items", gradient: "from-sky-600 to-sky-800", href: "/healthcare/first-aid" },
    { name: "PPE", icon: Shield, count: "350+ Items", gradient: "from-blue-800 to-indigo-900", href: "/healthcare/ppe" }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Digital Blood Pressure Monitor",
      price: 90.36,
      originalPrice: 108.43,
      rating: 4.8,
      reviews: 156,
      badge: "Bestseller",
      stock: "In Stock",
      category: "Monitoring",
      description: "Professional digital blood pressure monitor with large display"
    },
    {
      id: 2,
      name: "Paracetamol 500mg - 100 Tablets",
      price: 12.04,
      rating: 4.6,
      reviews: 89,
      badge: "FDA Approved",
      stock: "In Stock",
      category: "OTC",
      description: "Pain relief and fever reducer tablets"
    },
    {
      id: 3,
      name: "Digital Thermometer",
      price: 24.08,
      rating: 4.9,
      reviews: 234,
      badge: "New Arrival",
      stock: "Low Stock",
      category: "Diagnostic",
      description: "Non-contact infrared thermometer with instant readings"
    },
    {
      id: 4,
      name: "Surgical Mask Pack (50pcs)",
      price: 19.27,
      rating: 4.7,
      reviews: 312,
      badge: "Popular",
      stock: "In Stock",
      category: "PPE",
      description: "Disposable 3-layer surgical masks"
    },
    {
      id: 5,
      name: "Pulse Oximeter",
      price: 78.31,
      rating: 4.8,
      reviews: 187,
      badge: "Top Rated",
      stock: "In Stock",
      category: "Monitoring",
      description: "Fingertip pulse oximeter with OLED display"
    },
    {
      id: 6,
      name: "Vitamin D3 Supplements",
      price: 30.10,
      rating: 4.5,
      reviews: 98,
      badge: "Health",
      stock: "In Stock",
      category: "Supplements",
      description: "High-potency vitamin D3 capsules for bone health"
    }
  ];

  const paymentMethods = [
    { name: "Visa", logo: "💳" },
    { name: "Mastercard", logo: "💳" },
    { name: "PayPal", logo: "🅿️" },
    { name: "Apple Pay", logo: "🍎" },
    { name: "Google Pay", logo: "🅶" }
  ];

  const bannerSlides = [
    { 
      title: "Premium Medical Equipment", 
      subtitle: "Up to 30% off surgical instruments", 
      bg: "from-blue-800 to-blue-900",
      backgroundPattern: "medicines"
    },
    { title: "Pharmaceutical Excellence", subtitle: "FDA approved medicines & supplements", bg: "from-indigo-800 to-indigo-900" },
    { title: "24/7 Healthcare Support", subtitle: "Expert consultation available", bg: "from-cyan-800 to-cyan-900" }
  ];

  const allSearchItems = [
    ...featuredProducts.map(p => ({ name: p.name, type: 'product', category: p.category })),
    ...categories.map(c => ({ name: c.name, type: 'category', category: c.name }))
  ];

  const suggestions = allSearchItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) && searchTerm.length > 0
  );

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);

  const unreadNotifications = notifications.filter(n => !n.read).length;

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
              <Link to="/" className="flex items-center text-slate-300 hover:text-blue-400 transition-colors">
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back to OmniWorld
              </Link>
            </div>
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                OmniWorld Healthcare
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Notifications>
                <Button variant="outline" size="sm" className="relative border-slate-600 text-blue-300 hover:text-blue-200 hover:bg-slate-700">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                  {unreadNotifications > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-xs">
                      {unreadNotifications}
                    </Badge>
                  )}
                </Button>
              </Notifications>
              <Cart>
                <Button variant="outline" size="sm" className="relative border-slate-600 text-blue-300 hover:text-blue-200 hover:bg-slate-700">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-blue-500 text-xs">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </Cart>
              <Link to="/be-seller">
                <Button size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                  <Store className="h-4 w-4 mr-2" />
                  Be a Seller
                </Button>
              </Link>
              <Link to="/help">
                <Button size="sm" variant="outline" className="border-slate-600 text-blue-300 hover:text-blue-200 hover:bg-slate-700">
                  <Headphones className="h-4 w-4 mr-2" />
                  Help
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Banner Slider */}
      <section className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 flex transition-transform duration-500 ease-in-out" 
             style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {bannerSlides.map((slide, index) => (
            <div key={index} className={`w-full flex-shrink-0 bg-gradient-to-r ${slide.bg} flex items-center justify-center relative group overflow-hidden`}>
              {slide.backgroundPattern === 'medicines' && (
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-repeat" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M30 25c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z'/%3E%3Cpath d='M28 18h4v6h-4z'/%3E%3Cpath d='M18 28h6v4h-6z'/%3E%3Cpath d='M36 28h6v4h-6z'/%3E%3Cpath d='M28 36h4v6h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '60px 60px'
                  }} />
                  <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-full animate-pulse" />
                  <div className="absolute top-12 right-8 w-6 h-6 bg-white/15 rounded-full animate-pulse delay-100" />
                  <div className="absolute bottom-8 left-12 w-10 h-10 bg-white/10 rounded-full animate-pulse delay-200" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 bg-white/25 rounded-full animate-pulse delay-300" />
                </div>
              )}
              <div className="text-center text-white relative z-10 group-hover:scale-105 transition-transform duration-300">
                <h2 className="text-3xl md:text-4xl font-bold mb-2">{slide.title}</h2>
                <p className="text-lg md:text-xl">{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full">
          <ChevronRight className="h-6 w-6" />
        </button>
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {bannerSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </section>

      {/* Search and Trust Badges */}
      <section className="py-8 px-4 bg-slate-800/50">
        <div className="container mx-auto">
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for medicines, medical equipment, or health products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="pl-12 pr-4 py-4 text-lg border-2 border-slate-600 bg-slate-700 text-blue-200 placeholder-slate-400 focus:border-blue-500 rounded-xl"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-cyan-600">
                Search
              </Button>
              
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-slate-800 border border-slate-600 rounded-xl mt-2 z-50 max-h-60 overflow-y-auto shadow-xl">
                  {suggestions.map((item, index) => (
                    <div
                      key={index}
                      className="p-4 hover:bg-slate-700 cursor-pointer border-b border-slate-700 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
                      onClick={() => {
                        setSearchTerm(item.name);
                        setShowSuggestions(false);
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-blue-300">{item.name}</div>
                          <div className="text-sm text-slate-400 capitalize">{item.type} • {item.category}</div>
                        </div>
                        <Search className="h-4 w-4 text-slate-500" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-8 mb-8">
            <div className="flex items-center space-x-2 text-slate-300">
              <Shield className="h-6 w-6 text-green-400" />
              <span className="font-medium">FDA Approved</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Award className="h-6 w-6 text-blue-400" />
              <span className="font-medium">ISO Certified</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Users className="h-6 w-6 text-purple-400" />
              <span className="font-medium">10,000+ Customers</span>
            </div>
            <div className="flex items-center space-x-2 text-slate-300">
              <Activity className="h-6 w-6 text-red-400" />
              <span className="font-medium">24/7 Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-200">
            Shop by Category
          </h2>
          <p className="text-slate-300 text-center mb-8 max-w-2xl mx-auto">
            Browse our comprehensive selection of medical instruments and pharmaceuticals
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <Link key={category.name} to={category.href}>
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-slate-700 bg-slate-800 overflow-hidden h-full">
                  <CardContent className="p-3 text-center">
                    <div className={`inline-flex p-2 rounded-xl bg-gradient-to-r ${category.gradient} mb-2 group-hover:scale-110 transition-transform duration-300`}>
                      <category.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-sm font-bold mb-1 group-hover:text-blue-300 transition-colors text-blue-200">
                      {category.name}
                    </h3>
                    <Badge variant="secondary" className="text-xs bg-slate-700 text-slate-300">
                      {category.count}
                    </Badge>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-4 bg-slate-800/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-200">
            Featured Products
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredProducts.map((product) => (
              <Card 
                key={product.id} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-slate-800 border-slate-700 cursor-pointer"
                onClick={() => handleProductClick(product)}
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <div className="h-32 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                      <div className="text-slate-400 text-sm">Product Image</div>
                    </div>
                    <Badge className="absolute top-2 left-2 bg-blue-600 text-white text-xs">
                      {product.badge}
                    </Badge>
                  </div>
                  <div className="p-3">
                    <Badge variant="outline" className="text-xs mb-1 border-slate-600 text-slate-400">
                      {product.category}
                    </Badge>
                    <h3 className="font-bold text-sm mb-1 group-hover:text-blue-300 transition-colors text-blue-200 line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-3 w-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-slate-600'}`} 
                        />
                      ))}
                      <span className="text-xs text-slate-400 ml-1">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-1">
                        <span className="text-base font-bold text-green-400">₹{(product.price * 83).toLocaleString()}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-slate-500 line-through">₹{(product.originalPrice * 83).toLocaleString()}</span>
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
                      size="sm"
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem({
                          id: product.id.toString(),
                          name: product.name,
                          price: product.price,
                          category: product.category
                        });
                      }}
                    >
                      <ShoppingCart className="h-3 w-3 mr-1" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-8 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-xl font-bold mb-4 text-blue-200">Accepted Payment Methods</h3>
          <div className="flex justify-center items-center space-x-6">
            {paymentMethods.map((method, index) => (
              <div key={index} className="flex items-center space-x-2 text-slate-300">
                <span className="text-2xl">{method.logo}</span>
                <span className="text-sm">{method.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 border-t border-slate-700">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">OmniWorld Healthcare</span>
              </div>
              <p className="text-slate-400 text-sm">
                Your trusted partner for medical instruments and pharmaceuticals.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/healthcare/medical-instruments" className="hover:text-blue-400 transition-colors">Medical Instruments</Link></li>
                <li><Link to="/healthcare/medicines" className="hover:text-blue-400 transition-colors">Medicines</Link></li>
                <li><Link to="/healthcare/surgical" className="hover:text-blue-400 transition-colors">Surgical Equipment</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/help" className="hover:text-blue-400 transition-colors">Help Center</Link></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Shipping Info</a></li>
                <li><Link to="/be-seller" className="hover:text-blue-400 transition-colors">Become a Seller</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-sm text-slate-400">
                Email: orders@omniworldhealthcare.com<br />
                Phone: +1 (555) 123-4567<br />
                24/7 Customer Support
              </p>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2024 OmniWorld Healthcare. All rights reserved. | FDA Registered | ISO Certified</p>
          </div>
        </div>
      </footer>

      <ProductModal 
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Healthcare;
