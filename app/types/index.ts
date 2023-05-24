import { Profile } from "@prisma/client";

export type SafeUser = {
  id: string;
  name: string;
  friendsIds: string[];
  profile: Profile | null;
};

export type UserProfile = {
  id: string;
  name: string;
  profile: Profile | null;
  friends: User[];
}

export type User = {
  id: string;
  name: string;
  image: string | null | undefined;
}

export type Comment = {
  id: string;
  content: string;
  createdAt: string;
  postId: string;
  author: User;
}

interface Like {
  author: User;
}

export type Post = {
  id: string;
  content: string;
  postImage: string | null;
  createdAt: string;
  author: User;
  likes: Like[];
  comments: Comment[];
}

export type Posts = Post[] | null;

export type Notification = {
  id: string;
  content: string;
  createdAt: string;
  author: User;
  postId: string | null;
}

export type Notifications = Notification[] | null;
