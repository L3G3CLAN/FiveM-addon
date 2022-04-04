const discord = require("discord.js");
const fivem = require("discord-fivem-api");
const fs = require("fs");
const ip = JSON.parse(fs.readFileSync("./src/addons/fivem.json", "utf-8"));

//Hier mee haal je het ip op uit /src/addons/fivem-ip.json
const server = new fivem.DiscordFivemApi(`${ip.server_ip}`);

module.exports.run = async (client, message, args) => {

    //Hier mee krijg je de aantal bewooners in de stad.
    const playersOnline = await server.getPlayersOnline()

    //Hier mee krijg je de Max aantal bewooners in de stad.
    const maxPlayers = await server.getMaxPlayers()

    if (playersOnline > 0) {

        var onlineEmbed = new discord.MessageEmbed()
                .setTitle(`${ip.players} ${playersOnline}/${maxPlayers}`)
        //        .setTitle(`${ip.players} ${players}`)
                .setDescription("*Hint*\n *je kan ook de knop hier onder indruken!*")
                .setAuthor(`${ip.online}`)
                .setColor(process.env.COLLOR)
                .setThumbnail(process.env.LOGO)
                .setImage(process.env.BANNER)
                .setTimestamp()
                .setFooter("Join Optus Roleplay")
        
            const row = new discord.MessageActionRow().addComponents(
        
                new discord.MessageButton()
                    .setLabel("Join Gelijk")
                    .setStyle("LINK")
                    .setEmoji("🎮")
                    .setURL("https://cfx.re/join/lxz7q4")
        
            );

            message.channel.send({ embeds: [onlineEmbed], components: [row] }).then(msg => {
                message.delete()
                setTimeout(() => msg.delete(), 20000);
            });

    } else if (playersOnline == 0) {

        var oflineEmbed = new discord.MessageEmbed()
//        .setTitle(`${ip.players} ${playersOnline}/${maxPlayers}`)
        .setTitle(`${ip.players} ${ip.no_players}`)
        .setDescription("*Hint*\n *je kan ook de knop hier onder indruken!*")
        .setAuthor(`${ip.online}`)
        .setColor(process.env.COLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setTimestamp()
        .setFooter("Join Optus Roleplay")

    const row = new discord.MessageActionRow().addComponents(

        new discord.MessageButton()
            .setLabel("Join Gelijk")
            .setStyle("LINK")
            .setEmoji("🎮")
            .setURL("https://cfx.re/join/lxz7q4")

    );

    message.channel.send({ embeds: [oflineEmbed], components: [row] }).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 20000);
    });

    }

}

module.exports.help = {
    name: "join",
    category: "add ons",
    discription: "Dit is een command die jou de server ip info geeft."
}