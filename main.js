let token_test = "e4SXZQOQNbRx0T7DrLla4Z9w8XLYahMd2O2ZMh1LvCC"; //test用
let token_mannenbashi = "h232oNe4arXD6VALHtDvX7gsUkl7rEQvRLhw3gVJHOe"; //万年橋ランド

//test送信
function testToLine() {
  let message = "this is test";
  message = messageWrap({ type: "recordPay", msgArry: message });
  SendToLine(message);
}
function formatDate(date, timeZone, format) {
  //日本時間の場合は、formatDate(date, 'JST');
  if (date === "") {
    return "";
  } else {
    var format = "yyyy/MM/dd HH:mm";
    var retval = Utilities.formatDate(date, timeZone, format);
    // Logger.log(date + "->" + retval + "(" + timeZone + ")");
    return retval;
  }
}

function getEditUrlFromForm() {
  let formid_m = "1FAIpQLScK4if1xozk6ntzXLAIipzli1OFGhRkG8dTgGlF8xlNkHg0rg"; //まとめてはらった
  let formid_w = "1FAIpQLScEsud7xV_KfqEWiVFgOSG1VBfLu8hHa-zLmnh0_Ymv4Iv_6A"; //わたした

  var formDates = FormApp.openById(formid_m).getResponses();
  var EditableUrl =
    formDates[Number(formDates.length - 1)].getEditResponseUrl();
  // var EditableStr = '=HYPERLINK("' + EditableUrl + '","編集用URL.' + Number(lastRow - 1) + '")';
  //lastRowA.setValue(EditableStr);
  return EditableUrl;
}
//gmailからデータを取得
function gmailToLine() {
  //取得間隔
  var get_interval = 5;
  var now_time = Math.floor(new Date().getTime() / 1000); //現在時刻を変換
  var time_term = now_time - 60 * get_interval;
  //検索条件指定
  var strTerms = "(is:unread after:" + time_term + ")";

  //取得
  var myThreads = GmailApp.search(strTerms);
  var myMsgs = GmailApp.getMessagesForThreads(myThreads);
  var valMsgs = [];
  for (var i = 0; i < myMsgs.length; i++) {
    valMsgs[i] =
      " " +
      myMsgs[i].slice(-1)[0].getDate().getMonth() +
      "/" +
      myMsgs[i].slice(-1)[0].getDate().getDate() +
      " " +
      myMsgs[i].slice(-1)[0].getDate().getHours() +
      ":" +
      myMsgs[i].slice(-1)[0].getDate().getMinutes() +
      "\n[from]" +
      myMsgs[i].slice(-1)[0].getFrom() +
      "\n\n[sbject]" +
      myMsgs[i].slice(-1)[0].getSubject();
    // + "\n\n[Message]\n"+ myMsgs[i].slice(-1)[0].getPlainBody();
  }
  SendToLine(valMsgs);
}

//spreadsheetからデータを取得
function GoogleFormToLine() {
  //let editableUrl=getEditUrlFromForm()
  var sheet = SpreadsheetApp.getActiveSheet(); //sheetの指定
  var row = sheet.getLastRow(); //行数
  //var column = 5; //列数
  var column = sheet.getLastColumn(); //列数
  var range = sheet.getDataRange(); //sheetから範囲指定するための準備
  var message = "";
  for (var i = 1; i <= column; i++) {
    var item = range.getCell(1, i).getValue(); //1行目
    var value = range.getCell(row, i).getValue(); //最終行
    if (item == "タイムスタンプ") {
      value = formatDate(value, "JST");
    }
    message += "\n■" + item + "\n" + value;
  }

  //message += "\n■" + '編集する' + "\n" + editableUrl;
  SendToLine(message);
}

//LINEに通知
function SendToLine(messages) {
  //ファイル→プロジェクトのプロパティ→スプリクトのプロパティ
  //  var token = PropertiesService.getScriptProperties().getProperty("LINE_TOKEN");
  var token = token_mannenbashi;
  var op_default = {
    method: "post",
    "Content-Type": "application/x-www-form-urlencoded",
    payload: "message=" + messages,
    headers: { Authorization: "Bearer " + token },
  };
  let op_flex = {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + token,
    },
    method: "post",
    payload: JSON.stringify({
      messages: [messages],
    }),
  };
  var res = UrlFetchApp.fetch(
    "https://notify-api.line.me/api/notify",
    op_default
  );
  // Logger.log(JSON.parse(res.getContentText())); //Response
}

//返信メッセージ加工
function messageWrap({ type, msgArry }) {
  let reply = "";
  switch (type) {
    case "recordPay": {
      reply = {
        type: "bubble",
        hero: {
          type: "image",
          url: "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
          size: "full",
          aspectRatio: "20:13",
          aspectMode: "cover",
          action: {
            type: "uri",
            uri: "http://linecorp.com/",
          },
        },
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "separator",
            },
            {
              type: "text",
              text: "■記録日",
              weight: "bold",
              size: "sm",
            },
            {
              type: "text",
              text: "Mon May 10 2021 11:01:29 GMT-0400 (アメリカ東部夏時間)",
              size: "lg",
            },
            {
              type: "text",
              text: "■あなたは誰ですか？",
              weight: "bold",
              size: "sm",
            },
            {
              type: "text",
              text: "Mon May 10 2021 11:01:29 GMT-0400 (アメリカ東部夏時間)",
              size: "lg",
            },
            {
              type: "text",
              text: "■用途は何ですか？",
              weight: "bold",
              size: "sm",
            },
            {
              type: "text",
              text: "Mon May 10 2021 11:01:29 GMT-0400 (アメリカ東部夏時間)",
              size: "lg",
            },
            {
              type: "text",
              text: "■金額はいくらですか？",
              weight: "bold",
              size: "sm",
            },
            {
              type: "text",
              text: "Mon May 10 2021 11:01:29 GMT-0400 (アメリカ東部夏時間)",
              size: "lg",
            },
            {
              type: "text",
              text: "■誰からお金をもらいたいですか？",
              weight: "bold",
              size: "sm",
            },
            {
              type: "text",
              text: "Mon May 10 2021 11:01:29 GMT-0400 (アメリカ東部夏時間)",
              size: "lg",
            },
            {
              type: "separator",
            },
          ],
        },
        footer: {
          type: "box",
          layout: "horizontal",
          spacing: "sm",
          contents: [
            {
              type: "button",
              style: "secondary",
              height: "sm",
              action: {
                type: "uri",
                label: "\b修正する",
                uri: "https://linecorp.com",
              },
            },
            {
              type: "spacer",
              size: "sm",
            },
          ],
          flex: 0,
        },
      };
      break;
    }
  }
  return reply;
}
