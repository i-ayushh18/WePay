import { useRecoilValue } from "recoil";
import { amountAtom, lockedAtom } from "../atoms/balance";

export const useBalance = () => {
    const amount = useRecoilValue(amountAtom);  // Get unlocked balance
    const locked = useRecoilValue(lockedAtom);  // Get locked balance
    return { amount, locked };
};
