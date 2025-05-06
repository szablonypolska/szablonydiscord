import { google } from 'googleapis';

export default async function refreshAccessToken() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GMAIL_CLIENT_ID,
    process.env.GMAIL_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground',
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_REFRESH_TOKEN,
  });

  try {
    const { token } = await oauth2Client.getAccessToken();

    if (!token) {
      throw new Error('Error on get access token');
    }

    return token;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
