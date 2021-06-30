import axios from "axios";
import qs from "qs";
import coreBus from "@mi/milive-ui/utils/event-bus";
import { MiUtil } from "@mi/milive-util";
import { today, end, start } from "./config/timeConfig";
let util = new MiUtil();

let _location = window.location.href,
  uuid = util.getCookie("zhiboUuid"),
  st = util.getCookie("zhiboServiceToken"),
  zuid = util.getQueryVal("zuid", _location),
  tab = util.getQueryVal("tab", _location),
  env = util.getQueryVal("env", _location),
  ctype = util.sys.isAndroid() ? 2 : 1,
  pkGroupName = "battle",
  rankName = "total";

// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    let codeArr = [-1, 1, 14, 53];
    let errorTxt,
      codeObj = {
        "-1": "error",
        1: "参数错误",
        14: "单人单主播最大支持10000票哦~",
        53: "非竞猜时间",
      };

    errorTxt = codeObj[response.data.code] || "未知错误";

    if (codeArr.includes(response.data.code)) {
      coreBus.$emit("MiLive-UI:tips", {
        msg: errorTxt,
      });
    }

    return response;
  },
  (error) => {
    let errStatusArr = [400, 401, 403, 404, 405, 500],
      statusObj = {
        400: "错误请求",
        401: "验证失败",
        403: "拒绝访问",
        404: "活动未开始~",
        405: "请求方法不允许",
        500: "服务器错误",
      },
      errorStatusTxt;

    if (error && error.response) {
      if (errStatusArr.indexOf(error.response.status)) {
        errorStatusTxt = statusObj[error.response.status] || "网络错误";
        coreBus.$emit("MiLive-UI:tips", {
          msg: errorStatusTxt,
        });
      }
    }
  }
);

/**
 * 检查是否登录
 */
export let checkIsLogin = () => {
  var ua = navigator.userAgent;
  var lowerUa = ua.toLowerCase();
  if (!(uuid && st)) {
    if (util.app.isZhiBo()) {
      window.location.href = "walilive://unlogin?closeWebview=true";
    } else if (/micromessenger/.test(lowerUa)) {
      const REDIRECT_URI =
        "http://weixin.zb.mi.com/oauth/login?share_url=" +
        encodeURIComponent(window.location.href);

      window.location.href =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0f7c40ebbcf236fe&redirect_uri=" +
        encodeURIComponent(REDIRECT_URI) +
        "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
    } else {
      download();
    }
    return false;
  } else {
    return true;
  }
};

export const download = (_) => {
  var ua = navigator.userAgent;
  var lowerUa = ua.toLowerCase();
  if (!/micromessenger/.test(lowerUa)) {
    let url = encodeURIComponent(`${window.location.href.split("?")[0]}`);
    // location=`walilive://openurl/newwindow?url=${url}&sharable=true&ishalf=false`;
    location = `walilive://channel?page=0&channel_id=59`;
    setTimeout(function () {
      location = checkPlatform();
    }, 5 * 1000);
  } else {
    location = checkPlatform();
  }
};

// 检查平台
function checkPlatform() {
  var ua = navigator.userAgent;
  var lowerUa = ua.toLowerCase();
  if (/micromessenger/.test(lowerUa)) {
    return "http://a.app.qq.com/o/simple.jsp?pkgname=com.wali.live";
  } else if (/iphone/.test(lowerUa)) {
    return "https://itunes.apple.com/cn/app/id1095089970?mt=8";
  } else {
    return "http://app.mi.com/details?id=com.wali.live";
  }
}

export function isIOS() {
  var _sysReg = [
    /(Android).*/i,
    /(iPhone|iPad|iPod|iOS).*/i,
    /(windows(.*|\s*)phone).*/i,
  ];
  var _ua = navigator.userAgent.toLowerCase();

  return _sysReg[1].test(_ua);
}

const IOS_LATEST_VERSION = 505086;
const checkIOSOld = () => {
  if (util.sys.isIOS()) {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("-") != -1) {
      let versions = ua.split("mizhibo-")[1].split("-")[1];

      let frontCode = versions.split(".")[0],
        midCode = versions.split(".")[1],
        afterCode = versions.split(".")[2];

      let versionNum =
        parseInt(frontCode * 100000) +
        parseInt(midCode * 1000) +
        parseInt(afterCode);

      if (versionNum < parseInt(IOS_LATEST_VERSION)) {
        return 1;
      } else {
        return 0;
      }
    }
  } else {
    return 0;
  }
};

export const CRITICAL_IOS_VERSION = "5.5.101";
export const CRITICAL_ANDROID_VERSION = "5.14.89";
/**
 * 检查版本
 */
