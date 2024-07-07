/// <reference types="./commands.d.ts" />

import '@testing-library/cypress/add-commands';
import { fillForm } from './helpers';

Cypress.Commands.add('fillForm', fillForm);
