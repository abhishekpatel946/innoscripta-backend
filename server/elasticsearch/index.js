const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

async function createUsers(user = {}) {
	try {
		const { response } = await client.create({
			index: "users",
			id: 11,
			body: {
				name: user.displayName,
				email: user.emails.value,
				isEmailVerified: user.emails.verified,
				photo: user.photos[0].value,
				create_at: new Date(),
			},
		});
		console.log(response);
	} catch (error) {
		console.error(error);
	}
}

async function getUsers() {
	try {
		const body  = await client.get({
			index: "users",
			id: 11,
		});
        return body;
	} catch (error) {
		console.error(error);
	}
}

module.exports = { createUsers, getUsers };
