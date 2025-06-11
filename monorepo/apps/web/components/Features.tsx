import React, { useState, useEffect } from 'react';

const FeaturesSection = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCardClick = (id) => {
    setActiveCard(activeCard === id ? null : id);
  };

  const features = [
    {
      id: 1,
    
      title: "Passive Stablecoin Yield",
      description: "Deposit USDC, DAI, or USDT and earn yield automatically. Yield comes from Euler lending plus swap fees without manual farming or multiple protocols."
    },
    {
      id: 2,
    
      title: "Delta-Neutral Safe Mode",
      description: "Optional protection against price swings and impermanent loss. Uses Euler's lending to borrow and hedge LP exposure, ideal for conservative users."
    },
    {
      id: 3,
      
      title: "Live APY + Earnings Dashboard",
      description: "See exactly how much you're earning and why. Breakdown includes lending APY, AMM fee APY, total ROI with visual earnings graph and vault share."
    },
    {
      id: 4,
      
      title: "Programmable AMM Curves",
      description: "Vaults use custom AMM curves tailored to specific goals. Flat curves for stablecoins, asymmetric curves for DAO token floors, visualized directly in the UI."
    },
    {
      id: 5,
     
      title: "Real-Time Vault Health Monitoring",
      description: "See how safe your deposit is at all times. Live collateral ratio from Euler lending with health bar showing liquidation risk or peg status."
    },
    {
      id: 6,
     
      title: "Just-in-Time Liquidity Integration",
      description: "Vault uses EulerSwap's JIT liquidity to amplify depth with less capital. Simulates 40x liquidity vs traditional AMMs while earning swap fees without massive reserves."
    }
  ];

  const SubtleGrid = () => (
    <div className="absolute inset-0 opacity-5">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern
            id="featuresgrid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgb(20 184 166 / 0.3)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#featuresgrid)" />
      </svg>
    </div>
  );

  return (
    <div className="relative bg-gradient-to-br from-slate-950 via-gray-900 to-black text-white overflow-hidden">
      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .gradient-text {
          background: linear-gradient(-45deg, #14b8a6, #f97316, #14b8a6, #f97316);
          background-size: 400% 400%;
          animation: gradient-shift 3s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .shimmer {
          background-size: 200% auto;
          animation: shimmer 2.5s linear infinite;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .card-hover-glow {
          transition: all 0.3s ease;
        }
        
        .card-hover-glow:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(20, 184, 166, 0.2);
        }
        
        .icon-glow {
          filter: drop-shadow(0 0 8px rgba(20, 184, 166, 0.5));
        }
      `}</style>

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-gray-900 to-black" />
        <SubtleGrid />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
        
        {/* Moving Gradient */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-transparent to-orange-500/5 transition-all duration-1000"
          style={{
            transform: `translateX(${mousePosition.x * 0.02}px) translateY(${mousePosition.y * 0.02}px)`,
          }}
        />
      </div>

      <section className="relative z-10 container mx-auto px-6 py-20 max-w-7xl">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            <span className="block text-white mb-2" style={{ fontFamily: "Holtwood One SC, serif", fontSize: "3rem", letterSpacing: "0.5rem" }}>
              Why Choose
            </span>
            <span className="block" style={{ fontFamily: "Holtwood One SC, serif", fontSize: "3rem", letterSpacing: "0.5rem" }}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white shimmer font-extrabold">
                Earn
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-300 to-teal-300 shimmer font-extrabold">
                Fi
              </span>
              <span className="text-white">?</span>
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Experience the future of DeFi with our cutting-edge automated market maker and yield optimization protocols
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={feature.id}
              onClick={() => handleCardClick(feature.id)}
              className={`relative group cursor-pointer transition-all duration-700 card-hover-glow ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Card Background */}
              <div className={`relative backdrop-blur-sm border rounded-2xl p-8 transition-all duration-300 overflow-hidden ${
                activeCard === feature.id 
                  ? 'bg-gradient-to-br from-teal-500/10 to-orange-500/10 border-teal-500/60 shadow-2xl shadow-teal-500/20' 
                  : 'bg-gradient-to-br from-gray-900 to-black border-teal-500/20 hover:border-teal-500/40'
              }`}>
                
                {/* Animated background glow */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 via-transparent to-orange-500/5 rounded-2xl animate-float"></div>
                </div>
                
                

                {/* Content */}
                <h3 className={`relative z-10 text-2xl font-bold mb-4 tracking-tight transition-colors duration-300 ${
                  activeCard === feature.id ? 'text-teal-300' : 'text-white group-hover:text-teal-300'
                }`}>
                  {feature.title}
                </h3>
                <p className={`relative z-10 leading-relaxed transition-colors duration-300 ${
                  activeCard === feature.id ? 'text-gray-200' : 'text-gray-300 group-hover:text-gray-200'
                }`}>
                  {feature.description}
                </p>

                {/* Focus Indicator */}
                {activeCard === feature.id && (
                  <div className="absolute inset-0 rounded-2xl border-2 border-teal-500/80 pointer-events-none animate-pulse" />
                )}
              </div>

              {/* External Glow for Active Card */}
              {activeCard === feature.id && (
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-20 blur-xl transition-all duration-500 -z-10`} />
              )}
            </div>
          ))}
        </div>

      </section>
    </div>
  );
};

export default FeaturesSection;