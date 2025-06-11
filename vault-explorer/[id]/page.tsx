'use client';
import MyCustomComponent from '@/components/FLoatingDock';
import React, { useState, useEffect } from 'react';

const VaultPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [depositAmount, setDepositAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('USDC');
  const [safeModeEnabled, setSafeModeEnabled] = useState(true);
  const [showStrategyDetails, setShowStrategyDetails] = useState(false);
  const [showRiskDetails, setShowRiskDetails] = useState(false);
  const [curveHovered, setCurveHovered] = useState(false);
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [hoveredStat, setHoveredStat] = useState(null);
  const [pricePoint, setPricePoint] = useState({ x: 180, y: 55, price: 1.0002 });
  const [isDepositing, setIsDepositing] = useState(false);
const [depositSuccess, setDepositSuccess] = useState(false);
const [depositError, setDepositError] = useState('');
const [transactionHash, setTransactionHash] = useState('');
  const [projectedEarnings, setProjectedEarnings] = useState(0);
  const handleDeposit = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) return;
    
    const selectedTokenData = tokens.find(t => t.symbol === selectedToken);
    const amount = parseFloat(depositAmount);
    
    // Validate sufficient balance
    if (amount > selectedTokenData.balance) {
      setDepositError('Insufficient balance');
      return;
    }
    
    setDepositModalOpen(true);
    setDepositError('');
    setDepositSuccess(false);
  };
  
  const confirmDeposit = async () => {
    setIsDepositing(true);
    setDepositError('');
    
    try {
      // Simulate deposit process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate transaction hash
      const mockTxHash = '0x' + Math.random().toString(16).substr(2, 40);
      setTransactionHash(mockTxHash);
      
      // Update vault data
      const depositAmountNum = parseFloat(depositAmount);
      setVaultData(prev => ({
        ...prev,
        tvl: prev.tvl + depositAmountNum,
        utilization: Math.min(100, ((prev.tvl + depositAmountNum) / prev.depositCap) * 100)
      }));
      
      // Update user balance
      const updatedTokens = tokens.map(token => 
        token.symbol === selectedToken 
          ? { ...token, balance: token.balance - depositAmountNum }
          : token
      );
      
      setDepositSuccess(true);
      setDepositAmount('');
      
    } catch (error) {
      setDepositError('Deposit failed. Please try again.');
    } finally {
      setIsDepositing(false);
    }
  };
  // Vault data
  const [vaultData, setVaultData] = useState({
    name: 'USDC / GHO',
    strategy: 'Delta-Hedged',
    riskLevel: 'Low',
    status: 'Active',
    apy: 6.38,
    apyBreakdown: {
      lending: 4.12,
      swapFees: 2.88,
      bonus: 0.38
    },
    tvl: 318000,
    volume24h: 45600,
    feesEarned: 2847,
    collateralizationRatio: 2.1,
    liquidationRisk: 12.4,
    impermanentLoss: 0.03,
    lastRebalance: '3h ago',
    isLocked: false,
    depositCap: 500000,
    utilization: 63.6
  });

  const tokens = [
    { symbol: 'USDC', name: 'USD Coin', icon: '', balance: 1250.00 },
    { symbol: 'GHO', name: 'GHO Stablecoin', icon: '', balance: 892.50 }
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = document.querySelector('.vault-container')?.getBoundingClientRect();
      if (rect) {
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    // Calculate projected earnings
    if (depositAmount && !isNaN(depositAmount)) {
      const dailyEarnings = (parseFloat(depositAmount) * vaultData.apy) / 100 / 365;
      setProjectedEarnings(dailyEarnings);
    } else {
      setProjectedEarnings(0);
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [depositAmount, vaultData.apy]);

  // Add this useEffect after your existing useEffect
useEffect(() => {
  const updateVaultStats = () => {
    setVaultData(prev => ({
      ...prev,
      apy: prev.apy + (Math.random() - 0.5) * 0.1, // Small random changes
      tvl: prev.tvl + (Math.random() - 0.5) * 5000,
      volume24h: prev.volume24h + (Math.random() - 0.5) * 2000,
      feesEarned: prev.feesEarned + Math.random() * 10,
      utilization: Math.max(50, Math.min(80, prev.utilization + (Math.random() - 0.5) * 2)),
      lastRebalance: Math.random() > 0.9 ? 'Just now' : prev.lastRebalance
    }));
  };

  const interval = setInterval(updateVaultStats, 5000); // Update every 5 seconds
  return () => clearInterval(interval);
}, []);

  const getRiskColor = (level) => {
    switch(level) {
      case 'Low': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'High': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
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

  const SubtleGrid = () => (
    <div className="absolute inset-0 opacity-5">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern id="subtlegrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgb(20 184 166 / 0.3)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#subtlegrid)" />
      </svg>
    </div>
  );

  return (
    <div className="vault-container min-h-screen bg-gradient-to-br from-slate-950 via-gray-900 to-black text-white overflow-hidden">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(20, 184, 166, 0.3); }
          50% { box-shadow: 0 0 30px rgba(20, 184, 166, 0.5); }
        }
        @keyframes stat-highlight {
          0%, 100% { transform: scale(1); background-color: rgba(51, 65, 85, 0.5); }
          50% { transform: scale(1.05); background-color: rgba(20, 184, 166, 0.2); }
        }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; }
        .shimmer { background-size: 200% auto; animation: shimmer 2.5s linear infinite; }
        .pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .stat-highlight:hover { animation: stat-highlight 0.6s ease-in-out; }
      `}</style>

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-gray-900 to-black" />
        <SubtleGrid />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
      </div>
      <MyCustomComponent/>
      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl py-8">
         
          {/* 1. Top Bar */}
          <div className="animate-fadeIn mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-6 bg-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur-lg">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{vaultData.name}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-1 bg-teal-500/20 text-teal-400 text-xs rounded-full border border-teal-400/30">
                      {vaultData.strategy}
                    </span>
                   
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getRiskColor(vaultData.riskLevel)}`}>
                  {vaultData.riskLevel} Risk
                </span>
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium border border-green-400/30 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  {vaultData.status}
                </span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Deposit Panel + Strategy */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* 2. Strategy Explainer */}
              <div className="animate-fadeIn">
                <div className="bg-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">Strategy Overview</h2>
                    <button 
                      onClick={() => setShowStrategyDetails(!showStrategyDetails)}
                      className="text-teal-400 hover:text-teal-300 transition-colors"
                    >
                      {showStrategyDetails ? 'Hide Details' : 'Learn How This Works'}
                    </button>
                  </div>
                  <p className="text-gray-300 mb-4">
                    This vault uses a programmable AMM curve to maximize yield on stablecoin swaps while minimizing risk via Safe Mode protection.
                  </p>
                  {showStrategyDetails && (
                    <div className="space-y-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700/30">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-teal-500/20 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-teal-400 text-sm">1</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-white mb-1">Dual Revenue Streams</h4>
                          <p className="text-sm text-gray-400">Earn from both lending protocols (4.12% APY) and AMM swap fees (2.88% APY)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-teal-500/20 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-teal-400 text-sm">2</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-white mb-1">Delta-Hedged Protection</h4>
                          <p className="text-sm text-gray-400">Automatically hedges against impermanent loss using derivative positions</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-teal-500/20 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-teal-400 text-sm">3</span>
                        </div>
                        <div>
                          <h4 className="font-medium text-white mb-1">Auto-Compounding</h4>
                          <p className="text-sm text-gray-400">Rewards are automatically reinvested to maximize compound growth</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 3. Deposit Panel */}
              <div className="animate-fadeIn">
                <div className="bg-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur-lg p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">Deposit Funds</h2>
                  
                  {/* Token Selector */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Select Token</label>
                    <div className="grid grid-cols-2 gap-3">
                      {tokens.map((token) => (
                        <button
                          key={token.symbol}
                          onClick={() => setSelectedToken(token.symbol)}
                          className={`p-3 rounded-xl border transition-all duration-300 ${
                            selectedToken === token.symbol
                              ? 'bg-teal-500/20 border-teal-400/50 text-teal-400'
                              : 'bg-slate-800/50 border-slate-700/50 text-gray-400 hover:border-slate-600/50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{token.icon}</span>
                            <div className="text-left">
                              <div className="font-medium">{token.symbol}</div>
                              <div className="text-xs opacity-70">Balance: {token.balance.toFixed(2)}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
                    <div className="relative">
                      <input
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-400 focus:border-teal-400/50 focus:outline-none transition-all duration-300"
                      />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        {selectedToken}
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-gray-400">
                        Available: {tokens.find(t => t.symbol === selectedToken)?.balance.toFixed(2)} {selectedToken}
                      </span>
                      <button 
                        onClick={() => setDepositAmount(tokens.find(t => t.symbol === selectedToken)?.balance.toString())}
                        className="text-xs text-teal-400 hover:text-teal-300 transition-colors"
                      >
                        Max
                      </button>
                    </div>
                  </div>

                  {/* Safe Mode Toggle */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700/50">
                      <div className="flex items-center gap-3">
                      
                        <div>
                          <div className="font-medium text-white">Safe Mode</div>
                          <div className="text-xs text-gray-400">Protect against impermanent loss</div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSafeModeEnabled(!safeModeEnabled)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          safeModeEnabled ? 'bg-teal-500' : 'bg-slate-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            safeModeEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Projected APY Breakdown */}
                  <div className="mb-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
                    <h3 className="font-medium text-white mb-3">Projected APY Breakdown</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Lending Yield</span>
                        <span className="text-sm text-green-400 font-medium">{vaultData.apyBreakdown.lending.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Swap Fees</span>
                        <span className="text-sm text-blue-400 font-medium">{vaultData.apyBreakdown.swapFees.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-400">Vault Bonus</span>
                        <span className="text-sm text-purple-400 font-medium">{vaultData.apyBreakdown.bonus.toFixed(2)}%</span>
                      </div>
                      <div className="border-t border-slate-700/50 pt-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-white">Total APY</span>
                          <span className="font-bold text-teal-400 text-lg">{vaultData.apy.toFixed(2)}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Projected Earnings */}
                  {projectedEarnings > 0 && (
                    <div className="mb-4 p-3 bg-teal-500/10 rounded-xl border border-teal-400/30">
                      <div className="flex items-center gap-2">
                       
                        <span className="text-sm text-teal-400">
                          Est. daily earnings: <span className="font-bold">${projectedEarnings.toFixed(2)}</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Deposit Button */}
                  <button
  onClick={handleDeposit}
  disabled={!depositAmount || parseFloat(depositAmount) <= 0 || isDepositing}
  className="w-full p-4 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold rounded-xl hover:from-teal-700 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
>
  {isDepositing ? (
    <div className="flex items-center justify-center gap-2">
      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      Processing...
    </div>
  ) : (
    'Deposit & Start Earning'
  )}
</button>
                  
                  <div className="mt-3 text-center text-sm text-gray-400">
                    You'll start earning immediately. Rewards are auto-compounded.
                  </div>
                </div>
              </div>

              {/* 4. Curve Visualizer */}
              <div className="animate-fadeIn">
                <div className="bg-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur-lg p-6">
                  <h2 className="text-lg font-semibold text-white mb-4">AMM Curve Visualizer</h2>
                  
                  <div 
                    className="relative h-64 bg-slate-800/50 rounded-xl border border-slate-700/50 cursor-pointer overflow-hidden"
                    onMouseEnter={() => setCurveHovered(true)}
                    onMouseLeave={() => setCurveHovered(false)}
                  >
                    <svg width="100%" height="100%" viewBox="0 0 400 200" className="overflow-visible">
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
                      
                      {/* Axes */}
                      <line x1="50" y1="170" x2="370" y2="170" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="1.5"/>
                      <line x1="50" y1="170" x2="50" y2="30" stroke="rgba(148, 163, 184, 0.4)" strokeWidth="1.5"/>
                      
                      {/* Optimal Zone */}
                      <path
                        d="M 150 160 Q 210 100 270 80 Q 300 90 330 110 Q 300 120 270 130 Q 210 140 150 160 Z"
                        fill="rgba(20, 184, 166, 0.15)"
                        stroke="rgba(20, 184, 166, 0.4)"
                        strokeWidth="1.5"
                        strokeDasharray="4,4"
                      />
                      
                      {/* Main Curve */}
                      <path
                        d="M 80 160 Q 150 120 220 90 Q 290 80 350 100"
                        fill="none"
                        stroke="rgba(20, 184, 166, 0.9)"
                        strokeWidth="4"
                        filter="url(#glow)"
                      />
                      
                      {/* Current Price Point */}
                      <circle 
                        cx={pricePoint.x} 
                        cy={pricePoint.y + 50} 
                        r="6" 
                        fill="rgba(20, 184, 166, 1)" 
                        className="animate-pulse"
                      />
                      
                      {/* Price Label */}
                      <text 
                        x={pricePoint.x + 15} 
                        y={pricePoint.y + 45} 
                        fontSize="12" 
                        fill="rgba(20, 184, 166, 1)" 
                        className="font-bold"
                      >
                        ${pricePoint.price.toFixed(4)}
                      </text>
                      
                      {/* Axis Labels */}
                      <text x="210" y="190" fontSize="12" fill="rgba(148, 163, 184, 0.8)" textAnchor="middle">
                        {selectedToken} Reserve
                      </text>
                      <text x="25" y="105" fontSize="12" fill="rgba(148, 163, 184, 0.8)" textAnchor="middle" transform="rotate(-90 25 105)">
                        Price Impact
                      </text>
                      
                      {/* Tooltip */}
                      {curveHovered && (
                        <g>
                          <rect x="250" y="40" width="120" height="50" fill="rgba(30, 41, 59, 0.95)" stroke="rgba(20, 184, 166, 0.6)" strokeWidth="1" rx="8"/>
                          <text x="255" y="55" fontSize="10" fill="rgba(20, 184, 166, 1)" className="font-semibold">Optimized for stables</text>
                          <text x="255" y="70" fontSize="9" fill="rgba(148, 163, 184, 0.9)">Minimal slippage zone</text>
                          <text x="255" y="82" fontSize="9" fill="rgba(148, 163, 184, 0.9)">Current efficiency: 99.8%</text>
                        </g>
                      )}
                    </svg>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-400">
                    This AMM is optimized to reduce slippage around the stable price band ($0.998 - $1.002)
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Risk & Stats */}
            <div className="space-y-6">
              
              {/* 5. Risk Preview */}
              <div className="animate-fadeIn">
                <div className="bg-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">Risk Assessment</h2>
                    <button 
                      onClick={() => setShowRiskDetails(!showRiskDetails)}
                      className="text-teal-400 hover:text-teal-300 transition-colors text-sm"
                    >
                      {showRiskDetails ? 'Hide' : 'Details'}
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl">
                      <div className="flex items-center gap-3">
                       
                        <div>
                          <div className="font-medium text-white">Collateral Ratio</div>
                          <div className="text-xs text-gray-400">Over-collateralized</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-400">{vaultData.collateralizationRatio}x</div>
                        <div className="text-xs text-gray-400">Healthy</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl">
                      <div className="flex items-center gap-3">
                       
                        <div>
                          <div className="font-medium text-white">Liquidation Risk</div>
                          <div className="text-xs text-gray-400">Market move threshold</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-yellow-400">{vaultData.liquidationRisk}%</div>
                        <div className="text-xs text-gray-400">Low risk</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl">
                      <div className="flex items-center gap-3">
                      
                        <div>
                          <div className="font-medium text-white">IL Risk (7d)</div>
                          <div className="text-xs text-gray-400">Impermanent loss est.</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-400">{vaultData.impermanentLoss}%</div>
                        <div className="text-xs text-gray-400">Minimal</div>
                      </div>
                    </div>
                  </div>
                  
                  {showRiskDetails && (
                    <div className="mt-4 p-4 bg-slate-800/50 rounded-xl border border-slate-700/30">
                      <h4 className="font-medium text-white mb-2">Risk Mitigation</h4>
                      <ul className="space-y-1 text-sm text-gray-400">
                        <li>• Delta-hedged positions reduce directional risk</li>
                        <li>• Safe Mode provides additional IL protection</li>
                        <li>• Automated rebalancing maintains optimal ratios</li>
                        <li>• Multi-signature treasury management</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

             {/* 6. Live Stats Panel */}
<div className="animate-fadeIn">
  <div className="bg-slate-900/50 rounded-2xl border border-slate-700/50 backdrop-blur-lg p-6">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-white">Live Vault Stats</h2>
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
        <span className="text-xs text-gray-400">Live</span>
      </div>
    </div>
    
    <div className="space-y-3">
      <div 
        className="stat-highlight flex items-center justify-between p-3 bg-slate-800/50 rounded-xl cursor-pointer transition-all duration-300"
        onMouseEnter={() => setHoveredStat('apy')}
        onMouseLeave={() => setHoveredStat(null)}
      >
        <div className="flex items-center gap-3">
         
          <div>
            <div className="font-medium text-white">Current APY</div>
            <div className="text-xs text-gray-400">Annualized yield</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-green-400 text-lg">{vaultData.apy.toFixed(2)}%</div>
          <div className="text-xs text-gray-400">
            <span className={`${vaultData.apy > 6.38 ? 'text-green-400' : 'text-red-400'}`}>
              {vaultData.apy > 6.38 ? '↗' : '↘'} {Math.abs(vaultData.apy - 6.38).toFixed(2)}%
            </span>
          </div>
        </div>
      </div>

      <div 
        className="stat-highlight flex items-center justify-between p-3 bg-slate-800/50 rounded-xl cursor-pointer transition-all duration-300"
        onMouseEnter={() => setHoveredStat('tvl')}
        onMouseLeave={() => setHoveredStat(null)}
      >
        <div className="flex items-center gap-3">
       
          <div>
            <div className="font-medium text-white">TVL</div>
            <div className="text-xs text-gray-400">Total value locked</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-blue-400">{formatCurrency(vaultData.tvl)}</div>
          <div className="text-xs text-gray-400">
            <span className={`${vaultData.tvl > 318000 ? 'text-green-400' : 'text-red-400'}`}>
              {vaultData.tvl > 318000 ? '↗' : '↘'} {(((vaultData.tvl - 318000) / 318000) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      <div 
        className="stat-highlight flex items-center justify-between p-3 bg-slate-800/50 rounded-xl cursor-pointer transition-all duration-300"
        onMouseEnter={() => setHoveredStat('volume')}
        onMouseLeave={() => setHoveredStat(null)}
      >
        <div className="flex items-center gap-3">
        
          <div>
            <div className="font-medium text-white">24h Volume</div>
            <div className="text-xs text-gray-400">Trading activity</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-purple-400">{formatCurrency(vaultData.volume24h)}</div>
          <div className="text-xs text-gray-400">
            <span className={`${vaultData.volume24h > 45600 ? 'text-green-400' : 'text-red-400'}`}>
              {vaultData.volume24h > 45600 ? '↗' : '↘'} {(((vaultData.volume24h - 45600) / 45600) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>

      <div 
        className="stat-highlight flex items-center justify-between p-3 bg-slate-800/50 rounded-xl cursor-pointer transition-all duration-300"
        onMouseEnter={() => setHoveredStat('fees')}
        onMouseLeave={() => setHoveredStat(null)}
      >
        <div className="flex items-center gap-3">
      
          <div>
            <div className="font-medium text-white">Fees Earned</div>
            <div className="text-xs text-gray-400">Protocol revenue</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-teal-400">{formatCurrency(vaultData.feesEarned)}</div>
          <div className="text-xs text-green-400">+${((vaultData.feesEarned * 0.001) * Math.random()).toFixed(0)}/hr</div>
        </div>
      </div>

      <div 
        className="stat-highlight flex items-center justify-between p-3 bg-slate-800/50 rounded-xl cursor-pointer transition-all duration-300"
        onMouseEnter={() => setHoveredStat('utilization')}
        onMouseLeave={() => setHoveredStat(null)}
      >
        <div className="flex items-center gap-3">
        
          <div>
            <div className="font-medium text-white">Utilization</div>
            <div className="text-xs text-gray-400">Capital efficiency</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-yellow-400">{vaultData.utilization}%</div>
          <div className="text-xs text-gray-400">
            <span className={`${vaultData.utilization > 60 ? 'text-green-400' : 'text-yellow-400'}`}>
              {vaultData.utilization > 60 ? 'Optimal' : 'Moderate'}
            </span>
          </div>
        </div>
      </div>

      <div 
        className="stat-highlight flex items-center justify-between p-3 bg-slate-800/50 rounded-xl cursor-pointer transition-all duration-300"
        onMouseEnter={() => setHoveredStat('rebalance')}
        onMouseLeave={() => setHoveredStat(null)}
      >
        <div className="flex items-center gap-3">
        
          <div>
            <div className="font-medium text-white">Last Rebalance</div>
            <div className="text-xs text-gray-400">Auto-optimization</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-orange-400">{vaultData.lastRebalance}</div>
          <div className="text-xs text-green-400">Auto</div>
        </div>
      </div>
    </div>

    {/* Update Status */}
    <div className="mt-4 text-center text-xs text-gray-400">
      Last updated: {new Date().toLocaleTimeString()}
    </div>
  </div>
</div>
                  </div>
                  </div>
                  </div>
                  </div>
                  {/* Deposit Modal */}
{depositModalOpen && (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="bg-slate-900 rounded-2xl border border-slate-700/50 p-6 max-w-md w-full">
      {!depositSuccess ? (
        <>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Confirm Deposit</h3>
            <button 
              onClick={() => setDepositModalOpen(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Amount</span>
                <span className="text-white font-semibold">{depositAmount} {selectedToken}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Est. Daily Earnings</span>
                <span className="text-green-400 font-semibold">${projectedEarnings.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">APY</span>
                <span className="text-teal-400 font-semibold">{vaultData.apy.toFixed(2)}%</span>
              </div>
            </div>
            
            {safeModeEnabled && (
              <div className="p-3 bg-green-500/10 rounded-xl border border-green-400/30">
                <div className="flex items-center gap-2">
                 
                  <span className="text-sm text-green-400">Safe Mode enabled - IL protection active</span>
                </div>
              </div>
            )}
            
            {depositError && (
              <div className="p-3 bg-red-500/10 rounded-xl border border-red-400/30">
                <div className="flex items-center gap-2">
                  <span className="text-red-400">⚠️</span>
                  <span className="text-sm text-red-400">{depositError}</span>
                </div>
              </div>
            )}
            
            <div className="flex gap-3">
              <button
                onClick={() => setDepositModalOpen(false)}
                className="flex-1 p-3 bg-slate-700/50 text-white rounded-xl hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeposit}
                disabled={isDepositing}
                className="flex-1 p-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl hover:from-teal-700 hover:to-teal-600 transition-all duration-300 disabled:opacity-50"
              >
                {isDepositing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Depositing...
                  </div>
                ) : (
                  'Confirm Deposit'
                )}
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="text-center">
           
            <h3 className="text-lg font-semibold text-white mb-2">Deposit Successful!</h3>
            <p className="text-gray-400 mb-4">Your funds have been deposited and are now earning yield.</p>
            
            <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Deposited</span>
                <span className="text-white font-semibold">{depositAmount} {selectedToken}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Transaction</span>
                <span className="text-teal-400 font-mono text-sm">{transactionHash.slice(0, 10)}...</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Status</span>
                <span className="text-green-400 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Earning
                </span>
              </div>
            </div>
            
            <button
              onClick={() => {
                setDepositModalOpen(false);
                setDepositSuccess(false);
              }}
              className="w-full p-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-xl hover:from-teal-700 hover:to-teal-600 transition-all duration-300"
            >
              Done
            </button>
          </div>
        </>
      )}
    </div>
  </div>
)}
                  </div>

  );}
  export default VaultPage;