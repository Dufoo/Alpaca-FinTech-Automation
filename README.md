# Alpaca FinTech Automation Framework 

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

## How to Run
1. Clone the repo.
2. Run `npm install`.
3. Create a `.env` file based on `.env.example` with your Alpaca Paper Trading keys.
4. Run tests: `npx playwright test`.

---
*Note: This project is part of a transition into Senior Quality Engineering, leveraging 15 years of risk analysis experience from the futures markets.*