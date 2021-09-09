import amqp, { AmqpConnectionManager } from "amqp-connection-manager";

class MessageQ {
    public connection: AmqpConnectionManager;
    public static messageQInstance: MessageQ;
    constructor() {
        this.connection = amqp.connect(process.env.RABBITMQ_URL);
    }
    public getInstance(): MessageQ {
        if(!MessageQ.messageQInstance) {
            new MessageQ;
        }
        return MessageQ.messageQInstance;
    }

    init() {
        this.setupTransmissionChannel();
        this.setupReceivingChannel();
    }

    setupTransmissionChannel() {
        this.connection.createChannel()
    }

    setupReceivingChannel() {

    }
}