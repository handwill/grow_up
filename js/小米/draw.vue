<template>
  <div class="draw-container">
    <div class="item-container">
      <div
        v-for="item in frontPList"
        :key="item.r"
        :class="['item', rnum == item.r ? 'selected' : '']"
      >
        <img :src="item.icon" />
        <div class="item-name">{{ item.name }}</div>
        <div class="item-price">{{ item.price }}</div>
      </div>
      <div class="draw-btn" @click="draw">
        <p class="draw-btn-desc">开始抽奖</p>
        <p class="draw-num-desc">还剩{{ lotterNum ? lotterNum : 0 }}次</p>
      </div>
      <div
        v-for="item in endPlist"
        :key="item.r"
        class="item"
        :class="rnum == item.r ? 'selected' : ''"
      >
        <img :src="item.icon" />
        <div class="item-name">{{ item.name }}</div>
        <div class="item-price">{{ item.price }}</div>
      </div>
    </div>
    <div class="draw-tips">参与竞猜即可抽奖，竞猜次数越多抽奖机会越多！</div>
    <div class="mask" v-if="showMask">
      <div class="draw-success">
        <div class="draw-icon">
          <img :src="drawItem.icon" />
          <div class="draw-price">{{ drawItem.price }}</div>
        </div>
        <div class="draw-name">{{ drawItem.name }}</div>
        <div class="draw-succ-btn" @click="hiddeMask">开心收下</div>
      </div>
    </div>
  </div>
</template>

<script>
import { prizeList, drawLottery, checkIsLogin } from "../api";
import { drawSuccessResult } from "../config/testData";
import coreBus from "@mi/milive-ui/utils/event-bus";
export default {
  props: ["lotterNum"],
  data() {
    return {
      rnum: -1,
      lock: false,
      showMask: false,
      drawItem: {},
    };
  },
  computed: {
    frontPList() {
      let newList = [];
      for (let i = 0; i < 5; i++) {
        newList.push(prizeList[i]);
      }
      return newList;
    },
    endPlist() {
      let newList = [];
      for (let i = 5; i < 10; i++) {
        newList.push(prizeList[i]);
      }
      return newList;
    },
  },
  methods: {
    hiddeMask() {
      this.showMask = false;
    },
    async draw() {
      if (!checkIsLogin()) {
        coreBus.$emit("MiLive-UI:tips", {
          msg: "请先登录哦~",
        });
      }
      if (this.lock) {
        return;
      }
      this.lock = true;
      if (!this.lotterNum || this.lotterNum == 0) {
        this.lock = false;
        coreBus.$emit("MiLive-UI:tips", {
          msg: "抽奖次数不足",
        });
        return;
      }
      let id = -1;
      let type = -1;
      let drawObj = {};
      const interval = setInterval(() => {
        this.rnum = (this.rnum + 1) % 10;
        if (id != -1) {
          if (type == 4) {
            if (this.rnum == 5) {
              this.lock = false;
              clearInterval(interval);
              this.drawItem = {
                id: drawObj.giftId,
                name: "【1天】" + drawObj.giftName + " X " + drawObj.giftNum,
                price: drawObj.giftVal + "钻",
                icon: drawObj.giftUrl,
              };
              this.showMask = true;
            }
          } else {
            let obj = prizeList.find((o) => o.r == this.rnum);
            if (obj.id == id) {
              this.lock = false;
              clearInterval(interval);
              let nObj = Object.assign({}, obj);
              if (type == 2) {
                nObj.name = "【7天】" + nObj.name;
              }
              nObj.name = nObj.name + " X " + drawObj.giftNum;
              this.drawItem = nObj;
              this.showMask = true;
            }
          }
        }
      }, 300);
      const res = await drawLottery();
      // const res = drawSuccessResult;
      if (res.code == 0 && res.data.lottery.length > 0) {
        id = res.data.lottery[0].giftId;
        type = res.data.lottery[0].giftType;
        drawObj = res.data.lottery[0];
      } else {
        setTimeout(() => {
          this.lock = false;
          clearInterval(interval);
          this.rnum = -1;
          coreBus.$emit("MiLive-UI:tips", {
            msg: "很遗憾没有中奖",
          });
        }, 2000);
      }
      coreBus.$emit("refresh");
    },
  },
};
</script>

<style lang="scss" scoped>
.draw-container {
  width: 966px;
  height: 984px;
  margin: 185px auto 0;
  background: url(../assets/images/bg-draw.png) 0 0 / 100% auto no-repeat;
  overflow: hidden;
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 100;
    .draw-success {
      position: absolute;
      width: 968px;
      height: 1007px;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      background: url(../assets/images/bg-draw-success.png) 0 0 / 100% auto
        no-repeat;
      .draw-icon {
        width: 419px;
        height: 360px;
        background: #1997f1;
        border: 1px solid #f1fffd;
        border-radius: 21px;
        margin: 202px auto 0;
        position: relative;
        img {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          margin: auto;
        }
        .draw-price {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 161px;
          height: 52px;
          background: url(../assets/images/icon-draw.png) 0 0 / 100% auto;
          text-align: center;
          font-size: 36px;
          font-weight: 400;
          color: #002f68;
          line-height: 52px;
        }
      }
      .draw-name {
        text-align: center;
        margin-top: 61px;
        height: 45px;
        font-size: 48px;
        font-weight: 400;
        color: #ffffff;
        line-height: 50px;
      }
      .draw-succ-btn {
        margin: 117px auto 0;
        width: 372px;
        height: 111px;
        background: url(../assets/images/bg-bet-btn.png) 0 0 / 100% auto
          no-repeat;
        text-align: center;
        font-size: 56px;
        font-weight: 400;
        color: #002f68;
        line-height: 111px;
      }
    }
  }
  .item-container {
    display: flex;
    flex-wrap: wrap;
    margin: 65px auto 0;
    .item {
      width: 203px;
      height: 217px;
      background: #d1e4ff;
      border-radius: 13px;
      margin-left: 22px;
      margin-top: 30px;
      text-align: center;
      position: relative;
      border: 4px solid rgba(255, 255, 255, 0);
      img {
        // width: 50%;
        width: auto;
        height: 50%;
        margin: 0 auto;
      }
      .item-name {
        height: 40px;
        font-size: 30px;
        font-weight: 500;
        color: #002f68;
        line-height: 30px;
        white-space: nowrap;

        position: absolute;
        width: 100%;
        bottom: 45px;
        left: 50%;
        transform: translateX(-50%);
        overflow: hidden;
      }
      .item-price {
        position: absolute;
        width: 100%;
        bottom: 5px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 30px;
        font-weight: 400;
        color: #002f68;
        line-height: 30px;
        opacity: 0.9;
      }
    }
    .selected {
      border: 4px solid #fcff00;
    }
    .draw-btn {
      width: 445px;
      height: 225px;
      background: url(../assets/images/btn-draw.png) 0 0 / 100% auto no-repeat;
      margin-left: 22px;
      margin-top: 30px;
      .draw-btn-desc {
        margin-top: 58px;
        text-align: center;
        font-size: 48px;
        font-weight: 600;
        color: #002f68;
      }
      .draw-num-desc {
        margin-top: 15px;
        text-align: center;
        font-size: 30px;
        font-weight: 400;
        color: #002f68;
        line-height: 29px;
      }
    }
  }
  .draw-tips {
    margin-top: 55px;
    width: 100%;
    text-align: center;
    font-size: 30px;
    font-weight: 400;
    color: #ffffff;
    opacity: 0.7;
  }
}
</style>
