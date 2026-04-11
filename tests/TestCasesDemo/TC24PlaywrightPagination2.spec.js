import { test, expect } from "@playwright/test";

test.describe('Pagination in Nationality Page - OrangeHRM', () => {

    const BASE_URL = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';
    const USERNAME = 'Admin';
    const PASSWORD = 'admin123';
    const RECORDS_PER_PAGE = 50;

    // 🔹 Reusable locators
    const selectors = {
        username: 'input[name="username"]',
        password: 'input[name="password"]',
        submit: 'button[type="submit"]',
        adminMenu: 'span:has-text("Admin")',
        nationalityMenu: 'a:has-text("Nationalities")',
        recordText: '[class="oxd-text oxd-text--span"]',
        nextBtn: 'button i.bi-chevron-right',
        prevBtn: 'button i.bi-chevron-left',
        paginationButtons: '.oxd-pagination-page-item',
        activePage: '[class="oxd-pagination-page-item oxd-pagination-page-item--page oxd-pagination-page-item--page-selected"]'
    };

    // 🔹 Login + Navigation
    test.beforeEach(async ({ page }) => {
        await page.goto(BASE_URL);
        await page.fill(selectors.username, USERNAME);
        await page.fill(selectors.password, PASSWORD);
        await page.click(selectors.submit);
        await page.waitForLoadState('networkidle');

        await page.click(selectors.adminMenu);
        await page.click(selectors.nationalityMenu);
        await page.waitForLoadState('networkidle');
    });

    // 🔹 Helper: Get total records
    async function getTotalRecords(page) {
        const text = await page.locator(selectors.recordText).first().textContent();
        return parseInt(text.match(/\d+/));
    }

    // 🔹 Helper: Calculate expected pages
    function calculatePages(totalRecords) {
        return Math.ceil(totalRecords / RECORDS_PER_PAGE);
    }

    // 🔹 Helper: Navigate to last page
    async function goToLastPage(page) {
        while (await page.locator(selectors.nextBtn).isVisible()) {
            await page.locator(selectors.nextBtn).click();
        }
    }

    // =====================================================
    // ✅ POSITIVE TEST CASES
    // =====================================================

    test('TC01 - Validate total number of pages', async ({ page }) => {
        const totalRecords = await getTotalRecords(page);
        const expectedPages = calculatePages(totalRecords);

        const pageCount = (await page.locator(selectors.paginationButtons).count() - 1);

        expect(pageCount).toBe(expectedPages);
    });

    test('TC02 - Validate Next button navigation', async ({ page }) => {
        const initialPage = await page.locator(selectors.activePage).textContent();

        await page.locator(selectors.nextBtn).click();

        const newPage = await page.locator(selectors.activePage).textContent();

        expect(Number(newPage)).toBe(Number(initialPage) + 1);
    });

    test('TC03 - Validate Previous button navigation', async ({ page }) => {
        await page.locator(selectors.nextBtn).click();

        const pageAfterNext = await page.locator(selectors.activePage).textContent();

        await page.locator(selectors.prevBtn).last().click();

        const pageAfterPrev = await page.locator(selectors.activePage).textContent();

        expect(Number(pageAfterPrev)).toBe(Number(pageAfterNext) - 1);
    });

    test('TC04 - Navigate to last page using Next button', async ({ page }) => {
        
        await goToLastPage(page);

        const lastpage = await page.locator(selectors.activePage).textContent();

        const expectedPages = calculatePages(totalRecords);

        expect(Number(lastpage)).toBe(expectedPages);
        //validate if that locator is not present
        //Other assertion for the last Page

        // const isNextDisabled = await page.locator(selectors.nextBtn).isDisabled();

        // expect(isNextDisabled).toBeTruthy();
    });

    test('TC05 - Navigate to first page using Previous button', async ({ page }) => {
        await goToLastPage(page);

        while (await page.locator(selectors.prevBtn).isEnabled()) {
            await page.locator(selectors.prevBtn).click();
        }

        const isPrevDisabled = await page.locator(selectors.prevBtn).isDisabled();

        expect(isPrevDisabled).toBeTruthy();
    });

    test('TC06 - Validate clicking specific page number', async ({ page }) => {
        const pages = page.locator(selectors.paginationButtons);

        const count = await pages.count();

        if (count > 1) {
            await pages.nth(1).click(); // go to page 2

            const activePage = await page.locator(selectors.activePage).textContent();

            expect(activePage).toBe('2');
        }
    });

    test('TC07 - Validate records per page', async ({ page }) => {
        const rows = await page.locator('.oxd-table-body .oxd-table-card').count();

        expect(rows).toBeLessThanOrEqual(RECORDS_PER_PAGE);
    });

    // =====================================================
    // ❌ NEGATIVE / EDGE TEST CASES
    // =====================================================

    test('TC08 - Validate Next button disabled on last page', async ({ page }) => {
        await goToLastPage(page);

        await expect(page.locator(selectors.nextBtn)).toBeDisabled();
    });

    test('TC09 - Validate Previous button disabled on first page', async ({ page }) => {
        await expect(page.locator(selectors.prevBtn)).toBeDisabled();
    });

    test('TC10 - Validate no crash when clicking disabled Next', async ({ page }) => {
        await goToLastPage(page);

        const nextBtn = page.locator(selectors.nextBtn);

        await expect(nextBtn).toBeDisabled();

        // Try clicking anyway
        await nextBtn.click({ force: true });

        const activePage = await page.locator(selectors.activePage).textContent();

        expect(activePage).toBeTruthy(); // page remains stable
    });

    test('TC11 - Validate pagination when only one page exists (edge case)', async ({ page }) => {
        const totalRecords = await getTotalRecords(page);

        if (totalRecords <= RECORDS_PER_PAGE) {
            await expect(page.locator(selectors.nextBtn)).toBeDisabled();
            await expect(page.locator(selectors.prevBtn)).toBeDisabled();
        }
    });

    test('TC12 - Rapid clicking Next button (stability test)', async ({ page }) => {
        for (let i = 0; i < 5; i++) {
            if (await page.locator(selectors.nextBtn).isEnabled()) {
                await page.locator(selectors.nextBtn).click();
            }
        }

        const activePage = await page.locator(selectors.activePage).textContent();

        expect(Number(activePage)).toBeGreaterThan(0);
    });

    test('TC13 - Validate page does not break on reload', async ({ page }) => {
        await page.locator(selectors.nextBtn).click();

        await page.reload();

        const activePage = await page.locator(selectors.activePage).textContent();

        expect(activePage).toBeTruthy();
    });

});