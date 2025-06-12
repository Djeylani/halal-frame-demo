export default async function handler(req, res) {
    // Enhanced debugging
    console.log('Request details:', {
        method: req.method,
        headers: req.headers,
        body: JSON.stringify(req.body, null, 2)
    });

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        // Validate Farcaster frame message
        const { untrustedData, trustedData } = req.body;
        
        // Enhanced validation
        if (!untrustedData || !trustedData) {
            console.error('Missing data:', { untrustedData, trustedData });
            return res.status(400).json({ 
                error: "Invalid frame request",
                missing: {
                    untrustedData: !untrustedData,
                    trustedData: !trustedData
                }
            });
        }

        // Validate required fields
        const requiredFields = ['fid', 'url', 'messageHash', 'timestamp'];
        const missingFields = requiredFields.filter(field => !untrustedData[field]);
        
        if (missingFields.length > 0) {
            console.error('Missing required fields:', missingFields);
            return res.status(400).json({
                error: "Missing required fields",
                fields: missingFields
            });
        }

        // Rest of your existing code...
        const buttonIndex = untrustedData.buttonIndex || 1;
        const currentPage = parseInt(buttonIndex, 10);
        const totalPages = 3;
        const nextPage = currentPage < totalPages ? currentPage + 1 : 1;

        const frameData = [
            {
                title: "Shariah Principles",
                images: "https://i.imgur.com/AfASFc2.png",
                section: "Introduction",
            },
            {
                title: "Shariah Principles", // Fixed typo
                images: "https://i.imgur.com/1q6TiTY.png",
                section: "Principles",
            },
            {
                title: "Build a Zakat App",
                images: "https://i.imgur.com/8dmho4J.png",
                section: "Mini-App Idea",
            }
        ];

        const nextFrame = frameData[nextPage - 1];
        
        // Return minimal valid Farcaster frame HTML
        const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta property="fc:frame" content="vNext">
    <meta property="fc:frame:image" content="${nextFrame.images}">
    <meta property="fc:frame:button:1" content="${nextPage < totalPages ? 'Next ➡️' : 'Restart 🔄'}">
    <meta property="fc:frame:post_url" content="https://halal-frame-demo.vercel.app/api/frame">
</head>
</html>`;

        // Log outgoing response
        console.log('Sending frame response:', html);
        
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        return res.status(200).send(html);

    } catch (error) {
        console.error('Frame error:', {
            message: error.message,
            stack: error.stack,
            body: req.body
        });
        return res.status(500).json({ 
            error: 'Error processing frame request',
            details: error.message
        });
    }
}