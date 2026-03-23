import { test, expect } from '@playwright/test'

test('Dropdown - All Scenarios', async ({ page }) => {

    // Open URL
    await page.goto("https://practice.expandtesting.com/dropdown")

    // Locate dropdown
    const countryDropdown = page.locator('#country')

    // =========================================================
    // ✅ 1. Select by LABEL (Visible Text)
    // =========================================================
    await countryDropdown.selectOption({ label: 'India' })
    await expect(countryDropdown).toHaveValue('IN')

    // =========================================================
    // ✅ 2. Select by VALUE
    // =========================================================
    await countryDropdown.selectOption({ value: 'US' })
    await expect(countryDropdown).toHaveValue('US')

    // =========================================================
    // ✅ 3. Select by INDEX (Not recommended in real projects)
    // =========================================================
    await countryDropdown.selectOption({ index: 1 }) // Afghanistan
    const selectedValue = await countryDropdown.inputValue()
    console.log(selectedValue);
    expect(selectedValue).not.toBe('')

    // =========================================================
    // ✅ 4. Select using STRING (shortcut)
    // =========================================================
    await countryDropdown.selectOption('IN')
    await expect(countryDropdown).toHaveValue('IN')

    // =========================================================
    // ✅ 5. Select Multiple Options (if multi-select)
    // =========================================================
    // NOTE: This dropdown is single-select, example only
    /*
    await countryDropdown.selectOption([
        { value: 'IN' },
        { value: 'US' }
    ])
    */

    // =========================================================
    // ✅ 6. Get Selected Value
    // =========================================================
    const value = await countryDropdown.inputValue()
    console.log("Selected Value:", value)

    // =========================================================
    // ✅ 7. Get Selected Label (Visible Text)
    // =========================================================
    const selectedText = await countryDropdown.locator('option:checked').textContent()
    console.log("Selected Text:", selectedText)

    // =========================================================
    // ✅ 8. Validate Dropdown Count
    // =========================================================
    const options = countryDropdown.locator('option')
    const optionCount = await options.count()
    expect(optionCount).toBeGreaterThan(200)

    // =========================================================
    // ✅ 9. Validate Presence of Option
    // =========================================================
    const allCountries = await options.allTextContents()

    // ❌ This will FAIL (intentional)
    // expect.soft(allCountries).toContain('India123')

    // ✅ Correct validation
    expect(allCountries).toContain('India')
    expect(allCountries).toContain('United States')

    // =========================================================
    // ✅ 10. Validate Dropdown is NOT Empty
    // =========================================================
    expect(optionCount).toBeGreaterThan(0)

    // =========================================================
    // ✅ 11. Loop Through Dropdown Values
    // =========================================================
    for (const country of allCountries) {
        console.log(country)
    }

    // =========================================================
    // ✅ 12. Select Option Using Loop (Dynamic Selection)
    // =========================================================
    for (let i = 0; i < optionCount; i++) {
        const text = await options.nth(i).textContent()
        if (text === 'India') {
            await countryDropdown.selectOption({ index: i })
            break
        }
    }

    await expect(countryDropdown).toHaveValue('IN')

    // =========================================================
    // ✅ 13. Verify Default Selected Value
    // =========================================================
    const defaultValue = await countryDropdown.inputValue()
    expect(defaultValue).not.toBeNull()

    // =========================================================
    // ✅ 14. Validate Attribute (value of specific option)
    // =========================================================
    // const indiaValue = await page.locator('#country option:text("India")').getAttribute('value')
    // expect(indiaValue).toBe('IN')

    // =========================================================
    // ✅ 15. Ensure Dropdown is Enabled
    // =========================================================
    await expect(countryDropdown).toBeEnabled()

    // =========================================================
    // ✅ 16. Ensure Dropdown is Visible
    // =========================================================
    await expect(countryDropdown).toBeVisible()

    // =========================================================
    // ✅ 17. Negative Scenario (Invalid Value)
    // =========================================================
    // await countryDropdown.selectOption({ value: 'INVALID' })
    // const invalidValue = await countryDropdown.inputValue()
    // expect(invalidValue).not.toBe('INVALID') // Should not select

    // =========================================================
    // ✅ 18. Select First & Last Option
    // =========================================================
    await countryDropdown.selectOption({ index: 0 }) // First
    await countryDropdown.selectOption({ index: optionCount - 1 }) // Last

    // =========================================================
    // ✅ 19. Print All Values + Value Attribute
    // =========================================================
    for (let i = 0; i < optionCount; i++) {
        const text = await options.nth(i).textContent()
        const val = await options.nth(i).getAttribute('value')
        console.log(`${text} => ${val}`)
        
    }

    // Pause for demo
    await page.waitForTimeout(3000)
})