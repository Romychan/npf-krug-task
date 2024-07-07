import { http, delay, HttpResponse } from 'msw';

import { initMockDatabase } from '~/shared/lib/server';

import { CreateUserRequest } from '../types';

const database = initMockDatabase();

export const isQueryParamPresent = (queryName: string, queryValue: string = 'true') => {
	const searchParams = new URLSearchParams(window.location.search);

	return searchParams.get(queryName) === queryValue;
};

/** An array of `MSW` handlers for intercepting user requests */
export const userHandlers = [
	http.get(`${process.env.BASE_API_URL}/users`, async ({ request }) => {
		if (isQueryParamPresent('loading')) {
			await delay('infinite');
			return new Response();
		}

		if (isQueryParamPresent('error')) {
			return HttpResponse.error();
		}

		if (isQueryParamPresent('empty')) {
			return HttpResponse.json({ users: [], total: 0, limit: 0 }, { status: 200 });
		}

		const url = new URL(request.url);
		const limit = Number(url.searchParams.get('limit'));

		const users = database.users.findMany({
			take: limit,
			orderBy: {
				id: 'asc',
			},
		});

		const total = database.users.count();

		return HttpResponse.json({ users, total, limit }, { status: 200 });
	}),

	http.post(`${process.env.BASE_API_URL}/users`, async ({ request }) => {
		const body = (await request.json()) as CreateUserRequest;
		const users = database.users.findMany({
			take: 1,
			orderBy: {
				id: 'desc',
			},
		});

		const newUser = {
			...body,
			id: users[0].id + 1,
		};

		const user = database.users.create(newUser);

		return HttpResponse.json(user, { status: 200 });
	}),

	http.delete(`${process.env.BASE_API_URL}/users/:id`, async ({ params }) => {
		const { id } = params;

		const user = database.users.delete({
			where: { id: { equals: Number(id) } },
		});

		return HttpResponse.json(user, { status: 200 });
	}),
];
