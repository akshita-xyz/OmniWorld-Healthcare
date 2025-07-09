
import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  Truck,
  Shield,
  X,
  DollarSign,
  Building2,
  Smartphone,
  HandCoins
} from 'lucide-react';

interface CartProps {
  children: React.ReactNode;
}

export const Cart: React.FC<CartProps> = ({ children }) => {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });
  const [formErrors, setFormErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const errors: {[key: string]: string} = {};
    
    if (!customerInfo.name.trim()) errors.name = 'Name is required';
    if (!customerInfo.email.trim()) errors.email = 'Email is required';
    if (!customerInfo.phone.trim()) errors.phone = 'Phone is required';
    if (!customerInfo.address.trim()) errors.address = 'Address is required';
    if (!customerInfo.city.trim()) errors.city = 'City is required';
    if (!customerInfo.zipCode.trim()) errors.zipCode = 'PIN Code is required';
    if (!paymentMethod) errors.paymentMethod = 'Payment method is required';
    
    // Email validation
    if (customerInfo.email && !/\S+@\S+\.\S+/.test(customerInfo.email)) {
      errors.email = 'Please enter a valid email';
    }
    
    // Phone validation (basic)
    if (customerInfo.phone && !/^\d{10}$/.test(customerInfo.phone.replace(/\D/g, ''))) {
      errors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    if (!validateForm()) {
      return;
    }
    
    const totalInRupees = getTotalPrice() * 83; // Convert to rupees (approximate rate)
    console.log('Processing checkout:', { items, customerInfo, paymentMethod, total: totalInRupees });
    
    clearCart();
    setIsCheckoutOpen(false);
    setCustomerInfo({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipCode: ''
    });
    setPaymentMethod('');
    setFormErrors({});
    alert('Order placed successfully! You will receive a confirmation email shortly.');
  };

  const paymentOptions = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Pay with Visa, Mastercard, or RuPay' },
    { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Pay using UPI (Google Pay, PhonePe, Paytm)' },
    { id: 'netbanking', name: 'Net Banking', icon: Building2, description: 'Direct transfer from your bank account' },
    { id: 'wallet', name: 'Digital Wallet', icon: DollarSign, description: 'Paytm, Amazon Pay, Mobikwik' },
    { id: 'cod', name: 'Cash on Delivery', icon: HandCoins, description: 'Pay when your order is delivered' }
  ];

  const formatPrice = (priceInUSD: number) => {
    const priceInRupees = priceInUSD * 83; // Convert to rupees
    return `₹${priceInRupees.toLocaleString()}`;
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo({...customerInfo, [field]: value});
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors({...formErrors, [field]: ''});
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-slate-900 border-slate-700 h-full">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-blue-300 flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart ({getTotalItems()} items)
          </SheetTitle>
          <SheetDescription className="text-slate-400">
            Review your items and proceed to checkout
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-slate-400">
                <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Your cart is empty</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="bg-slate-800 border-slate-700">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-blue-300">{item.name}</h4>
                          <p className="text-sm text-slate-400">{item.category}</p>
                          <p className="text-green-400 font-semibold">{formatPrice(item.price)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 p-0 border-slate-600"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-blue-300">{item.quantity}</span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 p-0 border-slate-600"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => removeItem(item.id)}
                            className="h-8 w-8 p-0 ml-2"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="border-t border-slate-700 pt-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-blue-300">Total:</span>
                  <span className="text-lg font-bold text-green-400">{formatPrice(getTotalPrice())}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Truck className="h-4 w-4" />
                    <span>Free shipping on orders over ₹4,000</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-sm">
                    <Shield className="h-4 w-4" />
                    <span>Secure checkout with SSL encryption</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    onClick={() => setIsCheckoutOpen(true)}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Proceed to Checkout
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-slate-600 text-blue-300"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Checkout Modal */}
        {isCheckoutOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md bg-slate-800 border-slate-700 max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-blue-300">Checkout</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCheckoutOpen(false)}
                    className="text-slate-400"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Customer Information */}
                <div className="space-y-4">
                  <h3 className="text-blue-300 font-semibold">Billing Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-slate-300">
                        Name <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={customerInfo.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`bg-slate-700 border-slate-600 text-blue-200 ${formErrors.name ? 'border-red-500' : ''}`}
                        placeholder="Enter your name"
                      />
                      {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-slate-300">
                        Email <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`bg-slate-700 border-slate-600 text-blue-200 ${formErrors.email ? 'border-red-500' : ''}`}
                        placeholder="Enter your email"
                      />
                      {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-slate-300">
                      Phone <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="phone"
                      value={customerInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`bg-slate-700 border-slate-600 text-blue-200 ${formErrors.phone ? 'border-red-500' : ''}`}
                      placeholder="Enter your phone number"
                    />
                    {formErrors.phone && <p className="text-red-400 text-xs mt-1">{formErrors.phone}</p>}
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-slate-300">
                      Address <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="address"
                      value={customerInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className={`bg-slate-700 border-slate-600 text-blue-200 ${formErrors.address ? 'border-red-500' : ''}`}
                      placeholder="Enter your address"
                    />
                    {formErrors.address && <p className="text-red-400 text-xs mt-1">{formErrors.address}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-slate-300">
                        City <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="city"
                        value={customerInfo.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={`bg-slate-700 border-slate-600 text-blue-200 ${formErrors.city ? 'border-red-500' : ''}`}
                        placeholder="Enter your city"
                      />
                      {formErrors.city && <p className="text-red-400 text-xs mt-1">{formErrors.city}</p>}
                    </div>
                    <div>
                      <Label htmlFor="zipCode" className="text-slate-300">
                        PIN Code <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="zipCode"
                        value={customerInfo.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        className={`bg-slate-700 border-slate-600 text-blue-200 ${formErrors.zipCode ? 'border-red-500' : ''}`}
                        placeholder="Enter PIN code"
                      />
                      {formErrors.zipCode && <p className="text-red-400 text-xs mt-1">{formErrors.zipCode}</p>}
                    </div>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-4">
                  <h3 className="text-blue-300 font-semibold">
                    Payment Method <span className="text-red-400">*</span>
                  </h3>
                  <RadioGroup value={paymentMethod} onValueChange={(value) => {
                    setPaymentMethod(value);
                    if (formErrors.paymentMethod) {
                      setFormErrors({...formErrors, paymentMethod: ''});
                    }
                  }}>
                    {paymentOptions.map((option) => (
                      <div key={option.id} className={`flex items-start space-x-3 p-3 rounded-lg border transition-colors cursor-pointer ${
                        paymentMethod === option.id 
                          ? 'border-blue-500 bg-blue-500/10' 
                          : 'border-slate-700 hover:border-slate-600'
                      }`}>
                        <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={option.id} className="flex items-center gap-2 text-blue-300 cursor-pointer">
                            <option.icon className="h-4 w-4" />
                            {option.name}
                          </Label>
                          <p className="text-sm text-slate-400 mt-1">{option.description}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                  {formErrors.paymentMethod && <p className="text-red-400 text-xs">{formErrors.paymentMethod}</p>}
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-semibold text-blue-300">Total: {formatPrice(getTotalPrice())}</span>
                  </div>
                  <Button 
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    Place Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
