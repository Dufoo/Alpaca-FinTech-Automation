import { Locator, Page, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly portfolioHeader: Locator;
  readonly balanceAmount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.portfolioHeader = page.getByText('Your portfolio', { exact: true });
    
    // Basert på din HTML: Vi finner <p> som inneholder '$' og har klassen 'text-xl'
    // Dette er den mest presise måten å treffe saldoen på.
    this.balanceAmount = page.locator('p.text-xl').filter({ hasText: '$' }).first();
  }

  async goto() {
    await this.page.goto('https://app.alpaca.markets/paper/dashboard/overview');
    
    // Håndter cookie-banner hvis den dukker opp
    const acceptBtn = this.page.getByRole('button', { name: 'Accept' });
    if (await acceptBtn.isVisible({ timeout: 5000 })) {
      await acceptBtn.click();
    }
  }

  async verifyDashboardLoaded() {
    await expect(this.portfolioHeader).toBeVisible({ timeout: 20000 });
  }

  async getBalanceText() {
    // SENIOR LOGIKK: Vi venter til saldoen er noe annet enn $0.00
    // Dette hindrer at testen leser "plassholder-verdien" før dataene er hentet.
    await expect(this.balanceAmount).not.toHaveText(/\$\s?0\.00/, { timeout: 15000 });
    
    const rawText = await this.balanceAmount.innerText();
    // Vi renser teksten (fjerner linjeskift)
    return rawText.replace(/\n/g, '').trim();
  }
}