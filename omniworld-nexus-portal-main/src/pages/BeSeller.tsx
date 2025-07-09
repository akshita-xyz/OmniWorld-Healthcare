
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Store, TrendingUp, Users, Shield, DollarSign, Package, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const BeSeller = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    businessType: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Seller application submitted:', formData);
    setFormData({
      businessName: '',
      contactName: '',
      email: '',
      phone: '',
      businessType: '',
      description: ''
    });
  };

  const benefits = [
    {
      icon: TrendingUp,
      title: "Grow Your Business",
      description: "Reach thousands of healthcare professionals and expand your market reach."
    },
    {
      icon: Users,
      title: "Large Customer Base",
      description: "Access to 10,000+ verified healthcare customers worldwide."
    },
    {
      icon: Shield,
      title: "Trusted Platform",
      description: "Secure transactions and verified buyer protection system."
    },
    {
      icon: DollarSign,
      title: "Competitive Fees",
      description: "Low commission rates and transparent pricing structure."
    },
    {
      icon: Package,
      title: "Easy Management",
      description: "User-friendly dashboard to manage inventory and orders."
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Dedicated seller support team to help you succeed."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/healthcare" className="flex items-center text-slate-300 hover:text-blue-400 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Healthcare
            </Link>
            <div className="flex items-center space-x-2">
              <Store className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Become a Seller
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Start Selling Today
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Join OmniWorld Healthcare marketplace and connect with thousands of healthcare professionals worldwide.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Why Sell With Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700 hover:border-green-500 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 mb-4">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{benefit.title}</h3>
                  <p className="text-slate-300 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Apply to Become a Seller</h2>
            <p className="text-slate-300">Fill out the form below and we'll get back to you within 48 hours.</p>
          </div>

          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Business Name</label>
                    <Input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                      placeholder="Your business or company name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Contact Name</label>
                    <Input
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => setFormData({...formData, contactName: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                      placeholder="Your full name"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                      placeholder="business@example.com"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Phone</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Business Type</label>
                  <Input
                    type="text"
                    value={formData.businessType}
                    onChange={(e) => setFormData({...formData, businessType: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                    placeholder="e.g., Medical Equipment Manufacturer, Pharmaceutical Distributor"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Business Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 min-h-[120px]"
                    placeholder="Tell us about your business, products, and experience in the healthcare industry..."
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                  size="lg"
                >
                  Submit Application
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">What are the requirements to become a seller?</h3>
                <p className="text-slate-300">You need a valid business license, healthcare industry experience, and quality products that meet our standards.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">How much does it cost to sell on your platform?</h3>
                <p className="text-slate-300">We charge a competitive commission rate of 5-8% per sale, with no upfront fees or monthly charges.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">How long does the approval process take?</h3>
                <p className="text-slate-300">Most applications are reviewed within 48 hours. Complete applications with all required documents are processed faster.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 border-t border-slate-700">
        <div className="container mx-auto text-center">
          <p className="text-slate-400">
            Have questions? Contact our seller support team at <span className="text-green-400">sellers@omniworldhealthcare.com</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BeSeller;
