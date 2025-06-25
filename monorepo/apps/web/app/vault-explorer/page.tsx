'use client';
import React, { useState, useEffect } from 'react';
import { TrendingUp, Shield, AlertTriangle, Eye, ExternalLink, Filter, Search, BarChart3, Zap, Lock, Users, DollarSign, Activity, ChevronDown, ChevronUp, Star, Clock } from 'lucide-react';
import MyCustomComponent from '../../components/FLoatingDock';
const VaultExplorer = () => {
  const [filters, setFilters] = useState({
    tokens: [],
    curveType: 'all',
    riskProfile: 'all',
    apyRange: [0, 35],
    tvlRange: [0, 5000000],
    strategyType: 'all',
    vaultAge: 'all',
    tags: [],
    searchTerm: ''
  });

  const [sortBy, setSortBy] = useState('apy');
  const [showFilters, setShowFilters] = useState(false);
  const [hoveredVault, setHoveredVault] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedVault, setSelectedVault] = useState(null);

 // Professional vault data with realistic metrics
 const vaultData = [
  {
    id: 1,
    pair: ['USDC', 'USDT'],
    curveType: 'Flat Peg Curve',
    apy: 6.42,
    apyChange: 0.08,
    lendingApy: 3.20,
    swapFeeApy: 3.22,
    tvl: 580000,
    tvlChange: 2.2,
    depositors: 421,
    volume24h: 32000,
    volume7d: 224000,
    safeMode: true,
    riskProfile: 'Low',
    strategyType: 'Delta-Hedged Stable AMM',
    age: 'Mature',
    tags: ['Stable', 'Audited', 'Blue-chip', 'Flat Curve'],
    isNew: false,
    protocol: 'EulerSwap',
    auditScore: 9.5,
    maxCapacity: 1000000,
    utilizationRate: 0.58,
    performance: [6.01, 6.08, 6.15, 6.25, 6.29, 6.34, 6.42],
    impermanentLoss: 0.01,
    sharpeRatio: 3.9,
    volatility: 0.09,
    lastRebalance: '3 hours ago',
    fees: { management: 0.3, performance: 5 },
    insurance: true,
    vaultAddress: '0xeuler...usdtvault'
  },
  {
    id: 2,
    pair: ['DAI', 'crvUSD'],
    curveType: 'Volatility Sink',
    apy: 8.74,
    apyChange: 0.5,
    lendingApy: 4.20,
    swapFeeApy: 4.54,
    tvl: 430000,
    tvlChange: 3.4,
    depositors: 217,
    volume24h: 21000,
    volume7d: 162000,
    safeMode: true,
    riskProfile: 'Medium',
    strategyType: 'Stability Band AMM',
    age: 'Active',
    tags: ['Volatility Sink', 'Stablecoin', 'Low IL', 'Audited'],
    isNew: false,
    protocol: 'EulerSwap',
    auditScore: 9.0,
    maxCapacity: 800000,
    utilizationRate: 0.53,
    performance: [8.32, 8.39, 8.48, 8.65, 8.72, 8.74],
    impermanentLoss: 0.03,
    sharpeRatio: 3.2,
    volatility: 0.18,
    lastRebalance: '6 hours ago',
    fees: { management: 0.4, performance: 7 },
    insurance: true,
    vaultAddress: '0xeuler...crvusd'
  },
  {
    id: 3,
    pair: ['USDC', 'GHO'],
    curveType: 'Asymmetric Peg Defender',
    apy: 9.63,
    apyChange: 1.2,
    lendingApy: 4.33,
    swapFeeApy: 5.30,
    tvl: 315000,
    tvlChange: 4.7,
    depositors: 149,
    volume24h: 29000,
    volume7d: 210000,
    safeMode: true,
    riskProfile: 'Low',
    strategyType: 'Soft Peg Vault',
    age: 'New',
    tags: ['Peg Defender', 'Aave', 'Safe Mode', 'Asymmetric Curve'],
    isNew: true,
    protocol: 'EulerSwap',
    auditScore: 9.1,
    maxCapacity: 700000,
    utilizationRate: 0.45,
    performance: [8.98, 9.03, 9.25, 9.37, 9.56, 9.63],
    impermanentLoss: 0.02,
    sharpeRatio: 3.6,
    volatility: 0.11,
    lastRebalance: '2 hours ago',
    fees: { management: 0.3, performance: 8 },
    insurance: true,
    vaultAddress: '0xeuler...ghovault'
  },
  {
    id: 4,
    pair: ['FRAX', 'USDT'],
    curveType: 'Algorithmic Stable',
    apy: 10.21,
    apyChange: -0.3,
    lendingApy: 4.82,
    swapFeeApy: 5.39,
    tvl: 267000,
    tvlChange: -1.2,
    depositors: 89,
    volume24h: 12000,
    volume7d: 88000,
    safeMode: false,
    riskProfile: 'Medium',
    strategyType: 'Volatility Hedged AMM',
    age: 'Experimental',
    tags: ['Frax', 'Algorithmic', 'Experimental', 'Unhedged'],
    isNew: false,
    protocol: 'EulerSwap',
    auditScore: 8.2,
    maxCapacity: 500000,
    utilizationRate: 0.53,
    performance: [10.58, 10.45, 10.33, 10.28, 10.22, 10.21],
    impermanentLoss: 0.19,
    sharpeRatio: 2.3,
    volatility: 0.42,
    lastRebalance: '8 hours ago',
    fees: { management: 0.6, performance: 12 },
    insurance: false,
    vaultAddress: '0xeuler...fraxusdt'
  },
  {
    id: 5,
    pair: ['wstETH', 'ETH'],
    curveType: 'Converging Curve',
    apy: 7.92,
    apyChange: 0.9,
    lendingApy: 3.56,
    swapFeeApy: 4.36,
    tvl: 394000,
    tvlChange: 5.1,
    depositors: 202,
    volume24h: 19000,
    volume7d: 145000,
    safeMode: false,
    riskProfile: 'Medium',
    strategyType: 'LST Rebalancer',
    age: 'Active',
    tags: ['LST', 'ETH', 'Convergence', 'Advanced'],
    isNew: false,
    protocol: 'EulerSwap',
    auditScore: 8.9,
    maxCapacity: 600000,
    utilizationRate: 0.66,
    performance: [7.14, 7.29, 7.45, 7.58, 7.76, 7.92],
    impermanentLoss: 0.14,
    sharpeRatio: 2.8,
    volatility: 0.31,
    lastRebalance: '4 hours ago',
    fees: { management: 0.5, performance: 10 },
    insurance: false,
    vaultAddress: '0xeuler...stethvault'
  }
];

