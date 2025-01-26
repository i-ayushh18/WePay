"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
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
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [amount, setAmount] = useState(0);
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [loading, setLoading] = useState(false); // Loading state

  const handleAddMoney = async () => {
    if (amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    setLoading(true); // Set loading state to true
    try {
      await createOnRampTransaction(provider, amount * 100); // Assuming amount in smallest unit (e.g., paise)
      window.location.href = redirectUrl || ""; // Redirect to selected bank's net banking
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
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
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
            );
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
          <Button
            onClick={async () => {
              await createOnRampTransaction(provider, amount * 100);
              window.location.href = redirectUrl || "";
            }}
          >
            {loading ? "Processing..." : "Add Money"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
