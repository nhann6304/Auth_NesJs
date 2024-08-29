import { MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { Socket } from "socket.io";

@WebSocketGateway({
    cors: { origin: "*" },
    httpCompression: true
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket, ...args: any[]) {
        console.log("New user connected...", client.id);
    }

    handleDisconnect(client: Socket) {
        console.log("User disconnected...", client.id);

        this.server.emit("user-left", {
            message: `User Left the chat: ${client.id}`
        });
    }

    @SubscribeMessage("newAction")
    handleNewAction(@MessageBody() actionData: { action: string, item: string, user: string }) {
        const currentTime = new Date().toLocaleTimeString();

        // Broadcast the action to all clients
        this.server.emit("actionNotification", {
            user: actionData.user,
            action: actionData.action,
            item: actionData.item,
            time: currentTime
        });
    }
}
