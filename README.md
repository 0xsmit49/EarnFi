# EarnFi

EarnFi, a consumer-friendly DeFi app that lets users earn yield on stablecoins — safely, transparently, and efficiently — powered entirely by EulerSwap.

---

# Problem — What’s Broken in DeFi Yield Today



DeFi yield strategies have matured, but user experience and capital efficiency remain fragmented:

#### a. Capital Fragmentation

* Liquidity providers (LPs) are forced to choose between lending, swapping, and staking.
* Assets locked in AMMs **don’t earn lending interest**, and assets in lending protocols **don’t generate swap fees**.
* This causes **idle capital**, inefficient yield, and poor composability.

#### b. Impermanent Loss + Risk

* AMMs expose LPs to **impermanent loss (IL)** — especially with volatile or soft-pegged assets.
* Most users are unaware of how IL impacts long-term earnings.
* There’s no native IL protection for users in most vaults.

#### c. Complexity & UX Barriers

* DeFi yields are often hidden behind confusing LP positions, fragmented protocols, or DAO proposals.
* Users don’t understand the underlying strategy or risk.
* No standard way to visualize “what you’re earning from and why.”

***
---

# Our Solution — EarnFi

We’ve built **EarnFi**, a unified, risk-aware vault platform that lets users earn safe, passive yield with full transparency.

<img width="3048" height="1499" alt="Screenshot from 2025-07-07 20-39-13" src="https://github.com/user-attachments/assets/2b0c40f6-b871-48cc-bd20-4e647060ab58" />


Why Choose EarnFi?

<img width="3048" height="1475" alt="Screenshot from 2025-07-07 20-43-54" src="https://github.com/user-attachments/assets/9c17c44c-abaa-4075-9923-924ad28bae8a" />


Each vault in EarnFi is designed to:

#### a. Unify Capital Use

* User deposits are used simultaneously for:
  * Lending (Euler credit vaults)
  * Swap liquidity (EulerSwap AMM)
  * Collateral for hedging (delta-neutral strategies)
* This removes fragmentation and increases yield per unit of capital.

#### b. Tailor Risk with Curve Logic

* Each vault uses a **programmable AMM curve** (via EulerSwap) matched to the token pair.
* Soft-peg assets use **asymmetric curves** to defend price floors.
* Stable pairs use **flat curves** for low slippage and high fee capture.

#### c. Offer Impermanent Loss Protection

* Users can toggle **Safe Mode**, which activates a **delta-neutral hedge** using Euler lending.
* The vault auto-borrows the counter-asset to offset exposure.
* This creates **yield with minimal directional risk**.

#### d. Show Real Transparency

* Users see projected APY (split by lending/swap fees), IL risk, collateral ratio, and performance trends — all in one place.

***
---
# How It Works — Vault Architecture + Strategy

EarnFi vaults are smart, composable, and automated:

#### a. Deposit

* User deposits stablecoins (e.g., USDC) into a selected vault.
* Vault shares are minted, representing the user’s position.

#### b. Yield Engine

* Capital is split across:
  * Euler lending vaults (earning base interest)
  * EulerSwap AMM pool (earning swap fees)
  * Euler borrow position (if Safe Mode is enabled)

#### c. Curve Logic

* Vaults instantiate AMM pools via **EulerSwap’s v4-compatible factory**.
* Parameters like `cx`, `cy`, `x0`, `y0` are chosen to shape the AMM curve.
* This lets vaults respond to specific market behaviors — such as defending soft pegs or absorbing volatility.

#### d. Safe Mode (Delta-Neutral)

* The vault calculates the value of the LP exposure and borrows the mirrored position using Euler’s lending market.
* Vaults periodically rebalance to maintain delta-neutrality.

#### e. Vault Health & Risk Tracking

<img width="3048" height="1499" alt="Screenshot from 2025-07-07 20-41-18" src="https://github.com/user-attachments/assets/ba756203-978d-46e4-88be-9edcb972c6c3" />


* Vaults continuously monitor:
  * Utilization rates
  * Collateral ratios
  * Borrow limits
  * Slippage zones
* Users are shown a **“Vault Health” indicator** (green/yellow/red) to understand safety at a glance.

***
---

# Features Implemented

We focused on **delivering value through UX and composability**, while integrating core EulerSwap features.

#### A. Vault Explorer (Multi-Vault Overview)

* Displays all available vaults with real-time metrics:
  * Token pair, APY (split), TVL, depositors, vault age
  * Curve type: flat, asymmetric, volatility sink
  * Safe Mode status, insurance badge, audit score
* Users can filter vaults by token, risk profile, strategy, or tags.
* Responsive card layout built using Tailwind and Shadcn components.

<img width="3048" height="1499" alt="Screenshot from 2025-07-07 20-43-10" src="https://github.com/user-attachments/assets/d6bc4b11-2ca9-4521-8ee6-ce1c18c19100" />


