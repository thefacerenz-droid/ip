export default async function handler(request) {
    try {
        const forwarded = request.headers.get("x-forwarded-for");

        const ip =
            forwarded?.split(",")[0]?.trim() ||
            request.headers.get("x-real-ip") ||
            "Unknown";

        // Put your NEW Discord webhook between the quotes
        const webhook =
            "PASTE_YOUR_NEW_DISCORD_WEBHOOK_HERE";

        // Send IP to Discord
        if (webhook !== "PASTE_YOUR_NEW_DISCORD_WEBHOOK_HERE") {
            await fetch(webhook, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    content: `🌐 Visitor IP: \`${ip}\``
                })
            });
        }

        return new Response(
            JSON.stringify({
                ip: ip
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                    "Cache-Control": "no-store"
                }
            }
        );

    } catch (error) {
        console.error(error);

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
