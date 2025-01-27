// atoms/balance.ts
import { atom } from "recoil";

// Atom for unlocked balance (amount)
export const amountAtom = atom<number>({
    key: "amountAtom",  // unique ID
    default: 0,         // initial value (can be set to any number)
});

// Atom for locked balance (locked)
export const lockedAtom = atom<number>({
    key: "lockedAtom",  // unique ID
    default: 0,         // initial value (can be set to any number)
});
