const Imap = require("imap");
const axios = require("axios");
const qs = require("qs");
const { google } = require("googleapis");
const { getUsers } = require("../elasticsearch");

const router = require("express").Router();


// TODO: tryning to implement the IMAP protocol to read email from google

// const getAcceToken = async (acc) => {
// 	try {
// 		const oauth2Client = new google.auth.OAuth2(
// 			process.env.CLIENT_ID,
// 			process.env.CLIENT_SECRET,
// 			process.env.REDIRECT_URL
// 		);

// 		// Set credentials
// 		oauth2Client.setCredentials({ access_token: acc });

// 		// Verify the token
// 		const credentials = await oauth2Client.getTokenInfo(acc);
// 		return credentials;
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

// const getMessages = async (token) => {
// 	try {
// 		const response = await axios.get("https://www.googleapis.com/gmail/v1/users/me/messages", {
// 			headers: {
// 				Authorization: `Bearer ${token}`, // Ensure correct token format
// 			},
// 			params: {
// 				q: "", // Include a query if needed, otherwise omit
// 			},
// 		});

// 		console.log(response.data);
// 		return response.data;
// 	} catch (error) {
// 		if (error.response) {
// 			// Server responded with a status other than 2xx
// 			console.error("Error fetching messages:", error.response.data);
// 		} else if (error.request) {
// 			// Request was made but no response received
// 			console.error("No response received:", error.request);
// 		} else {
// 			// Something else happened in making the request
// 			console.error("Error:", error.message);
// 		}
// 		throw error;
// 	}
// };

const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.CLIENT_URL);

const authorizationCode = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&redirect_uri=${process.env.REDIRECT_URL}&response_type=code&scope=https://www.googleapis.com/auth/gmail.readonly&access_type=offline`;

async function getAccessToken() {
	try {
		const { tokens } = await oauth2Client.getToken(authorizationCode);
		oauth2Client.setCredentials(tokens);
		console.log("Access Token:", tokens.access_token);
		console.log("Refresh Token:", tokens.refresh_token);
		return tokens.access_token;
	} catch (error) {
		console.log(error);
	}
}

async function getMessages(accessToken) {
	try {
		const response = await axios.get("https://www.googleapis.com/gmail/v1/users/me/messages", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		console.log(response.data);
	} catch (error) {
		if (error.response) {
			console.error("Error fetching messages:", error.response.data);
		} else if (error.request) {
			console.error("No response received:", error.request);
		} else {
			console.error("Error:", error.message);
		}
	}
}

router.get("/list", async (req, res) => {
	// const xoauth2Token = `user=${req.user._json.email}\u0001auth=Bearer ${
	// 	req.headers.authorization.split(" ")[1]
	// }\u0001\u0001`;
	// console.log("Listening...", xoauth2Token);

	// const imap = new Imap({
	// 	user: req.user._json.email,
	// 	// password: "",
	// 	host: "imap.gmail.com",
	// 	port: 993,
	// 	tls: true,
	// 	xoauth2: xoauth2Token,
	// });

	// console.log(imap);

	// imap.once("ready", () => {
	// 	imap.openBox("INBOX", true, (err) => {
	// 		if (err) {
	// 			console.log(err);
	// 			imap.end();
	// 		}

	// 		// Search for emails with the magic link subject
	// 		imap.search([["SUBJECT", "Unstopable"]], (err, results) => {
	// 			if (err) throw err;

	// 			const emailId = results[0]; // Assuming the first result is the correct email
	// 			console.log("This is the email address: " + emailId);
	// 			const email = imap.fetch(emailId, { bodies: "" });
	// 		});
	// 	});
	// });

	// imap.login((err) => {
	// 	if (err) {
	// 		console.error(err);
	// 	} else {
	// 		console.log("Authenticated successfully!");
	// 	}
	// });

	// imap.connect((err) => {
	// 	if (err) {
	// 		console.error(err);
	// 	} else {
	// 		console.log("Connected to IMAP server!");
	// 	}
	// });

	// const accessToken = await getAccessToken();
	// const msgs = await getMessages(accessToken);

	// const credentials = await getAcceToken(req.headers.authorization.split(" ")[1]);
	// console.log("Access token: " + credentials);

	// const msg = await getMessages(req.headers.authorization.split(" ")[1]);
	// console.log("Message: " + msg);

	// const result = await axios.get("https://www.googleapis.com/gmail/v1/users/me", {
	// 	withCredentials: true,
	// 	headers: {
	// 		Authorization: req.headers.authorization,
	// 	},
	// });
	// console.log(result);

	try {
		const data = await getUsers();

		res.status(200).json({
			error: false,
			message: "Successfully fetched list",
			users: data,
		});
	} catch (error) {
		console.log("Error: " + error.message);
	}
});

module.exports = router;
