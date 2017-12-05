import { IAction } from './action.interface';

export const initialState = {
    loaded: false,
    loading: true,
    data: [{ label: 'Fuck the rules', complete: false }]
};

export function reducer(state = initialState, action: IAction) {
    switch (action.type) {
        case 'ADD_TODO': {
            return {
                ...state,
                data: [...state.data, action.payload]
            };
        }
    }

    return state;
}
