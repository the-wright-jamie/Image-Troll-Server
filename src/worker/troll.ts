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

      canvasContext.font = "40px Roboto";
      canvasContext.fillText(
        `Emilia has something\ncool to show you!\nClick "Open in Browser"\nbelow this image! <3`,
        5,
        50
      );

      return canvas.createPNGStream();
    } else {
      canvasContext.drawImage(
        await loadImage(
          "https://www.nicepng.com/png/detail/2-24510_trollface-deal-with-it-troll-face-png.png"
        ),
        0,
        0,
        512,
        512
      );

      canvasContext.font = "48px Roboto";
      canvasContext.fillStyle = "Red";
      canvasContext.fillText(
        `Your IP address is\n${address.replace(
          /^.*:/,
          ""
        )}!\n\nDon't believe me?\n\nLook up your IP\naddress on Google!`,
        5,
        50
      );

      return canvas.createPNGStream();
    }
  }
}
