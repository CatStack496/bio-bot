const querystring = require('querystring');
const fetch = require('node-fetch');

const handler = async (event, context) => {
    try {
        const payload = querystring.parse(event.body);
        // This gets any parameters received from the command as a String
        // In this case it should only ever be a name
        const name = payload.text;
        // We can use this URL to send a contextual response back for < 3 mins
        const resUrl = payload.response_url;
        // Remove spaces from `name` for use in a URL
        const parseName = name.replace(/ /gm, '');
        // A URL could probably be hard-coded here, but we can also get the current URL from the request headers or context
        const siteUrl = event.headers['x-forwarded-host'] || extractNetlifySiteFromContext(context);
        // Form the URL to get the JSON data from
        const jsonUrl = `https://${siteUrl}/${parseName}.json`;
        // Try to find `parseName.json` and set its contents as the value
        let response = await fetch(jsonUrl, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .catch(error => console.error(error))
            // If `parseName.json` does not exist (or another error occurs) this is set as the value
            || { text: ":x: That person was not found!" }

        await fetch(resUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // This provides a message preview for notifications since they cannot display blocks and then appends it to the `response`
            body: JSON.stringify(Object.assign({ text: `${name}'s bio!` }, response)),
        })

        return {
            // Slack requires an http 200 response for every request or it will error
            statusCode: 200
        }
    } catch (error) {
        // Let Slack know if we encountered an error
        return { statusCode: 500, body: error.toString() }
    }
}

module.exports = { handler }

function extractNetlifySiteFromContext(context) {
    data = context.clientContext.custom.netlify
    decoded = JSON.parse(Buffer.from(data, "base64").toString("utf-8"))
    return decoded;
}