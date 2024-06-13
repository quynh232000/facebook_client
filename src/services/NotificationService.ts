import * as request from "../utils/HttpRequest";
export const getListNotifications = async () => {
    try {
      const res = await request.GET(`notification/list_notifications`);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  export const readNotification = async (id:number) => {
    try {
      const res = await request.GET(`notification/read_noti/${id}`);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  export const countNotification = async () => {
    try {
      const res = await request.GET(`notification/count_noti`);
      return res;
    } catch (error) {
      console.log(error);
    }
  };