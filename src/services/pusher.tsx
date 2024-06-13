import Pusher from "pusher-js";

const token = localStorage.getItem("USER_TOKEN")??"";
const pusher = new Pusher("a8e442a1795eb4a97f74", {
  cluster: "ap1",
  auth: {
    headers: {
        Authorization: 'Bearer '+token,
    },
},
});

export default pusher;
