// "use client";
// import { Card } from "@repo/ui/card";
// import { useRecoilValue, useSetRecoilState } from "recoil";
// import { amountAtom, lockedAtom } from "@repo/store/balances";
// import React from "react";

// interface BalanceCardProps {
//     amount: number;
//     locked: number;
// }

// export const BalanceCard = React.memo(({ amount = 0, locked = 0 }: BalanceCardProps) => {
//     const recoilAmount = useRecoilValue(amountAtom);
//     const recoilLocked = useRecoilValue(lockedAtom);
//     const setAmount = useSetRecoilState(amountAtom);
//     const setLocked = useSetRecoilState(lockedAtom);


//     React.useEffect(() => {
//         if (recoilAmount !== amount) setAmount(amount);
//         if (recoilLocked !== locked) setLocked(locked);
//     }, [amount, locked, recoilAmount, recoilLocked, setAmount, setLocked]);

//     const formatCurrency = (value: number) => value.toLocaleString("en-IN");

//     return (
//         <Card title="Balance">
//             <div className="flex justify-between border-b border-slate-300 pb-4 text-lg">
//                 <div className="text-gray-600">Unlocked Balance</div>
//                 <div className="font-semibold">{formatCurrency(recoilAmount / 100)} INR</div>
//             </div>
//             <div className="flex justify-between border-b border-slate-300 py-4 text-lg">
//                 <div className="text-gray-600">Locked Balance</div>
//                 <div className="font-semibold">{formatCurrency(recoilLocked / 100)} INR</div>
//             </div>
//             <div className="flex justify-between py-4 text-lg">
//                 <div className="text-gray-800 font-bold">Total Balance</div>
//                 <div className="font-bold text-indigo-600">
//                     {formatCurrency((recoilLocked + recoilAmount) / 100)} INR
//                 </div>
//             </div>
//         </Card>
//     );
// });
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
