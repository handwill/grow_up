<template>
  <div class="index-page">
    <div class="banner">
      <div class="banner-time">{{ bannerTimeTxt }}</div>
      <p class="banner-txt">
        活动期间消费神龙宝箱可累积活动积分开启礼盒(1钻=1积分)，礼盒包含一款随机礼物及必得礼物：虚拟礼物、至尊入场超前体验及活动勋章~
      </p>
    </div>
    <div class="task-item">
      <c-gift></c-gift>
    </div>
    <div class="content-wrap-ios"></div>
    <div :class="showFooter ? 'footer-show' : 'footer-hide'" class="footer">
      <c-avatar class="head" :avatarData="avatarData"></c-avatar>

      <div class="myscore">
        <p>我的积分：{{ myScore }}</p>
        <p class="tips">
          <span>注：</span>1. 积分通关后将自动重新累积积分，可再次领取礼盒
        </p>
        <p class="tips">
          <span style="visibility: hidden">注：</span>2.
          仅可在活动期间领取奖励，逾期未领将视为自动放弃
        </p>
      </div>
    </div>
    <c-modal v-show="dialog.show" :dialog="dialog"></c-modal>
  </div>
</template>

<script>
import consts, { isIOS } from "../api";
import { start, end } from "../config/timeConfig";
import coreBus from "@mi/milive-ui/utils/event-bus";
import { MiUtil } from "@mi/milive-util";

const util = new MiUtil();

