import { Map } from 'immutable';

export default (state = Map(), action) => {
    const { type } = action;
    const matches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type);

    if (!matches) return state;

    const [, requestName, requestState] = matches;

    return state.set(requestName, requestState === 'REQUEST');
};