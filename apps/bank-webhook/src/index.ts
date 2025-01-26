import express from "express";
import db from "@repo/db/client";

const app = express();

// Middleware to parse JSON body
app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
    // Debugging: Log incoming request
    console.log("Headers:", req.headers);
    console.log("Body:", req.body);

    // Validate required fields
    if (!req.body.token || !req.body.user_identifier || !req.body.amount) {
        return res.status(400).json({
            message: "Invalid request. Missing required fields.",
        });
    }

    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount,
    };

    try {
        // Perform database transactions
        await db.$transaction([
            db.balance.updateMany({
                where: { userId: Number(paymentInformation.userId) },
                data: {
                    amount: { increment: Number(paymentInformation.amount) },
                },
            }),
            db.onRampTransaction.updateMany({
                where: { token: paymentInformation.token },
                data: { status: "Success" },
            }),
        ]);

        // Send success response
        res.json({ message: "Captured" });
    } catch (e) {
        console.error("Error:", e);
        res.status(500).json({
            message: "Error while processing webhook",
        });
    }
});

app.listen(3003, () => {
    console.log("Server is running on port 3003");
});
