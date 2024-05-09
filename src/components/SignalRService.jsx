import * as signalR from "@microsoft/signalr";

const SignalRService = {
  connection: null,

  // Connect to the SignalR hub
  startConnection: () => {
    SignalRService.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7141/hub/notification")
      .build();

    SignalRService.connection
      .start()
      .then(() => console.log("SignalR connected"))
      .catch((err) => console.error("SignalR connection error: ", err));
  },

  // Subscribe to notifications
  subscribeToNotifications: (callback) => {
    SignalRService.connection.on("ReceiveNotification", (notification) => {
      callback(notification);
    });
  },

  // Send notification (optional)
  sendNotification: (notification) => {
    SignalRService.connection.invoke("SendNotification", notification);
  },
};

export default SignalRService;
