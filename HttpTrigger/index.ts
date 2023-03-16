import { join } from "path";
import { env } from "process";
import { AzureFunctionServer, SlashCreator } from "slash-create";

(async () => {
  const creator = new SlashCreator({
    applicationID: "855241297476190228",
    publicKey: "b9b1b9cbe84fdc1f3a8fdf412cca70f5d30134453c95c48f41386915418fd55a",
    token: "ODU1MjQxMjk3NDc2MTkwMjI4.YMvnhg.zhaYZ22-xEnFhELTQTl2SWD-wPA",
  });

  await creator
    // The first argument is required, but rhe second argument is the "target" or the name of the export.
    // By default, the target is "interactions".
    .withServer(new AzureFunctionServer(module.exports))
    .registerCommandsIn(join(__dirname, "commands"));

  // If a guild have been specified, only sync the command with the guild
  creator.syncCommandsIn("690597961775972452");
})();
