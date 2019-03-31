import Echo from "laravel-echo"
import * as io from 'socket.io-client';
window.io = io;
const host = "http://"+location.host+":6001";
const broadcaster = 'socket.io';
window.Echo = new Echo({ broadcaster, host });
export default window;


