const completeForm = () => {
	cy.fillForm([
		{ label: /^name/i, value: 'John Doe' },
		{ label: /^username/i, value: 'cypress' },
		{ label: /^email/i, value: 'john.doe@test.com' },
	]);
};

describe('User form', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.findByTestId('drawer-add-user').click();
	});

	it('should open user form', () => {
		cy.findByRole('textbox', { name: /^name/i }).should('be.visible');
		cy.findByRole('textbox', { name: /username/i }).should('be.visible');
		cy.findByRole('textbox', { name: /^email/i }).should('be.visible');
	});

	it('should validate required input fields', () => {
		cy.findByTestId('add-user').click();
		cy.findAllByRole('alert').should('have.length', 3);
	});

	it('should validate email field correctly', () => {
		completeForm();

		cy.findByRole('textbox', { name: /^email/i }).type('john.doetest@.com');
		cy.findByTestId('add-user').click();
		cy.findAllByRole('alert').should('have.length', 1);
	});

	it('should validate minimum length of text', () => {
		cy.fillForm([
			{ label: /^name/i, value: 'Jo' },
			{ label: /^username/i, value: 'c' },
			{ label: /^email/i, value: 'jo' },
		]);

		cy.findAllByRole('alert').should('have.length', 3);

		completeForm();

		cy.findAllByRole('alert').should('have.length', 0);
	});

	it('should cancel form submission', () => {
		const cancelButton = cy.findByTestId('cancel-add-user');

		cancelButton.click();
		cancelButton.should('not.exist');
	});

	it('should reset form after cancel form submission', () => {
		const cancelButton = cy.findByTestId('cancel-add-user');

		completeForm();

		cancelButton.click();

		cy.findByTestId('drawer-add-user').click();
		cy.findByRole('textbox', { name: /^name/i }).should('have.value', '');
		cy.findByRole('textbox', { name: /username/i }).should('have.value', '');
		cy.findByRole('textbox', { name: /^email/i }).should('have.value', '');
	});

	it('should add a new user', () => {
		completeForm();

		cy.findByTestId('add-user').click();
		cy.findAllByRole('alert').should('not.exist');

		cy.findByTestId('load-more-users').click();

		cy.findByTestId('user-table').should('contain', 'John Doe');
		cy.findByTestId('toast').should('be.visible');
	});

	it('should reset form after add a new user', () => {
		completeForm();

		cy.findByTestId('add-user').click();
		cy.findAllByRole('alert').should('not.exist');

		cy.findByTestId('drawer-add-user').click();
		cy.findByRole('textbox', { name: /^name/i }).should('have.value', '');
		cy.findByRole('textbox', { name: /username/i }).should('have.value', '');
		cy.findByRole('textbox', { name: /^email/i }).should('have.value', '');
	});
});