const tokens = [
  'USDC', 'USDT', 'DAI', 'crvUSD', 'GHO',  // Stablecoins
  'FRAX',                                  // Algorithmic stable
  'ETH', 'wETH', 'wstETH',                 // ETH and LSTs
  'WBTC',                                  // BTC
  'MATIC'                                  // L2 gas/stake asset
];
const curveTypes = [
  'Flat Peg Curve',         // for stable-stable (USDC/USDT)
  'Volatility Sink',        // for soft-stable like crvUSD/DAI
  'Asymmetric Peg Defender',// for DAO stablecoins like GHO
  'Converging Curve',       // for LSTs (e.g., wstETH/ETH)
  'Wide Range AMM',         // for volatile pairs (BTC/ETH)
  'Custom Dynamic Curve'    // advanced programmable or governance-controlled
];
const riskProfiles = [
  'Low',      // Fully stable, delta-neutral
  'Medium', // LSTs, algorithmic stables
  'High'      // Volatile pairs or unhedged vaults
];
const strategyTypes = [
  'Delta-Hedged Stable AMM',
  'Volatility Hedged AMM',
  'LST Rebalancer',
  'Stability Band AMM',
  'Soft Peg Vault'
];
const vaultAges = [
  'New',            // Launched < 7 days ago
  'Active',         // 1-4 weeks, accumulating TVL
  'Mature',         // > 30 days, well tested
  'Experimental'    // Prototype or limited access vaults
];
const availableTags = [
  // Trust
  'Audited', 'Blue-chip', 'DAO Deployed',

  // Asset Type
  'Stablecoin', 'Algorithmic', 'LST', 'Volatile',

  // Chain / Protocol
  'Ethereum', 'Base', 'Polygon', 'Aave', 'Frax', 'Uniswap',

  // Features
  'Safe Mode', 'Delta-Neutral', 'Hedged', 'Unhedged',

  // Strategy
  'Peg Defender', 'Custom Curve', 'Research', 'Innovation', 'High-yield', 'Advanced'
];


  // Enhanced filtering logic
  const filteredVaults = vaultData.filter(vault => {
    if (filters.searchTerm && !vault.pair.some(token => 
      token.toLowerCase().includes(filters.searchTerm.toLowerCase())
    ) && !vault.protocol.toLowerCase().includes(filters.searchTerm.toLowerCase())) {
      return false;
    }
    if (filters.tokens.length > 0) {
      const hasToken = filters.tokens.some(token => vault.pair.includes(token));
      if (!hasToken) return false;
    }
    if (filters.curveType !== 'all' && vault.curveType !== filters.curveType) return false;
    if (filters.riskProfile !== 'all' && vault.riskProfile !== filters.riskProfile) return false;
    if (vault.apy < filters.apyRange[0] || vault.apy > filters.apyRange[1]) return false;
    if (vault.tvl < filters.tvlRange[0] || vault.tvl > filters.tvlRange[1]) return false;
    if (filters.strategyType !== 'all' && vault.strategyType !== filters.strategyType) return false;
    if (filters.vaultAge !== 'all' && vault.age !== filters.vaultAge) return false;
    if (filters.tags.length > 0) {
      const hasTag = filters.tags.some(tag => vault.tags.includes(tag));
      if (!hasTag) return false;
    }
    return true;
  });

  const sortedVaults = [...filteredVaults].sort((a, b) => {
    switch (sortBy) {
      case 'apy': return b.apy - a.apy;
      case 'tvl': return b.tvl - a.tvl;
      case 'depositors': return b.depositors - a.depositors;
      case 'volume': return b.volume24h - a.volume24h;
      case 'risk': return riskProfiles.indexOf(a.riskProfile) - riskProfiles.indexOf(b.riskProfile);
      case 'audit': return b.auditScore - a.auditScore;
      case 'newest': return a.isNew ? -1 : 1;
      default: return 0;
    }
  });

  const toggleFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const formatCurrency = (amount) => {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(2)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
    return `$${amount.toLocaleString()}`;
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'Low': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'Medium': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'High': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getAuditScoreColor = (score) => {
    if (score >= 9) return 'text-emerald-400';
    if (score >= 8) return 'text-blue-400';
    if (score >= 7) return 'text-amber-400';
    return 'text-red-400';
  };

  // Advanced Performance Chart
  const PerformanceChart = ({ data, height = 60 }) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    return (
      <div className="relative" style={{ height }}>
        <svg width="100%" height={height} className="overflow-visible">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
            </linearGradient>
          </defs>
          {data.map((value, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = ((max - value) / range) * 80 + 10;
            return (
              <circle
                key={index}
                cx={`${x}%`}
                cy={`${y}%`}
                r="2"
                fill="#14b8a6"
                className="drop-shadow-sm"
              />
            );
          })}
          <path
            d={`M ${data.map((value, index) => {
              const x = (index / (data.length - 1)) * 100;
              const y = ((max - value) / range) * 80 + 10;
              return `${x},${y}`;
            }).join(' L ')}`}
            fill="none"
            stroke="#14b8a6"
            strokeWidth="2"
            className="drop-shadow-sm"
          />
        </svg>
      </div>
    );
  };

  // Risk Indicator Component
  const RiskIndicator = ({ vault }) => {
    const riskScore = vault.riskProfile === 'Low' ? 1 : vault.riskProfile === 'Medium' ? 2 : 3;
    return (
      <div className="flex items-center gap-3">
      {/* Risk Bars */}
     
      {/* Risk Label */}
      <span
        className={`text-xs font-semibold capitalize px-2 py-0.5 rounded-md transition-colors duration-300 ${getRiskColor(vault.riskProfile)} bg-opacity-10`}
        style={{
          backgroundColor:
            vault.riskProfile === 'low'
              ? 'rgba(16, 185, 129, 0.15)'
              : vault.riskProfile === 'medium'
              ? 'rgba(251, 191, 36, 0.15)'
              : 'rgba(239, 68, 68, 0.15)',
        }}
      >
        Risk: {vault.riskProfile}
      </span>
    </div>
    
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <MyCustomComponent/>
      <div className="border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-xl">
  <div className="container mx-auto px-6 py-10">
    {/* Centered Title and Subtitle */}
    <div className="text-center mb-8">
      <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
        Vault Explorer
      </h1>
      <p className="text-base md:text-lg text-slate-400 ">
        Institutional-grade DeFi yield strategies
      </p>
    </div>

    {/* Metrics Row */}
    <div className="flex flex-wrap justify-center gap-6">
      {/* Total Assets */}
      <div className="bg-slate-800/50 rounded-xl px-16 py-5 text-center border border-slate-700/50 hover:border-teal-400/40 transition-all">
        <div className="text-sm md:text-base text-slate-400 mb-1">Total Assets</div>
        <div className="text-xl md:text-2xl font-bold text-white">
          {formatCurrency(sortedVaults.reduce((sum, vault) => sum + vault.tvl, 0))}
        </div>
      </div>

      {/* Avg APY */}
      <div className="bg-slate-800/50 rounded-xl px-16 py-5 text-center border border-slate-700/50 hover:border-teal-400/40 transition-all">
        <div className="text-sm md:text-base text-slate-400 mb-1">Avg APY</div>
        <div className="text-xl md:text-2xl font-bold text-emerald-400">
          {(sortedVaults.reduce((sum, vault) => sum + vault.apy, 0) / sortedVaults.length).toFixed(2)}%
        </div>
      </div>
    </div>
  </div>
</div>



      {/* Filters & Search */}
      <div className="container mx-auto px-6 py-6">
        <div className="bg-slate-900/50 border border-slate-800/50 rounded-xl p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="relative flex-1 min-w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search vaults, protocols, or tokens..."
                value={filters.searchTerm}
                onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-teal-500/50 focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:bg-slate-700/50 transition-colors"
            >
              <Filter className="w-5 h-5" />
              Filters
              {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
            >
              <option value="apy">Highest APY</option>
              <option value="tvl">Largest TVL</option>
              <option value="depositors">Most Depositors</option>
              <option value="volume">Highest Volume</option>
              <option value="risk">Lowest Risk</option>
              <option value="audit">Best Audit Score</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-800/50">
              {/* Token Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Assets</label>
                <div className="flex flex-wrap gap-2">
                  {tokens.slice(0, 6).map(token => (
                    <button
                      key={token}
                      onClick={() => toggleFilter('tokens', token)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        filters.tokens.includes(token)
                          ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                          : 'bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:bg-slate-700/50'
                      }`}
                    >
                      {token}
                    </button>
                  ))}
                </div>
              </div>

              {/* Risk Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Risk Level</label>
                <select
                  value={filters.riskProfile}
                  onChange={(e) => setFilters(prev => ({ ...prev, riskProfile: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                >
                  <option value="all">All Risk Levels</option>
                  {riskProfiles.map(risk => (
                    <option key={risk} value={risk}>{risk} Risk</option>
                  ))}
                </select>
              </div>

              {/* Strategy Filter */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Strategy Type</label>
                <select
                  value={filters.strategyType}
                  onChange={(e) => setFilters(prev => ({ ...prev, strategyType: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-teal-500/50"
                >
                  <option value="all">All Strategies</option>
                  {strategyTypes.map(strategy => (
                    <option key={strategy} value={strategy}>{strategy}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800/50">
            <div className="text-sm text-slate-400">
              Showing <span className="text-white font-medium">{sortedVaults.length}</span> of {vaultData.length} vaults
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-teal-500/20 text-teal-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
              </button>
              
            </div>
          </div>
        </div>

        {/* Vault Grid */}
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
          {sortedVaults.map((vault) => (
            <div
              key={vault.id}
              className={`bg-slate-900/50 border border-slate-800/50 rounded-xl hover:border-slate-700/50 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/5 ${
                viewMode === 'list' ? 'p-6' : 'p-6'
              }`}
              onMouseEnter={() => setHoveredVault(vault.id)}
              onMouseLeave={() => setHoveredVault(null)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  
                  <div>
                    <h3 className="text-lg font-semibold text-white">{vault.pair.join(' / ')}</h3>
                    <p className="text-sm text-slate-400">{vault.protocol}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
  {vault.isNew && (
    <div
      className="px-2 py-0.5 bg-teal-500/20 text-teal-300 text-xs font-semibold rounded-full border border-teal-500/30 hover:scale-105 transition-all"
      title="This is a newly launched vault"
    >
      NEW
    </div>
  )}

  {vault.strategyType === 'Delta Neutral' && (
    <div
      className="flex items-center gap-1 px-2 py-0.5 bg-emerald-500/10 text-emerald-300 text-xs font-semibold rounded-full border border-emerald-500/30 hover:scale-105 transition-all"
      title="Delta Neutral strategy is active"
    >
      <Shield className="w-3.5 h-3.5" />
      Delta Neutral
    </div>
  )}

  {vault.insurance && (
    <div
      className="flex items-center gap-1 px-2 py-0.5 bg-blue-500/10 text-blue-300 text-xs font-semibold rounded-full border border-blue-500/30 hover:scale-105 transition-all"
      title="This vault is insured"
    >
      <Lock className="w-3.5 h-3.5" />
      Locked
    </div>
  )}
</div>

              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
  {/* APY */}
  <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 shadow-inner backdrop-blur-md text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-emerald-400/40 cursor-pointer">
    <div className="text-2xl font-extrabold text-emerald-400">
      {vault.apy.toFixed(2)}%
    </div>
    <div className="text-xs text-slate-400 mb-1">APY</div>
    <div
      className={`text-xs font-semibold px-2 py-0.5 rounded-full inline-block ${
        vault.apyChange > 0
          ? 'text-emerald-400 bg-emerald-500/10'
          : 'text-red-400 bg-red-500/10'
      }`}
    >
      {vault.apyChange > 0 ? '+' : ''}
      {vault.apyChange.toFixed(2)}%
    </div>
  </div>

  {/* TVL */}
  <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 shadow-inner backdrop-blur-md text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-cyan-400/40 cursor-pointer">
    <div className="text-xl font-extrabold text-white">
      {formatCurrency(vault.tvl)}
    </div>
    <div className="text-xs text-slate-400 mb-1">TVL</div>
    <div
      className={`text-xs font-semibold px-2 py-0.5 rounded-full inline-block ${
        vault.tvlChange > 0
          ? 'text-emerald-400 bg-emerald-500/10'
          : 'text-red-400 bg-red-500/10'
      }`}
    >
      {vault.tvlChange > 0 ? '+' : ''}
      {vault.tvlChange.toFixed(1)}%
    </div>
  </div>

  {/* Depositors */}
  <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 shadow-inner backdrop-blur-md text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-teal-400/40 cursor-pointer">
    <div className="text-xl font-extrabold text-white">
      {vault.depositors.toLocaleString()}
    </div>
    <div className="text-xs text-slate-400 mb-1">Depositors</div>
    <div className="text-xs text-slate-400">
      {vault.utilizationRate > 0
        ? `${(vault.utilizationRate * 100).toFixed(0)}% util`
        : 'Active'}
    </div>
  </div>
</div>

              {/* Performance Chart
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-300">Performance (5D)</span>
                  <span className="text-sm text-slate-400">
                    Vol: {formatCurrency(vault.volume24h)}
                  </span>
                </div>
                <PerformanceChart data={vault.performance} />
              </div> */}

             {/* Risk & Audit Box */}
<div
  style={{
    backgroundColor: "rgba(15, 23, 42, 0.6)", // dark base
    border: "1px solid rgba(20, 184, 166, 0.2)", // default teal border
    borderRadius: "0.75rem",
    padding: "1rem",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(6px)",
  }}
  className="mb-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:border-teal-400/50 hover:bg-slate-800/60 cursor-pointer"
>
  <div className="flex items-center justify-between">
    {/* Risk Indicator */}
    <RiskIndicator vault={vault} />

    {/* Audit Score */}
    <div className="flex items-center gap-2">
      {/* <Star className={`w-4 h-4 ${getAuditScoreColor(vault.auditScore)}`} /> */}
      <span
        className={`text-sm font-semibold ${getAuditScoreColor(vault.auditScore)}`}
        style={{
          fontSize: "1rem",
          letterSpacing: "0.05rem",
        }}
      >
        Audit Score: {vault.auditScore.toFixed(1)}
      </span>
    </div>
  </div>
</div>


             {/* Strategy Details */}
             <div
  className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-md shadow-inner space-y-3 mb-4 transition-all duration-300 hover:scale-[1.015] hover:shadow-lg hover:border-teal-400/40 cursor-default group"
>
  {/* Strategy */}
  <div className="flex items-center justify-between text-sm border-b border-slate-700/40 pb-1 transition-all duration-200 group-hover:text-white">
    <span className="text-slate-400 font-medium transition-colors group-hover:text-teal-300">
      Strategy
    </span>
    <span className="text-white font-semibold">{vault.strategyType}</span>
  </div>

  {/* Curve Type */}
  <div className="flex items-center justify-between text-sm border-b border-slate-700/40 pb-1 transition-all duration-200 group-hover:text-white">
    <span className="text-slate-400 font-medium transition-colors group-hover:text-teal-300">
      Curve Type
    </span>
    <span className="text-white font-semibold">{vault.curveType}</span>
  </div>

  {/* IL Risk */}
  <div className="flex items-center justify-between text-sm transition-all duration-200 group-hover:text-white">
    <span className="text-slate-400 font-medium transition-colors group-hover:text-teal-300">
      IL Risk
    </span>
    <span
      className={`font-bold transition-colors ${
        vault.impermanentLoss < 0.1
          ? 'text-emerald-400'
          : vault.impermanentLoss < 1
          ? 'text-amber-400'
          : 'text-red-400'
      }`}
    >
      {vault.impermanentLoss.toFixed(2)}%
    </span>
  </div>
</div>


            {/* Tags */}
<div className="flex flex-wrap gap-2 mb-4">
  {vault.tags.slice(0, 3).map((tag) => (
    <span
      key={tag}
      className="px-3 py-1 rounded-full text-xs font-medium text-teal-300 bg-slate-800/60 border border-slate-700/60 shadow-sm transition-all duration-200 hover:bg-slate-700/60 hover:text-white hover:shadow-md hover:scale-105 cursor-default"
    >
      {tag}
    </span>
  ))}
</div>


             {/* Actions */}
             <div className="flex items-center gap-2">
               
               <button 
                 onClick={() => setSelectedVault(vault)}
                 className="px-4 py-3 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 border border-slate-700/50 rounded-lg transition-colors"
               >
                 <Eye className="w-5 h-5" />
               </button>
               
             </div>
           </div>
         ))}
       </div>
     </div>

     {/* Vault Detail Modal */}
     {selectedVault && (
       <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
         <div className="bg-slate-900 border border-slate-800/50 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
           <div className="p-6 border-b border-slate-800/50">
             <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="flex items-center gap-1">
                   <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold">
                     {selectedVault.pair[0].slice(0, 2)}
                   </div>
                   <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold -ml-2">
                     {selectedVault.pair[1].slice(0, 2)}
                   </div>
                 </div>
                 <div>
                   <h2 className="text-2xl font-bold text-white">{selectedVault.pair.join(' / ')}</h2>
                   <p className="text-slate-400">{selectedVault.protocol} • {selectedVault.strategyType}</p>
                 </div>
               </div>
               <button
                 onClick={() => setSelectedVault(null)}
                 className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
               >
                 <ChevronUp className="w-6 h-6 text-slate-400" />
               </button>
             </div>
           </div>

           <div className="p-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Performance Metrics */}
               <div className="space-y-4">
                 <h3 className="text-lg font-semibold text-white">Performance</h3>
                 <div className="grid grid-cols-2 gap-4">
                   <div className="bg-slate-800/50 p-4 rounded-lg">
                     <div className="text-sm text-slate-400">Current APY</div>
                     <div className="text-2xl font-bold text-emerald-400">{selectedVault.apy.toFixed(2)}%</div>
                   </div>
                   <div className="bg-slate-800/50 p-4 rounded-lg">
                     <div className="text-sm text-slate-400">Sharpe Ratio</div>
                     <div className="text-2xl font-bold text-white">{selectedVault.sharpeRatio.toFixed(1)}</div>
                   </div>
                   <div className="bg-slate-800/50 p-4 rounded-lg">
                     <div className="text-sm text-slate-400">Volatility</div>
                     <div className="text-2xl font-bold text-white">{(selectedVault.volatility * 100).toFixed(1)}%</div>
                   </div>
                   <div className="bg-slate-800/50 p-4 rounded-lg">
                     <div className="text-sm text-slate-400">IL Risk</div>
                     <div className="text-2xl font-bold text-white">{selectedVault.impermanentLoss.toFixed(2)}%</div>
                   </div>
                 </div>
               </div>

               {/* Vault Details */}
               <div className="space-y-4">
                 <h3 className="text-lg font-semibold text-white">Details</h3>
                 <div className="space-y-3">
                   <div className="flex justify-between">
                     <span className="text-slate-400">Total Value Locked</span>
                     <span className="text-white font-medium">{formatCurrency(selectedVault.tvl)}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-slate-400">Max Capacity</span>
                     <span className="text-white font-medium">{formatCurrency(selectedVault.maxCapacity)}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-slate-400">Utilization Rate</span>
                     <span className="text-white font-medium">{(selectedVault.utilizationRate * 100).toFixed(0)}%</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-slate-400">Management Fee</span>
                     <span className="text-white font-medium">{selectedVault.fees.management}%</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-slate-400">Performance Fee</span>
                     <span className="text-white font-medium">{selectedVault.fees.performance}%</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-slate-400">Last Rebalance</span>
                     <span className="text-white font-medium">{selectedVault.lastRebalance}</span>
                   </div>
                 </div>
               </div>
             </div>

             {/* Action Buttons */}
             <div id={`vault-${selectedVault.id}`} className="flex gap-4 mt-6 pt-6 border-t border-slate-800/50">
             <button
  onClick={() => {
    window.location.href = `/vault-explorer/vault-${selectedVault.id}`;
  }}
  className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-3 px-6 rounded-lg font-medium transition-colors"
>
  Deposit to Vault
</button>


              
             </div>
           </div>
         </div>
       </div>
     )}
   </div>
 );
};

export default VaultExplorer;