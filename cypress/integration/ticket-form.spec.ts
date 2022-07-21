// Your tests go in here. Happy coding! 🤓

describe('Submiting a form-happy path', () => {
    it('filling form', () => {
        cy.visit('/')
        cy.get(`input[id="name"]`).type('Name')
        cy.get(`input[id="email"]`).type('email@email.pl')
        cy.get(`input[id="subject"]`).type('subject')
        cy.get(`textarea[id="message"]`).type('message')
        cy.intercept('POST', '/v2/tickets/new', { statusCode: 200 })
        cy.get(`button[type="submit"]`).click()
    })
    it('checking results', () => {
        cy.get('h1.success').should('have.text', 'Thank you!')
    })
})
describe('Submiting a form-sad path', () => {
    it('filling form', () => {
        cy.visit('/')
        cy.get(`input[id="name"]`).type('Name')
        cy.get(`input[id="email"]`).type('email@email.pl')
        cy.get(`input[id="subject"]`).type('subject')
        cy.get(`textarea[id="message"]`).type('message')
        cy.intercept('POST', '/v2/tickets/new', { statusCode: 500 })

        cy.get(`button[type="submit"]`).click()
    })

    it('checking results', () => {
        cy.get('h1.fail').should('have.text', 'Error!')
    })
})
