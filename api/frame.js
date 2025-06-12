export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed"});
    }

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

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${nextFrame.title}</title>
    <meta property="og:title" content="${nextFrame.title}">
    <meta property="og:image" content="${nextFrame.images}">
    <meta property="fc:frame:post_url" content="https://your-vercel-app.com/api/frame?page=${nextPage}">
    <meta property="fr:frame:button1" content="${nextPage < totalPages ? 'Next ➡️' : 'Restart 🔄'}">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
        <style>
            body { font-family: 'Inter', sans-serif; }
        </style>
    </head>
    <body class="bg-gray-100 flex items-center justify-center min-h-screen">
        <div class="text-center p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg">
            <h1 class="text-3xl font-bold text-blue-900">${nextFrame.title}</h1>
            <p class="text-gray-600 mt-4">Section ${nextPage}: ${nextFrame.section}</p>
            <p class="text-sm text-gray-500 mt-2">Click the button to continue.</p>
        </div>
    </body>
</head>
</html>
    `;
    const finalHtml = html.replace(
      'https://your-vercel-app.com',
      process.env.VERCEL_URL || 'https://your-vercel-app.vercel.app'
    );

    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(finalHtml);
}