import { Locator, Page, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly portfolioHeader: Locator;
  readonly balanceAmount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.portfolioHeader = page.getByText('Your portfolio', { exact: true });
    this.balanceAmount = page.locator('p.text-xl').filter({ hasText: '$' }).first();
  }

  async goto() {
    await this.page.goto('https://app.alpaca.markets/paper/dashboard/overview');
    const acceptBtn = this.page.getByRole('button', { name: 'Accept' });
    try {
        if (await acceptBtn.isVisible({ timeout: 5000 })) {
            await acceptBtn.click();
        }
    } catch (e) {}
  }

  async verifyDashboardLoaded() {
    await expect(this.portfolioHeader).toBeVisible({ timeout: 20000 });
  }

  async getBalanceText() {
    await expect(this.balanceAmount).not.toHaveText(/\$\s?0\.00/, { timeout: 15000 });
    const rawText = await this.balanceAmount.innerText();
    return rawText.replace(/\n/g, '').trim();
  }

  /**
   * Verifiserer at en ordre er synlig i tabellen.
   * Vi bruker en global tabell-søk som er mer robust enn å låse oss til 'section'.
   */
  async verifyOrderVisible(symbol: string) {
    const orderRow = this.page.getByRole('row').filter({ hasText: symbol }).first();
    
    console.log(`Venter på at ordre for ${symbol} skal dukke opp i tabellen...`);
    await expect(orderRow).toBeVisible({ timeout: 20000 });
    
    // Rettet syntaks her:
    await expect(orderRow.getByText(/accepted|filled/i).first()).toBeVisible();
    
    console.log(`Verifisert i UI: Ordre for ${symbol} ble funnet.`);
  }
}