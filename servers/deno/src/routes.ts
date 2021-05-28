import { RouterContext } from "./deps.ts";
import repo from "./repo.ts";
import Thing from "./Thing.ts";

export const getAllThings = async (ctx: RouterContext) => {
  const things = await repo.getAll();
  ctx.response.body = things;
};

export const createThing = async (ctx: RouterContext) => {
  const { name, description } = await ctx.request.body().value;
  const thing = new Thing(name, description);
  const id = await repo.create(thing);
  thing.id = id;
  ctx.response.status = 201;
  ctx.response.body = thing;
};

export const getThing = async (ctx: RouterContext) => {
  const id = parseInt(ctx.params.id ?? "", 10);
  const thing = await repo.get(id);
  if (!thing) {
    ctx.response.status = 404;
    ctx.response.body = { message: "thing not found" };
    return;
  }
  ctx.response.body = thing;
};

export const updateThing = async (ctx: RouterContext) => {
  const id = parseInt(ctx.params.id ?? "", 10);
  const { name, description } = await ctx.request.body().value;
  const thing = await repo.update(id, { name, description });
  if (!thing) {
    ctx.response.status = 404;
    ctx.response.body = { message: "thing not found" };
    return;
  }
  ctx.response.body = await repo.get(id);
};

export const deleteThing = async (ctx: RouterContext) => {
  const id = parseInt(ctx.params.id ?? "", 10);
  const thing = await repo.delete(id);

  if (!thing) {
    ctx.response.status = 404;
    ctx.response.body = { message: "thing not found" };
    return;
  }
  ctx.response.status = 204;
};
