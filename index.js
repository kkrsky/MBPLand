//from https://qiita.com/tetrapod117/items/e7b48485c98f6b88f311

//https://qiita.com/guchimina/items/aa36e27875ae26876d2c
//NOTIFY_TOKEN getPrivate('NOTIFY_TOKEN')
//NOTIFY_TOKEN_TEST getPrivate('NOTIFY_TOKEN_TEST')
//最新のGASとJS　https://qiita.com/jooji/items/71ac0f514d247cafb648
//最新のGASとJS2 https://officeforest.org/wp/2020/02/06/google-apps-script%E3%81%AEv8-runtime%E5%AF%BE%E5%BF%9C%E3%82%92%E6%A4%9C%E8%A8%BC%E3%81%97%E3%81%A6%E3%81%BF%E3%81%9F/
//LINE Developersで取得したアクセストークンを入れる
var CHANNEL_ACCESS_TOKEN = getPrivate("CHANNEL_ACCESS_TOKEN");
var line_endpoint = "https://api.line.me/v2/bot/message/reply";
let LINE_ENDPOINT_PROFILE = "https://api.line.me/v2/bot/profile";
let LINE_ENDPOINT_DATA = "https://api-data.line.me/v2/bot/message"; //GET https://api-data.line.me/v2/bot/message/{messageId}/content
var MASTER_SPREAD_SHEET_ID = getPrivate("MASTER_SPREAD_SHEET_ID");
var LOG_FILE_ID = getPrivate("LOG_FILE_ID"); // デバッグログを出力するドキュメント
let FOLDER_ID_PHOTO_TEST = "1j4rXQgx037F2MlFfg1lSK0nJlTgZQYOZ";
let FOLDER_ID_PHOTO_RECIPT = getPrivate("FOLDER_ID_PHOTO_RECIPT");
// let FOLDER_ID_PHOTO_TEST = "1OKFxmvUKYemPtE0UolWHHIJyzRIgjG9M";
var spreadSheet = SpreadsheetApp.openById(MASTER_SPREAD_SHEET_ID);
// var sheet_user = spreadSheet.getSheetByName("user");
// var sheet_subscribe = spreadSheet.getSheetByName("subscribe");
// var sheet_dealForm = spreadSheet.getSheetByName("deal_form");

let templateIconId = "1lM0CcoR__FzewvQ6kuH-mrksZRuSsOoG";
let templateIconUrl = getFileUrl(templateIconId);
// Utilities.sleep(1000);
class DoSheet {
  constructor(obj) {
    let { sheetId, sheetName, dataLabelArry } = obj;
    if (!sheetId) sheetId = MASTER_SPREAD_SHEET_ID;
    this.sheetId = sheetId;
    this.sheetName = sheetName;
    if (dataLabelArry) {
      this.dataLabelArry = dataLabelArry;
      this.isDatabase = true;
    } else {
      this.isDatabase = false;
    }
    this.initField();

    //field
    //auto
    this.spreadSheet;
    this.sheet;
    this.sheetDataArry;
  }
  //getter(プロパティ情報を取得)
  get some() {
    return this.sheetId;
  }

  get getDataForClient() {
    let obj = {
      sheetName: this.sheetName,
      dataLabelArry: this.dataLabelArry,
      sheetDataArry: this.sheetDataArry,
      // sheetDataArry: this.getSheetDataArry(),
    };
    return obj;
  }

  //static (インスタンスを引数とする処理)
  static some2(a, b) {
    return a.sheetId + b.sheetId;
  }

  //meshod(インスタンスごとに処理を行う)
  //initter
  initField() {
    this.spreadSheet = SpreadsheetApp.openById(this.sheetId);
    this.sheet = this.spreadSheet.getSheetByName(this.sheetName);
    this.sheetDataArry = this.getSheetDataArry();
  }
  initSheet() {
    this.sheet.appendRow(this.dataLabelArry);
    let resArry = [];
    resArry[0] = this.dataLabelArry;
    return resArry;
  }

  //action
  getSheetDataArry() {
    if (this.isDatabase) {
      //データベース仕様のシートを取得する場合
      let lastRow = this.sheet.getLastRow();
      let sheetDataArry = [];
      if (lastRow === 0) {
        //白紙
        this.initSheet();
        this.sheetDataArry = sheetDataArry;
      } else if (lastRow === 1) {
        //データラベルのみ
        this.sheetDataArry = sheetDataArry;
      } else {
        let lastCol = this.sheet.getLastColumn();
        sheetDataArry = this.sheet
          .getRange(2, 1, lastRow - 1, lastCol)
          .getValues();
        this.sheetDataArry = sheetDataArry;
      }
      // debug("sheetDataArry", sheetDataArry);
      return sheetDataArry;
    } else {
      //既存のシートを取得する場合
      let lastRow = this.sheet.getLastRow();
      let lastCol = this.sheet.getLastColumn();
      let sheetDataArry = this.sheet
        .getRange(1, 1, lastRow, lastCol)
        .getValues();
      this.sheetDataArry = sheetDataArry;
      return sheetDataArry;
    }
  }

