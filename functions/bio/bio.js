const querystring = require('querystring');
const fetch = require('node-fetch');

const handler = async (event) => {
    try {
        const payload = querystring.parse(event.body);
        const name = payload.text;
        const resUrl = payload.response_url;
        let response;
        try {
            let parseName = name.toLowerCase().replace(/ /gm, '');
            response = require(`./bios/${parseName}.json`);
        }

        catch (error) {
            console.error(error);
            response = { text: ":x: That person was not found!" };
        }

        await fetch(resUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.assign({ text: `${name}'s bio!` }, response)),
        })

        return {
            statusCode: 200
        }
    } catch (error) {
        return { statusCode: 500, body: error.toString() }
    }
}

module.exports = { handler }