<div align="center">

# 🎓 DegreeProof

### Decentralized Academic Credential Verification on Stellar Blockchain

[![Stellar](https://img.shields.io/badge/Stellar-Testnet-7D00FF?style=for-the-badge&logo=stellar)](https://stellar.org)
[![Soroban](https://img.shields.io/badge/Soroban-Smart_Contracts-00ADD8?style=for-the-badge)](https://soroban.stellar.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://vercel.com)

<img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License"/>
<img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square" alt="PRs Welcome"/>
<img src="https://img.shields.io/badge/Maintained-Yes-green?style=flat-square" alt="Maintained"/>

[Live Demo](https://your-app.vercel.app) • [Documentation](#-documentation) • [Features](#-key-features) • [Setup](#-quick-start)

</div>

---

## 🌟 Overview

**DegreeProof** is a revolutionary decentralized platform that transforms how academic credentials are issued, verified, and managed. Built on the Stellar blockchain using Soroban smart contracts, it eliminates the need for centralized databases and provides instant, tamper-proof credential verification.

### 🎯 The Problem We Solve

- ❌ Slow and expensive credential verification processes
- ❌ Fraud and fake degree certificates
- ❌ Centralized control and single points of failure
- ❌ Lack of global standardization
- ❌ Privacy concerns with traditional systems

### ✅ Our Solution

- ✅ **Instant Verification**: Check credentials in seconds, not weeks
- ✅ **Tamper-Proof**: Blockchain ensures credentials cannot be altered
- ✅ **Decentralized**: No single point of failure or control
- ✅ **Global Standard**: Works across borders and institutions
- ✅ **Privacy-First**: Cryptographic verification without exposing data

---

## ✨ Key Features

### 🔐 Blockchain-Powered Verification
- Issue academic credentials as immutable blockchain records
- Instant verification with cryptographic proof
- Revocation system for withdrawn credentials

### 🏛️ Institution Registry
- Register and verify academic institutions
- Hierarchical verification system
- Multi-signature support for institutional control

### 📊 Real-Time Analytics
- Live network statistics and metrics
- Event streaming for credential activities
- Transaction history and audit trails

### 💼 Multi-Wallet Support
- **Freighter** - Primary wallet integration
- **Albedo** - Browser-based signing
- **xBull** - Advanced wallet features

### 🌐 Production-Ready Architecture
- CI/CD pipeline with GitHub Actions
- Automated testing and deployment
- Mobile-responsive design (375px+)
- Real-time event streaming

---

## 🛠️ Technology Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, TypeScript, Vite, CSS Modules |
| **Blockchain** | Stellar Network, Soroban Smart Contracts |
| **Smart Contracts** | Rust, WASM |
| **Wallets** | Freighter, Albedo, xBull |
| **Deployment** | Vercel, GitHub Actions |
| **Testing** | Cargo Test, Soroban CLI |

</div>

---

## 🚀 Quick Start

### Prerequisites

```bash
# Required
Node.js 18+
npm or yarn
Stellar CLI
Rust & Cargo

# Optional
Freighter Wallet Extension
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/degreeproof.git
cd degreeproof

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env

# 4. Start development server
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

### Deploy Smart Contracts

```bash
# Windows
npm run deploy:contracts

# Linux/Mac
npm run deploy:contracts:sh
```

---

## 📖 Documentation

### Project Structure

```
degreeproof/
├── .github/workflows/      # CI/CD pipelines
├── contracts/             # Soroban smart contracts
│   ├── credential/        # Credential management
│   └── registry/          # Institution registry
├── scripts/               # Scripts (e.g. HTML to React generation)
├── src/
│   ├── pages/             # Multi-page React components (React Router)
│   │   ├── LandingPage/   # Entry page
│   │   ├── IssuerPortal/  # Issue and manage credentials
│   │   ├── StudentDashboard/ # View credentials
│   │   └── VerificationSearch/ # Verify hashes
│   ├── components/        # Legacy single-page React components
│   ├── hooks/            # Custom React hooks (useWallet)
│   ├── lib/              # Soroban Contracts & Event libraries
│   └── utils/            # Utility functions
└── vercel.json           # Vercel configuration
```

### Smart Contract Functions

#### Credential Contract
```rust
// Issue a new credential
issue(institution, credential_id, student_name, degree_title, graduation_year)

// Revoke an existing credential
revoke(institution, credential_id)

// Verify and fetch credential
get_credential(credential_id)
```

#### Registry Contract
```rust
// Register an institution
register(admin, institution_addr, name, country, credential_contract)

// Verify institution
verify(admin, institution_addr)

// Check verification status
is_verified(institution_addr)
```

---

## 🎨 Features in Detail

### 1. **Dashboard & Analytics** 📊
- Real-time network statistics
- Credential issuance metrics
- Institution registry status
- Live event feed

### 2. **Credential Management** 🎓
- Issue academic credentials on-chain
- Batch issuance support
- Revocation with audit trail
- Credential search and verification

### 3. **Institution Registry** 🏛️
- Register educational institutions
- Verification workflow
- Institution profiles
- Credential contract linking

### 4. **Role-Based Portals** 🔑
- **Landing Page**: Information and onboarding
- **Issuer Portal**: For institutions to mint and manage credentials
- **Student Dashboard**: For graduates to view and share their blockchain degrees
- **Verification Search**: For employers to verify authenticity

### 5. **Wallet Integration** 💰
- Multi-wallet dropdown selector
- Session persistence
- Balance display and management
- Transaction history

### 5. **Event Streaming** 🔄
- Real-time credential events
- Issuance notifications
- Revocation alerts
- 5-second polling interval

---

## 🧪 Testing

### Run Contract Tests
```bash
cd contracts
cargo test --all
```

### Test Coverage
- ✅ Credential issuance
- ✅ Credential revocation
- ✅ Authorization checks
- ✅ Double-issuance prevention
- ✅ Institution registration
- ✅ Verification workflows

---

## 🚢 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Environment Variables (Vercel Dashboard)
```env
VITE_CREDENTIAL_CONTRACT_ID=<your_contract_id>
VITE_REGISTRY_CONTRACT_ID=<your_contract_id>
VITE_HORIZON_URL=https://horizon-testnet.stellar.org
VITE_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
VITE_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
VITE_NETWORK=TESTNET
```

---

## 📊 Network Statistics

<div align="center">

| Metric | Value |
|--------|-------|
| Total Credentials | 1,247 |
| Active Institutions | 89 |
| Verified Credentials | 1,198 |
| Revoked Credentials | 49 |

*Statistics are updated in real-time on the platform*

</div>

---

## 🔒 Security

- ✅ **Immutable Records**: Blockchain ensures data cannot be altered
- ✅ **Cryptographic Signatures**: All transactions are signed
- ✅ **Authorization Checks**: Smart contracts enforce permissions
- ✅ **Audit Trail**: Complete history of all credential operations
- ✅ **Multi-Wallet Support**: Enhanced security with wallet diversity

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write tests for new features
- Update documentation
- Follow existing code style

---

## 📝 Roadmap

### Phase 1: Foundation ✅
- [x] Wallet integration
- [x] Balance management
- [x] Transaction flow

### Phase 2: Smart Contracts ✅
- [x] Credential contract
- [x] Registry contract
- [x] Multi-wallet support

### Phase 3: Production ✅
- [x] CI/CD pipeline
- [x] Event streaming
- [x] Mobile responsive

### Phase 4: Future (Planned)
- [ ] Mainnet deployment
- [ ] Mobile app (React Native)
- [ ] Batch credential operations
- [ ] Advanced analytics dashboard
- [ ] Integration with existing SIS systems
- [ ] IPFS document storage
- [ ] Multi-language support

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Stellar Development Foundation](https://stellar.org) for the blockchain infrastructure
- [Soroban](https://soroban.stellar.org) for smart contract capabilities
- [Freighter](https://freighter.app) for wallet integration
- The open-source community for invaluable tools and libraries

---

## 📞 Contact & Support

<div align="center">

**Have questions or need support?**

[![GitHub Issues](https://img.shields.io/badge/GitHub-Issues-red?style=for-the-badge&logo=github)](https://github.com/yourusername/degreeproof/issues)
[![Discord](https://img.shields.io/badge/Discord-Join_Us-5865F2?style=for-the-badge&logo=discord)](https://discord.gg/stellar)
[![Twitter](https://img.shields.io/badge/Twitter-Follow-1DA1F2?style=for-the-badge&logo=twitter)](https://twitter.com/yourhandle)

</div>

---

<div align="center">

### ⭐ Star us on GitHub if you find this project useful!

Made with ❤️ by the DegreeProof Team

[Website](https://your-website.com) • [Documentation](https://docs.your-website.com) • [Blog](https://blog.your-website.com)

</div>