  filtered({ key, filterItem, isOneItem, toLabelObj, isExist }) {
    //sheetDataArryを調整
    //isOneItem: 一次元配列で１つのデータのみを返す。(findメソッドライク)
    //toLabelObj: labelをkeyとしてオブジェクトを返す。
    //isExist: filterしたアイテムが見つからなかった場合はfalseを返す。
    //find key index
    let keyIndex = 0;
    let filteredArry = [];
    if (isNaN(Number(key))) {
      //object key
      keyIndex = this.dataLabelArry.indexOf(key);
      if (keyIndex < 0) {
        debug(
          "error: can not find key=" +
            key +
            " in dataLabelArry=" +
            this.dataLabelArry
        );
        if (isExist) return false;
        return [];
      }
    }

    //filter
    if (typeof filterItem === "function") {
      //任意関数
      return filterItem(this.sheetDataArry);
    } else if (Array.isArray(filterItem)) {
      //複数フィルター

      //そのうち実装
      if (isExist) return false;
      return [];
    } else {
      filteredArry = this.sheetDataArry.filter((sheetData) => {
        return sheetData[keyIndex] === filterItem;
      });

      if (isExist) {
        if (filteredArry.length === 0) return false;
      }

      //toLabelObj
      if (toLabelObj) {
        // debug("filteredArry", filteredArry);
        if (filteredArry.length === 0) return {};
        filteredArry = filteredArry.map((dataArr, data_i) => {
          let row = dataArr[0] + 1;
          let obj = {};
          obj.index = {};
          this.dataLabelArry.forEach((key, key_i) => {
            let col = key_i + 1;
            obj[key] = dataArr[key_i];
            obj.index[key] = { row, col };
          });
          return obj;
        });
      }
      //isOneItem
      if (isOneItem && filteredArry.length > 0) filteredArry = filteredArry[0];

      return filteredArry;
    }
  }
  appendRow(arr, option) {
    let { isIncrement } = option;
    if (Array.isArray(arr)) {
      if (isIncrement) {
        let sheetDataArry = this.getSheetDataArry();
        if (sheetDataArry.length > 1) {
          let lastId = sheetDataArry.pop()[0];
          arr.unshift(lastId + 1);
        } else {
          //id=1のデータがない
          arr.unshift(1);
        }
      }
      let lastCol = this.dataLabelArry.length;
      if (arr.length > lastCol || arr.length < lastCol) {
        debug("appendRow arry(" + arr.length + ") should be length=" + lastCol);
      }
      this.sheet.appendRow(arr);
    } else if (typeof arr === "object") {
      let keys = Object.keys(arr);
      let maxCol = this.dataLabelArry.length;

      //return [[index,data],...]
      let connectArry = keys.map((key, key_i) => {
        if (key_i === 0 && isIncrement) {
          let sheetDataArry = this.getSheetDataArry();
          let lastId = sheetDataArry.pop()[0];
          return [0, lastId + 1];
        }
        let index = this.dataLabelArry.indexOf(key);
        if (index < 0) {
          maxCol += 1;
          return [maxCol, arr[key]];
        } else {
          return [index, arr[key]];
        }
      });

      let appendArry = [];
      for (let i = 0; i < maxCol; i++) {
        appendArry[i] = 0;
      }

      appendArry = appendArry.map((v, index) => {
        let connectA = connectArry.find((connect) => {
          return connect[0] === index;
        });
        return connectA[1];
      });
      this.sheet.appendRow(appendArry);
    } else {
      debug("error:appendRow item is not array or object");
    }
  }
  setValue({ sRow, sCol, numRow, numCol, value }) {
    if (!numRow) numRow = 1;
    if (!numCol) numCol = 1;
    this.sheet.getRange(sRow, sCol, numRow, numCol).setValue(value);
  }
}
let sheet_test = new DoSheet({
  sheetId: MASTER_SPREAD_SHEET_ID,
  sheetName: "test",
  dataLabelArry: ["a", "b", "c"],
});
let sheet_subscribe = new DoSheet({
  sheetId: MASTER_SPREAD_SHEET_ID,
  sheetName: "subscribe",
  dataLabelArry: ["itemList", "totalPrice", "totalBuy"],
});
let sheet_dealForm = new DoSheet({
  sheetId: MASTER_SPREAD_SHEET_ID,
  sheetName: "deal_form",
  dataLabelArry: [
    "id",
    "createAt",
    "deleteAt",
    "updateAt",
    "submitType",
    "attribute",
    "buyUserId",
    "buyUserName",
    "requestUserIdArry",
    "name",
    "num",
    "price",
    "sumPrice",
    "memo",
    "imageName",
    "imageUrl",
  ],
});

let sheet_user = new DoSheet({
  sheetId: MASTER_SPREAD_SHEET_ID,
  sheetName: "user",
  dataLabelArry: [
    "id",
    "createAt",
    "deleteAt",
    "name",
    "userId",
    "Status",
    "Icon",
    "undef",
  ],
});

