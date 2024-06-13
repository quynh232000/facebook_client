import * as request from "../utils/HttpRequest";


export const getMessage = async (user_uuid: string) => {
  try {
    const res = await request.GET(`chat/message/${user_uuid}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const sendMessage = async (data:FormData) => {
  try {
    const res = await request.POST(`chat/send_message`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const deleteMessage = async (message_id: number) => {
  try {
    const res = await request.GET(`chat/delete_message/${message_id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const getConversation = async () => {
  try {
    const res = await request.GET(`chat/get_conversations`);
    return res;
  } catch (error) {
    console.log(error);
  }
};