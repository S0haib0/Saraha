import { createClient } from "redis";
import { env } from "../../config/index.js";

export const client = createClient({
  url: env.redisURI,
});

client.on("error", function (err) {
  throw err;
});
export const connectRedis = async () => {
  try {
    await client.connect();
    console.log("redis connected");
  } catch (err) {
    console.log(err);
  }
};
