import { Map } from 'immutable';

export default (state = Map(), action) => {
    const { type, payload } = action;
    const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

    if (!matches) return state;

    const [, requestName, requestState] = matches;

    if (requestState === 'FAILURE') {
        return state.set(requestName, payload);
    } else {
        return state.delete(requestName);
    }
};