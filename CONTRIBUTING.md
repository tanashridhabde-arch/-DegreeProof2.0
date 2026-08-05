# Contributing to DegreeProof

First off, thank you for considering contributing to DegreeProof! It's people like you that make DegreeProof such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible using our bug report template.

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please use our feature request template and provide:

- A clear and descriptive title
- A detailed description of the proposed enhancement
- Explain why this enhancement would be useful
- List any alternative solutions you've considered

### Pull Requests

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Development Process

### Setup Development Environment

```bash
# Clone your fork
git clone https://github.com/your-username/degreeproof.git
cd degreeproof

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building Contracts

```bash
cd contracts
cargo build --target wasm32-unknown-unknown --release
```

### Running Tests

```bash
# Frontend
npm test

# Contracts
cd contracts
cargo test --all
```

### Code Style

- Use TypeScript for all new frontend code
- Follow the existing code style
- Use meaningful variable names
- Write clear comments for complex logic
- Keep functions small and focused

### Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

Example:
```
feat: Add batch credential issuance

- Implement batch issue function in contract
- Add UI for batch operations
- Update tests

Closes #123
```

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions or changes

Example: `feature/batch-credentials`

## Project Structure

```
degreeproof/
├── src/               # Frontend source code
├── contracts/         # Smart contracts (Rust)
├── scripts/          # Deployment scripts
├── .github/          # GitHub templates and workflows
└── docs/             # Documentation
```

## Smart Contract Development

### Guidelines

1. Always write tests for new contract functions
2. Follow Rust best practices
3. Use descriptive error messages
4. Document public functions
5. Consider gas optimization

### Testing Contracts

```bash
cd contracts
cargo test --all -- --nocapture
```

## Frontend Development

### Guidelines

1. Use functional components with hooks
2. Keep components small and reusable
3. Use CSS Modules for styling
4. Handle loading and error states
5. Make components mobile-responsive

### Component Structure

```typescript
// ComponentName.tsx
import styles from './ComponentName.module.css';

interface ComponentNameProps {
  // props
}

export function ComponentName({ ...props }: ComponentNameProps) {
  // component logic
}
```

## Documentation

- Update README.md if you change functionality
- Add JSDoc comments for complex functions
- Update DEPLOYMENT.md for deployment changes
- Keep documentation in sync with code

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

## Recognition

Contributors will be recognized in our README.md file.

Thank you for contributing! 🎉
