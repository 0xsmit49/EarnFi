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

  const SubtleGrid = () => (
    <div className="absolute inset-0 opacity-5">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern
            id="subtlegrid"
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
        <rect width="100%" height="100%" fill="url(#subtlegrid)" />
      </svg>
    </div>
  );

  const getCardTransform = () => {
    let transform = 'perspective(1000px)';
    
    if (cardFlipped) {
      transform += ' rotateY(180deg)';
    }
    
    // Only apply 3D hover effects when not flipped or when specifically hovering the flipped card
    if (cardHovered && !cardFlipped) {
      const rotateX = (mousePosition.y - 50) * 0.1;
      const rotateY = (mousePosition.x - 50) * 0.1;
      transform += ` rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    }
    
    return transform;
  };

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

     
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}