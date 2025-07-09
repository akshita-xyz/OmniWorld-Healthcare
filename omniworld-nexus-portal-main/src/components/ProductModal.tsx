
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ShoppingCart, X, Shield, Award, Clock, Truck } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  stock: string;
  badge: string;
  description: string;
  prescription?: boolean;
  fullDescription?: string;
  specifications?: string[];
  features?: string[];
  inTheBox?: string[];
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, isOpen, onClose }) => {
  const { addItem } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category
    });
    onClose();
  };

  const getFullDescription = () => {
    if (product.fullDescription) return product.fullDescription;
    
    // Generate detailed descriptions based on product type
    const baseDescriptions: { [key: string]: string } = {
      'Digital Stethoscope Pro': 'Advanced digital stethoscope featuring superior acoustic performance with noise cancellation technology. Perfect for medical professionals requiring precise auscultation capabilities.',
      'Automated Blood Pressure Monitor': 'Professional-grade automated blood pressure monitor with advanced oscillometric technology. Features large LCD display, memory storage for multiple readings, and irregular heartbeat detection.',
      'LED Otoscope Set': 'Complete diagnostic otoscope set with bright LED illumination and multiple disposable specula. Essential tool for ear examination with superior visibility and comfort.',
      'Infrared Thermometer': 'Non-contact infrared thermometer providing instant and accurate temperature readings. Ideal for quick screening with fever alarm and memory recall function.',
      'Pulse Oximeter': 'Fingertip pulse oximeter with OLED display showing SpO2 levels and pulse rate. Compact, battery-efficient device for continuous monitoring.',
      'Basic Surgical Kit': 'Comprehensive surgical instrument set including scissors, forceps, scalpels, and other essential tools. All instruments are made from high-grade stainless steel.'
    };
    
    return baseDescriptions[product.name] || product.description;
  };

  const getSpecifications = () => {
    if (product.specifications) return product.specifications;
    
    // Generate specifications based on product type
    const specs: { [key: string]: string[] } = {
      'Digital Stethoscope Pro': [
        'Frequency Response: 20Hz - 20kHz',
        'Battery Life: 100+ hours',
        'Weight: 180g',
        'Memory: Stores up to 12 recordings',
        'Bluetooth: Version 5.0'
      ],
      'Automated Blood Pressure Monitor': [
        'Measurement Range: 0-280 mmHg',
        'Accuracy: ±3 mmHg',
        'Memory: 99 readings with date/time',
        'Cuff Size: 22-42 cm',
        'Auto Power Off: 1 minute'
      ],
      'LED Otoscope Set': [
        'Magnification: 3x',
        'LED Lifespan: 100,000 hours',
        'Specula Sizes: 2.5mm, 3.5mm, 4.5mm',
        'Battery: 2 x AA',
        'Material: Medical grade plastic'
      ]
    };
    
    return specs[product.name] || ['High-quality medical grade materials', 'CE certified', 'ISO 13485 compliant'];
  };

  const getFeatures = () => {
    if (product.features) return product.features;
    
    return [
      'Professional medical grade quality',
      'Easy to use and maintain',
      'Durable construction',
      'Accurate and reliable results',
      'Ergonomic design'
    ];
  };

  const getInTheBox = () => {
    if (product.inTheBox) return product.inTheBox;
    
    return [
      `${product.name} x1`,
      'User Manual',
      'Warranty Card',
      'Carrying Case (where applicable)'
    ];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-800 border-slate-700 text-blue-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-300 flex items-center justify-between">
            {product.name}
            <Button variant="ghost" size="sm" onClick={onClose} className="text-slate-400 hover:text-blue-300">
              <X className="h-5 w-5" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg h-80 flex items-center justify-center">
              <div className="text-slate-400">Product Image</div>
              <Badge className={`absolute top-3 left-3 ${product.prescription ? 'bg-red-600' : 'bg-blue-600'} text-white`}>
                {product.badge}
              </Badge>
            </div>
            
            {/* Trust Badges */}
            <div className="flex justify-center space-x-4 text-xs">
              <div className="flex items-center space-x-1 text-green-400">
                <Shield className="h-4 w-4" />
                <span>FDA Approved</span>
              </div>
              <div className="flex items-center space-x-1 text-blue-400">
                <Award className="h-4 w-4" />
                <span>ISO Certified</span>
              </div>
              <div className="flex items-center space-x-1 text-purple-400">
                <Truck className="h-4 w-4" />
                <span>Free Shipping</span>
              </div>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="space-y-4">
            <div>
              <Badge variant="outline" className="text-xs mb-2 border-slate-600 text-slate-400">
                {product.category}
              </Badge>
              
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-slate-600'}`} 
                  />
                ))}
                <span className="text-sm text-slate-400 ml-2">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-green-400">
                    ₹{(product.price * 83).toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-slate-500 line-through">
                      ₹{(product.originalPrice * 83).toLocaleString()}
                    </span>
                  )}
                </div>
                <Badge 
                  variant={product.stock === "In Stock" ? "default" : "destructive"}
                  className={`${product.stock === "In Stock" ? "bg-green-600" : ""}`}
                >
                  {product.stock}
                </Badge>
              </div>
              
              <p className="text-slate-300 mb-4">
                {getFullDescription()}
              </p>
              
              <div className="flex items-center space-x-2 text-sm text-slate-400 mb-4">
                <Clock className="h-4 w-4" />
                <span>Same day shipping for orders before 2 PM</span>
              </div>
              
              <Button 
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white mb-4"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart - ₹{(product.price * 83).toLocaleString()}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Detailed Information Tabs */}
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-300 mb-3">Key Features</h3>
            <ul className="space-y-2">
              {getFeatures().map((feature, index) => (
                <li key={index} className="flex items-start space-x-2 text-slate-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-blue-300 mb-3">Specifications</h3>
            <ul className="space-y-2">
              {getSpecifications().map((spec, index) => (
                <li key={index} className="flex items-start space-x-2 text-slate-300">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-blue-300 mb-3">What's in the Box</h3>
            <ul className="space-y-2">
              {getInTheBox().map((item, index) => (
                <li key={index} className="flex items-start space-x-2 text-slate-300">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
