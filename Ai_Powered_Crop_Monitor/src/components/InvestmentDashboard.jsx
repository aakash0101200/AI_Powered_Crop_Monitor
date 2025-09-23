import { Button, Card, CardBody } from "@heroui/react";

export default function InvestmentDashboard() {
  const investmentOptions = [
    {
      id: 1,
      name: "Smart Corn Fields",
      location: "Iowa, USA",
      investment: "$50,000",
      expectedReturn: "22.5%",
      duration: "12 months",
      risk: "Medium",
      image: "🌽",
      description: "AI-optimized corn cultivation with precision farming technology"
    },
    {
      id: 2,
      name: "Organic Wheat Project",
      location: "Kansas, USA", 
      investment: "$75,000",
      expectedReturn: "18.7%",
      duration: "18 months",
      risk: "Low",
      image: "🌾",
      description: "Sustainable organic wheat production with premium market access"
    },
    {
      id: 3,
      name: "Greenhouse Tomatoes",
      location: "California, USA",
      investment: "$120,000",
      expectedReturn: "25.3%",
      duration: "24 months",
      risk: "High",
      image: "🍅",
      description: "Year-round tomato production using advanced greenhouse technology"
    },
    {
      id: 4,
      name: "Soybean Innovation",
      location: "Illinois, USA",
      investment: "$90,000",
      expectedReturn: "20.1%",
      duration: "15 months",
      risk: "Medium",
      image: "🫘",
      description: "High-yield soybean farming with AI-driven crop management"
    }
  ];

  return (
    <section id="dashboard" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Investment Opportunities
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our curated selection of AI-powered agricultural investments. 
            Each project is carefully vetted and monitored using advanced technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {investmentOptions.map((option) => (
            <Card key={option.id} className="bg-white shadow-lg hover:shadow-xl transition-shadow">
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="text-4xl mr-4">{option.image}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{option.name}</h3>
                      <p className="text-gray-600">{option.location}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    option.risk === 'Low' ? 'bg-green-100 text-green-800' :
                    option.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {option.risk} Risk
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{option.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600">Investment</p>
                    <p className="text-lg font-semibold text-gray-900">{option.investment}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600">Expected Return</p>
                    <p className="text-lg font-semibold text-green-600">{option.expectedReturn}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Duration: {option.duration}</span>
                  <Button 
                    color="primary" 
                    className="bg-green-600 hover:bg-green-700 text-white px-6"
                  >
                    Invest Now
                  </Button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="bordered" 
            size="lg"
            className="border-green-600 text-green-600 hover:bg-green-50 px-8"
          >
            View All Opportunities
          </Button>
        </div> */}
      </div>
    </section>
  );
}
