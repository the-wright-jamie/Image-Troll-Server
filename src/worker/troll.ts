import { createCanvas, loadImage } from "canvas";
import { execSync } from "child_process";

export class Troll {
  async trollImage(addressInput: String): Promise<any> {
    const canvas = createCanvas(512, 512);
    const canvasContext = canvas.getContext("2d");

    var address = addressInput.replace(/^.*:/, "");
    var datacenter = false;
    var checker = execSync(
      `nslookup ${address} | grep "googleusercontent.com" | wc -l`
    );
    datacenter = checker.includes("1");

    if (datacenter === true) {
      console.log(`Never mind, ${address} was a bot`);
      canvasContext.drawImage(
        await loadImage(
          "https://i.pinimg.com/736x/1c/54/27/1c542704455b9c3402b21214d043e9ed.jpg"
        ),
        0,
        0,
        512,
        512
      );

      const text = `Emilia has something\nkawaii to show you!\n\n\n\n\n\nMiddle click this image\nor "Open in Browser"\nfor a surprise! ♥`;

      canvasContext.font = "45px Roboto";
      canvasContext.strokeStyle = "White";
      canvasContext.lineWidth = 5;
      canvasContext.strokeText(text, 15, 50);
      canvasContext.fillText(text, 15, 50);

      return canvas.createPNGStream();
    } else {
      canvasContext.drawImage(
        await loadImage("./src/troll.png"),
        0,
        0,
        512,
        512
      );

      var text = `Your IP address is\n${address.replace(
        /^.*:/,
        ""
      )}!\n\nDon't believe me?\n\nLook up your IP\naddress on Google!`;

      canvasContext.font = "48px Roboto";
      canvasContext.fillStyle = "Red";
      canvasContext.strokeStyle = "White";
      canvasContext.lineWidth = 10;
      canvasContext.strokeText(text, 15, 50);
      canvasContext.fillText(text, 15, 50);

      text = "This is just a troll, your IP address wasn't logged and nothing bad is going to happen.\nCheck out xsfs.xyz to learn how this works!";

      canvasContext.font = "12px Roboto";
      canvasContext.lineWidth = 5;
      canvasContext.strokeText(text, 15, 475);
      canvasContext.fillText(text, 15, 475);

      return canvas.createPNGStream();
    }
  }
}
