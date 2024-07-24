const events = process.env.EVENTS || 'true';
const botname = process.env.BOTNAME || 'DREADED';

const Events = async (client, Fortu) => {
    const Myself = await client.decodeJid(client.user.id);

    try {
        let metadata = await client.groupMetadata(Fortu.id);
        let participants = Fortu.participants;
        let desc = metadata.desc || "No Description";

        for (let num of participants) {
            let dpuser;

            try {
                dpuser = await client.profilePictureUrl(num, "image");
            } catch {
                dpuser = "https://telegra.ph/file/0a620a1cf04d3ba3874f5.jpg";
            }

            if (Fortu.action == "add") {
                let userName = num;

                let Welcometext = `
          Hello @${userName.split("@")[0]},
          
          Welcome to ${metadata.subject}.
          
          🧧 Group Description 🧧
          
          ${desc}
          
          Thank You.

         ${botname}
        `;
                if (events === 'true') {
                    await client.sendMessage(Fortu.id, {
                        image: { url: dpuser },
                        caption: Welcometext,
                        mentions: [num],
                    });
                }
            } else if (Fortu.action == "remove") {
                let userName2 = num;

                let Lefttext = `
          Good bye @${userName2.split("@")[0]} 👋
        `;
                if (events === 'true') {
                    await client.sendMessage(Fortu.id, {
                        image: { url: dpuser },
                        caption: Lefttext,
                        mentions: [num],
                    });
                }
            } else if (Fortu.action == "demote" && events === "true") {
                

                
                await client.sendMessage(
                    Fortu.id,
                    {
                        text: `@${(Fortu.author).split("@")[0]}, why have you demoted  @${(Fortu.participants[0]).split("@")[0]} from admin ? 👀`,
                        mentions: [Fortu.author, Fortu.participants[0]]
                    }
                )
            } else if (Fortu.action == "promote" && events === "true") {
                if (Fortu.author == metadata.owner || Fortu.author == Myself || Fortu.author == Fortu.participants[0]) {
                    

                client.sendMessage(
                    Fortu.id,
                    {
                        text: `@${(Fortu.author).split("@")[0]} has promoted @${(Fortu.participants[0]).split("@")[0]} to admin. 👀`,
                        mentions: [Fortu.author, Fortu.participants[0]]
                    }
                )
            }
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = Events;