import IconContainer from "@workspace/ui/components/ui/floating-dock";
import { useMotionValue } from "motion/react";
import { IconHome, IconMedal, IconLayoutDashboard } from "@tabler/icons-react";
import WalletConnector from "./WalletConnect";

export default function MyCustomComponent() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="w-screen flex items-center justify-center py-4">
      <div
        className="relative flex items-center bg-gradient-to-r from-slate-900/95 via-gray-900/95 to-slate-900/95 backdrop-blur-lg border border-orange-500/20 rounded-2xl max-w-7xl w-full px-8 py-6 shadow-2xl"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        style={{
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 50%, rgba(15, 23, 42, 0.95) 100%)",
          boxShadow: "0 8px 32px rgba(20, 184, 166, 0.25), 0 4px 16px rgba(251, 146, 60, 0.15), 0 0 0 1px rgba(20, 184, 166, 0.1)",
          border: "1px solid rgba(251, 146, 60, 0.2)"
        }}
      >
        {/* Brand Title (Left side) */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col text-left">
        <span
  style={{
    fontFamily: "Holtwood One SC, serif",
    fontSize: "2rem",
    letterSpacing: "0.15rem",
    lineHeight: "1",
  }}
>
  <span style={{ color: "white" }}>Earn</span>
  <span style={{ color: "#14b8a6" }}>Fi</span>
</span>

          <span 
            className="text-xs mt-1 tracking-wider font-medium"
            style={{
              color: "rgba(148, 163, 184, 0.8)", // Muted text
              textShadow: "0 1px 2px rgba(0, 0, 0, 0.3)"
            }}
          >
            YIELD ENGINE
          </span>
        </div>

        {/* WalletConnector (Right side) */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2">
          <WalletConnector />
        </div>

      

      
       
      </div>
    </div>
  );
}