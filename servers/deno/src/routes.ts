import { RouterContext } from "./deps.ts";
import { Thing } from "./db.ts";

export const getAllThings = async (ctx: RouterContext) => {
  try {
    const things = await Thing.all();
    ctx.response.body = things;
  } catch (err) {
    console.error(err);
    ctx.response.status = 500;
    ctx.response.body = 'woops';
  }
};

export const createThing = async (ctx: RouterContext) => {
  const body = await ctx.request.body().value;
  const { name, description } = JSON.parse(body);
  const result = await Thing.create({
    name,
    description
  });
  ctx.response.status = 201;
  ctx.response.body = 'success';
};

export const getThing = async (ctx: RouterContext) => {
  const id = parseInt(ctx.params.id ?? "", 10);
  const thing = await Thing.find(id);
  if (!thing) {
    ctx.response.status = 404;
    ctx.response.body = { message: "thing not found" };
    return;
  }
  ctx.response.body = thing;
};

export const updateThing = async (ctx: RouterContext) => {
  // const id = parseInt(ctx.params.id ?? "", 10);
  // const { name, description } = await ctx.request.body().value;
  // const thing = await repo.update(id, { name, description });
  // if (!thing) {
  //   ctx.response.status = 404;
  //   ctx.response.body = { message: "thing not found" };
  //   return;
  // }
  // ctx.response.body = await repo.get(id);
};

export const deleteThing = async (ctx: RouterContext) => {
  const id = parseInt(ctx.params.id ?? "", 10);
  const thing = await Thing.deleteById(id);
  console.log({thing});

  if (!thing) {
    ctx.response.status = 404;
    ctx.response.body = { message: "thing not found" };
    return;
  }
  ctx.response.status = 204;
};
