import { Post } from "@prisma/client";

export type SafeUser = {
  id: string;
  name: string;
  friendsIds: string[];
  friendOfIds: string[];
};

export type SafePost = Omit<Post, 'createdAt'> & {
  createdAt: string;
}
