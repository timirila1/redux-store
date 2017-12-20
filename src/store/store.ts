export class Store {
	private subscribers: Function[] = [];
	private reducers: { [key: string]: Function };
	private state = {};

	constructor(reducers = {}, initialState = {}) {
		this.reducers = reducers;
		this.state = this.reduce(initialState, {});
	}

	get value() {
		return this.state;
	}

	public dispatch(action) {
		this.state = this.reduce(this.state, action);
		this.notify();
	}

	public subscribe(fn) {
		this.subscribers = [...this.subscribers, fn];
		this.notify();
		return () => {
			this.subscribers = this.subscribers.filter(sub => sub !== fn);
		};
	}

	private notify() {
		this.subscribers.forEach(fn => fn(this.value));
	}

	private reduce(state, action) {
		const newState = {};

		for (const prop in this.reducers) {
			newState[prop] = this.reducers[prop](this.state[prop], action);
		}

		return newState;
	}
}
