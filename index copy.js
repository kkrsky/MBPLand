//from https://qiita.com/tetrapod117/items/e7b48485c98f6b88f311

//https://qiita.com/guchimina/items/aa36e27875ae26876d2c
//notify token qt1zpVt3A9PtZq1Bc4snbcodeiwESjUDesjLIMUVYpE
//notify test token t9OwHlNu8LjLtR66rEX3uwmwlGMhKD9Bx2g0mPnKhMm
//最新のGASとJS　https://qiita.com/jooji/items/71ac0f514d247cafb648
//最新のGASとJS2 https://officeforest.org/wp/2020/02/06/google-apps-script%E3%81%AEv8-runtime%E5%AF%BE%E5%BF%9C%E3%82%92%E6%A4%9C%E8%A8%BC%E3%81%97%E3%81%A6%E3%81%BF%E3%81%9F/
//LINE Developersで取得したアクセストークンを入れる
var CHANNEL_ACCESS_TOKEN =
  "ArC3NlizZzY3hKvXqthvtB9F3iuVG0ajeW5M0Czc3BnVGvVA8vjP5q9sKAU6CwHPSltjfj2yk8GbZD7k1ctmJGGIKI8DLxIZYkVdsMXMuyDe985pAygzDV7njPdIE5gWUwtP7sqMJqGjIZuH0Oh6EwdB04t89/1O/w1cDnyilFU=";
var line_endpoint = "https://api.line.me/v2/bot/message/reply";
let LINE_ENDPOINT_PROFILE = "https://api.line.me/v2/bot/profile";
var MASTER_SPREAD_SHEET_ID = "1u6SgXL18BRPL8r3_QlAjavL-SR7Z2SuT-LP0LCangZk";
var LOG_FILE_ID = "1Iv4joIuTQaSv2PAneRomPAoBFb_5Eg1D1q7Wl1q-z5Y"; // デバッグログを出力するドキュメント

var spreadSheet = SpreadsheetApp.openById(MASTER_SPREAD_SHEET_ID);
var sheet_user = spreadSheet.getSheetByName("user");
let uerArryMaxRowLength = 7;
let userArryMap = {
  createAt: 0,
  deleteAt: 1,
  name: 2,
  userId: 3,
  XXX: 4,
  YYY: 5,
  ZZZ: 6,
};
// Utilities.sleep(1000);

// let top={
//   init(firstObj){
//     let json=JSON.parse(e.postData.contents);
//     let reply_token=json.events[0].replyToken;
//     if (typeof reply_token === "undefined") {
//       return;
//     }
//   },
// }

//test送信
function testToLine() {
  let message = "this is test";
  SendToLine(message);
}
//spreadsheetからデータを取得
function GoogleFormToLine() {
  var sheetId = "1u6SgXL18BRPL8r3_QlAjavL-SR7Z2SuT-LP0LCangZk";
  var sheetName = "お金をまとめて払った人用フォーム回答";

  //1_フォームの回答シートを取得
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  // var sheet = SpreadsheetApp.getActiveSheet(); //sheetの指定
  var row = sheet.getLastRow(); //行数
  var column = 5; //列数
  // var column = sheet.getLastColumn(); //列数
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
  var token =
    PropertiesService.getScriptProperties().getProperty("LINE_TOKEN_TEST");
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

function getSheetUserData() {
  var lastRow_user = sheet_user.getLastRow();
  var userArry = sheet_user
    .getRange(1, 1, lastRow_user, uerArryMaxRowLength)
    .getValues();
  return userArry;
}
function getUserName(userId) {
  let userArry = getSheetUserData();
  debug("userId", userId, "userArry", userArry);
  let userData = userArry.find((row) => {
    return row[userArryMap.userId] === userId;
  });
  if (userData) {
    return userData[userArryMap.name];
  } else return "Guest";
}
async function checkSheetUserData(userId) {
  async function getUserDisplayName(userId) {
    var res = UrlFetchApp.fetch(LINE_ENDPOINT_PROFILE + "/" + userId, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + CHANNEL_ACCESS_TOKEN,
      },
      method: "get",
    });

    return JSON.parse(res).displayName;
  }
  let userArry = getSheetUserData(userId);
  let isFind = userArry.find((row) => {
    return row[userArryMap.userId] === userId;
  });
  if (isFind) {
    //
  } else {
    let today = new Date();
    var userName = await getUserDisplayName(userId);
    sheet_user.appendRow([today, "", userName, userId, 0, 0, 0]);
  }
}
function doFollow() {}
function doUnFollow() {}
function doMessage() {}
function doJoin() {}
function doLeave() {}
//ポストで送られてくるので、送られてきたJSONをパース

