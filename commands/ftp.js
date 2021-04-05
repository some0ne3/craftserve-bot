const Discord = require('discord.js');

module.exports.command = ["ftp"];

module.exports.callback = function(args, message) {
    const embed = new Discord.MessageEmbed()
        .setTitle("File Transfer Protocol")
        .setDescription('Najwygodniejszym sposobem na edycję plików serwerowych jest skorzystanie z **FTP**. Wystarczy ściągnąć klienta FTP o nazwie **FileZilla** i wpisać poniższe dane:\n\nFilezillę można pobrać z [tego linku](https://filezilla-project.org/download.php?type=client).\n**Uwaga: instalator może zasugerować instalacje dodatkowego oprogramowania, NIE NALEŻY SIĘ NA NIĄ ZGADZAĆ**')
        .setColor(0x224d21)
        .setImage(`https://support.craftserve.pl/hc/article_attachments/360027107772/sdFBsSi.png`)
        .setFooter(`Komenda !ftp | ${message.author.tag}`)
        .setTimestamp()
            message.channel.send(embed);
}