export function checkAppVersionIsNew() {
  let ua = navigator.userAgent.toLowerCase();

  if (ua.indexOf("-") != -1) {
    let versions = ua.split("mizhibo-")[1].split("-")[1].split(".");

    let frontCode = versions[0],
      midCode = versions[1],
      afterCode = versions[2];

    let frontVersionCode, midVersionCode, afterVersionCode;

    if (util.sys.isAndroid()) {
      let androidVersions = CRITICAL_ANDROID_VERSION.split(".");
      frontVersionCode = androidVersions[0];
      midVersionCode = androidVersions[1];
      afterVersionCode = androidVersions[2];
    } else {
      let iosVersions = CRITICAL_IOS_VERSION.split(".");
      frontVersionCode = iosVersions[0];
      midVersionCode = iosVersions[1];
      afterVersionCode = iosVersions[2];
    }

    if (
      frontCode < frontVersionCode ||
      (frontCode === frontVersionCode &&
        (midCode < midVersionCode ||
          (midCode === midVersionCode && afterCode <= afterVersionCode)))
    ) {
      return false;
    } else if (
      frontCode > frontVersionCode ||
      (frontCode === frontVersionCode &&
        (midCode > midVersionCode ||
          (midCode === midVersionCode && afterCode > afterVersionCode)))
    ) {
      return true;
    }
  } else {
    return false;
  }
}

// 默认导出的变量
export default {
  uuid,
  zuid,
  st,
  tab,
  checkIOSOld,
};

/**
 * 获取当前时间
 * @param {参数} data
 */
export const getTime = async (_) => {
  // if (env == 'test') {
  //     return {code: 0, data: {t: new Date().getTime()}};
  // };

  return await axios.get(GET_CUR_TIME).then(function ({ data }) {
    return data;
  });
};

/**
 * 获取主播信息(挂件)
 * @param {zuid, actId} data
 */

export const getAnchorInfo = async (data) => {
  let params = Object.assign({}, data, {
    actId: ACT_ID,
  });

  let url = `${GET_INFO}/${ACT_ID}/lanternAnchorInfo`;

  return await axios
    .get(url, {
      params,
    })
    .then(function ({ data }) {
      return data;
    });
};

/**
 * 获取排行榜列表
 * @param {请求参数} data
 */
export const getRankList = async (data, type) => {
  let params, url;
  params = Object.assign({}, data, {
    uuid,
    st,
    actId: ACT_ID,
  });

  url = `${GET_INFO}/${ACT_ID}/rankInfo`;

  return await axios
    .get(url, {
      params,
    })
    .then(function ({ data }) {
      return data;
    });
};

export const _getToday = async () => {
  return await axios.get(GET_CUR_TIME).then(function ({ data }) {
    if (data && data.code == 0) {
      let stage,
        endStatus = false;
      const now = data.data.t;

      let curD = new Date(now);
      let dta = curD.getDate() - start.getDate();
      stage = dta;

      // let endTime1 = dateInfo[0].getTime();
      // let endTime2 = dateInfo[1].getTime();
      // let endTime3 = dateInfo[2].getTime();
      //
      // if(now  < endTime1){
      //     stage = 0;
      // }else if(now  >= endTime1 && now < endTime2){
      //     stage = 1;
      // }else if(now  >= endTime2){
      //     stage = 2;
      // }

      if (now >= end.getTime()) {
        endStatus = true;
      }

      return { stage, endStatus };
    }
  });
};

export const giftInfo = [
  {
    giftName: "梦幻海底",
    giftValue: "255钻",
    giftVal: 255,
  },
  {
    giftName: "星光灯",
    giftValue: "518钻",
    giftVal: 518,
  },
  {
    giftName: "夏日荷塘",
    giftValue: "1199钻",
    giftVal: 1199,
  },
];

export const dateInfo = [
  start.addDays(0),
  start.addDays(1),
  start.addDays(2),
  // new Date('2021/06/23 00:00:00'),
  // new Date('2021/06/24 00:00:00'),
  // new Date('2021/06/25 00:00:00'),
];

export const getDateInfo = () => {
  let ret = [];
  dateInfo.forEach((item) => {
    ret.push(item.format("M.dd"));
  });
  return ret;
};

// //测试
// export const dateInfo = [
//     {
//         requestDate: 20210525,
//         time: '2021/05/26 00:00:00',
//     },
//     {
//         requestDate: 20210526,
//         time: '2021/05/27 00:00:00',
//     },
//     {
//         requestDate: 20210527,
//         time: '2021/05/28 00:00:00',
//     },
// ]
