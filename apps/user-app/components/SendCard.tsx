"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
    const [number, setNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("info"); // 'success' or 'error'

    const handleSend = async () => {
        if (!number || !amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            setMessage("Please enter a valid number and amount.");
            setMessageType("error");
            return;
        }

        setLoading(true);
        setMessage("");
        try {
            await p2pTransfer(number, Number(amount) * 100);
            setMessage("Transfer successful!");
            setMessageType("success");
        } catch (error) {
            setMessage("Transfer failed. Please try again.");
            setMessageType("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="h-[90vh] flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-gray-100">
            <Card title="Send Money" className="shadow-lg rounded-2xl w-96 p-6">
                <div className="min-w-72 pt-4">
                    <TextInput
                        placeholder="Enter recipient's number"
                        label="Recipient Number"
                        aria-label="Phone Number"
                        onChange={(value) => setNumber(value)}
                        className="mb-4"
                    />
                    <TextInput
                        placeholder="Enter amount"
                        label="Amount"
                        type="number"
                        aria-label="Amount"
                        onChange={(value) => setAmount(value)}
                        className="mb-4"
                    />
                    <div className="pt-4 flex justify-center">
                        <Button
                            onClick={handleSend}
                            disabled={loading}
                            className={`w-full py-2 rounded-md transition-transform transform ${
                                loading ? "opacity-60 cursor-not-allowed" : "hover:scale-105"
                            }`}
                        >
                            {loading ? "Processing..." : "Send Money"}
                        </Button>
                    </div>
                    {message && (
                        <p
                            className={`pt-4 text-center text-sm ${
                                messageType === "success" ? "text-green-500" : "text-red-500"
                            }`}
                        >
                            {message}
                        </p>
                    )}
                </div>
            </Card>
        </div>
    );
}
