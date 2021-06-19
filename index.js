//from https://qiita.com/tetrapod117/items/e7b48485c98f6b88f311

//https://qiita.com/guchimina/items/aa36e27875ae26876d2c
//notify token qt1zpVt3A9PtZq1Bc4snbcodeiwESjUDesjLIMUVYpE
//最新のGASとJS　https://qiita.com/jooji/items/71ac0f514d247cafb648

//LINE Developersで取得したアクセストークンを入れる
var CHANNEL_ACCESS_TOKEN =
  "ArC3NlizZzY3hKvXqthvtB9F3iuVG0ajeW5M0Czc3BnVGvVA8vjP5q9sKAU6CwHPSltjfj2yk8GbZD7k1ctmJGGIKI8DLxIZYkVdsMXMuyDe985pAygzDV7njPdIE5gWUwtP7sqMJqGjIZuH0Oh6EwdB04t89/1O/w1cDnyilFU=";
var line_endpoint = "https://api.line.me/v2/bot/message/reply";
var MASTER_SPREAD_SHEET_ID = "1u6SgXL18BRPL8r3_QlAjavL-SR7Z2SuT-LP0LCangZk";
var LOG_FILE_ID = "1Iv4joIuTQaSv2PAneRomPAoBFb_5Eg1D1q7Wl1q-z5Y"; // デバッグログを出力するドキュメント

var spreadSheet = SpreadsheetApp.openById(MASTER_SPREAD_SHEET_ID);
var sheet_user = spreadSheet.getSheetByName("user");

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
  var sheet = SpreadsheetApp.getActiveSheet(); //sheetの指定
  var row = sheet.getLastRow(); //行数
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
  var token = PropertiesService.getScriptProperties().getProperty("LINE_TOKEN");
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

//ポストで送られてくるので、送られてきたJSONをパース
function doPost(e) {
  try {
    var json = JSON.parse(e.postData.contents);
    // logger.log(json);
    debug("postData", json);
    // debug(json, "json");
    //返信するためのトークン取得
    var reply_token = json.events[0].replyToken;
    if (typeof reply_token === "undefined") {
      return;
    }

    let userId = json.events[0].source.userId;
    var lastRow_user = sheet_user.getLastRow();
    var userArry = sheet_user.getRange(1, 1, lastRow_user, 6).getValues();
    debug("userArry", userArry); //[col_i[row_i],[row],...]

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
  let data = e.parameter;
  let testData = { test: "aa", b: "bb" };
  //https://script.google.com/macros/s/AKfycbwpJFO1qw9Se-j5dpAVjOqsWTGXwicKKO6D1cbep4DsH9_-4rI/exec?row=2&est=1&hello=hello

  let htmlMain = HtmlService.createTemplateFromFile("index")
    .evaluate()
    .getContent();
  let htmlOutput = HtmlService.createTemplate(
    htmlMain +
      "<script>\n" +
      "initGlobalData( " +
      JSON.stringify(data) +
      ");\n</script>"
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

  try {
    // ログをクリア
    if (DEV_MODE) getLogFile().getBody().clear();
    if (msg === undefined) msg = "";
    Logger.log("\n==============【START LOG】==============");
    Logger.log(msg);
    Logger.log("type: " + debug_type);
    if (debug_type === "object") {
      //json = JSON.parse(msgConsole);
      json = JSON.stringify(msgConsole, undefined, 3);
      Logger.log(json); //ログ表示
    } else if (debug_type === "string") {
      json = JSON.stringify(json, undefined, 3);
      Logger.log(json); //ログ表示
    } else {
      Logger.log("その他の型: " + json); //ログ表示
    }

    /**
     * 入力された文字列の中身全ての型やデータを参照する
     */
    //Logger.log(JSON.stringify(msgConsole, replacer, "\t"));
    function replacer(key, value) {
      Logger.log(
        "key:[" + key + "]\t type:[" + typeof value + "]\tvalue:[" + value + "]"
      );
      return value;
    }

    // 正常終了メールを送信する
    //sendNotificationMail('[XXXシステム]正常終了');
  } catch (e) {
    Logger.log("\n==============【START ERROR】==============");
    Logger.log("\n" + JSON.stringify(e, null, "  "));

    // 異常終了メールを送信する
    //sendNotificationMail('[XXXシステム]異常終了');
  } finally {
    // ログを書き込む
    Logger.log(
      "\n==============【FINISH LOG】==============\n************************************************************"
    );
    if (DEV_MODE) getLogFile().getBody().appendParagraph(Logger.getLog());
  }

  function getLogFile() {
    if (this.logFile === undefined) {
      this.logFile = DocumentApp.openById(this.LOG_FILE_ID);
    }
    return this.logFile;
  }

  function sendNotificationMail(title) {
    MailApp.sendEmail(RECIPIENT, title, Logger.getLog());
  }
}
