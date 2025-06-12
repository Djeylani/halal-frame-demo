export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        // Get the current page from the validated message data
        const currentPage = parseInt(req.query.page || 1, 10);
        const totalPages = 3;
        const nextPage = currentPage < totalPages ? currentPage + 1 : 1;

        const frameData = [
            {
                title: "Shariah Principles",
                images: "https://i.imgur.com/AfASFc2.png",
                section: "Introduction",
            },
            {
                title: "Shiariah Principles",
                images: "https://i.imgur.com/1q6TiTY.png",
                section: "Principles",
            },
            {
                title: "Build a Zakat App",
                images: "https://i.imgur.com/8dmho4J.png",
                section: "Mini-App Idea",
            },
        ];

        const nextFrame = frameData[nextPage - 1];
        
        // Add required frame response headers
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${nextFrame.title}</title>
    <meta property="fc:frame" content="vNext">
    <meta property="og:title" content="${nextFrame.title}">
    <meta property="og:image" content="${nextFrame.images}">
    <meta property="fc:frame:image" content="${nextFrame.images}">
    <meta property="fc:frame:post_url" content="https://halal-frame-demo.vercel.app/api/frame?page=${nextPage}">
    <meta property="fc:frame:button:1" content="${nextPage < totalPages ? 'Next ➡️' : 'Restart 🔄'}">
</head>
</html>`;

        return res.status(200).send(html);
    } catch (error) {
        console.error('Frame error:', error);
        return res.status(500).json({ error: 'Error processing frame request' });
    }
}