import {
  SlashCommand,
  CommandOptionType,
  CommandContext,
  SlashCreator,
} from "slash-create";
import { env } from "process";
import axios  from "axios";

export class RankCommand extends SlashCommand {
  constructor(creator: SlashCreator) {
    let cDesc = {
      name: "rank",
      description: "Rank?",
      guildIDs: ["690597961775972452"],
      options: [
        {
          type: CommandOptionType.BOOLEAN,
          name: "tg",
          description: "Rank de TG o TGn't?",
        },
      ],
    };
    if (env.COMMANDS_GUILD_ID)
      cDesc = Object.assign(cDesc, { guildIDs: [env.COMMANDS_GUILD_ID] });

    super(creator, cDesc);

    // Not required initially, but required for reloading with a fresh file.
    this.filePath = __filename;
  }

  async run(ctx: CommandContext): Promise<string> {
    await axios
      .get(
        `https://aoe2.net/api/leaderboard?game=aoe2de&leaderboard_id=${ctx.options.tg ? 4 : 3}&start=1&count=10000&search=[TodEs]`
      )
      .then(function (response) {
        let tuvieja = [];
        response.data.leaderboard.map((r, index, array) =>
          tuvieja.push(index + 1 + " " + r.name + " " + r.rating)
        );
        return tuvieja.join("\n") + "\n PD: Utena tkm 😍";
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    return "Algo se rompio";
  }
}
