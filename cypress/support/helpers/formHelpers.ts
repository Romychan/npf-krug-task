/**
 * Fills a form with the provided data
 *
 * @param formData An array of objects with fields
 */
export const fillForm = (formData: { label: string | RegExp; value: string }[]) => {
	formData.forEach(({ label, value }) => {
		cy.findByRole('textbox', { name: label }).clear().type(value);
	});
};
