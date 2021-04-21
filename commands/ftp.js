module.exports = {
    "name": "ftp",
    "options": [
        {
            "name": "Tekst",
            "description": "Tekst wyświetlany przed odpowiedzą bota",
            "type": 3,
            "required": false,
        },
    ],
    "description": "Zarządzanie plikami",
    "aliases": [],
    run: (bot, args, message) => {
        const embed = bot.embed
            .setTitle("File Transfer Protocol")
            .setDescription('Najwygodniejszym sposobem na edycję plików serwerowych jest skorzystanie z **FTP**. Wystarczy ściągnąć klienta FTP o nazwie **FileZilla** i wpisać poniższe dane:\n\nFilezillę można pobrać z [tego linku](https://filezilla-project.org/download.php?type=client).\n**Uwaga: instalator może zasugerować instalacje dodatkowego oprogramowania, NIE NALEŻY SIĘ NA NIĄ ZGADZAĆ**')
            .setImage(`https://support.craftserve.pl/hc/article_attachments/360027107772/sdFBsSi.png`)


        const text = args.join(" ");

        return message.channel.send(text, embed)
    }
}