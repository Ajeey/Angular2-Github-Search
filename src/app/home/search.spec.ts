import { Search } from './search';

describe('Search Validation', () => {
    it('has name', () => {
        let search: Search = {text: 'ajeey'};
        expect(search.text).toEqual('ajeey');
    });
});
