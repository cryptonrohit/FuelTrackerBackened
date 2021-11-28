import amqp from "amqplib/callback_api";

export function rabbbitMQInit() {
    setupTransmissionChannel();
    setupReceivingChannel();
}

const RABBIT_URL = "amqps://ttphcqsv:tB_xZL0wC2g5GvZH213V6GyYdd3NTVe7@beaver.rmq.cloudamqp.com/ttphcqsv";

function setupTransmissionChannel() {
    amqp.connect(RABBIT_URL, (connectError, connection) => {
        if (connectError) {
            console.error("[RQ] Error during Transmission Channel connection")
        }
        // Creating a channel
        connection.createChannel((channelError, channel) => {
            if (channelError) {
                console.error("[RQ] Error while Transmission Channel creation")
            }
            channel.assertQueue("FuelTrackerSystem", { durable: true });
            channel.sendToQueue("FuelTrackerSystem", Buffer.from("message is sent"));
        })
    })
}

function setupReceivingChannel() {
    amqp.connect(RABBIT_URL, (connectError, connection) => {
        if (connectError) {
            console.error("[RQ] Error during Receiving Channel connection")
        }
        // Creating a channel
        connection.createChannel((channelError, channel) => {
            if (channelError) {
                console.error("[RQ] Error during Receiving Channel creation");
            }
            channel.assertQueue("FuelTrackerSystem", {durable: true})
            channel.consume("FuelTrackerSystem", (msgReceived) => {
                console.log("meassage is received as: ", msgReceived.content.toString());
            })
        })
    })
}
