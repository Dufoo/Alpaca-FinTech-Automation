# Alpaca FinTech Automation Framework 

### 🟢 [View Live Test Report](https://dufoo.github.io/Alpaca-FinTech-Automation/)

This repository contains a professional automation framework built with **Playwright** and **TypeScript** for verifying financial trading systems.

## Prosjektoversikt (Norsk)
Dette rammeverket er utviklet for å validere kritiske operasjoner i et trading-miljø. Det demonstrerer en "DevSecOps"-tilnærming til kvalitetssikring gjennom:
- **API Testing:** Validering av konto- og markedsdata.
- **Integration Testing:** Verifisering av ordreutførelse og posisjonsstyring.
- **Security Awareness:** Kontroll av sikkerhetshoder (HSTS, Request-ID) og sikker håndtering av miljøvariabler.
- **CI/CD:** Automatisk testkjøring via GitHub Actions.

## Architecture
The project follows a multi-layer testing strategy:
1. **API Layer:** Fast logic verification using encapsulated API clients.
2. **Security Layer:** Verification of HSTS and standard FinTech headers.
3. **Infrastructure (In Progress):** CI/CD integration and environment management.

## Security & CI/CD Strategy
This framework employs a hybrid execution strategy to balance automation with high security requirements (MFA):

1. **API & Security Layers:** 100% automated in GitHub Actions. Environment variables and API keys are managed via encrypted GitHub Secrets.
2. **UI Layer:** Utilizes **Page Object Model (POM)** and **Authentication State**. 
   - **Local Execution:** UI tests run locally using a saved session (`auth.json`) to bypass manual 2FA after the initial login.
   - **CI/CD Logic:** UI tests are intentionally skipped in GitHub Actions to maintain 2FA integrity. This mirrors real-world scenarios in highly regulated sectors like Banking and Defense.

## How to Run
1. Clone the repo.
2. Run `npm install`.
3. Create a `.env` file based on `.env.example` with your Alpaca Paper Trading keys.
4. Run tests: `npx playwright test`.


---
*Note: This project is part of a transition into Senior Quality Engineering, leveraging 15 years of risk analysis experience from the futures markets.*