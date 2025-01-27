"use client"
import { Card } from "@repo/ui/card";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { amountAtom, lockedAtom } from "@repo/store/balances";
import React from "react";

interface BalanceCardProps {
    amount: number;
    locked: number;
}

export const BalanceCard = ({ amount, locked }: BalanceCardProps) => {
    const setAmount = useSetRecoilState(amountAtom);
    const setLocked = useSetRecoilState(lockedAtom);

    // Sync data from props to Recoil state (only when component mounts)
    React.useEffect(() => {
        setAmount(amount);
        setLocked(locked);
    }, [amount, locked, setAmount, setLocked]);

    return (
        <Card title="Balance">
            <div className="flex justify-between border-b border-slate-300 pb-2">
                <div>Unlocked balance</div>
                <div>{amount / 100} INR</div>
            </div>
            <div className="flex justify-between border-b border-slate-300 py-2">
                <div>Total Locked Balance</div>
                <div>{locked / 100} INR</div>
            </div>
            <div className="flex justify-between border-b border-slate-300 py-2">
                <div>Total Balance</div>
                <div>{(locked + amount) / 100} INR</div>
            </div>
        </Card>
    );
};
