#!/bin/bash

# Deployment script for Stellar Soroban contracts
# Make sure you have stellar-cli installed: https://developers.stellar.org/docs/tools/developer-tools

set -e

echo "🚀 DegreeProof Contract Deployment Script"
echo "=========================================="

# Check if stellar-cli is installed
if ! command -v stellar &> /dev/null; then
    echo "❌ stellar-cli is not installed. Please install it first:"
    echo "   cargo install --locked stellar-cli --features opt"
    exit 1
fi

# Configuration
NETWORK="testnet"
IDENTITY="${DEPLOYER_IDENTITY:-deployer}"

echo ""
echo "📋 Configuration:"
echo "   Network: $NETWORK"
echo "   Identity: $IDENTITY"
echo ""

# Build contracts
echo "🔨 Building contracts..."
cd contracts
cargo build --target wasm32-unknown-unknown --release
cd ..

# Optimize WASMs (optional but recommended)
echo "⚙️  Optimizing WASM files..."
stellar contract optimize \
    --wasm contracts/target/wasm32-unknown-unknown/release/credential.wasm

stellar contract optimize \
    --wasm contracts/target/wasm32-unknown-unknown/release/registry.wasm

# Deploy Credential Contract
echo ""
echo "📤 Deploying Credential Contract..."
CREDENTIAL_ID=$(stellar contract deploy \
    --wasm contracts/target/wasm32-unknown-unknown/release/credential.wasm \
    --source $IDENTITY \
    --network $NETWORK)

echo "✅ Credential Contract deployed!"
echo "   Contract ID: $CREDENTIAL_ID"

# Deploy Registry Contract
echo ""
echo "📤 Deploying Registry Contract..."
REGISTRY_ID=$(stellar contract deploy \
    --wasm contracts/target/wasm32-unknown-unknown/release/registry.wasm \
    --source $IDENTITY \
    --network $NETWORK)

echo "✅ Registry Contract deployed!"
echo "   Contract ID: $REGISTRY_ID"

# Save contract IDs to .env file
echo ""
echo "💾 Saving contract IDs to .env..."
cat > .env << EOF
VITE_CREDENTIAL_CONTRACT_ID=$CREDENTIAL_ID
VITE_REGISTRY_CONTRACT_ID=$REGISTRY_ID
VITE_HORIZON_URL=https://horizon-testnet.stellar.org
VITE_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
VITE_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
VITE_NETWORK=TESTNET
EOF

echo ""
echo "✨ Deployment Complete!"
echo "=========================================="
echo "Credential Contract: $CREDENTIAL_ID"
echo "Registry Contract: $REGISTRY_ID"
echo ""
echo "Next steps:"
echo "1. Update your frontend .env file with these contract IDs"
echo "2. Test the contracts with: stellar contract invoke --id <CONTRACT_ID> ..."
echo "3. Start your frontend: npm run dev"