export default {
  name: "IndexPage",
  components: {
    "c-gift": () => import("../components/c-gift.vue"),
    "c-modal": () => import("../components/c-modal"),
    "c-avatar": () => import("../components/c-avatar.vue"),
  },
  data() {
    return {
      bannerTimeTxt: `${start.format("MM月dd日hh:mm")}-${end.format(
        "MM月dd日hh:mm"
      )}`,
      timer: null,
      showFooter: true,
      isIos: isIOS(), // 判断是否是ios
      myScore: 0,
      uuid: consts.uuid,
      avatarData: {
        uid: consts.uuid,
        height: 133,
        width: 133,
      },
      dialog: {
        show: false,
        name: "gift",
        data: {
          giftName: "小老鼠",
          giftNum: 0,
          giftType: 0,
          // giftUrl:'https://zbtupian.zb.mi.com/zhibo/zbact_67e2c4b1acb1efc166f93b91176efada.jpg?response-cache-control=max-age=604800'
          giftUrl: "",
        },
      },
      lastScroll: 0,
      // scrollIng:false
    };
  },
  beforeDestroy() {
    coreBus.$off("ctlDialog");
    coreBus.$off("showScore");
  },
  mounted() {
    let that = this;
    setTimeout(function () {
      let top = document.querySelector(".content-wrap-ios").offsetTop;
      // console.log('!!!='+top)
      window.scrollTo(0, top);
      coreBus.$emit("getData");
      let t = document.documentElement.scrollTop || document.body.scrollTop;
      that.lastScroll = t;
      that.poll();
    }, 500);

    //手指接触屏幕
    document.body.addEventListener("touchstart", that.touchstart, false);
    // //手指离开屏幕
    // document.body.addEventListener("touchmove", that.touchmove, false);
    // document.body.addEventListener("touchend", that.touchend, false);
    // window.onscroll=that.onscroll

    coreBus.$on("showScore", (data) => {
      that.myScore = data;
    });

    coreBus.$on("ctlDialog", (data) => {
      that.dialog = data;
      that.showFooter = !that.dialog.show;
    });
  },
  methods: {
    poll() {
      let that = this;
      if (this.timer) clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        that.poll();
      }, 1000);
      let t = document.documentElement.scrollTop || document.body.scrollTop;
      // console.log('poll '+(t==this.lastScroll))
      this.showFooter = t == this.lastScroll && !that.dialog.show;
      this.lastScroll = t;
    },
    // onscroll() {
    //     let that=this
    // console.log('onscroll that.lastScroll='+that.lastScroll)
    // that.showFooter = false
    // that.scrollIng = true
    //
    // let t = document.documentElement.scrollTop || document.body.scrollTop;
    // that.lastScroll=t
    // // console.log('onscroll--'+t)
    // // this.showFooter = false
    // setTimeout(function () {
    //     // that.showFooter = false
    //     // let tt = document.documentElement.scrollTop || document.body.scrollTop;
    //     // console.log('onscroll--tt='+tt)
    //     // console.log('onscroll--lastScroll='+that.lastScroll)
    //     // console.log('onscroll--'+(that.lastScroll==tt))
    //     that.scrollIng=false
    //     that.showFooter = true
    // },  3000);
    // },
    // touchmove(e) {
    //     let that=this
    //     console.log('touchmove')
    //     this.showFooter = false
    //     setTimeout(function () {
    //         that.showFooter = false
    //     },  100);
    // },
    touchstart(e) {
      // console.log('touchstart')
      this.showFooter = false;
      // let that=this
      // this.showFooter = false
      // setTimeout(function () {
      //     that.showFooter = false
      // },  100);
    },
    // touchend(e) {
    //     let that=this
    //     // this.showFooter = true
    //     setTimeout(function () {
    //         console.log('touchend')
    //         that.showFooter = true
    //     },  1000);
    // },
    test() {
      coreBus.$emit("MiLive-UI:tips", { msg: "test" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../__common/css/base.scss";

.index-page {
  position: relative;
  width: 100%;
  background: #b600f9;

  .banner {
    position: relative;
    width: 100%;
    height: 1443px;
    overflow: hidden;
    background: url(../assets/images/banner.png) 0 0 / 100% auto no-repeat;

    &-time {
      letter-spacing: 2px;
      margin: 1200px 52px 20px;
      font-size: 48px;
      font-weight: 400;
      color: #ffffff;
      line-height: 56px;
    }

    &-txt {
      letter-spacing: 2px;
      margin: 0 52px;
      font-size: 36px;
      font-weight: 400;
      color: #ffffff;
      line-height: 56px;
    }
  }

  .task-text {
    margin: 0 auto;
    padding-left: 40px;
    width: 923px;
    font-size: 36px;
    font-weight: 400;
    color: #ffffff;
    line-height: 55px;
  }

  .task-item {
    margin: 58px auto 0;
    min-height: 100px;
    width: 988px;
    background: #b600f9;
  }

  .content-wrap {
    padding-top: 110px;
  }

  .content-wrap-ios {
    padding-top: 275px;
  }

  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 275px;
    transition: all 0.5s;
    z-index: 20;
    background: url(../assets/images/footer.png) 0 0 / 100% auto no-repeat;

    .head {
      width: 150px;
      height: 150px;
      position: absolute;
      top: 50%;
      transform: translateY(-35%);
      left: 66px;
    }

    .myscore {
      position: absolute;
      bottom: 48px;
      margin-left: 240px;
      font-size: 44px;
      color: #5e0095;
      font-weight: bold;
      line-height: 51px;
    }

    .tips {
      margin-top: 5px;
      font-size: 28px;
      color: #5e0095;
      line-height: 40px;
      opacity: 0.7;
    }
  }

  .footer-show {
    transform: scale(1) translateY(0%);
    //animation: .4s opacity-show both;
  }

  .footer-hide {
    transform: scale(0) translateY(100%);
    //animation: .4s opacity-hide both;
  }
}

@keyframes opacity-hide {
  0% {
    opacity: 1;
  }
  20% {
    opacity: 0.8;
  }
  40% {
    opacity: 0.6;
  }
  60% {
    opacity: 0.4;
  }
  80% {
    opacity: 0.2;
  }
  100% {
    opacity: 0;
  }
}

@keyframes opacity-show {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0.2;
  }
  40% {
    opacity: 0.4;
  }
  60% {
    opacity: 0.6;
  }
  80% {
    opacity: 0.8;
  }
  100% {
    opacity: 1;
  }
}
.webps .banner {
  background: url(../assets/images/banner.webp) 0 0 / 100% auto no-repeat;
}
</style>
