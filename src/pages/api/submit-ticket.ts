import type { NextApiRequest, NextApiResponse } from 'next';

type TicketData = {
    ticketId: string;
    userName: string;
    userEmail: string;
    requestType: string;
    description: string;
    pageUrl: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }

    try {
        const {
            ticketId,
            userName,
            userEmail,
            requestType,
            description,
            pageUrl,
        } = req.body as TicketData;

        // Basic validation
        if (!ticketId || !userName || !userEmail || !requestType || !description || !pageUrl) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const adminChatId = process.env.TELEGRAM_ADMIN_CHAT_ID;

        if (!botToken || !adminChatId) {
            console.error('Telegram credentials are not set in environment variables.');
            return res.status(500).json({ message: 'Server configuration error' });
        }

        // Construct the HTML message
        const messageText = `
<b>New Support Ticket Submitted</b>

<b>Ticket ID:</b> ${ticketId}
<b>User:</b> ${userName}
<b>Email:</b> <a href="mailto:${userEmail}">${userEmail}</a>
<b>Type:</b> ${requestType}

<b>Description:</b>
${description}
    `.trim();

        // Construct the Telegram API payload
        const telegramPayload: any = {
            chat_id: adminChatId,
            text: messageText,
            parse_mode: 'HTML',
        };

        // Only add the button if the URL is not localhost, as Telegram rejects localhost URLs
        if (!pageUrl.includes('localhost') && !pageUrl.includes('127.0.0.1')) {
            telegramPayload.reply_markup = {
                inline_keyboard: [
                    [
                        { text: 'View Ticket in Admin Panel', url: pageUrl },
                    ],
                ],
            };
        }

        // Send request to Telegram
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(telegramPayload),
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Telegram API responded with error:', data);
            return res.status(502).json({ message: 'Failed to send notification to Telegram', error: data });
        }

        return res.status(200).json({ success: true, message: 'Ticket processed and notification sent.' });

    } catch (error) {
        console.error('Error processing ticket submission:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
