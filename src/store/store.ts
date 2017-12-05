import { IAction } from './action.interface';
import { IState } from './state.interface';

export class Store {
    private subscribers: Function[];
    private reducers: { [key: string]: Function };
    private state: IState;

    constructor(reducers = {}, initialState = {}) {
        this.reducers = reducers;
        this.state = this.reduce(initialState, {});
    }

    get value(): IState {
        return this.state;
    }

    public dispatch(action: IAction) {
        this.state = this.reduce(this.state, action);
    }

    private reduce(state, action) {
        const newState = {};

        for (const prop in this.reducers) {
            newState[prop] = this.reducers[prop](this.state[prop], action);
        }

        return newState;
    }
}
