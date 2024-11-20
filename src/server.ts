import app from "./app";
import config from "./app/config";

import mongoose from "mongoose";

async function main() {
  try {
    await mongoose.connect(config.database_url);
    app.listen(config.port, () => {
      console.log(`Server listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