let sheet_deal = new DoSheet({
  sheetId: MASTER_SPREAD_SHEET_ID,
  sheetName: "main",
});

//test送信
function testToLine() {
  let message = "this is test";
  SendToLine(message);
}

//private key
function getPrivate(key) {
  return PropertiesService.getScriptProperties().getProperty(key);
}
//spreadsheetからデータを取得
function GoogleFormToLine() {
  var sheetId = "1u6SgXL18BRPL8r3_QlAjavL-SR7Z2SuT-LP0LCangZk";
  var sheetName = "お金をまとめて払った人用フォーム回答";

  //1_フォームの回答シートを取得
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  // var sheet = SpreadsheetApp.getActiveSheet(); //sheetの指定
  var row = sheet.getLastRow(); //行数
  // var column = 5; //列数
  var column = sheet.getLastColumn(); //列数
  var range = sheet.getDataRange(); //sheetから範囲指定するための準備
  var message = "";
  for (var i = 1; i <= column; i++) {
    var item = range.getCell(1, i).getValue(); //1行目
    var value = range.getCell(row, i).getValue(); //最終行
    message += "\n■" + item + "\n" + value;
  }
  SendToLine(message);
}

//LINEに通知
function SendToLine(message) {
  //ファイル→プロジェクトのプロパティ→スプリクトのプロパティからLINE_TOKENを設定しておく
  var token = getPrivate("LINE_TOKEN_TEST");
  // PropertiesService.getScriptProperties().getProperty("LINE_TOKEN_TEST");
  var op = {
    method: "post",
    "Content-Type": "application/x-www-form-urlencoded",
    payload: "message=" + message,
    headers: { Authorization: "Bearer " + token },
  };
  var res = UrlFetchApp.fetch("https://notify-api.line.me/api/notify", op);
  Logger.log(JSON.parse(res.getContentText())); //Response
}

function SubmitMail(e) {
  var sheetId = "1435946665";
  var sheetName = "testForm";

  //1_フォームの回答シートを取得
  var SS = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);

  //2_最終行を取得
  var sheetDates = SS.getDataRange();
  var lastRow = sheetDates.getLastRow();
  var lastRowA = sheetDates.getCell(lastRow, 1);

  //3_最終行のA列にデータが入っていたら終了
  if (lastRowA.getValue() != "") {
    Logger.log("上書き防止のため終了");
    return 0;
  }

  //4_フォームIDを保存
  var formid = "1cFlGHVNvvDoOD7XRXoNunCAKc-gb-B50ofYfyvPqtm0";

  //5_回答データ一覧をフォームから取得
  var formDates = FormApp.openById(formid).getResponses();

  //6_回答データ一覧をフォームから一番最後の編集用URL取得
  var EditableUrl =
    formDates[Number(formDates.length - 1)].getEditResponseUrl();

  //7_回答用URLを作成
  var EditableStr =
    '=HYPERLINK("' + EditableUrl + '","編集用URL.' + Number(lastRow - 1) + '")';

  //8_回答用URLを最終のAセルへ実装
  lastRowA.setValue(EditableStr);
}

function formatter(replyObj) {
  let { type, message } = replyObj;
  let replyMessage = [];
  switch (type) {
    case "simpleReply": {
      if (message) {
        replyMessage.push({
          type: "text",
          text: message,
        });
      }

      break;
    }
    case "showWifiPassword": {
      replyMessage.push({
        type: "flex",
        altText: "Wifiパスワード",
        contents: {
          type: "bubble",
          hero: {
            type: "image",
            url: "https://drive.google.com/uc?id=1mDTixAbOVXcwWwCeNU5phyEVPHAGv7ah",
            size: "full",
            aspectMode: "cover",
            action: {
              type: "uri",
              label: "action",
              uri: "https://drive.google.com/uc?id=1mDTixAbOVXcwWwCeNU5phyEVPHAGv7ah",
            },
          },
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                text: "c3fd5crnafh8i",
                align: "center",
                wrap: true,
                weight: "bold",
              },
            ],
            action: {
              type: "message",
              label: "action",
              text: "c3fd5crnafh8i",
            },
          },
        },
      });
      break;
    }
    case "dealMoney": {
      replyMessage.push({
        type: "flex",
        altText: "[おかねのやりとり]",
        contents: {
          type: "bubble",
          footer: {
            type: "box",
            layout: "vertical",
            spacing: "sm",
            contents: [
              {
                type: "text",
                text: "おかねのやりとり",
                weight: "bold",
                align: "center",
                wrap: true,
              },
              {
                type: "separator",
                margin: "md",
              },
              {
                type: "text",
                text: "請求",
                align: "center",
              },
              {
                type: "button",
                style: "primary",
                height: "sm",
                action: {
                  type: "uri",
                  label: "まとめて払ったよ",
                  uri: "https://forms.gle/SUGUhKpsoApPsyav9",
                },
              },
              {
                type: "button",
                style: "primary",
                height: "sm",
                action: {
                  type: "uri",
                  label: "代わりに払ったよ",
                  uri: "https://forms.gle/xMsz4rCJVXMQ5CFf9",
                },
              },
              {
                type: "separator",
                margin: "lg",
              },
              {
                type: "text",
                text: "返済",
                align: "center",
              },
              {
                type: "button",
                style: "primary",
                height: "sm",
                action: {
                  type: "uri",
                  label: "お金を渡したよ",
                  uri: "https://forms.gle/eh1spQTWXgQAuoDH9",
                },
              },
              {
                type: "separator",
                margin: "lg",
              },
              {
                type: "text",
                text: "\b確認",
                align: "center",
              },
              {
                type: "button",
                style: "secondary",
                height: "sm",
                action: {
                  type: "uri",
                  label: "おかねのやりとり確認",
                  uri: "https://docs.google.com/spreadsheets/d/1u6SgXL18BRPL8r3_QlAjavL-SR7Z2SuT-LP0LCangZk/edit?usp=sharing",
                },
              },
              {
                type: "separator",
                margin: "lg",
              },
            ],
            flex: 0,
          },
        },
      });
      break;
    }
    case "showPayment": {
    }
  }
  return replyMessage;
}

