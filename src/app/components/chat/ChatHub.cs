public class ChatHub : Hub
    {        
        public async Task SendMessage(string user, string message)
        {
            string connectionID = Context.ConnectionId;
            await Clients.AllExcept(connectionID).SendAsync("ReceiveMessage", user, message);
        }        
 
       public override async Task OnConnectedAsync()
        {
            var username =  Context.GetHttpContext().Request.Query["username"];
            string value = !string.IsNullOrEmpty(username.ToString()) ? username.ToString() : "default";
            string connectionID = Context.ConnectionId;
            OnlineUsers.users.Add( new User() {ConnectionId = connectionID,Name=value});           

            await Clients.All.SendAsync("OnlineUsers", OnlineUsers.users);        
            // the start().done callback is executed.
            await base.OnConnectedAsync();           

        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {   
          string connectionID = Context.ConnectionId;
          var connectionIdToRemove = OnlineUsers.users.Single(r => r.ConnectionId == connectionID);
          OnlineUsers.users.Remove(connectionIdToRemove);
          await Clients.All.SendAsync("OnlineUsers", OnlineUsers.users);              
          await base.OnDisconnectedAsync(exception);
        } 
    } 