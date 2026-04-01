import { ConvexError, v } from "convex/values";
import type { Doc, Id } from "./_generated/dataModel";
import type { MutationCtx } from "./_generated/server";
import { authMutation, authQuery } from "./lib/authFunctions";

async function requireTaskForUser(
	ctx: MutationCtx,
	taskId: Id<"tasks">,
	userId: Id<"users">,
): Promise<Doc<"tasks">> {
	const task = await ctx.db.get(taskId);
	if (!task || task.userId !== userId) {
		throw new ConvexError("NOT_FOUND");
	}
	return task;
}

export const list = authQuery({
	args: {},
	handler: async (ctx) => {
		return await ctx.db
			.query("tasks")
			.withIndex("userId", (q) => q.eq("userId", ctx.userId))
			.collect();
	},
});
export const create = authMutation({
	args: {
		text: v.string(),
	},
	handler: async (ctx, args) => {
		return ctx.db.insert("tasks", {
			text: args.text,
			userId: ctx.userId,
			isCompleted: false,
		});
	},
});
export const update = authMutation({
	args: {
		id: v.id("tasks"),
		payload: v.object({
			text: v.optional(v.string()),
			isCompleted: v.optional(v.boolean()),
		}),
	},
	handler: async (ctx, args) => {
		await requireTaskForUser(ctx, args.id, ctx.userId);
		return ctx.db.patch(args.id, args.payload);
	},
});
export const remove = authMutation({
	args: {
		id: v.id("tasks"),
	},
	handler: async (ctx, args) => {
		await requireTaskForUser(ctx, args.id, ctx.userId);
		return ctx.db.delete(args.id);
	},
});
export const removeAll = authMutation({
	args: {},
	handler: async (ctx) => {
		const tasks = await ctx.db
			.query("tasks")
			.withIndex("userId", (q) => q.eq("userId", ctx.userId))
			.collect();

		await Promise.all(tasks.map((task) => ctx.db.delete(task._id)));
	},
});
