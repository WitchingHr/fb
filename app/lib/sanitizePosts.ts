import { DateTime } from 'luxon';

// types
import { Posts } from '../types';

// sanitize post data (remove unnecessary fields, covert dates to strings)
const sanitizePosts = (posts: any): Posts => {
  const safePosts = posts.map((post: any) => {
    // destructure post
    const { createdAt, comments, likes, author, authorId, ...otherProps } = post;

    // sanitized post author
    const postAuthor = {
      id: author.id,
      name: author.name,
      image: author.profile?.image,
    };
  
    // sanitize comments
    const safeComments = comments.map((comment: any) => {
      // destructure comment
      const { createdAt, authorId, author, ...otherCommentProps } = comment;

      // sanitized comment author
      const commentAuthor = {
        id: author.id,
        name: author.name,
        image: author.profile?.image,
      };

      // return sanitized comment, date converted to string
      return {
        ...otherCommentProps,
        author: commentAuthor,
        createdAt: DateTime.fromJSDate(createdAt).toLocaleString(DateTime.DATETIME_MED),
      };
    });

    // sanitize likes
    const safeLikes = likes.map((like: any) => {
      // destructure like
      const { author } = like;

      // sanitized like author
      const likeAuthor = {
        id: author.id,
        name: author.name,
        image: author.profile?.image,
      };

      // return sanitized like
      return {
        author: likeAuthor,
      };
    });
  
    // return sanitized post, date converted to string
    return {
      ...otherProps,
      author: postAuthor,
      createdAt: DateTime.fromJSDate(createdAt).toLocaleString(DateTime.DATETIME_MED),
      comments: safeComments,
      likes: safeLikes,
    };
  });
  
  // return sanitized posts
  return safePosts;
};

export default sanitizePosts;
