import { Configuration } from 'webpack';

export type Mode = Configuration['mode'];

export interface Paths {
	entry: string;
	html: string;
	public: string;
	output: string;
	src: string;
	env: string;
}

export interface Options {
	port: number;
	paths: Paths;
	mode: Mode;
}
