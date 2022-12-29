import { fetch } from 'undici';
import FormData from 'form-data';
import followRedirect from 'follow-redirect-url';
import { clearUserMessages } from './user.js';
import ServerSettings from '../models/ServerSettings.js';

let blacklistCERT = [];

const getFinalUrl = async (url) => {
	return followRedirect.startFollowing(url, { max_redirect_length: 25, request_timeout: 10000 }).then(redirects => {
		return redirects.pop()?.url;
	}, reason => {
		return { error: true, reason };
	});
};

const checkVirusTotal = async (string) => {
	const finalUrl = await getFinalUrl(string);
	if (finalUrl.error) {
		console.log(`[VirusTotal] Error scanning ${string}: ${finalUrl.reason}`);
		return { error: true };
	}
	console.log(`[VirusTotal] scanning(${finalUrl})...`);

	const form = new FormData();
	form.append('url', finalUrl);

	const virusTotalAnalyseIdJson = await fetch('https://www.virustotal.com/api/v3/urls', {
		headers: { 'x-apikey': process.env.VIRUSTOTAL_KEY },
		method: 'POST',
		body: form,
	}).then(response => response.json(), reason => {
		return { error: true, reason };
	});

	const analyseId = virusTotalAnalyseIdJson.data?.id;

	if (!analyseId) return { error: true, reason: 'Error getting analyseId from url.' };

	const virusTotalAnalyseJson = await fetch(`https://www.virustotal.com/api/v3/analyses/${analyseId}`,
		{ headers: { 'x-apikey': process.env.VIRUSTOTAL_KEY } })
		.then(response => response.json(), reason => {
			return { error: true, reason };
		});
	const malicious = virusTotalAnalyseJson.data?.attributes?.stats?.malicious;

	if (!malicious && malicious !== 0) {
		return {
			error: true,
			reason: 'Error getting malicious stats from analyseId ' + analyseId,
		};
	}

	console.log('[VirusTotal]', malicious + 'x malicious');
	return malicious;
};

const checkGSB = async (string) => {
	const finalUrl = await getFinalUrl(string);
	if (finalUrl.error) {
		console.log(`[GSB] Error scanning ${string}: ${finalUrl.reason}`);
		return { error: true };
	}
	console.log(`[GSB] scanning(${finalUrl})...`);

	const gsbRes = await fetch('https://transparencyreport.google.com/transparencyreport/api/v3/safebrowsing/status?site=' + finalUrl)
		.catch(reason => {
			return { error: true, reason };
		});
	const resArr = JSON.parse((await gsbRes.text()).split('\n').pop())[0];

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

	const result = { unsafe, title, moreInfoArr };
	console.log('[GSB]', result);

	return result;
};

const checkPhishing = async (message) => {
	const messageArray = message.content.split(/\s/);
	const regExp = /[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?/gi;

	if (messageArray.filter(v => blacklistCERT?.some(el => v.includes(el))).length > 0) {
		console.log('[CERT] Found blocked domain inside a message');
		return true;
	}

	for (let string of messageArray) {
		if (regExp.test(string)) {
			string = string.match(regExp)[0];
			console.log(`Found url (${string}) ...`);
			const gsb = await checkGSB(string);
			if (!gsb.error && gsb.unsafe) return true;
			const virusTotal = await checkVirusTotal(string);
			if (!virusTotal?.error && virusTotal > 0) return true;
		}
	}
	return false;
};

export const handlePhishingMessage = async (message, client) => {
	const isEnabled = (await ServerSettings.findOne({ server_id: message.guild.id }))?.anty_phishing_enabled;
	if (isEnabled !== true) return;

	const isPhishing = await checkPhishing(message);

	if (!isPhishing) return;

	try {
		await message.delete();
		await clearUserMessages(message.author.id, message.guild.id, client);
	} catch (e) {
		console.log(e);
	}
};
export const updateDomains = async () => {
	const certRes = await fetch('https://hole.cert.pl/domains/domains.txt').catch(r => console.log(r));
	const text = await certRes.text();
	blacklistCERT = text.split('\n');
};

