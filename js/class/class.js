function wx() {
  this.appid = "123";
  class ChatRoom {
    constructor() {
      // 管理 eventName 的 callback
      this.handlerFunc = {};
    }
    /**
     * 事件类型 ，使用get ，只读
     */
    get eventTypes() {
      return {
        RECEIVE_NEW_MESSAGE: "newMessage", //收到新消息
        RECEIVE_GROUP_MESSAGE: "newGroupMessage", // 收到群消息
      };
    }
    /**
     *  注册事件
     * @param {*监听事件名称} eventName
     * @param {*监听事件回调} callback
     */
    on(eventName, callback) {
      // 判断事件是否存在
      if (!this.handlerFunc[eventName]) {
        this.handlerFunc[eventName] = [];
      }
      this.handlerFunc[eventName].push(callback);
    }
    /**
     * 取消事件注册
     * @param {*} eventName
     * @param {*} callback
     */
    off(eventName, callback) {
      if (this.handlerFunc[eventName])
        this.handlerFunc[eventName] = this.handlerFunc[eventName].filter(
          (cb) => cb !== callback
        );

      //   const callBackArray = this.handlerFunc[eventName];
      //   if (callBackArray && callBackArray.length) {
      //     for (let index = 0; index < callBackArray.length; index++) {
      //       const element = callBackArray[index];
      //       if (element === callback) {
      //         callBackArray.splice(index, 1); // 将回调事件删除
      //       }
      //     }
      //   }
    }
    /**
     * 取消所有注册的事件
     */
    offAll() {
      for (const key in this.handlerFunc) {
        if (Object.hasOwnProperty.call(this.handlerFunc, key)) {
          this.handlerFunc[key] = [];
        }
      }
    }

    emit(eventName, data) {
      if (this.handlerFunc[eventName]) {
        this.handlerFunc[eventName].forEach((fn) => {
          fn(data);
        });
      }
    }

    sendMessage() {
      console.log("消息发送成功啦");
      this.onReceiveMessage();
    }

    onReceiveMessage() {
      if (this.handlerFunc.newMessage) {
        this.emit(this.eventTypes.RECEIVE_NEW_MESSAGE, "新的消息啊啊啊");
      }
    }
  }

  const chatroom = new ChatRoom();
  const receiveMsg = (messgae) => {
    console.log(messgae, this.appid);
  };
  chatroom.on(chatroom.eventTypes.RECEIVE_NEW_MESSAGE, receiveMsg);
  chatroom.sendMessage();

  // 取消注册
  //   chatroom.off(chatroom.eventTypes.RECEIVE_NEW_MESSAGE, receiveMsg);
  //   chatroom.offAll();

  console.log(chatroom.handlerFunc);
  console.log(chatroom.eventTypes.RECEIVE_NEW_MESSAGE);
}

wx();
