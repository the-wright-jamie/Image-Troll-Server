import { registerFont, createCanvas, loadImage } from "canvas";
import { execSync } from "child_process";

export class Troll {
  async trollImage(addressInput: String): Promise<any> {
    const canvas = createCanvas(512, 512);
    const canvasContext = canvas.getContext("2d");
    registerFont("./src/font1.ttf", { family: "Custom" });
    registerFont("./src/font2.ttf", { family: "Custom2" });
    registerFont("./src/font3.ttf", { family: "Custom3" });

    var address = addressInput.replace(/^.*:/, "");
    var datacenter = false;
    var checker = execSync(
      `nslookup ${address} | grep "googleusercontent.com" | wc -l`
    );
    datacenter = checker.includes("1");

    if (datacenter === true) {
      console.log(`Never mind, ${address} was a bot`);
      canvasContext.drawImage(
        await loadImage("./src/emilia.jpg"),
        0,
        0,
        512,
        512
      );

      var text = `Emilia has something\nkawaii to show you!`;

      canvasContext.font = `45px "Custom"`;
      canvasContext.fillStyle = "Purple";
      canvasContext.strokeStyle = "White";
      canvasContext.lineWidth = 5;
      canvasContext.strokeText(text, 15, 50);
      canvasContext.fillText(text, 15, 50);

      text = `Middle click this\nimage for a surprise! ♥`;

      canvasContext.strokeText(text, 15, 430);
      canvasContext.fillText(text, 15, 430);

      return canvas.createPNGStream();
    } else {
      if (Math.floor(Math.random() * 5) < 1) {
        canvasContext.drawImage(
          await loadImage("./src/creep.jpg"),
          0,
          0,
          512,
          512
        );

        canvasContext.drawImage(
          await loadImage("./src/x.svg"),
          10,
          471,
          32,
          32
        );

        var text = `${address.replace(
          /^.*:/,
          ""
        )}`;

        canvasContext.font = `48px "Custom3"`;
        canvasContext.fillStyle = "Red";
        canvasContext.fillText(text, 50, 50);

        return canvas.createPNGStream();
      } else {
        canvasContext.drawImage(
          await loadImage("./src/troll.png"),
          0,
          0,
          512,
          512
        );

        canvasContext.drawImage(
          await loadImage("./src/x.svg"),
          10,
          471,
          32,
          32
        );

        var text = `Your IP address is:\n${address.replace(
          /^.*:/,
          ""
        )}!\n\nDon't believe me?\n\nLook up 'What is\nmy IP address'!`;

        canvasContext.font = `48px "Custom2"`;
        canvasContext.fillStyle = "Red";
        canvasContext.strokeStyle = "White";
        canvasContext.lineWidth = 10;
        canvasContext.strokeText(text, 15, 50);
        canvasContext.fillText(text, 15, 50);

        text =
          "This is just a troll. Your IP address wasn't logged, nothing bad is going to happen.\nCheck out xsfs.xyz to learn how this works!";

        canvasContext.font = `12px "Custom2"`;
        canvasContext.lineWidth = 5;
        canvasContext.strokeText(text, 50, 485);
        canvasContext.fillText(text, 50, 485);

        return canvas.createPNGStream();
      }
    }
  }
}
