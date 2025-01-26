"use client"
import { useSetRecoilState } from "recoil";
import { balanceAtom } from "../atoms/balance.js";
import { p2pTransfer } from "../../../../../WePay/apps/user-app/app/lib/actions/p2pTransfer.js"; 

export const handleTransaction = async (to: string, amount: number) => {
    const setBalance = useSetRecoilState(balanceAtom);

    try {
        const result = await p2pTransfer(to, amount);
        
        if (result.success) {
            // Update balance on success
            setBalance(prev => prev - amount);
            console.log("Transaction successful:", result.message);
        } else {
            console.log("Transaction failed:", result.message);
        }
    } catch (error) {
        console.error("Error during transaction:", error);
    }
};