/**
 *
 * @param {object} obj
 * @param {URL} url (任意)
 * @returns
 */
function createUrlQuery(obj, url) {
  if (typeof obj === "object") {
    let keyArry = Object.keys(obj);
    let queryArry = [];
    for (let key of keyArry) {
      queryArry.push(key + "=" + obj[key]);
    }
    queryArry = [queryArry.join("&")];
    queryArry.unshift("?");

    if (url) {
      queryArry.unshift(url);
    }
    return queryArry.join("");
  } else {
    return "";
  }
}

/**
 *
 * クライアント側からの呼び出し
 *
 */
function getSheetUserList() {
  return JSON.stringify(sheet_user.getDataForClient);
}
function getUserData(userId) {
  let userData = sheet_user.filtered({
    key: "id",
    filterItem: userId,
    isOneItem: true,
  });
  debug("userData", userData);

  if (userData && userData.length) {
    return JSON.stringify(userData);
  } else return false;
}
function getSubscribeList() {
  return JSON.stringify(sheet_subscribe.getDataForClient);
}
function getDealList() {
  return JSON.stringify(sheet_deal.getDataForClient);
}
function getPost_subscribe(postedArry, imageDataObj) {
  debug("posted obj", JSON.stringify(postedArry));
  let blob = convertBase64ToBlob(imageDataObj.base64, imageDataObj.name);
  let imageUrl = saveImage(blob);
  postedArry = postedArry.map((arr) => {
    arr.push(imageUrl);
    return arr;
  });

  postedArry.forEach((arr) => {
    sheet_dealForm.appendRow(arr, { isIncrement: true });
  });
}
function getMemberList() {}

function getSheetDealData(obj) {
  var dealArry_test = [
    [
      "deal_id",
      "createAt",
      "	deleteAt",
      "	updateAt",
      "	submitType",
      "	attribute",
      "	buyUserId",
      "	buyUserName	",
      "requestUserIdArry	",
      "name",
    ],
    [1, 122222, "", "", "A"],
    [2, 122222, "", "", "A"],
    [3, 122222, 333333, "", "B"],
    [4, 122222, "", "", "C"],
  ];
  if (!obj) {
    obj = {
      isExceptTitle: true,
      isTitle: false,
      dealId: false,
      submitType: false,
      filterFunc: false,
      isActive: false,
      latest: false,
    };
  }
  let {
    isExceptTitle, //重複不可 デフォルトでtrue, １行目のタイトルの配列を除外する。falseにしたら他のフィルターが使えない
    isTitle, //重複不可 タイトルの配列のみを取得
    dealId,
    submitType, //重複可能 SubmitTypeでフィルター
    filterFunc, //重複可能 独自関数でフィルター
    isActive, //重複可能 論理削除されていないデータを取得
    latest, //重複可能 任意の最新の件数だけデータを取得
  } = obj;
  var lastRow_deal = sheet_dealForm.getLastRow();
  var lastCol_deal = sheet_dealForm.getLastColumn();
  var dealArry = sheet_dealForm
    .getRange(1, 1, lastRow_deal, lastCol_deal)
    .getValues();

  if (dealArry.length < 2) {
    //タイトルのみまたはシートが白紙
    debug("error: getSheetDealData is failed at sheet is blink or only title");
    return "blink";
  }
  if (isTitle) {
    //タイトルの配列のみを取得
    return dealArry[0];
  }
  if (isExceptTitle === false) {
    return dealArry;
  } else {
    dealArry.shift();
  }

  if (dealId) {
    //idで指定したデータを取得
    dealArry = dealArry.find((deal) => {
      return deal[0] === dealId;
    });
  }
  if (submitType) {
    let submitTypeObj = {
      SUBSCRIBE: "SUBSCRIBE", //サブスク
      BUY: "BUY", //購入
      REQUEST: "REQUEST", //請求
      PAYMENT: "PAYMENT", //返金
      NOTICE: "NOTICE", //通知
      ERROR: "ERROR", //エラー
    };
    submitTypeKeyArry = Object.keys(submitTypeObj);
    let isFind = submitTypeKeyArry.find((key) => {
      return submitType === submitTypeObj[key];
    });
    if (isFind) {
      dealArry = dealArry.filter((deal) => {
        let submitType_deal = deal[4];
        return submitType_deal === submitType;
      });
    }
  }
  if (typeof filterFunc === "function") {
    //クライアント側で作成した関数でフィルターする
    dealArry = filterFunc(dealArry);
  }
  if (isActive) {
    //dealArryを論理削除されていないデータにする。
    dealArry = dealArry.filter((deal) => {
      let deleteAt = deal[2];
      return deleteAt == "";
    });
  }
  if (!isNaN(Number(latest))) {
    //latest {Number}
    //latestの数値だけ最新の情報を取得
    dealArry = dealArry.splice(-1 * Number(latest));
    dealArry = dealArry.reverse();
  }

  //出力
  return dealArry;
}
/**
 *
 *
 *
 *
 */

