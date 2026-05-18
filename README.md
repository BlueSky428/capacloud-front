# CapaCloud - Decentralized GPU Computing Platform

> **Democratizing GPU access through blockchain-powered decentralized computing**

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Solana](https://img.shields.io/badge/Solana-Mainnet-14F46B)](https://solana.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red)](LICENSE)

---

## 📋 Executive Summary

**CapaCloud** is a decentralized GPU rental marketplace built on the Solana blockchain, enabling on-demand access to GPU computing power with full root control. By creating a peer-to-peer network of distributed GPU resources, CapaCloud democratizes access to high-performance computing while eliminating traditional infrastructure barriers.

### Key Highlights

- **🌐 Decentralized Marketplace**: Peer-to-peer GPU rental platform with no single point of failure
- **🔐 Full Root Access**: Complete control over rented GPUs with SSH access - install any software, run any workload
- **⚡ Solana-Powered**: Trustless transactions and automated payments via smart contracts
- **💰 USDT-Based Payments**: Seamless hourly billing in stablecoins
- **🌱 Climate-Friendly**: 99% less carbon footprint through distributed, ambient-cooled infrastructure
- **🚀 Production-Ready**: Fully functional MVP with real-time billing and monitoring

---

## 🎯 Problem Statement

The GPU computing market faces significant challenges:

### Traditional Cloud Providers
- **High Costs**: Premium pricing with long-term commitments
- **Limited Flexibility**: Restricted environments and vendor lock-in
- **Geographic Limitations**: Centralized data centers with high latency
- **Environmental Impact**: Massive cooling infrastructure consuming enormous energy

### Individual GPU Owners
- **Underutilized Assets**: GPUs sitting idle 80-90% of the time
- **No Monetization**: No easy way to generate income from expensive hardware
- **Technical Barriers**: Complex setup and maintenance requirements

### Researchers & Developers
- **Cost Barriers**: High upfront costs for AI/ML training and rendering projects
- **Access Restrictions**: Limited GPU availability during peak demand
- **Vendor Lock-in**: Dependency on specific cloud provider ecosystems

---

## 💡 Solution

CapaCloud transforms the GPU computing landscape by:

### For Users (Renters)
✅ **On-Demand Access**: Rent GPUs instantly with no long-term commitments  
✅ **Full Control**: Complete root access via SSH - run any workload, install any software  
✅ **Pay-as-You-Go**: Hourly billing - stop anytime, billing stops automatically  
✅ **Transparent Pricing**: Compare prices and specs from multiple providers  
✅ **Global Network**: Access GPUs distributed worldwide for low latency  

### For Providers
✅ **Monetize Idle GPUs**: Generate passive income from underutilized hardware  
✅ **Zero Commitment**: Rent out GPUs when available, pause anytime  
✅ **Automated Payments**: Receive USDT automatically as rentals occur  
✅ **Simple Setup**: One-command installation with minimal configuration  
✅ **Real-Time Earnings**: Track revenue and performance metrics in real-time  

---

## 🏗️ Technology Architecture

### Core Components

#### 1. **Frontend Application** (Next.js 16)
- Modern React-based user interface
- Solana Wallet Adapter integration (Phantom, Solflare, etc.)
- Real-time dashboard and monitoring
- Responsive design with Tailwind CSS

#### 2. **Backend API** (Next.js API Routes)
- RESTful API for all operations
- Wallet-based authentication (no passwords required)
- Rental management and scheduling
- Balance and transaction tracking
- Real-time status monitoring

#### 3. **Blockchain Layer** (Solana)
- Smart contracts for automated payments
- Wallet-based user authentication
- Trustless transaction processing
- USDT payment integration

#### 4. **Database** (MongoDB)
- User accounts and settings
- Machine metadata and availability
- Rental sessions and history
- Transaction records and audit logs

#### 5. **GPU Worker Nodes** (Python/Docker)
- Lightweight worker daemon on provider machines
- Docker container management with GPU passthrough
- SSH server for user access
- Heartbeat system for health monitoring
- Automatic container lifecycle management

### System Flow

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Frontend  │─────▶│   Backend    │─────▶│  Database   │
│  (Next.js)  │      │   (API)      │      │  (MongoDB)  │
└─────────────┘      └──────────────┘      └─────────────┘
       │                     │                      │
       │                     │                      │
       ▼                     ▼                      ▼
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Solana    │      │  GPU Worker  │      │  User SSH   │
│ Blockchain  │      │   (Docker)   │      │   Access    │
└─────────────┘      └──────────────┘      └─────────────┘
```

---

## 🔄 Workflow

### User Workflow

1. **Wallet Connection**
   - Connect Solana wallet (Phantom, Solflare, etc.)
   - Platform authenticates via wallet signature
   - No account registration or passwords required

2. **Balance Management**
   - Top up USDT balance in wallet
   - Funds stored in escrow for rentals
   - Transparent transaction history

3. **GPU Selection**
   - Browse available GPUs with filters (specs, price, location)
   - Compare prices and performance metrics
   - View provider ratings and reliability stats

4. **Rental Creation**
   - Select GPU and create rental
   - Backend allocates resources and updates machine status
   - Receive SSH connection credentials instantly

5. **SSH Access**
   - Full root access to Docker container with GPU passthrough
   - Install any software, drivers, or frameworks
   - Run workloads (AI training, rendering, mining, etc.)

6. **Automatic Billing**
   - Hourly charges deducted automatically from balance
   - Real-time cost tracking and notifications
   - Rental stops automatically if balance insufficient

7. **Rental Management**
   - End rental anytime - billing stops immediately
   - Access console, metrics, and SSH keys
   - View complete rental history

### Provider Workflow

1. **Worker Installation**
   - Install lightweight Python worker script
   - Configure with Provider Account ID
   - Worker registers with backend automatically

2. **GPU Registration**
   - Worker detects GPU hardware automatically
   - Provider completes registration (IP, SSH port, pricing)
   - Machine appears in marketplace as available

3. **Resource Sharing**
   - Worker monitors GPU availability
   - Creates isolated Docker containers per rental
   - Manages SSH access and security

4. **Earnings**
   - Receive USDT payments automatically as rentals occur
   - Real-time earnings dashboard
   - Detailed transaction history

---

## 💼 Business Model

### Revenue Streams

1. **Platform Fee** (Optional)
   - Small percentage fee on transactions
   - Supports platform development and maintenance

2. **Premium Features** (Future)
   - Advanced monitoring and analytics
   - Priority support and SLA guarantees
   - Reserved capacity and spot pricing

### Value Propositions

- **For Users**: 30-50% cost savings vs. traditional cloud providers
- **For Providers**: Monetize idle GPU resources, 10-30% ROI potential
- **For Platform**: Network effects, growing ecosystem value

---

## 🚀 Competitive Advantages

| Feature | CapaCloud | Traditional Cloud | Other Decentralized |
|---------|-----------|-------------------|---------------------|
| **Full Root Access** | ✅ Yes | ❌ Limited | ⚠️ Varies |
| **Pay-per-Hour** | ✅ Yes | ⚠️ Reserved instances | ⚠️ Varies |
| **No Vendor Lock-in** | ✅ Yes | ❌ No | ✅ Yes |
| **Global Distribution** | ✅ Yes | ⚠️ Limited regions | ⚠️ Limited |
| **Blockchain Payments** | ✅ Yes | ❌ No | ✅ Yes |
| **Environmental Impact** | ✅ 99% lower | ❌ High | ⚠️ Varies |
| **Easy Provider Onboarding** | ✅ One command | ❌ Complex | ⚠️ Varies |

---

## 🎯 Use Cases

### 1. **AI/ML Training & Inference**
- Deep learning model training
- Large Language Model (LLM) fine-tuning
- Real-time inference pipelines
- Research and experimentation

### 2. **3D Rendering & Animation**
- VFX and animation production
- Architectural visualization
- Product rendering
- Scientific visualization

### 3. **Video Processing**
- High-speed video transcoding
- Video compression and encoding
- Real-time streaming processing
- Content creation workflows

### 4. **Cryptocurrency Mining**
- GPU mining operations
- Mining pool management
- Algorithm experimentation
- Proof-of-work operations

### 5. **Scientific Computing**
- Computational simulations
- Data analysis and processing
- Parallel computing workloads
- Research computing

---

## 🌱 Environmental Impact

**CapaCloud's distributed model achieves 99% lower carbon footprint per compute unit compared to traditional data centers.**

### Key Factors:
- **Ambient Air Cooling**: GPUs cooled by local environment vs. massive cooling infrastructure
- **Distributed Infrastructure**: No need for centralized data center facilities
- **Resource Efficiency**: Better utilization of existing hardware (vs. dedicated infrastructure)
- **Geographic Distribution**: Compute closer to demand, reducing transmission losses

---

## 📊 Market Opportunity

### Total Addressable Market (TAM)
- **Global GPU Cloud Market**: $65B+ (2024), growing at 40% CAGR
- **AI/ML Computing Market**: $100B+ (2024), 50%+ CAGR
- **Blockchain Infrastructure**: $30B+ (2024), 60%+ CAGR

### Target Segments
- **AI/ML Researchers & Startups**: Cost-sensitive, need flexible access
- **Content Creators**: 3D artists, video editors, streamers
- **Individual GPU Owners**: Gamers, crypto miners with idle hardware
- **Small-Medium Enterprises**: Companies needing occasional GPU resources

---

## 🛠️ Technical Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **UI**: React 19, Tailwind CSS 4
- **Wallet**: Solana Wallet Adapter
- **Icons**: Lucide React

### Backend
- **Runtime**: Node.js 18+
- **API**: Next.js API Routes
- **Database**: MongoDB 6
- **Authentication**: Wallet signature verification

### Infrastructure
- **Blockchain**: Solana (Mainnet/Devnet)
- **Payments**: USDT (SPL Token)
- **Worker**: Python 3.x, Docker, NVIDIA Container Toolkit
- **SSH**: ssh2 protocol

### DevOps
- **Deployment**: Vercel (Frontend/API)
- **Monitoring**: Real-time status tracking
- **Cron Jobs**: Hourly payment processing

---

## 📦 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** or **yarn** package manager
- **MongoDB** database (local or cloud)
- **Solana Wallet** (Phantom, Solflare, etc.)
- **USDT** balance (for rentals)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd capacloud-front

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run development server
npm run dev
```

### Environment Configuration

Create a `.env.local` file:

```env
# Solana Network Configuration
NEXT_PUBLIC_SOLANA_NETWORK=mainnet
NEXT_PUBLIC_SOLANA_RPC_ENDPOINT=https://api.mainnet-beta.solana.com

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/capacloud

# API Secrets (for cron jobs)
CRON_SECRET=your-secret-key
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 🔐 Security

### Authentication
- **Wallet-based**: No passwords, no credential management
- **Message Signing**: Cryptographic proof of wallet ownership
- **Session Management**: Secure token-based sessions

### Access Control
- **SSH Keys**: Public key authentication for GPU access
- **Container Isolation**: Docker-based resource isolation
- **Network Security**: Encrypted communications (TLS/HTTPS)

### Financial Security
- **Smart Contracts**: Trustless payment execution
- **Escrow System**: Funds held securely until service delivery
- **Audit Trails**: Complete transaction history on blockchain

---

## 📈 Roadmap

### Phase 1: MVP (Current) ✅
- [x] User and provider onboarding
- [x] GPU registration and discovery
- [x] Rental management with SSH access
- [x] Hourly billing and payments
- [x] Real-time monitoring

### Phase 2: Enhancement (In Progress)
- [ ] Advanced GPU filtering and recommendations
- [ ] Multi-GPU rental support
- [ ] Reserved capacity options
- [ ] Provider reputation system
- [ ] Mobile application

### Phase 3: Scale
- [ ] Auto-scaling for ML workloads
- [ ] Marketplace for pre-configured environments
- [ ] Enterprise features (SLA, support)
- [ ] Global CDN and edge computing
- [ ] Cross-chain payment support

### Phase 4: Platform
- [ ] API marketplace and integrations
- [ ] White-label solutions
- [ ] Decentralized governance (DAO)
- [ ] Advanced analytics and insights

---

## 🤝 Contributing

CapaCloud welcomes contributions from the community. Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Areas for Contribution
- Frontend UI/UX improvements
- Backend API enhancements
- Smart contract development
- Documentation
- Testing and QA
- Provider tools and utilities

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 📞 Contact & Support

- **Website**: [Coming Soon]
- **Documentation**: `/docs` (in-app)
- **Support**: `/help` (in-app)
- **Email**: [Contact Information]

---

## 🙏 Acknowledgments

Built with ❤️ by the CapaCloud team, powered by:
- [Solana](https://solana.com/) - High-performance blockchain
- [Next.js](https://nextjs.org/) - React framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Docker](https://www.docker.com/) - Containerization
- And the open-source community

---

**CapaCloud** - *Democratizing GPU computing for everyone*

---
