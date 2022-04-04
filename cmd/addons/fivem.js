const discord = require("discord.js");
const fivem = require("discord-fivem-api");
const fs = require("fs");
const FiveM = JSON.parse(fs.readFileSync("./src/addons/fivem.json", "utf-8"));

//With this you get the IP from /src/addons/fivem.json
const server = new fivem.DiscordFivemApi(`${FiveM.server_ip}`);

module.exports.run = async (client, message, args) => {

    //This gives you the number of Citizens in the city.
    const playersOnline = await server.getPlayersOnline()

    //This will give you the Max number of Citizens in the city.
    const maxPlayers = await server.getMaxPlayers()

    if (playersOnline > 0) {

        var onlineEmbed = new discord.MessageEmbed()
                .setTitle(`${FiveM.players} ${playersOnline}/${maxPlayers}`)
                .setDescription(`${FiveM.embed_disc}`)
                .setAuthor(`${FiveM.online}`)
                .setColor(process.env.COLLOR)
                .setThumbnail(process.env.LOGO)
                .setImage(process.env.BANNER)
                .setTimestamp()
                .setFooter(`${FiveM.embed_footer}`)
        
            const row = new discord.MessageActionRow().addComponents(
        
                new discord.MessageButton()
                    .setLabel(`${FiveM.join_label}`)
                    .setStyle("LINK")
                    .setEmoji("🎮")
                    .setURL(`${FiveM.join_url}`)
        
            );

            message.channel.send({ embeds: [onlineEmbed], components: [row] }).then(msg => {
                message.delete()
                setTimeout(() => msg.delete(), 20000);
            });

    } else if (playersOnline == 0) {

        var oflineEmbed = new discord.MessageEmbed()
        .setTitle(`${FiveM.players} ${FiveM.no_players}`)
        .setDescription(`${FiveM.embed_disc}`)
        .setAuthor(`${FiveM.online}`)
        .setColor(process.env.COLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setTimestamp()
        .setFooter(`${FiveM.embed_footer}`)

    const row = new discord.MessageActionRow().addComponents(

        new discord.MessageButton()
        .setLabel(`${FiveM.join_label}`)
        .setStyle("LINK")
        .setEmoji("🎮")
        .setURL(`${FiveM.join_url}`)

    );

    message.channel.send({ embeds: [oflineEmbed], components: [row] }).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 20000);
    });

    }

}

module.exports.help = {
    name: "fivem",
    category: "add ons",
    discription: FiveM.disc
}