import {
  index,
  integer,
  json,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core'

export const comments = pgTable(
  'comments',
  {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 200 }).notNull(),
    userInfo: json('user_info'),
    postId: varchar('post_id', { length: 100 }).notNull(),
    parentId: integer('parent_id'),
    body: json('body'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
  },
  (table) => ({
    postIdx: index('post_idx').on(table.postId),
  })
)

export const guestbook = pgTable('guestbook', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 200 }).notNull(),
  userInfo: json('user_info'),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})