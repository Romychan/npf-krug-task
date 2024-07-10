const deleteUsers = (numberOfUsersToDelete: number) => {
	if (numberOfUsersToDelete <= 0) {
		return;
	}

	const deleteButton = cy.findAllByTestId('delete-user').first();

	cy.findAllByTestId('delete-user').first().click();
	deleteButton.should('not.exist');

	deleteUsers(numberOfUsersToDelete - 1);
};

const COUNT_ALL_USERS = 16;
const COUNT_LIMIT_USERS = 10;

describe('User table', () => {
	describe('Displays user data', () => {
		it('should display loading state', () => {
			cy.visit('/?loading=true');

			cy.findByTestId('loader').should('be.visible');
			cy.findAllByTestId('table-body-row').should('have.length', 0);
		});

		it('should display empty message if error state', () => {
			cy.visit('/?error=true');

			cy.findAllByTestId('table-body-row').should('have.length', 0);
			cy.findByTestId('table-body-empty').should('be.visible');
			cy.findByTestId('toast').should('be.visible');
		});

		it('should display success state', () => {
			cy.visit('/');

			cy.findByTestId('table-body-empty').should('not.exist');
			cy.findByTestId('loader').should('not.exist');
			cy.findAllByTestId('table-body-row').should('have.length', COUNT_LIMIT_USERS);
		});

		it('should display empty state', () => {
			cy.visit('/?empty=true');

			cy.findByTestId('loader').should('be.visible');
			cy.findAllByTestId('table-body-row').should('have.length', 0);
		});
	});

	describe('Delete user data', () => {
		beforeEach(() => {
			cy.visit('/');
		});

		it('should delete user', () => {
			cy.findAllByTestId('table-body-row').should('contain', '@testname');
			cy.findAllByTestId('delete-user').first().click();
			cy.findAllByTestId('table-body-row').should('not.contain', '@testname');
			cy.findByTestId('toast').should('be.visible');
		});

		it('should add a user correctly after deleting all users', () => {
			cy.findByTestId('load-more-users').should('be.visible');
			cy.findByTestId('table-body-empty').should('not.exist');

			deleteUsers(COUNT_ALL_USERS);

			cy.findByTestId('table-body-empty').should('be.visible');
			cy.findByTestId('drawer-add-user').click();
			cy.fillForm([
				{ label: /^name/i, value: 'John Doe' },
				{ label: /^username/i, value: 'cypress' },
				{ label: /^email/i, value: 'john.doe@test.com' },
			]);
			cy.findByTestId('add-user').click();

			cy.findAllByTestId('table-body-row').should('have.length', 1);
		});

		it('should hide load more button after deleting users', () => {
			cy.findByTestId('load-more-users').should('be.visible');
			cy.findAllByTestId('table-body-row').should('have.length', COUNT_LIMIT_USERS);

			deleteUsers(COUNT_LIMIT_USERS);

			cy.findByTestId('load-more-users').should('not.exist');
			cy.findAllByTestId('table-body-row').should('have.length', COUNT_ALL_USERS - COUNT_LIMIT_USERS);
		});
	});

	describe('Load more data', () => {
		beforeEach(() => {
			cy.visit('/');
		});

		it('should load more data', () => {
			cy.findAllByTestId('table-body-row').should('have.length', COUNT_LIMIT_USERS);
			cy.findByTestId('load-more-users').click();
			cy.findAllByTestId('table-body-row').should('have.length', COUNT_ALL_USERS);
		});
	});
});
