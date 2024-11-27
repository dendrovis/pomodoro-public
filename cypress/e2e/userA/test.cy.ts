/// <reference types="cypress" />

const viewports = ['default','iphone-x', 'macbook-16'] // to test on different sizes
const fileName = 'userA'

Cypress.Screenshot.defaults({
  capture: 'viewport',
  scale: true,
  clip: undefined,
  screenshotOnRunFailure: false,
  overwrite: true,
})

describe('simulate scenarios',() => {
  beforeEach(() => {
      cy.visit('http://localhost:3001')
      cy.clearLocalStorage()
    })
  it('happy path',() => {
    viewports.forEach((viewport) => {
      if(viewport !== 'default') cy.viewport(viewport as Cypress.ViewportPreset)
      cy.screenshot(`${fileName}/${viewport}/load`)
      cy.wait(300)
      cy.screenshot(`${fileName}/${viewport}/start`)
      cy.get('#icon-play-pause-timer').click()
      cy.wait(2000)
      cy.get('#icon-play-pause-timer').click()
      cy.screenshot(`${fileName}/${viewport}/timer-paused-after-run`)
      cy.get('#icon-stop-timer').click()
      cy.screenshot(`${fileName}/${viewport}/timer-stopped`)
      cy.get('#slider-slider_cycle-button-plus').click()
      cy.get('#slider-slider_cycle-button-plus').click()
      cy.get('#slider-slider_cycle-button-minus').click()
      cy.screenshot(`${fileName}/${viewport}/slided`)
      cy.get('#toggler_theme').click()
      cy.get('#toggle-toggler_alarm').click()
      cy.get('#toggle-toggler_cache').click()
      cy.get('#icon-locker-toggler_lock').click()
      cy.screenshot(`${fileName}/${viewport}/toggled`)
      cy.reload()
      cy.wait(300)
      cy.getAllLocalStorage().should(() => {
        expect(localStorage.getItem('dendrovis_pomodoro_isAlarmed')).to.eq('true')
        expect(localStorage.getItem('dendrovis_pomodoro_themeType')).to.eq('light')
        expect(localStorage.getItem('dendrovis_pomodoro_isLocked')).to.eq('true')
        expect(localStorage.getItem('dendrovis_pomodoro_cycleCount')).to.eq('4')
      })
      cy.get('#icon-locker-toggler_lock').click()
      cy.get('#slider-slider_cycle-button-minus').click()
      cy.get('#toggle-toggler_cache').click()
      cy.getAllLocalStorage().should(() => {
        expect(localStorage.length).to.eq(0)
      })
      cy.get('#toggler_theme').click()
      cy.get('#toggle-toggler_alarm').click()
      cy.screenshot(`${fileName}/${viewport}/toggled-back`)
      cy.get('#icon-base-toggler_info').click()
      cy.screenshot(`${fileName}/${viewport}/info`)
      cy.get('#icon-base-toggler_info').click()
      cy.get('#icon-base-toggler_help').click()
      cy.screenshot(`${fileName}/${viewport}/help`)
      cy.get('#icon-base-toggler_help').click()
      cy.screenshot(`${fileName}/${viewport}/end`)
      })
    })
})