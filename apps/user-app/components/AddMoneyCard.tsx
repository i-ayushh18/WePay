"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl || "");
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [loading, setLoading] = useState(false);

  const handleAddMoney = async () => {
    if (amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    setLoading(true); 
    try {
      await createOnRampTransaction(provider, amount * 100);
      window.location.href = redirectUrl || ""; 
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(value) => {
            setAmount(Number(value));
          }}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
          onSelect={(value) => {
            const selectedBank = SUPPORTED_BANKS.find((x) => x.name === value);
            if (selectedBank) {
              setRedirectUrl(selectedBank.redirectUrl);
              setProvider(selectedBank.name);
            }
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div
          style={{
            opacity: loading ? 0.5 : 1,
            pointerEvents: loading ? "none" : "auto",
          }}
        >
          <Button onClick={handleAddMoney}>
            {loading ? "Processing..." : "Add Money"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
