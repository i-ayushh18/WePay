"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
    try {
        const session = await getServerSession(authOptions);
        const from = session?.user?.id;
        
        if (!from) {
            return {
                success: false,
                message: "Error while sending: User not authenticated."
            };
        }
        
        const toUser = await prisma.user.findFirst({
            where: {
                number: to
            }
        });

        if (!toUser) {
            return {
                success: false,
                message: "Error: User not found."
            };
        }
        
        const result = await prisma.$transaction(async (tx) => {
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`; // Locking the balance row for update
            
            const fromBalance = await tx.balance.findUnique({
                where: { userId: Number(from) },
            });
            
            if (!fromBalance || fromBalance.amount < amount) {
                return {
                    success: false,
                    message: 'Error: Insufficient funds.'
                };
            }

            await tx.balance.update({
                where: { userId: Number(from) },
                data: { amount: { decrement: amount } },
            });

            await tx.balance.update({
                where: { userId: toUser.id },
                data: { amount: { increment: amount } },
            });

            await tx.p2pTransfer.create({
                data: {
                    fromUserId: Number(from),
                    toUserId: toUser.id,
                    amount,
                    timestamp: new Date()
                }
            });

            return {
                success: true,
                message: "Transaction completed successfully."
            };
        });

        return result;
    } catch (error) {
        console.error("Error during p2pTransfer:", error);
        return {
            success: false,
            message: "An error occurred during the transaction."
        };
    }
}
