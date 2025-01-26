"use client"
import { useSetRecoilState } from "recoil";
import { balanceAtom } from "../atoms/balance.js"; // Import balance atom
import { p2pTransfer } from "../../../../apps/user-app/app/lib/actions/p2pTransfer.js"; // Adjust path if needed

export const handleTransaction = async (to: string, amount: number) => {
    const setBalance = useSetRecoilState(balanceAtom); // Function to update the balance atom

    try {
        // Assuming p2pTransfer now returns an object with a success flag and message
        const result = await p2pTransfer(to, amount);
        
        if (result?.success) {
            // Update balance state only on successful transaction
            setBalance(prev => prev - amount); // Decrement balance
            console.log("Transaction successful:", result.message);
        } else {
            console.log("Transaction failed:", result?.message || "Unknown error");
        }
    } catch (error) {
        console.error("Transaction error:", error);
    }
};
