import fetch from 'node-fetch';
import FormData from 'form-data';
import followRedirect from 'follow-redirect-url';
import { clearUserMessages } from './user.js';

const getFinalUrl = async (url) => {
	return followRedirect.startFollowing(url).then(redirects => {
		return redirects.pop()?.url;
	}, reason => {
		return { error: true, reason };
	});
};

const checkVirusTotal = async (string) => {
	console.log(`[VirusTotal] scanning...`);

	const form = new FormData();
	form.append('url', string);

	const virusTotalAnalyseIdRes = await fetch('https://www.virustotal.com/api/v3/urls', {
		headers: { 'x-apikey': process.env.VIRUSTOTAL_KEY },
		method: 'POST',
		body: form,
	}).catch(reason => {
		return { error: true, reason };
	});

	const analyseId = (await (await virusTotalAnalyseIdRes).json()).data?.id;
	const virusTotalAnalyseRes = await fetch(`https://www.virustotal.com/api/v3/analyses/${analyseId}`,
		{ headers: { 'x-apikey': process.env.VIRUSTOTAL_KEY } })
		.catch(reason => {
			return { error: true, reason };
		});
	const analyse = await (await virusTotalAnalyseRes).json();
	const malicious = analyse.data?.attributes?.stats?.malicious;
	console.log(analyse);
	console.log('[VirusTotal]', malicious + 'x malicious');
	return malicious;
};

const checkGSB = async (string) => {
	let finalUrl = await getFinalUrl(string);
	if (finalUrl.error) {
		console.log(`[GSB] Error scanning ${string}: ${finalUrl.reason}`);
		return { error: true };
	}
	console.log(`[GSB] scanning(${finalUrl})...`);

	const gsbRes = await fetch('https://transparencyreport.google.com/transparencyreport/api/v3/safebrowsing/status?site=' + finalUrl)
		.catch(reason => {
			return { error: true, reason };
		});
	let resArr = JSON.parse((await gsbRes.text()).split('\n').pop())[0];

	let title, unsafe, moreInfoArr = [];
	switch (resArr[1]) {
	case 5:		// unsafe
		title = 'This site hosts files that are not commonly downloaded';
		unsafe = true;
		break;
	case 3:		// unsafe
		title = 'Some pages on this site are unsafe';
		unsafe = true;
		break;
	case 2:		// unsafe
		title = 'This site is unsafe';
		unsafe = true;
		break;
	case 1:		// safe
		title = 'No unsafe content found';
		unsafe = false;
		break;
	default:	// unknown result
		title = 'No available data';
		unsafe = false;
	}

	if (resArr[2] === 1) moreInfoArr.push('Sends visitors to harmful websites');
	if (resArr[3] === 1) moreInfoArr.push('3rd number has unknown value');
	if (resArr[4] === 1) moreInfoArr.push('Tries to trick visitors into sharing personal info or downloading software');
	if (resArr[5] === 1) moreInfoArr.push('Contains unwanted or malicious software');
	if (resArr[6] === 1) moreInfoArr.push('6th number has unknown value');

	const result = { unsafe, title, moreInfoArr };
	console.log(`[GSB]`, result);

	return result;
};

const checkPhishing = async (message, client) => {
	const messageArray = message.content.split(/\s/);
	const regExp = /[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/gi;

	for (let string of messageArray) {
		if (messageArray.filter(v => client.blockedDomains.some(el => v.includes(el))).length > 0) return true;
		if (regExp.test(string)) {
			string = string.match(regExp)[0];
			console.log(`Found url (${string}) ...`);
			const gsb = await checkGSB(string);
			if (!gsb.error && gsb.unsafe) return true;
			const virusTotal = await checkVirusTotal(string);
			if (!virusTotal.error && virusTotal > 0) return true;
		}
	}
	return false;
};

export const handlePhishingMessage = async (message, client) => {
	const isPhishing = await checkPhishing(message, client);

	if (!isPhishing) return;

	try {
		await message.delete();
		await clearUserMessages(message.author.id, message.guild.id, client);
	} catch (e) {
		console.log(e);
	}
};
export const updateDomains = async (client) => {
	const certRes = await fetch(`https://hole.cert.pl/domains/domains.txt`).catch(r => console.log(r));
	const text = await certRes.text();
	client.blockedDomains = text.split('\n');
};

