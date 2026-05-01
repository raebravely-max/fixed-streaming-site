export const SportsNews = () => {
  const news = [
    {
      title: "Mbappe's Stunning Debut: What's Next for Real Madrid?",
      category: "Football",
      time: "2h ago",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80"
    },
    {
      title: "LeBron James Set to Break Another All-Time Record",
      category: "Basketball",
      time: "4h ago",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80"
    },
    {
      title: "Ferrari's New Aero Package: A Game Changer in Monaco?",
      category: "F1",
      time: "5h ago",
      image: "https://images.unsplash.com/photo-1530681957458-53dec4c4458e?w=400&q=80"
    }
  ];

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-black mb-6">Latest Sports News</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {news.map((item, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="aspect-[16/9] rounded-2xl overflow-hidden mb-3">
              <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-blue-500 uppercase">{item.category}</span>
              <span className="text-[10px] text-gray-500">• {item.time}</span>
            </div>
            <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors leading-snug">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};
