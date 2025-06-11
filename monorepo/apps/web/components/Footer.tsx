import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (email.trim()) {
      // Handle newsletter subscription
      console.log('Subscribing email:', email);
      setEmail('');
      // You can add your subscription logic here
    }
  };

  const SubtleGrid = () => (
    <div className="absolute inset-0 opacity-5">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <pattern
            id="footergrid"
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
        <rect width="100%" height="100%" fill="url(#footergrid)" />
      </svg>
    </div>
  );

  return (
    <footer className="relative border-t border-teal-500/20 bg-gradient-to-br from-slate-950 via-gray-900 to-black text-white overflow-hidden">
      <style jsx>{`
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .gradient-text {
          background: linear-gradient(-45deg, #14b8a6, #fb923c, #14b8a6, #fb923c);
          background-size: 400% 400%;
          animation: gradient-shift 3s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .shimmer {
          background-size: 200% auto;
          animation: shimmer 2.5s linear infinite;
        }
      `}</style>

      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-gray-900 to-black" />
        <SubtleGrid />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-teal-500/5 to-transparent" />
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/60" />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-3xl font-bold mb-4">
                <span className="text-white font-extrabold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Euler
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-400 to-teal-500 shimmer font-extrabold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  Swap
                </span>
              </h3>
              <p className="text-gray-300 mb-6">
                Maximize your yield potential with automated DeFi strategies. Earn from both lending protocols and AMM trading fees simultaneously.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5 text-teal-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5 text-teal-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.0956Z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5 text-teal-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5 text-teal-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Platform</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-teal-300 transition-colors">Yield Vaults</a></li>
              <li><a href="#" className="text-gray-300 hover:text-teal-300 transition-colors">Liquidity Pools</a></li>
              <li><a href="#" className="text-gray-300 hover:text-teal-300 transition-colors">Automated Strategies</a></li>
              <li><a href="#" className="text-gray-300 hover:text-teal-300 transition-colors">Portfolio Tracker</a></li>
              <li><a href="#" className="text-gray-300 hover:text-teal-300 transition-colors">AMM Trading</a></li>
              <li><a href="#" className="text-gray-300 hover:text-teal-300 transition-colors">Analytics</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-teal-300 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-teal-300 transition-colors">Getting Started</a></li>
              <li><a href="#" className="text-gray-300 hover:text-teal-300 transition-colors">Yield Farming Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-teal-300 transition-colors">Community</a></li>
              <li><a href="#" className="text-gray-300 hover:text-teal-300 transition-colors">Developer API</a></li>
              <li><a href="#" className="text-gray-300 hover:text-teal-300 transition-colors">Protocol Status</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Stay Updated</h4>
            <p className="text-gray-300 mb-4">
              Get the latest DeFi strategies and exclusive yield opportunities delivered to your inbox.
            </p>
            <div className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-900/50 border border-teal-500/30 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:border-teal-500 focus:bg-gray-800/50 transition-all backdrop-blur-sm"
                />
                <button 
                  onClick={handleSubscribe}
                  className="px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-500 text-white font-semibold rounded-r-lg hover:from-teal-700 hover:to-teal-600 transition-all duration-300 hover:scale-105"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-400">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* Support & Contact Section */}
        <div className="border-t border-teal-500/20 pt-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div>
              <h5 className="text-white font-semibold mb-3">Contact Us</h5>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>support@eulerswap.finance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Decentralized & Global</span>
                </div>
              </div>
            </div>

            {/* Support Links */}
            <div>
              <h5 className="text-white font-semibold mb-3">Support</h5>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-gray-300 hover:text-teal-300 transition-colors">Help Center</a>
                <a href="#" className="block text-gray-300 hover:text-teal-300 transition-colors">Contact Support</a>
                <a href="#" className="block text-gray-300 hover:text-teal-300 transition-colors">Report Bug</a>
                <a href="#" className="block text-gray-300 hover:text-teal-300 transition-colors">Smart Contract Audit</a>
              </div>
            </div>

            {/* Legal Links */}
            <div>
              <h5 className="text-white font-semibold mb-3">Legal</h5>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-gray-300 hover:text-teal-300 transition-colors">Privacy Policy</a>
                <a href="#" className="block text-gray-300 hover:text-teal-300 transition-colors">Terms of Service</a>
                <a href="#" className="block text-gray-300 hover:text-teal-300 transition-colors">Risk Disclosure</a>
                <a href="#" className="block text-gray-300 hover:text-teal-300 transition-colors">Protocol Governance</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-teal-500/20 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400">
            © 2025 EulerSwap. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>Built for DeFi yield</span>
           
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;