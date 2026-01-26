abstract class ProfileUtilities {
  abstract getMyChats(): Promise<any>;
  abstract getChatRequest(): Promise<any>;
  abstract updateChatRequest(request: any): Promise<any>;
  abstract deleteChatRequest(requestId: string): Promise<any>;
  abstract deleteChatRequests(requestIds: string[]): Promise<any>;
  abstract getMyUnreadChats(): Promise<any>;
  abstract deleteChat(chatId: string): Promise<any>; //! Not to delete the chat logs accessable only by admin.
}
export default ProfileUtilities;