#### B. Vault Page (Deposit + Strategy Interface)

* For each vault:
  * Users can deposit a token, preview APY, toggle Safe Mode
  * Real-time vault share preview
  * Live AMM curve visualizer (based on deployed parameters)
  * Risk explainer: collateral ratio, IL risk, last rebalance
  * APY breakdown (lending vs. swap income)
* The design focuses on **transparency, simplicity, and actionability**.
*

   <img width="3048" height="1475" alt="Screenshot from 2025-07-07 20-43-54" src="https://github.com/user-attachments/assets/933e6c69-b19b-4c6f-937c-7a33e531a72f" />


***
---
# Protocol Economics, Scalability & Future Vision

#### 1. **Capital Efficiency**

EarnFi vaults are designed to maximize yield **per dollar deposited**, thanks to EulerSwap’s unified architecture:

| Traditional DeFi                       | EarnFi Vaults with EulerSwap                              |
| -------------------------------------- | --------------------------------------------------------- |
| Lending earns base interest only       | EarnFi earns lending + swap fees + optional hedging gains |
| LP capital is siloed                   | Capital is reused across lending + AMM + collateral       |
| Separate strategies = separate capital | Single strategy = stacked yield layers                    |

This model allows **the same asset** (e.g. USDC) to work **3x harder** without increasing user complexity.

***

#### &#x20;2. **Sustainable Revenue Model**

EarnFi vaults charge **performance and management fees**:

* **Performance Fee** (e.g. 10–15%) is charged only on yield earned
* **Management Fee** (e.g. 0.3–1%) is annualized and collected from vault AUM
* Optional: Fee split with Euler DAO or vault creators (future incentive model)

> These fees can support long-term protocol revenue, DAO growth, and incentivize safe vault creation.

***

#### &#x20;3. **Scalability Path**

EarnFi can scale across:

**a. Chains**

* Deploy on any chain with EulerSwap hooks or fallback factory (e.g. Ethereum, Base, Polygon)
* Vault templates are chain-agnostic and modular

**b. Strategies**

* Add new vault types using:
  * Custom curve presets
  * Dynamic rebalancing rules
  * Multi-asset lending pools

**c. Users**

* Designed for both:
  * Passive stablecoin holders (consumer-grade)
  * Advanced DeFi users (hedge controls, curve config, analytics)

***

#### &#x20;4. **Composability & DeFi Integration**

* Vault tokens can be used as **collateral**, staked, or LP’d in other protocols
* Yield data exposed via API or subgraph for dashboards (e.g. Zapper, DeBank)
* Future integrations:
  * Use vaults as building blocks in aggregators
  * Plug into governance yield routers or vault routers

***

#### &#x20;5. **Future Vision**

> We envision EarnFi as the **go-to yield platform** for on-chain, risk-aware DeFi users — powered by EulerSwap.

Planned extensions include:

* **Vault Creation Studio** – Launch strategies with visual curve config
* **Dynamic Curve Vaults** – Auto-adjusting based on volatility/oracle feeds
* **Vault DAO Governance** – Community-curated vaults, strategy voting, and fee allocation
* **Insurance Fund & Risk Scoring** – Protocol-level protection for stable vaults

***
---

# RoadMap

#### **Phase 1 – Mainnet Launch & Core Product Release (Weeks 1–4)**

**Goal:** Launch a secure, user-ready DeFi yield product on a supported EVM chain.

* Deploy 2–3 vaults on **Base or Ethereum**, using EulerSwap's Uniswap v4-compatible factory:
  * `USDC / USDT` — flat peg curve, delta-neutral
  * `GHO / USDC` — asymmetric peg defender curve
  * `crvUSD / DAI` — volatility sink vault
* Finalize smart contracts for vault logic, strategy execution, and Safe Mode toggles
* Launch public front end with wallet integration, deposit flow, and live APY tracking
* Integrate basic analytics: APY breakdown, TVL, vault share, and risk metrics
* Implement contract-level tests and basic internal audits

***

#### **Phase 2 – User Growth, Security, and UX Expansion (Weeks 5–8)**

**Goal:** Build trust, expand reach, and improve safety.

* Engage with security partners for **code review and audit** of vault strategy logic
* Launch **documentation**, vault tutorials, and onboarding guides
* Integrate **Safe Mode education tooltips** in the UI to explain delta-hedging and IL protection
* Track daily earnings via UI: “You earned $X this week from Lending + Swaps”

***

#### **Phase 3 – Strategy Expansion & Governance-Ready Infrastructure (Weeks 9–12)**

**Goal:** Expand strategy variety and enable modular strategy deployment.

* Launch new strategy types with programmable curve presets:
  * `wstETH / ETH` — LST convergence curve
  * `FRAX / USDT` — unhedged algorithmic stablecoin vault
* Create **strategy template modules**: vaults that inherit core logic but customize curve + risk

---
