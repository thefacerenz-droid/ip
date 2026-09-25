export default async function handler(request) {
    try {
        // Get visitor IP from Vercel's forwarded headers
        const forwarded = request.headers.get("x-forwarded-for");

        const ip =
            forwarded?.split(",")[0]?.trim() ||
            request.headers.get("x-real-ip") ||
            "Unknown";

        // PUT YOUR NEW DISCORD WEBHOOK HERE
        const webhook = "PASTE_YOUR_NEW_WEBHOOK_HERE";

        // Send IP to Discord
        const discordResponse = await fetch(webhook, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: `🌐 Visitor IP: \`${ip}\``
            })
        });

        if (!discordResponse.ok) {
            console.error(
                "Discord error:",
                discordResponse.status,
                await discordResponse.text()
            );
        }

        return new Response(
            JSON.stringify({ ip }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-store"
                }
            }
        );

    } catch (error) {
        console.error("Error:", error);

        return new Response(
            JSON.stringify({
                error: error.message
            }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
    }
}