async function doPost(e) {
  try {
    let json = JSON.parse(e.postData.contents);
    let events = json.events;
    // logger.log(json);
    debug("postData", json);
    // debug(json, "json");

    events.forEach((event) => {
      switch (event.type) {
        case "follow": {
          // let demo = {
          //   events: [
          //     {
          //       type: "follow",
          //       timestamp: 1625059726468,
          //       source: {
          //         type: "user",
          //         userId: "U908d37a8e2f8d8ccf51edcf44ddbffd1",
          //       },
          //       replyToken: "828c2e564f424752b929b5c20c5933c9",
          //       mode: "active",
          //     },
          //   ],
          // };
          doFollow();
          break;
        }
        case "unfollow": {
          // let demo = {
          //   events: [
          //     {
          //       type: "unfollow",
          //       timestamp: 1625059820823,
          //       source: {
          //         type: "user",
          //         userId: "U908d37a8e2f8d8ccf51edcf44ddbffd1",
          //       },
          //       mode: "active",
          //     },
          //   ],
          // };
          doUnFollow();
          break;
        }
        case "message": {
          // let demo = {
          //   events: [
          //     {
          //       type: "message",
          //       message: {
          //         type: "text",
          //         id: "14314126562993",
          //         text: "こんにちは！",
          //       },
          //       timestamp: 1625059947405,
          //       source: {
          //         type: "user",
          //         userId: "U908d37a8e2f8d8ccf51edcf44ddbffd1",
          //       },
          //       replyToken: "d67d45d9e1fd4a9ca0d785cd8871db8c",
          //       mode: "active",
          //     },
          //   ],
          // };
          doMessage();
          break;
        }
        case "join": {
          //ルームに入った時
          // let demo = {
          //   events: [
          //     {
          //       type: "join",
          //       timestamp: 1625059870005,
          //       source: {
          //         type: "group",
          //         groupId: "Cb1b142face1eb55c9243d32f8a731a12",
          //       },
          //       replyToken: "db4dee88df794c0a9e57358f9144bfe8",
          //       mode: "active",
          //     },
          //   ],
          // };
          doJoin();
          break;
        }
        case "leave": {
          //ルームから退出した時
          // let demo = {
          //   events: [
          //     {
          //       type: "leave",
          //       timestamp: 1625059904267,
          //       source: {
          //         type: "group",
          //         groupId: "Cb1b142face1eb55c9243d32f8a731a12",
          //       },
          //       mode: "active",
          //     },
          //   ],
          // };
          doLeave();
          break;
        }
        default: {
          debug("event error undefined");
        }
      }
    });
    //返信するためのトークン取得
    var reply_token = json.events[0].replyToken;
    if (typeof reply_token === "undefined") {
      return;
    }

    //userId取得、検証
    let userId = json.events[0].source.userId;
    await checkSheetUserData(userId);
    // var lastRow_user = sheet_user.getLastRow();
    // var userArry = sheet_user
    //   .getRange(1, 1, lastRow_user, uerArryMaxRowLength)
    //   .getValues();

    // let isFind = userArry.find((row) => {
    //   return row[userArryMap.userId] === userId;
    // });

    // if (isFind) {
    //   //some
    // } else {
    //   createUserData(userId);
    // }
    // debug("userArry", userArry); //[col_i[row_i],[row],...]

    // Logger.log(userArry);
    // var userIdList = range;

    //送られたメッセージ内容を取得
    var getMessage = json.events[0].message.text;
    let replyObj = {
      type: "simpleReply",
      message: "",
    };
    //処理
    switch (getMessage) {
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
        replyObj.message = getMessage;

        break;
      }
      case "[年貢]": {
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
      default: {
        replyObj.type = "simpleReply";
        replyObj.message = getMessage;
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
        replyToken: reply_token,
        messages: formatter(replyObj),
      }),
    });
    return ContentService.createTextOutput(
      JSON.stringify({ content: "post ok" })
    ).setMimeType(ContentService.MimeType.JSON);
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
  // function debug(msgConsole, msg) {
  function getLogFile() {
    if (this.logFile === undefined) {
      this.logFile = DocumentApp.openById(this.LOG_FILE_ID);
    }
    return this.logFile;
  }

  var DEV_MODE = true;
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
