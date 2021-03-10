class Logger {
  constructor() {
    this.active = true;
  }
   Log(msg, path, msgType = "n", func="") {
    if (true) {
      let msgColor = "";
      let pathStr=""
      switch (msgType) {
        case "n": msgColor = "\u001b[0m";break;
        case "e": msgColor = "\u001b[1;31m";break;
        case "s": msgColor = "\u001b[1;32m";break;
        case "i": msgColor = "\u001b[1;36m";break;
        case "w": msgColor = "\u001b[1;33m";break;
        default: msgColor = "\u001b";
      }
      if(path && path!==""){
        let pathArr = path.split("\\");
        pathStr=pathArr[pathArr.length - 2] + "\\" + pathArr[pathArr.length - 1];
      }
      let dt = new Date();
      let dtStr= dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds();
      console.log(
          dtStr +
          msgColor +
          " " +
          msg +
          "\u001b[0m" +
          " " + pathStr +
          " "+ func
      );
    }
  }
  GetDate() {
    let dt = new Date();
    return (
      dt.getFullYear() +
      "-" +
      (dt.getMonth() + 1) +
      "-" +
      dt.getDate() +
      " " +
      dt.getHours() +
      ":" +
      dt.getMinutes() +
      ":" +
      dt.getSeconds()
    );
  }
}

const _logger = new Logger();
module.exports = _logger;
