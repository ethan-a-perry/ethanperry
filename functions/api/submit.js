/**
 * POST /api/submit
 */
export async function onRequestPost(context) {
    try {
        const body = await context.request.formData();
        const { name, email, phone, message, honeypot } = Object.fromEntries(body);

        if (honeypot) {
            return new Response('Message Failed: Flagged As Spam (Honeypot)', { status: 200 });
        }

        if (!name || !email || !message) {
            return new Response('Message Failed: Invalid Input', { status: 200 });
        }

        const reqBody = {
            fields: {
                Name: name,
                Email: email,
                ...(phone && { Phone: phone }),
                Message: message,
            },
        };

        const response = await createRecord(env, reqBody);

        if (!response.ok) {
            return new Response(`Message Failed: ${response.statusText}`, { status: 200 });
        }

        return new Response('Message Sent Successfully', { status: 200 });
    } catch (error) {
        return new Response(`Message Failed: ${error.message}`, { status: 200 });
    }
}

async function createRecord(env, body) {
    const AIRTABLE_API_KEY = env.AIRTABLE_API_KEY;
    const AIRTABLE_BASE_ID = env.AIRTABLE_BASE_ID;
    const AIRTABLE_TABLE_ID = env.AIRTABLE_TABLE_ID;

    try {
        return await fetch(
            `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_ID)}`,
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            },
        );
    } catch (error) {
        console.error('Error creating Airtable record:', error);
        throw error;
    }
}