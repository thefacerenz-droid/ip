export default async function handler(request) {
    try {
        // Get visitor's public IP from Vercel's forwarded headers
        const forwardedFor = request.headers.get("x-forwarded-for");

        const ip =
            forwardedFor?.split(",")[0]?.trim() ||
            request.headers.get("x-real-ip") ||
            "Unknown";

        // PUT YOUR NEW DISCORD WEBHOOK BETWEEN THESE QUOTES
        const webhook = "https://discord.com/api/webhooks/1545864793267642378/IDuVmb0NJeGzVfw_oO5-_r3wsZd2-3rNc2vxG5rNUa0zrCNJPTGTSg_vsOkpsmSzFVkW";

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
            const errorText = await discordResponse.text();

            return new Response(
                JSON.stringify({
                    error: "Discord webhook failed",
                    details: errorText
                }),
                {
                    status: 500,
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
        }

        return new Response(
            JSON.stringify({
                ip: ip
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

    } catch (error) {
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
