# Alpaca FinTech Automation Framework 

### 🟢 [View Live Test Report](https://dufoo.github.io/Alpaca-FinTech-Automation/)

*Note: This repository serves as an older demonstration framework, showcasing foundational automation concepts, structural guidelines, and best practices.*

This repository contains a professional automation framework built with **Playwright** and **TypeScript** designed to verify financial trading systems. 

## Project Overview
This framework is engineered to validate critical operations within a trading environment. It demonstrates a scalable "DevSecOps" approach to quality engineering through:
- **API Testing:** Comprehensive validation of account and market data.
- **Integration Testing:** Verification of order execution and position management.
- **Security Awareness:** Auditing of security headers (e.g., HSTS, Request-ID) and secure handling of environment variables.
- **CI/CD Pipeline:** Fully automated test execution and reporting via GitHub Actions.

## Architecture
The project follows a robust, multi-layered testing strategy:
1. **API Layer:** High-speed logic verification utilizing encapsulated API clients.
2. **Security Layer:** Verification of HSTS and standard FinTech compliance headers.
3. **Infrastructure:** CI/CD pipeline integration and environment state management.

## Security & CI/CD Strategy
This framework employs a hybrid execution strategy to balance comprehensive automation with strict security requirements (e.g., MFA):

1. **API & Security Layers:** 100% automated within GitHub Actions pipelines. Environment variables and API keys are securely managed via encrypted GitHub Secrets.
2. **UI Layer:** Implements a strict **Page Object Model (POM)** and **Authentication State Management**. 
   - **Local Execution:** UI tests run locally utilizing a saved session state (`auth.json`) to seamlessly bypass manual 2FA after initial authentication.
   - **CI/CD Logic:** UI tests are intentionally configured to be skipped in GitHub Actions to maintain 2FA integrity. This accurately mirrors real-world compliance scenarios in highly regulated sectors such as Banking, MedTech, and Defense.

## How to Run
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file based on `.env.example` using your Alpaca Paper Trading credentials.
4. Execute the test suite: `npx playwright test`.