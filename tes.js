var gamaster = "自分のメアド";
var body = "";
function sendlist() {
  //スプレッドシートデータの取得
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var ss = sheet.getSheetByName("フィルタ");
  var range = 1;

  //rangeの最終行を取得する
  var temprange = ss.getRange("A2:N").getValues();
  var templength = temprange.length;

  for (var k = 0; k < templength; k++) {
    if (temprange[k][0] == "") {
      break;
    }
    range = range + 1;
  }

  //データ件数が0の場合、メッセージを出して終了
  if (range == 1) {
    Browser.msgBox("データの件数が0です");
    return 0;
  }
  //データをソートする
  ss.getRange("A2:N" + range).sort;
  [
    { column: 4, ascending: false },
    { column: 6, ascending: true },
    { column: 14, ascending: false },
  ];
  var dataman = ss.getRange("A2:N" + range).getValues();
  var datalength = dataman.length;

  //変数を宣言する
  body = "<b>発行対象：</b><br>";
  var firstbuild = "";
  var currentbuild = "";
  var intcnt = 0;

  //レコードデータから、必要なレコードのみ取り出しbodyを作成する
  for (var i = 0; i < datalength; i++) {
    var tempstatus = dataman[i][13];

    //施設名を取得する
    currentbuild = dataman[i][3];

    //アカウントタイプを取得する
    var acctype = dataman[i][5];

    //送信内容をビルドする
    if (firstbuild == currentbuild) {
      if (acctype == "個人アドレス") {
        body += "<ul type='disc'>";
        body += "<li>氏名：" + dataman[i][6] + dataman[i][7] + "</li>";
        body += "<li>所属：" + dataman[i][8] + "</li>";
        body += "<li>アカウント名：" + String(dataman[i][9]) + "</li>";
        body += "<li>申請理由：" + dataman[i][10] + "</li>";
        body += "</ul>";
      } else {
        body += "<ul type='disc'>";
        body += "<li>部門名：" + dataman[i][8] + "</li>";
        body += "<li>アカウント名：" + String(dataman[i][9]) + "</li>";
        body += "<li>申請理由：" + dataman[i][10] + "</li>";
        body += "</ul>";
      }
    } else {
      firstbuild = currentbuild;
      body += "<h4>" + firstbuild + "</h4>";

      if (acctype == "個人アドレス") {
        body += "<ul type='disc'>";
        body += "<li>氏名：" + dataman[i][6] + dataman[i][7] + "</li>";
        body += "<li>所属：" + dataman[i][8] + "</li>";
        body += "<li>アカウント名：" + String(dataman[i][9]) + "</li>";
        body += "<li>申請理由：" + dataman[i][10] + "</li>";
        body += "</ul>";
      } else {
        body += "<ul type='disc'>";
        body += "<li>部門名：" + dataman[i][8] + "</li>";
        body += "<li>アカウント名：" + String(dataman[i][9]) + "</li>";
        body += "<li>申請理由：" + dataman[i][10] + "</li>";
        body += "</ul>";
      }
    }
  }
  var data = { text: body };

  var output = HtmlService.createTemplateFromFile("dialog")
    .evaluate()
    .getContent();
  var html = HtmlService.createTemplate(
    output + "<script>\n" + "doIt( " + JSON.stringify(data) + ");\n</script>"
  ).evaluate();
  sheet.show(html); //メッセージボックスとしてを表示する
}
//HTML側から実行させるコールバック関数
function telepon(test) {
  var ui = SpreadsheetApp.getUi();

  //HTMLメール本文を作成
  var header = "適当な文章<br>" + "適当な文章その２<br><hr>";

  test = header + test;

  //メール送信
  MailApp.sendEmail({
    to: gamaster,
    subject: "アカウントの申請",
    htmlBody: test,
    cc: cc,
    name: "アカウントの申請",
  });

  ui.alert("送信されました。");
}
