# Nexus Bot
[![License](http://img.shields.io/:license-mit-blue.svg)](http://doge.mit-license.org)  [![Discord Bots](https://top.gg/api/widget/status/709876107213537351.svg?noavatar=true)](https://top.gg/bot/709876107213537351)  
Discord has separation into text and voice channels, with no option to make combined.  
The purpose of this bot is to create text channel, which is visible only to those who are connected to the linked voice channel.  
Each time the last user leaves the voice channel, all non-pinned messages in linked text channel will be deleted. 

## Want to use at your server?
[![Invite bot to your server](https://i.imgur.com/MgQZMpT.jpg)](https://discord.com/oauth2/authorize?client_id=709876107213537351&permissions=268510224&scope=bot)

## How to use
You don't need to set up anything - once you join a voice channel (excluding inactive channel), a new category with the linked text channel will be created.  
Each time user joins/leaves voice channel, he will get/lose rights to see the linked text channel.  
Feel free to rename/move categories and text channels as you wish - it will not affect bot.
When the last user leaves the voice channel, messages in the linked text channel will be deleted (excluding pinned messages).

## Existing commands
`{}` - 'replace with id', `[]` - choose one option, `@{}` - mention user/role  

List of available commands:
- `sudo help` - get info about bot and list of existing commands
- `sudo write` - repeat message that was written by the user. Can be used to send a system message to the channel. Requires user to have admin rights.
- `sudo ignore [0/1] {channelId}` - ignore/handle voice channel with the specified id when checking for linked text channel. Example: `sudo ignore 1 717824008636334130`. Requires user to have admin rights.
- `sudo skip [0/1] @{user/role}` - skip/change visibility settings for specific user/role. Supports multiple mentions. Example: `sudo skip 1 @User1 @Role1 @User2`. Requires user to have admin rights.
- `sudo preserve [0/1] {channelId}` - set linked text channel to save messages after the last user left the voice channel. `channelId` - id of the voice channel. Example: `sudo preserve 1 717824008636334130`. Requires user to have admin rights.

## Known issues
- Due to the fact that Discord bots are not allowed to change permissions for admins, server admins will still see all text channels (IMHO, not even an issue, but still worth mentioning).  
- Messages in the channel can be cached in the app, so the user can still see it even when it's cleared on the server. These messages will disappear after Discord app reboot. For now, I didn't see any solution to fix it - if you know any workaround, please post it in issues.

### If you found a bug
If you have any issue with the bot functionality, feel free to post an issue in this repo - for now, I am intended to maintain this app as long as I don't feel it is stable enough.

### Need any adjustments?
If you feel some cool feature is missing, or you want to make some minor tweaks just for your quality of life - feel free to either post an issue in the repo or make a fork and adjust it yourself as you see fit.  
Please bear in mind: I intend to leave this bot single-purpose, meaning I won't add features which are not related to the idea of creating combined voice-text channels.

## Environment setup
1. Install NodeJS
2. Clone repo
3. Fetch all required npm packages using ```npm install```
4. Configure .env (use .env.sample as a reference if needed)
5. After any changes in code, in cmd call ```tsc```
6. Start the app by using ```nodemon build/main.js``` or debug it with your IDE
