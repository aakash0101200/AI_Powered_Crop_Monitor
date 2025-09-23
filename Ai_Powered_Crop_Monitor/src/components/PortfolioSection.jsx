import { Card, CardBody, Progress } from "@heroui/react";

export default function PortfolioSection() {
  const portfolioItems = [
    {
      id: 1,
      name: "Smart Corn Fields",
      invested: "$50,000",
      currentValue: "$61,250",
      gain: "+$11,250",
      gainPercent: "+22.5%",
      progress: 75,
      status: "Active",
      image: "🌽"
    },
    {
      id: 2,
      name: "Organic Wheat Project",
      invested: "$75,000",
      currentValue: "$89,025",
      gain: "+$14,025",
      gainPercent: "+18.7%",
      progress: 60,
      status: "Active",
      image: "🌾"
    },
    {
      id: 3,
      name: "Greenhouse Tomatoes",
      invested: "$120,000",
      currentValue: "$150,360",
      gain: "+$30,360",
      gainPercent: "+25.3%",
      progress: 90,
      status: "Active",
      image: "🍅"
    }
  ];

  const totalInvested = portfolioItems.reduce((sum, item) => sum + parseInt(item.invested.replace('$', '').replace(',', '')), 0);
  const totalValue = portfolioItems.reduce((sum, item) => sum + parseInt(item.currentValue.replace('$', '').replace(',', '')), 0);
  const totalGain = totalValue - totalInvested;
  const totalGainPercent = ((totalGain / totalInvested) * 100).toFixed(1);

  return (
    <section id="portfolio" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Your Portfolio
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Track your agricultural investments and monitor their performance in real-time
          </p>
        </div> */}

        {/* Portfolio Summary */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
            <CardBody className="p-6 text-center">
              <div className="text-3xl mb-2">💰</div>
              <h3 className="text-2xl font-bold text-gray-900">${totalInvested.toLocaleString()}</h3>
              <p className="text-gray-600">Total Invested</p>
            </CardBody>
          </Card>
          
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
            <CardBody className="p-6 text-center">
              <div className="text-3xl mb-2">📈</div>
              <h3 className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</h3>
              <p className="text-gray-600">Current Value</p>
            </CardBody>
          </Card>
          
          <Card className="bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-200">
            <CardBody className="p-6 text-center">
              <div className="text-3xl mb-2">💎</div>
              <h3 className="text-2xl font-bold text-green-600">+${totalGain.toLocaleString()}</h3>
              <p className="text-gray-600">Total Gain ({totalGainPercent}%)</p>
            </CardBody>
          </Card>
        </div> */}

        {/* Individual Investments */}
        {/* <div className="space-y-6">
          {portfolioItems.map((item) => (
            <Card key={item.id} className="bg-white shadow-lg">
              <CardBody className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="text-4xl mr-4">{item.image}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Invested: {item.invested}</span>
                        <span>Current: {item.currentValue}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{item.gain}</div>
                    <div className="text-sm text-gray-600">{item.gainPercent}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Project Progress</span>
                    <span>{item.progress}%</span>
                  </div>
                  <Progress 
                    value={item.progress} 
                    className="w-full"
                    color="success"
                    size="sm"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {item.status}
                  </div>
                  <button className="text-green-600 hover:text-green-700 font-medium">
                    View Details →
                  </button>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Add New Investment
          </button>
        </div> */}
      </div>
    </section>
  );
}
