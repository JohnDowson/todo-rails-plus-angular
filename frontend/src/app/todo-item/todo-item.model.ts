export class TodoItem {
    id: number;
    text: string;
    completed: boolean;
    project_id: number;
    constructor(values: Object = { completed: false }) {
        Object.assign(this, values);
    }
    inspect() {
        return JSON.stringify(this, null, ' ')
    }
}
