import fetch from 'node-fetch';

const checkPhishing = async (message, client) => {
	const messageArray = message.content.split(/ +/);

	for (let string of messageArray) {
		if (client.blockedDomains.includes(string)) return true;
	}
	return false;
};

export const handlePhishingMessage = async (message, client) => {
	const isPhishing = await checkPhishing(message, client);

	if (!isPhishing) return;

	try {
		await message.delete();
	} catch (e) {
		console.log(e);
	}
};
export const updateDomains = async (client) => {
	const certRes = await fetch(`https://hole.cert.pl/domains/domains.txt`).catch(r => console.log(r));
	const text = await certRes.text();
	client.blockedDomains = text.split('\n');
};

