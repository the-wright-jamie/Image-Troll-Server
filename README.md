> Click here to [see it in action!](https://troll.the-wright-jamie.dev/troll.png)

# Warning

This software has been created for **educational and recreational purposes ONLY** - i.e. for a bit of craic with my friends. Under no circumstances should this code be modified for malicious intent.

# Image Troll Server

## What is this?

A NodeJS http server that will capture a user's IP and then present it back to them. It is written in TypeScript for no particular reason other than I was working on similar Express server code for another project which I borrowed for this and didn't feel like rewriting it in JavaScript.

It's also not very well written code. Not my best work, I must say, but who creates the cleanest code for the lowest gag

## What does it do?

Designed primarily for trolling on Discord, in it's current state it will display some (not very good) bait to get the user to click "Open in Browser" and then display their IP address to them.

## Why do we need to use bait?

To understand why we need bait, we need to understand how Discord handles images. Here is the basic process for how an image is displayed to a user in Discord:

1. A user sends an image
2. A Discord crawler crawls the link to see what it is (`crawl-{crawler-ip-address}.ptr.discord.com`)
3. The crawler sees that it's an image, and hands off to the caching server (`{undetermined-ip-address}.bc.googleusercontent.com`)
4. The caching server reads the image
5. The image is saved in the background in chat as linking to something like `https://images-ext-1.discordapp.net/external/{some-encoding}/{link-to-original-image}`
6. That replacement cache link is what is actually displayed to the user

Hopefully you can see where the issue is coming in here: step 5.

If the caching server retrieves the image on the user's behalf, the IP address that's going to get displayed is the caching server's IP and not the target's IP address. This kills the punchline 🫤.

So, instead, we need to detect if a datacenter is caching our image and if it is, give the datacenter the bait to display instead as this is what will be displayed to the user in Discord. The end goal is to get the user to click "Open in Browser" in Discord, so that it will take them there and the browser will access the server directly so we can lift the user's actual IP address.

It's anyone's guess why Discord does it like this. However, we could probably relate it back to the Information Security CIA Triad:

1. Confidentiality: Preventing people like me from doing something like this easily as we could easily collect a large amount of IP addresses this way if there was no cache and no one could really stop us
2. Integrity: make sure it doesn't change - it's the same as when it was posted (although this doesn't entirely line up as the image is cached when it's loaded on the clients side and not when the actor posts it)
3. Availability: Imagine the image linked to a small server in someone's attic and it got posted in a large server. The image being posted there and that many users accessing the image at once with Discord open in the background could simply DDOS the host. Or simply, the original endpoint's server may have slow internet

Probably some other reasons like:

4. Scanning the image for malicious content (malware, content that is against the TOS/Guidelines)
5. Reducing their bandwidith impact on the host (related to point 3)

## Why did you make this / publish this code?

I just wanted to share this code so that others can have a bit of fun trolling their friends, as well as learn how to capture IP addresses and manipulate images in NodeJS if for some forsaken reason you want to do that.

## Advice for repurposing

If you are repurposing this mini project for another chat app, you'll first want to check if it also does any similar caching and place bait in front of your targets instead. Then update the nslookup if you find a consistent tell on if the client is a datacenter or an actual user - the tell in this case was the IP's host name contained "`googleusercontent.com`".

You'll also want to host this on the Cloud unless you've already got your own server that others can connect to and don't mind potentially compromising your IP address/domain as if someone takes the image and reposts it somewhere else, there's a exponential chance that someone unsavoury might reverse what you did and try to come after your server.

## Running the server

Oh yeah, almost forgot about this.

The usual to run a Node server

Install the dependencies

```
npm i
```

Run the server

```
npm start
```

This starts a development server, btw, not a production one. It'll also auto update when you modify routes.ts. Just keep that in mind.
