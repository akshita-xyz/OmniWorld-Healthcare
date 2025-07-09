
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Monitor, GraduationCap, Construction } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const ComingSoon = () => {
  const { division } = useParams();
  
  const divisionInfo = {
    "it-solutions": {
      name: "IT Solutions",
      icon: Monitor,
      description: "Enterprise software and technology consulting services",
      gradient: "from-purple-500 to-blue-500"
    },
    "education": {
      name: "Education",
      icon: GraduationCap,
      description: "Educational platforms and learning management systems",
      gradient: "from-orange-500 to-red-500"
    }
  };

  const currentDivision = divisionInfo[division as keyof typeof divisionInfo];

  if (!currentDivision) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Division Not Found</h1>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <Card className="max-w-2xl mx-auto border-0 bg-white/80 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-12">
            <div className={`inline-flex p-6 rounded-3xl bg-gradient-to-r ${currentDivision.gradient} mb-8`}>
              <currentDivision.icon className="h-16 w-16 text-white" />
            </div>
            
            <h1 className={`text-4xl font-bold mb-4 bg-gradient-to-r ${currentDivision.gradient} bg-clip-text text-transparent`}>
              OmniWorld {currentDivision.name}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              {currentDivision.description}
            </p>
            
            <div className="flex items-center justify-center mb-8">
              <Construction className="h-12 w-12 text-gray-400 mr-4" />
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon</h2>
                <p className="text-gray-600">
                  We're working hard to bring you amazing {currentDivision.name.toLowerCase()} solutions.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button 
                className={`bg-gradient-to-r ${currentDivision.gradient} hover:shadow-lg transition-all duration-300 mr-4`}
                size="lg"
              >
                Notify Me When Ready
              </Button>
              
              <Link to="/">
                <Button variant="outline" size="lg" className="ml-4">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to OmniWorld
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ComingSoon;
