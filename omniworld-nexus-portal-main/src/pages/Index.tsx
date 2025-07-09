
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  Star, 
  ArrowRight, 
  Shield, 
  Award, 
  Users, 
  Activity, 
  Bell,
  Headphones,
  ChevronDown
} from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Cart } from '@/components/Cart';
import { Notifications } from '@/components/Notifications';
import StarField from '@/components/StarField';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const { getTotalItems, notifications } = useCart();

  const searchSuggestions = [
    { name: 'Digital Stethoscope', category: 'Medical Instruments', price: '₹12,999' },
    { name: 'Blood Pressure Monitor', category: 'Monitoring', price: '₹3,499' },
    { name: 'Thermometer', category: 'Diagnostic', price: '₹899' },
    { name: 'Surgical Masks', category: 'PPE', price: '₹299' },
    { name: 'Paracetamol', category: 'Medicines', price: '₹49' },
    { name: 'Vitamin D3', category: 'Supplements', price: '₹899' },
    { name: 'Pulse Oximeter', category: 'Monitoring', price: '₹2,499' },
    { name: 'Hand Sanitizer', category: 'Hygiene', price: '₹199' }
  ];

  const filteredSuggestions = searchSuggestions.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const services = [
    {
      title: "Healthcare",
      description: "Medical instruments, pharmaceuticals, and health monitoring devices",
      icon: Heart,
      bgColor: "from-blue-900 to-slate-900",
      href: "/healthcare"
    },
    {
      title: "IT Education",
      description: "Software development courses, certifications, and tech training",
      icon: Activity,
      bgColor: "from-indigo-900 to-slate-900",
      href: "/it-education"
    },
  ];

  const unreadNotifications = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      <StarField />
      
      {/* Header */}
      <header className="relative z-10 border-b border-slate-700 bg-slate-800/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                OmniWorld
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

      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Welcome to OmniWorld
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-slate-300 max-w-3xl mx-auto">
            Your comprehensive platform for healthcare solutions and IT education services
          </p>
          
          {/* Search Bar with Dropdown */}
          <div className="max-w-2xl mx-auto mb-8 relative">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for medical equipment, courses, or services..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSearchDropdown(e.target.value.length > 0);
                }}
                onFocus={() => setShowSearchDropdown(searchTerm.length > 0)}
                className="pl-12 pr-4 py-4 text-lg border-2 border-slate-600 bg-slate-800/80 text-blue-200 placeholder-slate-400 focus:border-blue-400 rounded-xl"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                Search
              </Button>
            </div>
            
            {/* Search Dropdown */}
            {showSearchDropdown && filteredSuggestions.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-slate-800 border border-slate-600 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                {filteredSuggestions.slice(0, 6).map((suggestion, index) => (
                  <div
                    key={index}
                    className="px-4 py-3 hover:bg-slate-700 cursor-pointer transition-colors border-b border-slate-700 last:border-b-0"
                    onClick={() => {
                      setSearchTerm(suggestion.name);
                      setShowSearchDropdown(false);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-blue-200 font-medium">{suggestion.name}</h4>
                        <p className="text-slate-400 text-sm">{suggestion.category}</p>
                      </div>
                      <span className="text-green-400 font-semibold">{suggestion.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/healthcare">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 text-lg">
                Explore Our Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-slate-600 text-blue-300 hover:text-blue-200 hover:bg-slate-800 px-8 py-4 text-lg">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative z-10 py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="text-slate-300 text-center mb-12 text-lg max-w-2xl mx-auto">
            Discover our comprehensive range of healthcare and education solutions
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {services.map((service, index) => (
              <Link key={service.title} to={service.href}>
                <Card className={`group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-slate-700 bg-gradient-to-br ${service.bgColor} overflow-hidden h-full`}>
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex p-4 rounded-full bg-blue-500/20 mb-6 group-hover:bg-blue-500/30 transition-all duration-300">
                      <service.icon className="h-12 w-12 text-blue-400 group-hover:text-blue-300" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-300 transition-colors text-blue-200">
                      {service.title}
                    </h3>
                    <p className="text-slate-300 text-lg leading-relaxed">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="relative z-10 py-16 px-4 bg-slate-800/50">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-8">
            <div className="flex items-center space-x-3 text-slate-300">
              <Shield className="h-8 w-8 text-green-400" />
              <div>
                <h4 className="font-semibold text-blue-200">Secure & Trusted</h4>
                <p className="text-sm">SSL encrypted transactions</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-slate-300">
              <Award className="h-8 w-8 text-yellow-400" />
              <div>
                <h4 className="font-semibold text-blue-200">Certified Quality</h4>
                <p className="text-sm">ISO & FDA approved</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-slate-300">
              <Users className="h-8 w-8 text-purple-400" />
              <div>
                <h4 className="font-semibold text-blue-200">50,000+ Customers</h4>
                <p className="text-sm">Trusted worldwide</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-slate-300">
              <Activity className="h-8 w-8 text-red-400" />
              <div>
                <h4 className="font-semibold text-blue-200">24/7 Support</h4>
                <p className="text-sm">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-900 text-white py-12 px-4 border-t border-slate-700">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Heart className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">OmniWorld</span>
              </div>
              <p className="text-slate-400">
                Your trusted partner for healthcare and education solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-blue-200">Services</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/healthcare" className="hover:text-blue-400 transition-colors">Healthcare</Link></li>
                <li><Link to="/it-education" className="hover:text-blue-400 transition-colors">IT Education</Link></li>
                <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-blue-200">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link to="/help" className="hover:text-blue-400 transition-colors">Help Center</Link></li>
                <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-blue-200">Contact</h4>
              <p className="text-slate-400">
                Email: info@omniworld.com<br />
                Phone: +91 12345 67890<br />
                24/7 Customer Support
              </p>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 OmniWorld. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
