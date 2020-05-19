import { Client, Message } from "discord.js"
import { Logger } from "./handlers/Logger"
import { HealthCheckHandlers } from "./handlers/HealthCheckHandlers"
import { ChannelOperator } from "./handlers/ChannelOperator"
import { ClientEvent } from "./enums/ClientEvent"
import { ProcessEvent } from "./enums/ProcessEvent"
import { IntroMessageHandlers } from "./handlers/IntroMessageHandlers"
import { Config } from "./config"

export class EventRegistry {
    private client: Client
    private config: Config

    private logger: Logger
    private healthCheckHandlers: HealthCheckHandlers
    private channelOperator: ChannelOperator
    private introMessageHandlers: IntroMessageHandlers

    constructor(client: Client, config: Config) {
        this.client = client
        this.config = config

        this.healthCheckHandlers = new HealthCheckHandlers(client, config)
        this.logger = new Logger()
        this.introMessageHandlers = new IntroMessageHandlers(config)
        this.channelOperator = new ChannelOperator(this.introMessageHandlers.introMessageMap)
    }

    public registerEvents() {
        // => Log bot started and listening
        this.registerReadyHandler()

        // => Check bot is alive
        this.registerHealthCheck()
        this.registerIntroMessageHandler()
        this.registerVoiceUpdateHandler()

        // => Bot error and warn handler
        this.client.on(ClientEvent.Error, this.logger.logError)
        this.client.on(ClientEvent.Warn, this.logger.logWarn)

        // => Process handler
        this.registerProcessHandlers()
    }

    // ---------------- //
    //  Event Handlers  //
    // ---------------- //
    
    private registerReadyHandler() {
        this.client.once(ClientEvent.Ready, () => {
            this.logger.introduce(this.client, this.config.activity);
        });
    }

    private registerHealthCheck() {
        this.client.on(ClientEvent.Message, (message: Message) => {
            this.healthCheckHandlers.handleHealthCheck(message)
        })
    }

    private registerIntroMessageHandler() {
        this.client.on(ClientEvent.Message, (message: Message) => {
            this.introMessageHandlers.registerIntroMessage(message)
        })
    }

    private registerVoiceUpdateHandler() {
        this.client.on(ClientEvent.VoiceStateUpdate, (oldVoiceState, newVoiceState) => {
            if (newVoiceState.channelID !== oldVoiceState.channelID) {
                if (newVoiceState.channelID !== undefined) this.channelOperator.handleChannelJoin(newVoiceState)
                if (oldVoiceState.channelID !== undefined) this.channelOperator.handleChannelLeave(oldVoiceState)
            }
        });
    }

    private registerProcessHandlers() {
        process.on(ProcessEvent.Exit, () => {
            const msg = `[Illuminati-bot] Process exit.`
            this.logger.logEvent(msg)
            console.log(msg)            
            this.client.destroy()
        })

        process.on(ProcessEvent.UncaughtException, (err: Error) => {
            const errorMsg = (err ? err.stack || err : '').toString().replace(new RegExp(`${__dirname}\/`, 'g'), './')
            this.logger.logError(errorMsg)
            console.log(errorMsg)
        })

        process.on(ProcessEvent.UnhandledRejection, (reason: {} | null | undefined) => {
            const msg = `Uncaught Promise rejection: ${reason}`
            this.logger.logError(msg)
            console.log(msg)
        })
    }
}