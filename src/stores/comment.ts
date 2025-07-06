import { create } from "zustand";

export interface Comment {
  id: number;
  productId: number;
  author: string;
  profileImageUrl: string;
  text: string;
  quantity: number;
}

interface CommentState {
  comments: Record<number, Comment[]>;
  addComment: (comment: Omit<Comment, "id">) => void;
  deleteComment: (commentId: number, productId: number) => void;
}

let nextId = 1;

const useCommentStore = create<CommentState>((set) => ({
  comments: {},
  addComment: (comment) =>
    set((state) => {
      const newComment = { ...comment, id: nextId++ };
      const newCommentsForProduct = [
        ...(state.comments[comment.productId] || []),
        newComment,
      ];
      return {
        comments: {
          ...state.comments,
          [comment.productId]: newCommentsForProduct,
        },
      };
    }),
  deleteComment: (commentId, productId) =>
    set((state) => {
      const filteredComments = (state.comments[productId] || []).filter(
        (c) => c.id !== commentId
      );
      return {
        comments: {
          ...state.comments,
          [productId]: filteredComments,
        },
      };
    }),
}));

export default useCommentStore;
