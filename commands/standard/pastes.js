import { ContextMenuCommandBuilder } from 'discord.js';
import { fetch } from 'undici';

const uploadContent = async (content, extension) => {
	if(!content) return null;

	const request = await fetch('https://api.pastes.dev/post', {
		method: 'POST',
		headers: {
			'Content-Type': `text/${extension}`,
			'User-Agent': 'DiscordBot (craftservebot)',
		},
		body: content,
	});

	if(!request.ok) return null;
	else return await request.json();
};

export default {
	...new ContextMenuCommandBuilder()
		.setName('Wyślij plik')
		.setType(3)
		.toJSON(),
	async execute(interaction) {
		const message = interaction.options?.get('message')?.message;

		const allowedExtensions = ['js', 'json', 'html', 'css', 'scss', 'ts', 'tsx', 'jsx', 'md', 'markdown', 'py', 'rb', 'php', 'c', 'cpp', 'cs', 'go', 'java', 'kt', 'ktm', 'kts', 'rs', 'swift', 'sql', 'yaml', 'yml', 'xml', 'toml', 'ini', 'sh', 'bat', 'ps1', 'psm1', 'psd1', 'ps1xml', 'psc1', 'pssc', 'reg', 'csv', 'tsv', 'log', 'txt'];
		const files = message.attachments.filter(file => allowedExtensions.includes(file.name.split('.').pop()));

		if(!files.size) {
			return interaction.reply({ content: 'Wiadomość nie zawiera żadnych załączników', ephemeral: true });
		}

		await interaction.deferReply();
		const pastes = [];

		for(const file of files.values()) {
			const content = await fetch(file.url).then(res => res.text());

			const paste = await uploadContent(content, file.name.split('.').pop());

			if(paste) pastes.push({ file: file.name, key: paste.key });
		}

		await interaction.editReply({
			content: pastes.map(paste => `\`${paste.file}\`: <https://pastes.dev/${paste.key}>`).join('\n'),
		});
	},
};