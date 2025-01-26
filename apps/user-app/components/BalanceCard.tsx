import React from 'react';

interface BalanceCardProps {
    amount: number;
    locked: number;
}

export const BalanceCard: React.FC<BalanceCardProps> = ({ amount, locked }) => {
    return (
        <div className="w-full">
            <div className="flex justify-between border-b border-slate-300 pb-2">
                <div>Unlocked balance</div>
                <div>{amount / 100} INR</div> {/* Display balance in INR */}
            </div>
            <div className="flex justify-between border-b border-slate-300 py-2">
                <div>Total Balance</div>
                <div>{(amount / 100) + (locked / 100)} INR</div> {/* Display total balance */}
            </div>
        </div>
    );
};
