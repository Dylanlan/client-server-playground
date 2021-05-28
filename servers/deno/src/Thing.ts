class Thing {
    id: number;
    name: string;
    description?: string;

    constructor (name: string, description?: string, id = -1) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}

export default Thing;
