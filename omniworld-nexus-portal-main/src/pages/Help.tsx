
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Headphones, Search, MessageCircle, Phone, Mail, Clock, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Help = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const helpTopics = [
    {
      title: "Orders & Shipping",
      questions: [
        "How to track my order?",
        "What are the shipping options?",
        "How to cancel or modify an order?",
        "International shipping policies"
      ]
    },
    {
      title: "Products & Inventory", 
      questions: [
        "How to search for products?",
        "Product authenticity verification",
        "Stock availability updates",
        "Product specifications guide"
      ]
    },
    {
      title: "Payments & Billing",
      questions: [
        "Accepted payment methods",
        "How to get a refund?",
        "Payment security measures",
        "Invoice and receipt requests"
      ]
    },
    {
      title: "Account Management",
      questions: [
        "How to create an account?",
        "Reset password instructions",
        "Update profile information",
        "Account security settings"
      ]
    }
  ];

  const contactOptions = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our experts",
      contact: "+1 (555) 123-4567",
      availability: "24/7 Available"
    },
    {
      icon: Mail,
      title: "Email Support", 
      description: "Get detailed assistance",
      contact: "support@omniworldhealthcare.com",
      availability: "Response within 2 hours"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Instant help available",
      contact: "Click to start chat",
      availability: "24/7 Available"
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
              <Headphones className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Help Center
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            How Can We Help?
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Find answers to your questions or contact our support team for personalized assistance.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for help topics, orders, products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-lg border-2 border-slate-600 bg-slate-700 text-white placeholder-slate-400 focus:border-blue-500 rounded-xl"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-cyan-600">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Get Instant Help</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {contactOptions.map((option, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-colors cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 mb-4">
                    <option.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white">{option.title}</h3>
                  <p className="text-slate-300 text-sm mb-3">{option.description}</p>
                  <p className="text-blue-400 font-medium mb-2">{option.contact}</p>
                  <div className="flex items-center justify-center text-xs text-slate-400">
                    <Clock className="h-3 w-3 mr-1" />
                    {option.availability}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Help Topics */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Popular Help Topics</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {helpTopics.map((topic, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-white flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-blue-400" />
                    {topic.title}
                  </h3>
                  <ul className="space-y-3">
                    {topic.questions.map((question, qIndex) => (
                      <li key={qIndex} className="text-slate-300 hover:text-blue-400 cursor-pointer transition-colors flex items-center">
                        <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                        {question}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <Card className="max-w-2xl mx-auto bg-red-900/20 border-red-700">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 text-red-400">Emergency Medical Support</h2>
              <p className="text-slate-300 mb-6">
                For urgent medical equipment failures or critical supply issues, contact our emergency hotline immediately.
              </p>
              <Button className="bg-red-600 hover:bg-red-700 text-white" size="lg">
                <Phone className="h-4 w-4 mr-2" />
                Emergency Hotline: +1 (555) 911-HELP
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 border-t border-slate-700">
        <div className="container mx-auto text-center">
          <p className="text-slate-400 mb-4">
            Still need help? Our support team is here 24/7 to assist you.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="mailto:support@omniworldhealthcare.com" className="text-blue-400 hover:text-blue-300 transition-colors">
              Email Support
            </a>
            <a href="tel:+15551234567" className="text-blue-400 hover:text-blue-300 transition-colors">
              Call Support
            </a>
            <Link to="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">
              Contact Form
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Help;
