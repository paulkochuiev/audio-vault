const base = process.env.PAYPAL_API_URL || "https://api-m.sandbox.paypal.com";

export const paypal = {};

const generateAccessToken = async () => {
  const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;

  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`).toString(
    "base64"
  );

  const res = await fetch(`${base}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-type": "application/x-www-form-urlencoded",
    },
  });

  if (res.ok) {
    const jsonData = await res.json();

    return jsonData.access_token;
  } else {
    const errorMessage = await res.text();

    throw new Error(errorMessage);
  }
};

export { generateAccessToken };
