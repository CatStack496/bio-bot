const querystring = require('querystring');
const fetch = require('node-fetch');

const handler = async (event) => {
    try {
        const payload = querystring.parse(event.body);
        const name = payload.text;
        const resUrl = payload.response_url;
        let response;
        switch (name) {
            case "Kevin Long":
                response = {
                    "blocks": [
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": "Kevin Long is a Senior at Elder High School. :elder: He is the president of Elder's INTERalliance chapter as well as the Chief Chapters Officer for the INTERalliance of Greater Cincinnati. He has experience working primarily with JavaScript and other web technologies; however, he has also taken courses on development with Java."
                            },
                            "accessory": {
                                "type": "image",
                                "image_url": "https://media-exp1.licdn.com/dms/image/C5603AQHiB7OKCLKoHA/profile-displayphoto-shrink_400_400/0/1612997236551?e=1619654400&v=beta&t=bAxinIr8IKb0IPXHlCx3VNM4L_fbxSWmCLD4szCPtoE",
                                "alt_text": "Kevin Long"
                            }
                        },
                        {
                            "type": "divider"
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": "*Some of his interests include:*"
                            }
                        },
                        {
                            "type": "section",
                            "fields": [
                                {
                                    "type": "mrkdwn",
                                    "text": ":swimmer: Swimming"
                                },
                                {
                                    "type": "mrkdwn",
                                    "text": ":computer: Technology"
                                },
                                {
                                    "type": "mrkdwn",
                                    "text": ":books: Learning"
                                },
                                {
                                    "type": "mrkdwn",
                                    "text": ":mountain_bicyclist: Mountain Biking"
                                },
                                {
                                    "type": "mrkdwn",
                                    "text": ":camera: Videography"
                                }
                            ]
                        },
                        {
                            "type": "divider"
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": "Check out his personal profiles:"
                            }
                        },
                        {
                            "type": "actions",
                            "elements": [
                                {
                                    "type": "button",
                                    "text": {
                                        "type": "plain_text",
                                        "text": ":github: GitHub",
                                        "emoji": true
                                    },
                                    "url": "https://github.com/kevinuulong",
                                    "action_id": "actionId-00"
                                },
                                {
                                    "type": "button",
                                    "text": {
                                        "type": "plain_text",
                                        "text": ":linkedin: LinkedIn",
                                        "emoji": true
                                    },
                                    "url": "https://www.linkedin.com/in/kevinuulong/",
                                    "action_id": "actionId-01"
                                },
                                {
                                    "type": "button",
                                    "text": {
                                        "type": "plain_text",
                                        "text": ":link: Personal Website",
                                        "emoji": true
                                    },
                                    "url": "https://kevinuulong.com",
                                    "action_id": "actionId-02"
                                }
                            ]
                        }
                    ]
                };
                break;

            default:
                response = { text: ":x: That person was not found!" };
                break;
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