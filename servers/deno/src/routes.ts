import { RouterContext } from "./deps.ts";
import db from "./db.ts";

export const getAllThings = async (ctx: RouterContext) => {
  const things = await db.getAll();
  ctx.response.body = things;
};

export const createThing = async (ctx: RouterContext) => {
  const { name, description } = await ctx.request.body().value;
  const thing: any = {
    name,
    description,
  };
  const id = await db.create(thing);
  thing.id = id;
  ctx.response.status = 201;
  ctx.response.body = thing;
};

export const getThing = async (ctx: RouterContext) => {
  const id = parseInt(ctx.params.id ?? "", 10);
  const thing: any = await db.get(id);
  ctx.response.body = thing;
};

export const updateThing = async (ctx: RouterContext) => {
  const id = parseInt(ctx.params.id ?? "", 10);
  const { name, description } = await ctx.request.body().value;
  const thing = await db.update(id, { name, description });
  if (!thing) {
    ctx.response.status = 404;
    ctx.response.body = { message: "thing not found" };
    return;
  }
  ctx.response.body = await db.get(id);
};

export const deleteThing = async (ctx: RouterContext) => {
  const id = parseInt(ctx.params.id ?? "", 10);
  const thing = await db.delete(id);

  if (!thing) {
    ctx.response.status = 404;
    ctx.response.body = { message: "thing not found" };
    return;
  }
  ctx.response.status = 204;
};
