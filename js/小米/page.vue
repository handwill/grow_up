<template>
  <div class="index-page">
    <c-banner></c-banner>

    <div class="gift">
      <div class="gift-title center"></div>

      <div class="gift-wrap">
        <div
          class="gift-item"
          v-for="(giftItem, giftIndex) in giftInfo"
          :key="giftIndex"
        >
          <div class="gift-item-con" :class="`bgCon${giftIndex}`"></div>
          <p class="gift-item-name">{{ giftItem.giftName }}</p>
          <p class="gift-item-value">{{ giftItem.giftValue }}</p>
        </div>
      </div>
    </div>

    <div class="rank-title center"></div>

    <c-tab
      :nowChooseTab1="nowChooseTab1"
      :nowChooseTab0="nowChooseTab0"
    ></c-tab>

    <c-rank
      :rankList="rankListZuid"
      :requestNum="requestNum"
      :isWin="nowChooseTab1 < todayStage || endStatus"
    ></c-rank>

    <div class="center reward"></div>

    <div class="center rule"></div>

    <div class="footer"></div>

    <c-topbar
      v-if="consts.zuid"
      class="bar-position"
      :myInfo="anchorInfo"
    ></c-topbar>
  </div>
</template>

<script>
import consts, {
  getRankList,
  getAnchorInfo,
  giftInfo,
  dateInfo,
  _getToday,
} from "../api";
import coreBus from "@mi/milive-ui/utils/event-bus";

export default {
  name: "IndexPage",
  data() {
    return {
      consts,
      giftInfo,
      rankListZuid: [],
      anchorInfo: [],
      requestNum: 10,
      nowChooseTab0: 0, //礼物tab
      nowChooseTab1: 0, //日期tab
      todayStage: 0,
      endStatus: false,
    };
  },
  mounted() {
    let that = this;

    coreBus.$on("more", (page) => {
      that.requestNum = page;
      that.getRankZuidData();
    });

    coreBus.$on("chooseTab", (index, type) => {
      if (type) {
        if (index > that.todayStage) {
          coreBus.$emit("MiLive-UI:tips", { msg: "暂未开始~" });
          return;
        } else {
          that.nowChooseTab1 = index;
        }
      } else {
        that.nowChooseTab0 = index;
        that.nowChooseTab1 = that.todayStage;
      }
      that.getRankZuidData();
    });

    that.initData();
  },
  methods: {
    async initData() {
      let that = this;
      let today = await _getToday();
      that.todayStage = today.stage;
      that.endStatus = today.endStatus;
      that.nowChooseTab1 = today.stage;
      if (consts.tab) {
        that.nowChooseTab0 = consts.tab - 1;
        // document.querySelector("#giftCon").scrollIntoView(true);
      }
      that.getRankZuidData();
      if (consts.zuid) {
        that.getAnchorData();
      }
    },

    async getAnchorData() {
      let that = this;

      let params = {
        zuid: consts.zuid,
      };

      let anchorData = await getAnchorInfo(params);
      if (anchorData.code === 0) {
        for (let i = 0; i < 3; i++) {
          that.anchorInfo.push(anchorData.data["anchorInfo" + i]);
        }
      }
    },

    //获取主播排行榜
    async getRankZuidData() {
      let that = this;
      // let date = dateInfo[that.nowChooseTab1].requestDate;
      let date = dateInfo[that.nowChooseTab1].format("yyyyMMdd");
      let rankName = "total_" + (that.nowChooseTab0 + 1);

      let params = {
        n: that.requestNum + 2,
        rankType: 0,
        needContribute: true,
        rankName: rankName,
        date: date,
      };

      let rankData = await getRankList(params);
      that.rankListZuid = [];

      if (rankData.code === 0) {
        rankData.data.rank.forEach((item) => {
          item.giftVal = Math.floor(
            item.score / giftInfo[that.nowChooseTab0].giftVal
          );
        });
        that.rankListZuid = rankData.data.rank || [];
      }
    },
  },
  components: {
    "c-banner": () => import("../components/c-banner.vue"),
    "c-tab": () => import("../components/c-tab.vue"),
    "c-rank": () => import("../components/c-rank.vue"),
    "c-topbar": () => import("../components/c-topbar.vue"),
  },
};
</script>

<style lang="scss" scoped>
@import "../../__common/css/base.scss";

.index-page {
  background: #ffbfc7;

  .center {
    margin: 0 auto;
  }

  .gift {
    position: relative;
    margin-top: -260px;

    &-title {
      width: 423px;
      height: 54px;
      background: url(../assets/images/gift-title.png) 0 0 /100% auto no-repeat;
    }

    &-wrap {
      display: flex;
      justify-content: space-between;
      margin: 41px 59px 0;
    }

    &-item {
      &-con {
        width: 292px;
        height: 263px;
      }

      @for $i from 0 through 2 {
        .bgCon#{$i} {
          background: url(../assets/images/bg-gift#{$i}.png)
            0
            0 /100%
            auto
            no-repeat;
        }
      }

      &-name {
        margin: 35px 0 20px;
        text-align: center;
        font-size: 42px;
        color: #c13c41;
      }

      &-value {
        text-align: center;
        font-size: 36px;
        color: rgba(193, 60, 65, 0.8);
        margin-bottom: 130px;
      }
    }
  }

  .rank-title {
    width: 570px;
    height: 55px;
    background: url(../assets/images/rank-title.png) 0 0 /100% auto no-repeat;
    margin-bottom: 45px;
  }

  .reward {
    width: 966px;
    height: 661px;
    background: url(../assets/images/reward.png) 0 0 /100% auto no-repeat;
  }

  .rule {
    position: relative;
    width: 940px;
    height: 506px;
    margin-top: 145px;
    margin-bottom: -160px;
    background: url(../assets/images/rule.png) 0 0 /100% auto no-repeat;
  }

  .footer {
    width: 100%;
    height: 459px;
    background: url(../assets/images/bg-footer.png) 0 0 /100% auto no-repeat;
  }

  .bar-position {
    position: fixed;
    bottom: 0;
  }
}

.webps .index-page {
  .gift-title {
    background: url(../assets/images/gift-title.webp) 0 0 /100% auto no-repeat;
  }

  @for $i from 0 through 2 {
    .bgCon#{$i} {
      background: url(../assets/images/bg-gift#{$i}.webp)
        0
        0 /100%
        auto
        no-repeat;
    }
  }

  .rank-title {
    background: url(../assets/images/rank-title.webp) 0 0 /100% auto no-repeat;
  }

  .reward {
    background: url(../assets/images/reward.webp) 0 0 /100% auto no-repeat;
  }

  .rule {
    background: url(../assets/images/rule.webp) 0 0 /100% auto no-repeat;
  }

  .footer {
    background: url(../assets/images/bg-footer.webp) 0 0 /100% auto no-repeat;
  }
}
</style>
