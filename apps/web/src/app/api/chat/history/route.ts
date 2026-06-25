import { prisma } from "@/lib/prisma/prisma";
import { getOrCreateConversation, getOrCreateVisitor } from "@/lib/actions/visitor";

export async function GET() {
    const visitor = await getOrCreateVisitor()
    const conversation = await getOrCreateConversation(visitor.id)

    const messages = await prisma.message.findMany({
        where: { conversationId: conversation.id },
        orderBy: { createdAt: "asc" },
    })

    return Response.json({
        messages: messages.map((m) => ({
            id: m.id,
            role: m.role,
            parts: [{ type: "text", text: m.content }],
        })),
    })
}