const {forwardTo} = require('prisma-binding');
const Query = {
  //async items(parent, args, ctx, info) {
  // const item = await ctx.db.query.items();
  // return item;
  //}
  items: forwardTo('db'),
  item: forwardTo('db')
};

module.exports = Query;
