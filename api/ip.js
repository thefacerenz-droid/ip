export default async function handler(request) {
    try {
        const ip =
            request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
            request.headers.get("x-real-ip") ||
            "Unknown";

        const webhook = "PASTE_YOUR_NEW_WEBHOOK_HERE";

        const discord = await fetch(webhook, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: `🌐 Visitor IP: \`${ip}\``
            })
        });

        if (!discord.ok) {
            return Response.json({
                ip,
                discord_error: await discord.text()
            }, { status: 500 });
        }

        return Response.json({ ip });

    } catch (error) {
        return Response.json({
            error: error.message
        }, { status: 500 });
    }
}
