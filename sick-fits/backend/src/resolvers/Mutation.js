const mutations = {
  async createItem(parent, args, ctx, info) {
    const item = await ctx.db.mutation.createItem(
      {
        data: {...args}
      },
      info
    );
    return item;
  },
  updateItem(parent, args, ctx, info) {
    const {id, ...updates} = args;
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id
        }
      },
      info
    );
  }
};

module.exports = mutations;
