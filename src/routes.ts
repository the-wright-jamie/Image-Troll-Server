import express from "express";
const http = require("http");

import { Troll } from "./worker/troll";
import { Stream } from "stream";

const app = express();

const troll = new Troll();

app.use(express.json());

http.createServer(app).listen(4000, () => {
  console.log("Started Troll Server on Port 4000");
});

app.route(`/:imageName`).get(async (req, res) => {
  var xforwarded = req.headers["x-forwarded-for"]?.toString();
  var ip = xforwarded || req.socket.remoteAddress; 

  console.log(
    `${ip} has asked for the image ${req.params.imageName} but is getting trolled instead`
  );

  const response = await troll.trollImage(ip!);

  res.write(await stream2buffer(response));
  res.end();
});

app.route(`/`).get(async (req, res) => {
  res.redirect("https://xsfs.xyz/articles/2023/bait-and-switch");
  res.end();
});

// NOT MY CODE. SHOUT OUT TO https://stackoverflow.com/a/67729663
async function stream2buffer(stream: Stream): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const _buf = Array<any>();

    stream.on("data", (chunk) => _buf.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(_buf)));
    stream.on("error", (err) => reject(`error converting stream - ${err}`));
  });
}
