import client from "./db.ts";

const getAll = async () => {
    try {
        const things = await client.queryObject('SELECT * FROM things;');
        console.log({ things: things.rows });
        return things.rows;
    } catch (err) {
        console.error(err);
        return [];
    }
}

const thing = {
    name: "Some thing",
    description: "Lorem Ipsum",
};

const db = {
    getAll,
    create: (thing: any) => 1,
    get: (id: number) => thing,
    update: (id: number, thing: any) => thing,
    delete: (id: number) => thing,
};

export default db;