function getSheetData({ sheetId, sheetName }) {
  if (!sheetId) sheetId = MASTER_SPREAD_SHEET_ID;
  var spreadSheet_here = SpreadsheetApp.openById(sheetId);
  var sheet_here = spreadSheet_here.getSheetByName(sheetName);
  var lastRow_here = sheet_here.getLastRow();
  var lastCol_here = sheet_here.getLastColumn();
  var sheetDataArry = sheet_here
    .getRange(1, 1, lastRow_here, lastCol_here)
    .getValues();
  if (sheetDataArry.length === 0) {
    //白紙のシート
    return initSheet(sheetDataArry);
  } else {
    return sheetDataArry;
  }
}
function initSheet(sheetName) {
  let initTitleArry = [];
  switch (sheetName) {
    case "user": {
      initTitleArry = [
        "userId",
        "createAt",
        "deleteAt",
        "userName",
        "userUUId",
        "Status",
        "IconUrl",
        "C",
      ];
      break;
    }
    case "subscribe": {
      break;
    }
    case "deal_form": {
      break;
    }
    case "user": {
      break;
    }
  }
}
async function checkSheetUserData(userId) {
  async function getUserDisplayName(userId) {
    let url = LINE_ENDPOINT_PROFILE + "/" + userId;
    var res = await getContent(url);
    console.log("getUserDisplayName", JSON.parse(res));
    return JSON.parse(res).displayName;
  }
  let userObj = sheet_user.filtered({
    key: "userId",
    filterItem: userId,
    isOneItem: true,
    toLabelObj: true,
    isExist: true,
  });

  // debug("checkSheetUserData userObj", userObj);

  if (userObj) {
    //データが存在する

    if (userObj.deleteAt !== "") {
      //削除済ユーザーだった場合は、有効化
      sheet_user.setValue({
        sRow: userObj.index.deleteAt.row,
        sCol: userObj.index.deleteAt.col,
        value: "",
      });
    }
  } else {
    //新規登録者
    let today = new Date();
    var userName = await getUserDisplayName(userId);

    sheet_user.appendRow(
      [today, "", userName, userId, "Guest", templateIconUrl, 0],
      { isIncrement: true }
    );
  }
}
function deleteUser(userId) {
  let userObj = sheet_user.filtered({
    key: "userId",
    filterItem: userId,
    isOneItem: true,
    toLabelObj: true,
    isExist: true,
  });

  if (userObj) {
    //
    if (userObj.deleteAt == "") {
      //未削除ユーザーだった場合は、削除
      debug("delete user", userObj);
      sheet_user.setValue({
        sRow: userObj.index.deleteAt.row,
        sCol: userObj.index.deleteAt.col,
        value: new Date(),
      });
    }
  }
}
function formatDate(date, timeZone, format) {
  //日本時間の場合は、formatDate(date, 'JST');
  if (date === "") {
    return "";
  } else {
    if (!format) var format = "yyyy/MM/dd HH:mm";
    var retval = Utilities.formatDate(date, timeZone, format);
    // Logger.log(date + "->" + retval + "(" + timeZone + ")");
    return retval;
  }
}
function getImage(imageId, imageName) {
  // lineに送信した画像(imageId)からデータを取得
  var url = LINE_ENDPOINT_DATA + "/" + imageId + "/content";

  if (!imageName)
    imageName = formatDate(new Date(), "JST", '"yyyy_MM_dd_HHmm"');
  var img = getContent(url)
    .getBlob()
    .getAs("image/png")
    .setName(imageName + ".png");
  return img;
}
function getContent(url) {
  return new Promise((resolve, reject) => {
    let result = UrlFetchApp.fetch(url, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + CHANNEL_ACCESS_TOKEN,
      },
      method: "get",
    });
    resolve(result);
  });
}
function convertBase64ToBlob(file_base64, fileName) {
  file_base64 = file_base64.split(",")[1];
  let decoded = Utilities.base64Decode(file_base64);
  let contentType = "image/png";
  let blob = Utilities.newBlob(decoded, contentType, fileName);
  return blob;
}
function saveImage(blob) {
  try {
    var folder = DriveApp.getFolderById(FOLDER_ID_PHOTO_TEST);
    var file = folder.createFile(blob);
    return file.getUrl();
  } catch (e) {
    debug("saveImage error:", e);
    return false;
  }
}
function getFileUrl(id) {
  var url = DriveApp.getFileById(id).getDownloadUrl();
  return url + "&access_token=" + ScriptApp.getOAuthToken();
}

