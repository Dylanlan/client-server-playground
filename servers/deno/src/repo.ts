import client from "./db.ts";
import Thing from "./Thing.ts";

const getAll = async () => {
    const result = await client.queryObject('SELECT * FROM things;');
    return result.rows.map(getThingFromRow);
}

const getThingFromRow = (row: RepoRow): Thing => {
    return new Thing(row.name, row.description, row.id);
};

const get = async(id: number): Promise<Thing | null> => {
    const result = await client.queryObject
        `SELECT * FROM things WHERE id = ${id};`;
    if (result.rowCount === 0) {
        return null;
    }
    const row = result.rows[0] as RepoRow;
    return getThingFromRow(row);
}

const deleteThing = async(id: number) => {
    const result = await client.queryObject
        `DELETE FROM things WHERE id = ${id};`;

    console.log({result});

    return true;
}

const thing = {
    name: "Some thing",
    description: "Lorem Ipsum",
};

const db = {
    getAll,
    create: (thing: any) => 1,
    get,
    update: (id: number, thing: any) => thing,
    delete: deleteThing,
};

type RepoRow = {
    id: number,
    name: string,
    description?: string,
}

export default db;