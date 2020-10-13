export const generateRequestAction = (action) => {
    return `${action}_REQUEST`;
};

export const generateSuccessAction = (action) => {
    return `${action}_SUCCESS`;
};

export const generateFailureAction = (action) => {
    return `${action}_FAILURE`;
};