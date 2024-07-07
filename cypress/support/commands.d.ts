/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

declare namespace Cypress {
	interface Chainable {
		fillForm(formData: { label: string | RegExp; value: string }[]): Chainable<JQuery<HTMLElement>>;
	}
}
