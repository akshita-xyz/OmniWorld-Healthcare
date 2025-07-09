
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Building2, Users, Globe, Award, Target, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Mission",
      description: "To deliver innovative solutions that transform industries and improve lives through technology, healthcare, and education."
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously push boundaries to create cutting-edge solutions that meet evolving market demands."
    },
    {
      icon: Users,
      title: "Excellence",
      description: "Our commitment to quality and customer satisfaction drives everything we do."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Serving clients worldwide with localized expertise and international standards."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700 bg-slate-800/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center text-slate-300 hover:text-blue-400 transition-colors">
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to OmniWorld
            </Link>
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                OmniWorld
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About OmniWorld
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Leading the future of healthcare, technology, and education through innovative solutions and unwavering commitment to excellence.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">Our Story</h2>
          <p className="text-lg text-slate-300 leading-relaxed mb-6">
            Founded with a vision to bridge the gap between technology and human needs, OmniWorld has grown from a small startup to a global leader in multiple industries. Our journey began with a simple belief: that innovation should serve humanity.
          </p>
          <p className="text-lg text-slate-300 leading-relaxed">
            Today, we operate across three major divisions - Healthcare, IT Solutions, and Education - each dedicated to solving real-world problems with cutting-edge technology and human-centered design.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700 hover:border-blue-500 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 mb-4">
                    <value.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{value.title}</h3>
                  <p className="text-slate-300 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-slate-800/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">10,000+</div>
              <div className="text-slate-300">Satisfied Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
              <div className="text-slate-300">Countries Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-cyan-400 mb-2">15+</div>
              <div className="text-slate-300">Years of Excellence</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">24/7</div>
              <div className="text-slate-300">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Ready to Transform Your Business?</h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust OmniWorld for their technology, healthcare, and education needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                Get Started Today
              </Button>
            </Link>
            <Link to="/">
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 border-t border-slate-700">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">OmniWorld</span>
              </div>
              <p className="text-slate-400 text-sm">
                Comprehensive solutions across Healthcare, Technology, and Education.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Our Divisions</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/healthcare" className="hover:text-blue-400 transition-colors">Healthcare</Link></li>
                <li><Link to="/it-solutions" className="hover:text-blue-400 transition-colors">IT Solutions</Link></li>
                <li><Link to="/education" className="hover:text-blue-400 transition-colors">Education</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <p className="text-sm text-slate-400">
                Email: info@omniworld.com<br />
                Phone: +1 (555) 123-4567
              </p>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-slate-400">
            <p>&copy; 2024 OmniWorld. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
