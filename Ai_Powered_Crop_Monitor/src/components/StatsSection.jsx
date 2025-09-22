export default function StatsSection() {
  const stats = [
    {
      title: "Total Investment",
      value: "$2.4M",
      change: "+12.5%",
      changeType: "positive",
      icon: "💰"
    },
    {
      title: "Active Farms",
      value: "156",
      change: "+8.2%",
      changeType: "positive",
      icon: "🚜"
    },
    {
      title: "Yield Increase",
      value: "23.7%",
      change: "+5.1%",
      changeType: "positive",
      icon: "📈"
    },
    {
      title: "ROI",
      value: "18.9%",
      change: "+2.3%",
      changeType: "positive",
      icon: "💎"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Investment Performance
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real-time metrics showing the success of our AI-powered agricultural investments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">{stat.icon}</div>
                <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                  stat.changeType === 'positive' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {stat.change}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