////////////////////////
//doActions
////////////////////////
async function doFollow(event) {
  let userId = event.source.userId;
  await checkSheetUserData(userId);
}
function doUnFollow(event) {
  let userId = event.source.userId;
  deleteUser(userId);
}
async function doMessage(event) {
  //返信するためのトークン取得
  var replyToken = event.replyToken;
  if (typeof replyToken === "undefined") {
    return;
  }
  //userId取得、検証
  let userId = event.source.userId;
  await checkSheetUserData(userId);

  //返信用オブジェクト準備
  let replyObj = {
    type: "simpleReply",
    message: "",
  };

  //送られたメッセージ内容を取得
  switch (event.message.type) {
    case "text": {
      var fromMsg = event.message.text;

      //送られてきたメッセージを処理
      switch (fromMsg) {
        case "Wifiのパスワードを教えて！": {
          replyObj.type = "showWifiPassword";
          replyObj.message = "c3fd5crnafh8i";
          break;
        }
        case "こんにちは！": {
          replyObj.type = "simpleReply";
          replyObj.message = "万年橋ランドへようこそ！";

          break;
        }
        case "[おかねのやりとり]": {
          replyObj.type = "dealMoney";
          replyObj.message = fromMsg;

          break;
        }
        case "[年貢]": {
          replyObj.type = "simpleReply";
          replyObj.message = "作成予定...";

          break;
        }
        case "a": {
          sheet_test.appendRow([1, 2, 3]);

          replyObj.type = "simpleReply";
          replyObj.message = "作成予定...";

          break;
        }
        case "テスト": {
          replyObj.type = "simpleReply";
          let homePageUrl =
            "https://script.google.com/macros/s/AKfycbwpJFO1qw9Se-j5dpAVjOqsWTGXwicKKO6D1cbep4DsH9_-4rI/exec";
          let queryObj = {
            userId: userId,
            test: "this_is_test",
          };
          replyObj.message = createUrlQuery(queryObj, homePageUrl);

          break;
        }
        case "テスト2": {
          let img = getImage(event.message.id);
          let imgUrl = saveImage(img);
          replyObj.type = "simpleReply";
          replyObj.message = imgUrl;
          break;
        }
        default: {
          replyObj.type = "simpleReply";
          replyObj.message = fromMsg;
        }
      }

      break;
    }
    case "sticker": {
      break;
    }
    case "image": {
      let img = getImage(event.message.id);
      debug("image1:", img);

      let imgUrl = saveImage(img);
      replyObj.type = "simpleReply";
      replyObj.message = imgUrl;
      debug("image2:", imgUrl);
      break;
    }
    case "video": {
      break;
    }
    case "location": {
      break;
    }
    case "audio": {
      break;
    }
    default: {
      debug("event.message.type error undefined");
      return;
    }
  }

  // メッセージを返信
  UrlFetchApp.fetch(line_endpoint, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + CHANNEL_ACCESS_TOKEN,
    },
    method: "post",
    payload: JSON.stringify({
      replyToken: replyToken,
      messages: formatter(replyObj),
    }),
  });

  return ContentService.createTextOutput(
    JSON.stringify({ content: "post ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}
function doJoin(event) {}
function doLeave(event) {}
//ポストで送られてくるので、送られてきたJSONをパース

async function doPost(e) {
  try {
    let json = JSON.parse(e.postData.contents);
    let events = json.events;
    // logger.log(json);
    debug("postData", json);

    events.forEach((event) => {
      switch (event.type) {
        case "follow": {
          return doFollow(event);

          let demo_follow = {
            events: [
              {
                type: "follow",
                timestamp: 1625059726468,
                source: {
                  type: "user",
                  userId: "U908d37a8e2f8d8ccf51edcf44ddbffd1",
                },
                replyToken: "828c2e564f424752b929b5c20c5933c9",
                mode: "active",
              },
            ],
          };
          break;
        }
        case "unfollow": {
          return doUnFollow(event);

          let demo_unfollow = {
            events: [
              {
                type: "unfollow",
                timestamp: 1625059820823,
                source: {
                  type: "user",
                  userId: "U908d37a8e2f8d8ccf51edcf44ddbffd1",
                },
                mode: "active",
              },
            ],
          };
          break;
        }
        case "message": {
          return doMessage(event);

          let demo_message_txt = {
            events: [
              {
                type: "message",
                message: {
                  type: "text",
                  id: "14314126562993",
                  text: "こんにちは！",
                },
                timestamp: 1625059947405,
                source: {
                  type: "user",
                  userId: "U908d37a8e2f8d8ccf51edcf44ddbffd1",
                },
                replyToken: "d67d45d9e1fd4a9ca0d785cd8871db8c",
                mode: "active",
              },
            ],
          };
          let demo_message_stamp = {
            events: [
              {
                type: "message",
                message: {
                  type: "sticker",
                  id: "14314158156623",
                  stickerId: "378923062",
                  packageId: "19554",
                  stickerResourceType: "STATIC",
                  keywords: ["Exactly", "Dialect"],
                },
                timestamp: 1625060284815,
                source: {
                  type: "user",
                  userId: "U908d37a8e2f8d8ccf51edcf44ddbffd1",
                },
                replyToken: "087381f51c8248ba9287cb4cfa52e4aa",
                mode: "active",
              },
            ],
          };
          let demo_message_img = {
            events: [
              {
                type: "message",
                message: {
                  type: "image",
                  id: "14314171746767",
                  contentProvider: {
                    type: "line",
                  },
                },
                timestamp: 1625060433358,
                source: {
                  type: "user",
                  userId: "U908d37a8e2f8d8ccf51edcf44ddbffd1",
                },
                replyToken: "888c0a1d1081410d962d1032fe4bf5cd",
                mode: "active",
              },
            ],
          };
          let demo_message_imgMap = {
            events: [
              {
                type: "message",
                message: {
                  type: "image",
                  id: "14314329542238",
                  contentProvider: {
                    type: "line",
                  },
                },
                timestamp: 1625062209648,
                source: {
                  type: "user",
                  userId: "U908d37a8e2f8d8ccf51edcf44ddbffd1",
                },
                replyToken: "9944355251d5426a8320f15a3abf0c8c",
                mode: "active",
              },
              {
                type: "message",
                message: {
                  type: "image",
                  id: "14314329512937",
                  contentProvider: {
                    type: "line",
                  },
                },
                timestamp: 1625062209445,
                source: {
                  type: "user",
                  userId: "U908d37a8e2f8d8ccf51edcf44ddbffd1",
                },
                replyToken: "fdd2fb9158c54a42934a64f92e9ea5b6",
                mode: "active",
              },
              {
                type: "message",
                message: {
                  type: "image",
                  id: "14314329530528",
                  contentProvider: {
                    type: "line",
                  },
                },
                timestamp: 1625062209630,
                source: {
                  type: "user",
                  userId: "U908d37a8e2f8d8ccf51edcf44ddbffd1",
                },
                replyToken: "2668b8d066524f29b117f17c63ddc1ac",
                mode: "active",
              },
            ],
          };
          let demo_message_video = {
            events: [
              {
                type: "message",
                message: {
                  type: "video",
                  id: "14314323022810",
                  duration: 1767,
                  contentProvider: {
                    type: "line",
                  },
                },
                timestamp: 1625062134752,
                source: {
                  type: "user",
                  userId: "U908d37a8e2f8d8ccf51edcf44ddbffd1",
                },
                replyToken: "265a0e9d774a478a9023e2f02c8c4cc1",
                mode: "active",
              },
            ],
          };
          let demo_message_location = {
            events: [
              {
                type: "message",
                message: {
                  type: "location",
                  id: "14314189336545",
                  latitude: 34.708046712904704,
                  longitude: 137.73237890434137,
                  address: "日本、〒430-0944 静岡県浜松市中区田町３２７−１４",
                },
                timestamp: 1625060625210,
                source: {
                  type: "user",
                  userId: "U908d37a8e2f8d8ccf51edcf44ddbffd1",
                },
                replyToken: "4f1bbfb8bf604a2eabb1ef9093234d73",
                mode: "active",
              },
            ],
          };
          let demo_message_audio = {
            events: [
              {
                type: "message",
                message: {
                  type: "audio",
                  id: "14314195915543",
                  duration: 2300,
                  contentProvider: {
                    type: "line",
                  },
                },
                timestamp: 1625060697215,
                source: {
                  type: "user",
                  userId: "U908d37a8e2f8d8ccf51edcf44ddbffd1",
                },
                replyToken: "5775a28dc50a4640a717479915c0d84e",
                mode: "active",
              },
            ],
          };
          break;
        }
        case "join": {
          //ルームに入った時
          return doJoin(event);

          let demo_join = {
            events: [
              {
                type: "join",
                timestamp: 1625059870005,
                source: {
                  type: "group",
                  groupId: "Cb1b142face1eb55c9243d32f8a731a12",
                },
                replyToken: "db4dee88df794c0a9e57358f9144bfe8",
                mode: "active",
              },
            ],
          };
          break;
        }
        case "leave": {
          //ルームから退出した時
          return doLeave(event);

          let demo_leave = {
            events: [
              {
                type: "leave",
                timestamp: 1625059904267,
                source: {
                  type: "group",
                  groupId: "Cb1b142face1eb55c9243d32f8a731a12",
                },
                mode: "active",
              },
            ],
          };
          break;
        }
        default: {
          debug("event error undefined");
          return;
        }
      }
    });
  } catch (e) {
    debug("error", e);
  }
}

function doGet(e) {
  let userId = e.parameter.userId;
  let queryData = e.parameter;
  let testData = { test: "aa", b: "bb" };
  //https://script.google.com/macros/s/AKfycbwpJFO1qw9Se-j5dpAVjOqsWTGXwicKKO6D1cbep4DsH9_-4rI/exec?row=2&est=1&hello=hello
  debug("queryData", queryData);
  let htmlMain = HtmlService.createTemplateFromFile("index")
    .evaluate()
    .getContent();
  // let headScriptHtml =
  //   "<script>\n" +
  //   "initQueryData( " +
  //   JSON.stringify(queryData) +
  //   ");\n</script>";
  let headScriptHtml =
    "<script>\n" +
    "let queryData=" +
    JSON.stringify(queryData) +
    ";\n</script>";
  let htmlOutput = HtmlService.createTemplate(
    headScriptHtml + htmlMain
  ).evaluate();
  htmlOutput
    .setTitle("万年橋パークランド")
    .addMetaTag("viewport", "width=device-width, initial-scale=1");

  return htmlOutput;
}

function getSpreadsheetName() {
  var sheetId = "1u6SgXL18BRPL8r3_QlAjavL-SR7Z2SuT-LP0LCangZk";
  var sheetName = "支払い詳細管理";

  //1_フォームの回答シートを取得
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  return sheet.getName();
}
function doGet_v01(e) {
  //indexファイルのオブジェクト
  var html = HtmlService.createTemplateFromFile("index");

  Logger.log(e);
  //getで送信された値を指定して取得する(index.htmlファイルのname="url"部分)
  var url = e.parameter.url;
  //getで送信された値を指定して取得する(index.htmlファイルのname="radio"部分)
  var params = e.parameter.radio;

  //paramsで取得した値でurlにreturnさせるurlの値を指定する
  if (params === "line") {
    var url = url + "?utm_source=line";
  } else if (params === "facebook") {
    var url = url + "?utm_source=facebook";
  } else if (params === "twitter") {
    var url = url + "?utm_source=twitter";
  } else if (params === "instagram") {
    var url = url + "?utm_source=instagram";
  } else if (params === "google") {
    var url = url + "?utm_source=google";
  } else {
    var url = "";
  }

  //index.htmlにurlを返す
  html.url = url;
  html = html.evaluate();
  html
    .setTitle("GAS+Vue.js")
    .addMetaTag("viewport", "width=device-width, initial-scale=1");

  return html;
}

function debug(...msgArry) {
  // function debug({ prod }, ...msgArry) {
  // function debug(msgConsole, msg) {
  function getLogFile() {
    if (this.logFile === undefined) {
      this.logFile = DocumentApp.openById(this.LOG_FILE_ID);
    }
    return this.logFile;
  }
  let prod = false;
  var DEV_MODE = prod ? false : true;
  // var MODE_CLEAR = clear ? true : false;
  // if (clear) getLogFile().getBody().clear();
  if (DEV_MODE) getLogFile().getBody().clear();
  if (msgArry === undefined) msg = ["msg is undefined"];
  Logger.log("\n==============【START LOG】==============");

  // var RECIPIENT = "tool0628@gmail.com";
  // var debug_type = typeof msgConsole;
  // var json = msgConsole;
  //Logger.log("come to json");
  //Logger.log(json);
  try {
    msgArry.forEach((msg) => {
      let type = typeof msg;
      Logger.log("[type]:" + type);
      switch (type) {
        case "object": {
          Logger.log(JSON.stringify(msg, undefined, 3)); //ログ表示
          break;
        }
        // case "string": {
        //   Logger.log(msg);
        //   break;
        // }
        default: {
          Logger.log(msg);
        }
      }
    });
  } catch (e) {
    Logger.log("\n==============【START ERROR】==============");
    Logger.log("\n" + JSON.stringify(e, null, "  "));
  } finally {
    // ログを書き込む
    Logger.log(
      "\n==============【FINISH LOG】==============\n************************************************************"
    );
    // if (clear) getLogFile().getBody().appendParagraph(Logger.getLog());
    // if (MODE_CLEAR) getLogFile().getBody().appendParagraph(Logger.getLog());
    if (DEV_MODE) getLogFile().getBody().appendParagraph(Logger.getLog());
  }
  return;

  /**
   * オブジェクトの中にjson.stringifyが入っている場合の対処
   */
  //var json = JSON.stringify(msgConsole)
  //json = JSON.parse(json); //obj化
  //json.postData.contents = JSON.parse(json.postData.contents);
  //json = JSON.stringify(json, undefined, 10); //json化
  //getJSON = JSON.stringify(getJSON, undefined, 10); //json化

  // function getLogFile() {
  //   if (this.logFile === undefined) {
  //     this.logFile = DocumentApp.openById(this.LOG_FILE_ID);
  //   }
  //   return this.logFile;
  // }

  // function sendNotificationMail(title) {
  //   MailApp.sendEmail(RECIPIENT, title, Logger.getLog());
  // }
}
