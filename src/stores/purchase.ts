import { create } from "zustand";

interface PurchaseState {
  offeredProductIds: number[];
  addOffer: (productId: number) => void;
  cancelOffer: (productId: number) => void;
}

const usePurchaseStore = create<PurchaseState>((set) => ({
  offeredProductIds: [],
  addOffer: (productId) =>
    set((state) => ({
      offeredProductIds: [...state.offeredProductIds, productId],
    })),
  cancelOffer: (productId) =>
    set((state) => ({
      offeredProductIds: state.offeredProductIds.filter(
        (id) => id !== productId
      ),
    })),
}));

export default usePurchaseStore;
