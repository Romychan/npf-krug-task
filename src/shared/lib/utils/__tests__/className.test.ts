import { cl } from '../className';

describe('cl', () => {
	it('should work correctly with primitives', () => {
		expect(cl('test', true)).toEqual('test');
		expect(cl('test', '', 10, 0, null, undefined, false)).toEqual('test 10');
	});

	it('should work correctly with objects', () => {
		expect(cl({ test: true, hello: false }, 'world')).toEqual('test world');
		expect(cl({}, 'test')).toEqual('test');
	});

	it('should work correctly with array', () => {
		expect(cl(['test', 'hello', 0, 10, undefined, ''], 'world', false, 20)).toEqual('test hello 10 world 20');
		expect(cl({}, 'test')).toEqual('test');
	});
});
