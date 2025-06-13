import React, { useState, useEffect } from "react";
import MyCustomComponent from './FLoatingDock';





export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [animationPhase, setAnimationPhase] = useState(0);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [curveHovered, setCurveHovered] = useState(false);
  const [pricePoint, setPricePoint] = useState({ x: 180, y: 55, price: 1.0002 });
  const [slippage, setSlippage] = useState(0.02);
  const [efficiency, setEfficiency] = useState(99.8);
  const [isLive, setIsLive] = useState(true);
  const [yieldData, setYieldData] = useState({
    currentAPY: 15.8,
    totalEarned: 2847,
    weeklyYield: 68.5,
    monthlyYield: 297.3,
    compoundingRate: 1.24,
    lastUpdate: new Date()
  });
  const [yieldAnimation, setYieldAnimation] = useState(false);

  const tokens = [
    { name: "USDC", color: "#2775CA", symbol: "$" },
    { name: "DAI", color: "#F5AC37", symbol: "◈" },
    { name: "USDT", color: "#26A17B", symbol: "₮" },
    { name: "ETH", color: "#627EEA", symbol: "Ξ" }
  ];

  const [activeToken, setActiveToken] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const tokenInterval = setInterval(() => {
      setActiveToken((prev) => (prev + 1) % tokens.length);
    }, 2000);

    const animationInterval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 4);
    }, 1500);

    // Simulate live price and yield updates
    const updateInterval = setInterval(() => {
      if (isLive) {
        const newX = 170 + Math.random() * 20;
        const newY = 50 + Math.random() * 10;
        const newPrice = 1.0000 + Math.random() * 0.0010;
        setPricePoint({ x: newX, y: newY, price: newPrice });
        setSlippage(0.01 + Math.random() * 0.03);
        setEfficiency(99.5 + Math.random() * 0.5);
        
        // Update yield data
        setYieldData(prev => ({
          ...prev,
          currentAPY: 15.0 + Math.random() * 2.0,
          weeklyYield: 65 + Math.random() * 8,
          monthlyYield: 290 + Math.random() * 20,
          compoundingRate: 1.20 + Math.random() * 0.10,
          lastUpdate: new Date()
        }));
        
        setYieldAnimation(true);
        setTimeout(() => setYieldAnimation(false), 1000);
      }
    }, 3000);
    
    const handleMouseMove = (e) => {
      const rect = document.querySelector('.card-container')?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
          rawX: e.clientX - centerX,
          rawY: e.clientY - centerY
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(tokenInterval);
      clearInterval(animationInterval);
      clearInterval(updateInterval);
    };
  }, [isLive]);

 
  const handleCurveClick = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const svgRect = event.currentTarget.querySelector('svg').getBoundingClientRect();
    const x = ((event.clientX - svgRect.left) / svgRect.width) * 320;
    const y = ((event.clientY - svgRect.top) / svgRect.height) * 120;
    
    if (x > 60 && x < 280 && y > 40 && y < 100) {
      setPricePoint({ x, y, price: 1.0000 + Math.random() * 0.0020 });
      setSlippage(0.01 + Math.random() * 0.05);
      setEfficiency(99.0 + Math.random() * 1.0);
      
      // Simulate yield boost from optimal trading
      setYieldData(prev => ({
        ...prev,
        currentAPY: prev.currentAPY + 0.1 + Math.random() * 0.2,
        compoundingRate: prev.compoundingRate + 0.01
      }));
      
      setYieldAnimation(true);
      setTimeout(() => setYieldAnimation(false), 1000);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black text-white overflow-hidden">
      <style jsx>{`
        @keyframes token-flow {
          0% { transform: translateX(-100%) translateY(0) scale(0.8); opacity: 0; }
          20% { transform: translateX(0) translateY(0) scale(1); opacity: 1; }
          40% { transform: translateX(50%) translateY(-20px) scale(1.1); opacity: 1; }
          60% { transform: translateX(100%) translateY(-10px) scale(0.9); opacity: 0.7; }
          80% { transform: translateX(150%) translateY(10px) scale(0.8); opacity: 0.5; }
          100% { transform: translateX(200%) translateY(0) scale(0.6); opacity: 0; }
        }
        
        @keyframes vault-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 20px rgba(20, 184, 166, 0.3); }
          50% { transform: scale(1.05); box-shadow: 0 0 30px rgba(20, 184, 166, 0.5); }
        }
        
        @keyframes yield-glow {
          0%, 100% { opacity: 0.6; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(-5px); }
        }
        
        @keyframes flow-line {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes card-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes number-count {
          0% { opacity: 0; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes curve-glow {
          0%, 100% { filter: drop-shadow(0 0 3px rgba(20, 184, 166, 0.5)); }
          50% { filter: drop-shadow(0 0 8px rgba(20, 184, 166, 0.8)); }
        }
          @keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.8s ease-out forwards;
}

.shimmer {
  background-size: 200% auto;
  animation: shimmer 2.5s linear infinite;
}


        @keyframes stat-highlight {
          0%, 100% { transform: scale(1); background-color: rgba(51, 65, 85, 0.5); }
          50% { transform: scale(1.05); background-color: rgba(20, 184, 166, 0.2); }
        }

        @keyframes live-indicator {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }

        @keyframes yield-update {
          0% { transform: scale(1); color: inherit; }
          50% { transform: scale(1.1); color: rgb(34, 197, 94); }
          100% { transform: scale(1); color: inherit; }
        }

        @keyframes card-flip {
          0% { transform: perspective(1000px) rotateY(0deg); }
          100% { transform: perspective(1000px) rotateY(180deg); }
        }

        @keyframes compound-effect {
          0% { opacity: 0; transform: translateY(10px) scale(0.8); }
          50% { opacity: 1; transform: translateY(-5px) scale(1.1); }
          100% { opacity: 0; transform: translateY(-20px) scale(0.9); }
        }
        
        .gradient-text {
          background: linear-gradient(-45deg, #14b8a6, #fb923c, #14b8a6, #fb923c);
          background-size: 400% 400%;
          animation: gradient-shift 3s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .card-container {
          perspective: 1000px;
        }
        
        .card {
          transform-style: preserve-3d;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
        }
        
        .card-face {
          backface-visibility: hidden;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }
        
        .card-back {
          transform: rotateY(180deg);
        }
        
        .card-interactive {
          animation: card-float 4s ease-in-out infinite;
        }
        
        .card-interactive:hover {
          animation: none;
        }
        
        .token-flow-animation {
          animation: token-flow 3s ease-in-out infinite;
        }
        
        .vault-animation {
          animation: vault-pulse 2s ease-in-out infinite;
        }
        
        .yield-animation {
          animation: yield-glow 2s ease-in-out infinite;
        }
        
        .flow-line-animated {
          stroke-dasharray: 10, 5;
          animation: flow-line 2s ease-in-out infinite;
        }
        
        .tooltip-enter {
          animation: number-count 0.5s ease-out;
        }

        .curve-interactive {
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .curve-interactive:hover {
          animation: curve-glow 1s ease-in-out infinite;
        }

        .stat-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .stat-card:hover {
          animation: stat-highlight 0.6s ease-in-out;
        }

        .live-indicator {
          animation: live-indicator 2s ease-in-out infinite;
        }

        .interactive-zone {
          transition: all 0.3s ease;
        }

        .interactive-zone:hover {
          filter: brightness(1.1);
        }

        .yield-update-animation {
          animation: yield-update 1s ease-in-out;
        }

        .compound-floating {
          animation: compound-effect 2s ease-in-out infinite;
        }

        .yield-boost-indicator {
          position: absolute;
          top: -10px;
          right: -10px;
          background: linear-gradient(45deg, #22c55e, #16a34a);
          color: white;
          padding: 2px 6px;
          border-radius: 8px;
          font-size: 10px;
          font-weight: bold;
          animation: compound-effect 2s ease-in-out;
        }
      `}</style>

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-gray-900 to-black" />
        <SubtleGrid />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
      </div>

      {/* Floating Dock */}
      <div className="relative z-20">
        <MyCustomComponent/>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-15 items-center">
            
            {/* Left Content */}
            <div className="space-y-8 ml-0 lg:ml-20 xl:ml-32">
            <div>
  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
    <span className="block text-white mb-2 text-[4rem] tracking-widest font-[Holtwood_One_SC]">
      Maximize
    </span>
    <span className="block text-teal-400 text-[3rem] tracking-widest font-[Holtwood_One_SC]">
      Your Yield
    </span>
    <span className="block text-white text-[3rem] tracking-widest font-[Holtwood_One_SC]">
      Potential
    </span>
  </h1>
</div>


              <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed max-w-lg">
                  Deposit your tokens into EarnFi's automated yield engine. Earn from both lending protocols and AMM trading fees simultaneously.
                </p>
              </div>

              <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <button
                  onClick={() => console.log('Navigate to deposit')}
                  className="group relative px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold text-base rounded-lg hover:from-teal-700 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #14b8a6, #0f766e)" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 flex items-center justify-center">
                    Partner Onboarding
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </button>

                <button
                  onClick={() => console.log('Navigate to strategies')}
                  className="group px-6 py-3 border-2 border-orange-500/30 text-orange-300 font-semibold text-base rounded-lg hover:bg-orange-500/10 hover:border-orange-400/60 transition-all duration-300 backdrop-blur-sm"
                >
                  <span className="flex items-center justify-center">
                    View Strategies
                    <svg className="ml-2 w-4 h-4 group-hover:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            {/* Right Content - Interactive AMM Curve */}
            <div className={`flex flex-col items-center lg:items-start gap-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div 
                className="card-container w-96 h-80 relative"
                onMouseEnter={() => setCardHovered(true)}
                onMouseLeave={() => setCardHovered(false)}
              >
                <div 
                  className="card w-full h-full relative"
                  style={{ transform: getCardTransform() }}
                >
                  {/* Card Front Face */}
                  <div className="card-face w-full h-full bg-gradient-to-br from-slate-900/95 to-gray-900/95 rounded-2xl shadow-2xl p-6 border border-teal-500/20 backdrop-blur-lg hover:border-teal-500/40 transition-all duration-300 relative overflow-hidden">
                    {/* Card glow effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-transparent to-orange-500/10 rounded-2xl"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-teal-500/5 to-transparent rounded-2xl"></div>
                    </div>
                
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4 relative z-10">
                      <div>
                        <div className="text-sm font-semibold text-teal-400 flex items-center gap-2">
                          Live AMM Curve
                         
                        </div>
                        <div className="text-xs text-gray-400">USDC/USDT Vault</div>
                      </div>
                      <div className="flex items-center gap-2">
                       
                        <button 
                          onClick={() => setCardFlipped(!cardFlipped)}
                          className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 cursor-pointer hover:scale-105"
                          title="View yield analytics"
                        >
                          <svg className="w-4 h-4 text-gray-400 hover:text-teal-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Interactive Chart Container */}
                    <div 
                      className="relative h-32 mb-4 curve-interactive interactive-zone rounded-lg overflow-hidden"
                      onClick={handleCurveClick}
                      onMouseEnter={() => setCurveHovered(true)}
                      onMouseLeave={() => setCurveHovered(false)}
                    >
                      {/* Chart background glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-orange-500/5 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <svg width="100%" height="100%" viewBox="0 0 320 120" className="overflow-visible relative z-10">
                        {/* Enhanced Grid Lines */}
                        <defs>
                          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(148, 163, 184, 0.1)" strokeWidth="0.5"/>
                          </pattern>
                          <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                            <feMerge> 
                              <feMergeNode in="coloredBlur"/>
                              <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                          </filter>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                        
                        {/* Enhanced Axes */}
                        <line x1="40" y1="100" x2="300" y2="100" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="1.5"/>
                        <line x1="40" y1="100" x2="40" y2="20" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="1.5"/>
                        
                        {/* Enhanced Low-Slippage Zone */}
                        <path
                          d="M 120 95 Q 170 60 220 45 Q 240 50 260 65 Q 240 70 220 75 Q 170 85 120 95 Z"
                          fill="rgba(20, 184, 166, 0.15)"
                          stroke="rgba(20, 184, 166, 0.4)"
                          strokeWidth="1.5"
                          strokeDasharray="4,4"
                          className={`transition-all duration-300 ${curveHovered ? 'fill-opacity-25 stroke-opacity-60' : 'fill-opacity-15 stroke-opacity-40'}`}
                        />
                        
                        {/* Enhanced Main AMM Curve */}
                        <path
                          d="M 60 95 Q 120 70 180 55 Q 240 50 280 60"
                          fill="none"
                          stroke="rgba(20, 184, 166, 0.9)"
                          strokeWidth="3"
                          className={`drop-shadow-sm transition-all duration-300 ${curveHovered ? 'stroke-width-4' : 'stroke-width-3'}`}
                          filter={curveHovered ? "url(#glow)" : "none"}
                        />
                        
                        {/* Enhanced Interactive Price Point */}
                        <circle 
                          cx={pricePoint.x} 
                          cy={pricePoint.y} 
                          r="5" 
                          fill="rgba(20, 184, 166, 1)" 
                          className={`transition-all duration-300 ${curveHovered ? 'animate-pulse' : ''}`}
                          filter="url(#glow)"
                        >
                          <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite"/>
                        </circle>
                        
                        {/* Enhanced Dynamic Price Point Label */}
                        <text 
                          x={pricePoint.x + 12} 
                          y={pricePoint.y - 3} 
                          fontSize="11" 
                          fill="rgba(20, 184, 166, 1)" 
                          className="font-bold drop-shadow-sm"
                        >
                          ${pricePoint.price.toFixed(4)}
                        </text>
                        
                        {/* Enhanced Interactive Tooltip */}
                        {curveHovered && (
                          <g>
                            <rect x="210" y="20" width="90" height="30" fill="rgba(30, 41, 59, 0.95)" stroke="rgba(20, 184, 166, 0.6)" strokeWidth="1.5" rx="6"/>
                            <text x="215" y="32" fontSize="9" fill="rgba(20, 184, 166, 1)" className="font-semibold">Click to trade</text>
                            <text x="215" y="42" fontSize="8" fill="rgba(148, 163, 184, 0.9)">Optimal zone</text>
                          </g>
                        )}
                        
                        {/* Enhanced Axis Labels */}
                        <text x="170" y="115" fontSize="11" fill="rgba(148, 163, 184, 0.8)" textAnchor="middle" className="font-medium">
                          USDC Reserve
                        </text>
                        <text x="15" y="65" fontSize="11" fill="rgba(148, 163, 184, 0.8)" textAnchor="middle" transform="rotate(-90 15 65)" className="font-medium">
                          USDT Reserve
                        </text>
                      </svg>
                    </div>

                    {/* Enhanced Interactive Curve Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-3 relative z-10">
        
                      <div 
                        className="stat-card text-center p-3 bg-slate-800/60 rounded-xl border border-slate-700/50 hover:border-green-400/50 transition-all duration-300 hover:scale-105"
                        onMouseEnter={() => setHoveredStat(null)}
                        onMouseLeave={() => setHoveredStat(null)}
                      >
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                          <div className="text-xs text-gray-400 font-medium">Slippage</div>
                        </div>
                        <div className={`text-lg font-bold ${hoveredStat === 'slippage' ? 'text-green-300' : 'text-green-400'} transition-all duration-300`}>
                          {slippage.toFixed(2)}%
                        </div>
                        {hoveredStat === 'slippage' && (
                          <div className="text-xs text-green-400 mt-1 font-medium animate-pulse">Ultra-low impact</div>
                        )}
                      </div>
                      <div 
                        className="stat-card text-center p-3 bg-slate-800/60 rounded-xl border border-slate-700/50 hover:border-teal-400/50 transition-all duration-300 hover:scale-105"
                        onMouseEnter={() => setHoveredStat('efficiency')}
                        onMouseLeave={() => setHoveredStat(null)}
                      >
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <svg className="w-3 h-3 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div className="text-xs text-gray-400 font-medium">Efficiency</div>
                        </div>
                        <div className={`text-lg font-bold ${hoveredStat === 'efficiency' ? 'text-teal-300' : 'text-teal-400'} transition-all duration-300`}>
                          {efficiency.toFixed(1)}%
                        </div>
                        {hoveredStat === 'efficiency' && (
                          <div className="text-xs text-teal-400 mt-1 font-medium animate-pulse">Peak performance</div>
                        )}
                      </div>
                    </div>

                    
                  </div>

                  {/* Card Back Face */}
                  {/* Card Back Face */}
                  <div className="card-face card-back absolute inset-0 w-full h-fit bg-gradient-to-br from-gray-900/95 to-slate-900/95 rounded-2xl shadow-2xl p-6 border border-orange-500/20 backdrop-blur-lg">
                    {/* Back Card Content */}
                    <div className="h-fit flex flex-col relative z-10">
                      {/* Header */}
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <div className="text-lg font-semibold text-orange-400 flex items-center gap-2">
                            
                           
                          </div>
                         
                        </div>
                        <button 
                          onClick={() => setCardFlipped(!cardFlipped)}
                          className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 cursor-pointer hover:scale-105"
                          title="Flip back"
                        >
                          <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </button>
                      </div>

                     

                     {/* Powered by EulerSwap */}
                     <div className="mt-4 text-center animate-fadeIn">
  <div
    className="inline-block px-6 py-3 bg-slate-800/70 rounded-xl border border-slate-700/50 hover:border-teal-400/70 shadow-inner backdrop-blur-md transition-all duration-300 cursor-pointer hover:scale-105"
  >
    <span
      className="text-white font-medium"
      style={{
        fontFamily: "Inter, sans-serif",
        fontSize: "1.25rem",
        letterSpacing: "0.05rem",
      }}
    >
      Powered by{" "}
    </span>
    <span
      className="text-white font-extrabold"
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "2.25rem",
        letterSpacing: "0.1rem",
      }}
    >
      Euler
    </span>
    <span
      className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-400 to-teal-500 shimmer font-extrabold"
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: "2.25rem",
        letterSpacing: "0.1rem",
      }}
    >
      Swap
    </span>
  </div>
</div>

                    </div>
                  </div>


                </div>
              </div>

             
            
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}