# PowerShell Deployment script for Stellar Soroban contracts
# Make sure you have stellar-cli installed: https://developers.stellar.org/docs/tools/developer-tools

$ErrorActionPreference = "Stop"

Write-Host "🚀 DegreeProof Contract Deployment Script" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Check if stellar-cli is installed
if (-not (Get-Command stellar -ErrorAction SilentlyContinue)) {
    Write-Host "❌ stellar-cli is not installed. Please install it first:" -ForegroundColor Red
    Write-Host "   cargo install --locked stellar-cli --features opt" -ForegroundColor Yellow
    exit 1
}

# Configuration
$NETWORK = "testnet"
$IDENTITY = if ($env:DEPLOYER_IDENTITY) { $env:DEPLOYER_IDENTITY } else { "deployer" }

Write-Host ""
Write-Host "📋 Configuration:" -ForegroundColor Green
Write-Host "   Network: $NETWORK"
Write-Host "   Identity: $IDENTITY"
Write-Host ""

# Build contracts
Write-Host "🔨 Building contracts..." -ForegroundColor Yellow
Set-Location contracts
stellar contract build
Set-Location ..

# The built and optimized wasm files will be at contracts/target/wasm32v1-none/release/*.wasm

# Deploy Credential Contract
Write-Host ""
Write-Host "📤 Deploying Credential Contract..." -ForegroundColor Yellow
$CREDENTIAL_ID = stellar contract deploy `
    --wasm contracts/target/wasm32v1-none/release/credential.wasm `
    --source $IDENTITY `
    --network $NETWORK

Write-Host "✅ Credential Contract deployed!" -ForegroundColor Green
Write-Host "   Contract ID: $CREDENTIAL_ID"

# Deploy Registry Contract
Write-Host ""
Write-Host "📤 Deploying Registry Contract..." -ForegroundColor Yellow
$REGISTRY_ID = stellar contract deploy `
    --wasm contracts/target/wasm32v1-none/release/registry.wasm `
    --source $IDENTITY `
    --network $NETWORK

Write-Host "✅ Registry Contract deployed!" -ForegroundColor Green
Write-Host "   Contract ID: $REGISTRY_ID"

# Save contract IDs to .env file
Write-Host ""
Write-Host "💾 Saving contract IDs to .env..." -ForegroundColor Yellow
@"
VITE_CREDENTIAL_CONTRACT_ID=$CREDENTIAL_ID
VITE_REGISTRY_CONTRACT_ID=$REGISTRY_ID
VITE_HORIZON_URL=https://horizon-testnet.stellar.org
VITE_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
VITE_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
VITE_NETWORK=TESTNET
"@ | Out-File -FilePath .env -Encoding utf8

Write-Host ""
Write-Host "✨ Deployment Complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Credential Contract: $CREDENTIAL_ID"
Write-Host "Registry Contract: $REGISTRY_ID"
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Update your frontend .env file with these contract IDs"
Write-Host "2. Test the contracts with: stellar contract invoke --id <CONTRACT_ID> ..."
Write-Host "3. Start your frontend: npm run dev"
