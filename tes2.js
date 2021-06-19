//LINE Developersで取得したアクセストークンを入れる
var CHANNEL_ACCESS_TOKEN =
  "nRdQsbiWctX/rdcTL6cBU5s1Ya8EtkB03Z0WeW3sdOvNb+VowJjr3M41BpVhCg0UeA8GwOlfcx7iNT1XfK+zcJ3HVfmPlf13JBtQ+uLK+zUTDvxu+rjily/PF9J+a6i16QyKRFVeTo1IvlnojEOAMAdB04t89/1O/w1cDnyilFU=";
var line_endpoint = "https://api.line.me/v2/bot/message/reply";
var line_endpoint_profile = "https://api.line.me/v2/bot/profile";
var LINE_ENDPOINT_PUSH = "https://api.line.me/v2/bot/message/push";
var LINE_ENDPOINT_PUSH_NUM = "https://api.line.me/v2/bot/message/delivery/push";
var art_endpoint = "http://apicollections.parismusees.paris.fr/graphql";
var ART_ACCESS_TOKEN = "5f143a24-ea03-423e-85c2-841522137986";
var LOG_FILE_ID = "1j_yP53CI89ActqwgAsYvws8g5_WU3ptMYgCaudEr-5w"; // デバッグログを出力するドキュメント
var MASTER_SPREAD_SHEET_ID = "1aKzju93-4qn8JaqNMg-h5Watn8qEGbMv4u0gHVSf_n0";
var MASTER_FOLDER_ID = "11N_lH616GCP4h3JiEpvzlMiayPUJXLGS";
var state = {
  userMoneyIsUnder: "false",
};

//SSシートを取得
var spreadSheet = SpreadsheetApp.openById(MASTER_SPREAD_SHEET_ID);
var sheet_p = spreadSheet.getSheetByName("picture");
var sheet_p_rdm = spreadSheet.getSheetByName("picture_rdm");
var sheet_u = spreadSheet.getSheetByName("user");
var sheet_d = spreadSheet.getSheetByName("database");
var sheet_d_values = sheet_d.getDataRange().getValues();

function test_replyArt_random() {
  var random = "183697"; //"226737";
  var art_res = randomArt_tes(random);
  //var res = replyArt_random(art_res);
  //debug(res, "res")

  function randomArt_tes(random) {
    //debug(sheet_p_rdm, "sheet_p_rdm")
    //var random = random_id_XXXXXX();
    debug(random, "random");

    var art_origin = artApi(random);
    if (art_origin === null) {
      var output = null;
      //var imgSize = { height: null, width: null };
    } else {
      var art = artApi_sort(art_origin);

      debug(art, "art");

      var url = art.absolutePath;

      var imgUrl = html2jpg(url);
      debug(imgUrl, "imgUrl");

      var replyImgUrl = "";
      //art_picture_random

      if (imgUrl === "do not have picture") {
        replyImgUrl =
          "https://amc1nai.net/wp/wp-content/uploads/2017/08/noimage.jpg";
        var imgSize = { height: "100", width: "100" };
        imgUrl = "http://parismuseescollections.paris.fr/node/" + random;
      } else {
        var fileName = art.art_id;
        var imgSize = downloadImagesUrl(imgUrl, fileName);
        var pic_id = getArtUrlId_ver_rdm(fileName);
        replyImgUrl = "https://drive.google.com/uc?id=" + pic_id;
      }
      debug(replyImgUrl, "replyImgUrl");

      var output = {
        art_id: random,
        height: imgSize.height,
        width: imgSize.width,
        url: replyImgUrl, //ドライブに保存した画像のurl
        title: LanguageApp.translate(art.title, "fr", "ja"),
        auther: art.autherName,
        artUrl: imgUrl, //web上にある画像のurl
        absolutePath: url, //詳細のurl
        endYear: art.finishWorkYear,
        comment: LanguageApp.translate(art.artComment, "fr", "ja"),
      };
    }

    if (output === null) {
      sheet_p_rdm.appendRow([random, "false"]);
    } else {
      sheet_p_rdm.appendRow([
        random,
        "true",
        imgSize.height,
        imgSize.width,
        output.title,
        output.auther,
        output.endYear,
        output.comment,
        output.url,
        output.artUrl,
      ]);
      if (output.comment === null) var message = "当たり！！";
      else var message = "大当たり！！！！";
      pushMsg(user_id, message);
    }

    debug(output, "output randomArt()");
    return output;
  }
}

function test_lineBot() {
  var msg = "【10億】";
  var e = {
    parameter: {},
    contextPath: "",
    contentLength: 286,
    queryString: "",
    parameters: {},
    postData: {
      type: "application/json",
      length: 286,
      contents:
        '{"events":[{"type":"message","replyToken":"c6e41f040f274e4b91feb39baf8db69c","source":{"userId":"U908d37a8e2f8d8ccf51edcf44ddbffd1","type":"user"},"timestamp":1575202124731,"message":{"type":"text","id":"11012159124099","text":"' +
        msg +
        '"}}],"destination":"U2fd75fa0831c7378d0fbc82fa363079d"}',
      name: "postData",
    },
  };

  doPost(e);
}

function test_getArtUrlId_ver_rdm() {
  var ART_ID = "226737";
  getArtUrlId_ver_rdm(ART_ID);
}

function test_downloadImagesUrl(url, fileName) {
  var url = "https://amc1nai.net/wp/wp-content/uploads/2017/08/noimage.jpg";

  var fileName = "test";
  downloadImagesUrl(url, fileName);
}
function tes() {
  var ART_ID = "203089";
  var te = ["", "", "", "", "", ""];

  te.forEach(function (el) {
    getArtUrlId(ART_ID);
  });
}

function test_getProduct_real() {
  var AUTHER_NO = "3";
  var num = 5;
  var result = _getProduct_real(AUTHER_NO, num);
}

/**
 * @param {String} ID 検索する番号
 * @return {Object}
 */

function test_artApi() {
  var ID = "226737";
  var result = artApi(ID);
  debug(result, "result");
}

function test_artApi_sort() {
  var ID = "226737";
  var artApi2 = artApi(ID);
  var result = artApi_sort(artApi2);
  debug(result, "result test_artApi_sort()");
}
function test_getAuherProducts() {
  var AUTHER_ID = "24524"; //ピカソ
  var result = getAutherProducts(AUTHER_ID);
  debug(result, "result");
}

function test_downloadImages() {
  downloadImages();
}

function test_getProduct() {
  var AUTHER_NO = 2;
  var num = 5;
  var result = getProduct(AUTHER_NO, num);
  debug(result, "result test_getProduct");
}

function test_getProductDetail() {
  var product_arry = test_getProduct();
  var AUTHER_NO = 2;
  var result = getProductDetail(product_arry, AUTHER_NO);
  debug(result, "result test_getProductDetail");
}

function test_findArt() {
  var AUTHER_NO = 1;
  var ART_ID = "226737";
  var result = findArt(AUTHER_NO, ART_ID);
  debug(result, "result test_findArt");
}

function random_id_XXXXXX() {
  var random = 0;

  random = Math.floor(Math.random() * 1000000);
  console.log(random / 100000);
  if (random / 100000 < 1) {
    random = Math.floor(Math.random() * 1000000);
    if (random / 100000 < 1) {
      random = Math.floor(Math.random() * 1000000);
    }
  }

  debug(random, "random");
  return random;
}

/**
 * A列に入力された画像URLリストを元に画像をダウンロードしてGoogle Driveに保存する
 */

function downloadImages() {
  //from https://a-zumi.net/google-apps-script-image-download-save-google-drive/

  //var master_folder = DriveApp.getFolderById(MASTER_FOLDER_ID);
  // 現在開いているシートを取得
  //sheet_p

  var newWrite = false;
  if (newWrite == true) {
    var folder = DriveApp.getFolderById(MASTER_FOLDER_ID); //IDから親フォルダを取得
    var foldername = "art_picture"; //削除したい子フォルダの名前を指定
    var folder_childs = folder.getFolders(); //子フォルダ一覧を取得

    if (folder_childs.hasNext()) {
      //取得した子フォルダ一覧の中で、子フォルダが１つでもある場合

      while (folder_childs.hasNext()) {
        //取得した子フォルダ一覧の中で、まだnextで未取得の子フォルダがあるか確認
        var deletefolder = folder_childs.next(); //子フォルダを順番に取得
        if (deletefolder.getName().indexOf(foldername) != -1) {
          //削除したい子フォルダの名前が存在する場合

          var deletefolderid = deletefolder.getId(); //削除したい子フォルダのIDを取得
          var deletefolder = DriveApp.getFolderById(deletefolderid); //削除したい子フォルダを取得
          deletefolder.setTrashed(true); //子フォルダをごみ箱へ
        }
      }
    } else {
    }

    Drive.Files.emptyTrash();
    folder.createFolder(foldername);
  }

  // 範囲はB列を指定
  range = sheet_p.getRange("A2:D");

  debug(range, "range");
  // 画像URLが入力されている最後の行数を取得
  var row = sheet_p.getLastRow() - 1; //A2から開始してるので-1
  var list = range.getValues();
  //debug(row, "row")

  var start = 127;
  var end = 163;
  for (i = start; i < end; i++) {
    // シートから1行ずつ画像URLを取得
    var num = list[i][0];
    var url_origin = list[i][1];
    var url = list[i][2];
    var fileName = list[i][3];

    //debug(num, "num")
    //debug(url_origin, "url_origin")
    //debug(url, "url")
    //debug(fileName, "fileName")

    if (url !== "do not have picture") {
      // 画像データを取得
      var response = UrlFetchApp.fetch(url);
      var fileBlob = response.getBlob().setName(fileName);

      // 取得した画像をGoogle Driveにアップロード
      var file = DriveApp.createFile(fileBlob);

      // 予め作っておいた画像フォルダの情報を取得
      var folders = DriveApp.getFoldersByName("art_picture");
      while (folders.hasNext()) {
        var folder = folders.next();
        if (folder.getName() == "art_picture") {
          break;
        }
      }

      // ルートディレクトリに画像が保存されているので画像フォルダにコピー
      file.makeCopy(file.getName(), folder);

      // ルートディレクトリの画像を削除
      file.setTrashed(true);
    }
  }
  //folder.createFolder(foldername);
}

/**
 * @return {Object} imgSize{width: height:}
 */
function downloadImagesUrl(url, fileName) {
  debug("downloadImagesUrl(url, fileName) start");
  var response = UrlFetchApp.fetch(url);
  var fileBlob = response.getBlob().setName(fileName);
  var imgSize = getSize_doc(fileBlob);
  //debug(imgSize, "imageSize")

  // 取得した画像をGoogle Driveにアップロード
  var file = DriveApp.createFile(fileBlob);

  // 予め作っておいた画像フォルダの情報を取得
  var folders = DriveApp.getFoldersByName("art_picture_random");
  while (folders.hasNext()) {
    var folder = folders.next();
    if (folder.getName() == "art_picture_random") {
      break;
    }
  }

  // ルートディレクトリに画像が保存されているので画像フォルダにコピー
  file.makeCopy(file.getName(), folder);

  // ルートディレクトリの画像を削除
  file.setTrashed(true);

  Drive.Files.emptyTrash();

  return imgSize;
}

function getSize_doc(fileBlob) {
  debug("getSize_doc start");
  var docfile = Drive.Files.insert({
    title: "temp",
    mimeType: "application/vnd.google-apps.document",
  }).getId();
  var img = DocumentApp.openById(docfile).insertImage(0, fileBlob);
  //Drive.Files.remove(docfile);
  return { width: img.getWidth(), height: img.getHeight() };
}

function html2jpg(url) {
  debug("html2jpg start");

  var response = UrlFetchApp.fetch(url).getContentText();
  //debug(response.match(".jpg"),"response")

  var result = "";
  var img0 = response.split('class="first-image');

  if (img0 !== undefined) {
    var img1 = img0[1].split("</span>");
    if (img1[0].indexOf('src="') !== -1) {
      var img2 = img1[0].split('src="');
      var img3 = img2[1].split("?itok");
      result = img3[0];
    } else {
      result = "do not have picture";
    }
  } else {
    result = "do not have picture";
  }
  debug(result, "result html2jpg");
  return result;
}

function getArtUrlId(ART_ID) {
  //ART_ID;
  //var ART_ID = "206913"

  var folders = DriveApp.getFolderById(MASTER_FOLDER_ID).getFolders(); //ファイル一覧を取得

  var list_folder = [];
  var folder = "";
  while (folders.hasNext()) {
    folder = folders.next();
    list_folder.push([folder.getName(), folder.getUrl()]);
  }
  debug(list_folder, "list_folder getArtUrlId");
  var folder_picture_url = list_folder[0][1];

  var folder_picture_url; // = 'https://drive.google.com/drive/folders/フォルダID',
  var paths = folder_picture_url.split("/");
  var folderId = paths.pop();
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  var list = [];
  var file = "";
  while (files.hasNext()) {
    file = files.next();
    list.push([file.getName(), file.getUrl()]);
  }
  //debug(list, "index");

  var art_url = "/";
  for (i = 0; i < list.length; i++) {
    if (list[i][0].indexOf(ART_ID) !== -1) {
      art_url = list[i][1];
      //break;
    }
  }

  var sp = art_url.split("/");
  //debug(art_url,"sp")
  var result = sp.splice(-2)[0]; //写真ファイルのIDを取得

  debug(result, "result getArtUrl()");
  return result;
}

function getArtUrlId_ver_rdm(ART_ID) {
  //ART_ID;
  //var ART_ID = "206913"
  var folderName = "art_picture_random";
  var folders = DriveApp.getFolderById(MASTER_FOLDER_ID).getFolders(); //ファイル一覧を取得

  var list_folder = [];
  var folder = "";
  while (folders.hasNext()) {
    folder = folders.next();
    if (folder.getName() === folderName) {
      list_folder.push([folder.getName(), folder.getUrl()]);
    }
  }
  debug(list_folder, "list_folder getArtUrlId");
  var folder_picture_url = list_folder[0][1];

  var folder_picture_url; // = 'https://drive.google.com/drive/folders/フォルダID',
  var paths = folder_picture_url.split("/");
  var folderId = paths.pop();
  var folder = DriveApp.getFolderById(folderId);
  var files = folder.getFiles();
  var list = [];
  var file = "";
  while (files.hasNext()) {
    file = files.next();
    if (file.getName() === ART_ID) {
      list.push([file.getName(), file.getUrl()]);
    }
  }
  debug(list, "index");

  if (list[0] === undefined) {
    var result = "do not have picture";
  } else {
    var art_url = list[0][1];

    var sp = art_url.split("/");
    //debug(art_url,"sp")
    var result = sp.splice(-2)[0]; //写真ファイルのIDを取得
  }
  debug(result, "result getArtUrl()");
  return result;
}
/**
 *
 * @param {*} AUTHER_NO
 * @param {*} ART_ID
 * @return {Object} art description
 */
function findArt(AUTHER_NO, ART_ID) {
  debug("findArt start");
  var serchId = ART_ID;
  var art_list_array = JSON.parse(sheet_d_values[AUTHER_NO][5]);
  var result = {};

  for (i = 0; i < art_list_array.length; i++) {
    //debug(art_list_array[i],"art_list_array[i]")
    if (art_list_array[i].art_id === serchId) {
      result = art_list_array[i];
      debug(art_list_array[i], "inside art_list_array[i];");
      break;
    }
  }
  return result;
}

//function DB() {

/**
 *
 * @param {Number} ART_ID 作品固有の番号 (nid)
 * @return {object} 失敗時はnull
 */
function artApi(ART_ID) {
  if (typeof ART_ID === "number") {
    ART_ID = ART_ID + "";
  }
  debug(ART_ID, "artApi start");
  //const ART_ACCESS_TOKEN = ;
  //const art_endpoint = "https://api.github.com/graphql";

  const graphql =
    "{ nodeById(id: " +
    JSON.stringify(ART_ID) +
    ") {...on NodeOeuvre { title absolutePath fieldOeuvreAuteurs { entity { fieldAuteurAuteur { entity { name fieldLrefAdlib fieldPipDateNaissance { startYear } fieldPipLieuNaissance fieldPipDateDeces { startYear }}}} } fieldVisuelsPrincipals { entity { name publicUrl } } fieldDateProduction { startPrecision startYear startMonth startDay sort endPrecision endYear endMonth endDay century}fieldOeuvreDescriptionIcono {value}}}}";

  function buildRequestOption(graphql) {
    return {
      method: "post",
      //contentType: "application/json; charset=UTF-8",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "auth-token": ART_ACCESS_TOKEN,
      },
      payload: JSON.stringify({ query: graphql }),
    };
  }

  function getAssignedPullRequests() {
    const option = buildRequestOption(graphql);
    const res = UrlFetchApp.fetch(art_endpoint, option);
    const json = JSON.parse(res.getContentText());
    return json;
  }

  buildRequestOption(graphql);

  //debug("buildRequestOption", buildRequestOption(graphql))

  var json = {};
  json.data = {};
  json.data.nodeById = {};
  //json.data.nodeById.art_id=""
  json.data.nodeById.art_id = ART_ID + "";
  json = getAssignedPullRequests();
  //debug(json, "json");
  debug(json.data.nodeById, "return art APi");
  if (json.data.nodeById !== null) {
    json.data.nodeById.art_id = ART_ID;
  }

  return json.data.nodeById;
}

function artApi_sort(artApi) {
  debug("artApi_sort start");
  var artRes = artApi;

  //送られたメッセージ内容を取得
  var auther_obj = {};
  if (artRes.fieldOeuvreAuteurs[0] === undefined) auther_obj.name = "unknown";
  else
    var auther_obj =
      artRes.fieldOeuvreAuteurs[0].entity.fieldAuteurAuteur.entity;
  var describe_obj = artRes.fieldDateProduction;
  //debug(auther_obj, "auther_obj");

  var title = artRes.title;
  var absolutePath = artRes.absolutePath;
  var autherName = auther_obj.name;
  var autherBornYear = "-"; //auther_obj.fieldPipDateNaissance.startYear;
  var autherBornPlace = "-"; //auther_obj.fieldPipLieuNaissance;
  var autherDethYear = "-"; //auther_obj.fieldPipDateDeces.startYear;
  var publicUrl = "test"; //artRes.fieldVisuelsPrincipals[0].entity.publicUrl
  if (describe_obj !== null) var finishWorkYear = describe_obj.startYear;
  else var finishWorkYear = "-";
  if (artRes.fieldOeuvreDescriptionIcono !== null)
    var artComment = artRes.fieldOeuvreDescriptionIcono.value;
  else var artComment = null;

  var art_id = absolutePath.split("/").pop();

  var output = {
    art_id: art_id,
    title: title,
    absolutePath: absolutePath,
    autherName: autherName,
    autherBornYear: autherBornYear,
    autherBornPlace: autherBornPlace,
    autherDethYear: autherDethYear,
    publicUrl: publicUrl,
    finishWorkYear: finishWorkYear,
    artComment: artComment,
  };

  //var reply_messages = "title: " + title + "\n" + "absolutePath: " + absolutePath + "\n" + "autherName: " + autherName + "\n" + "autherBornYear: " + autherBornYear + "\n" + "autherBornPlace: " + autherBornPlace + "\n" + "autherDethYear: " + autherDethYear + "\n" + "publicUrl: " + publicUrl + "\n" + "finishWorkYear: " + finishWorkYear + "\n" + "artComment: " + artComment
  debug(output, "output artApi_sort()");

  return output;
}

/**
 *
 * @param {Number} AUTHER_ID 著者固有の番号
 * @return {Object} count:検索ヒット数 entities {Array} .title .nid
 */
function getAutherProducts(AUTHER_ID) {
  debug(AUTHER_ID, "getAutherProducts start");
  //const ART_ACCESS_TOKEN = ;
  //const art_endpoint = "https://api.github.com/graphql";

  const graphql =
    '{nodeQuery(filter: {conditions: [{ field: "type", value: "oeuvre" }{ field: "field_oeuvre_auteurs.entity.field_auteur_auteur.entity.field_lref_adlib", value: ' +
    JSON.stringify(AUTHER_ID) +
    " }]}) {count entities { ...on NodeOeuvre {title nid}}}   }";

  function buildRequestOption(graphql) {
    return {
      method: "post",
      //contentType: "application/json; charset=UTF-8",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "auth-token": ART_ACCESS_TOKEN,
      },
      payload: JSON.stringify({ query: graphql }),
    };
  }

  function getAssignedPullRequests() {
    const option = buildRequestOption(graphql);
    const res = UrlFetchApp.fetch(art_endpoint, option);
    const json = JSON.parse(res.getContentText());
    return json;
  }

  buildRequestOption(graphql);

  //debug("buildRequestOption", buildRequestOption(graphql))

  var json = getAssignedPullRequests();
  debug(json.data.nodeQuery, "return");
  return json.data.nodeQuery;
}

/**
 *
 * @param {*} AUTHER_NO
 * @param {*} num
 * @return {array} art_list
 */
function _getProduct_real(AUTHER_NO, num) {
  debug("_getProduct_real start");

  //debug(sheet_d_values[AUTHER_NO][5], "JSON.parse(sheet_d_values[AUTHER_NO])")

  var getAutherProducts = sheet_d_values[AUTHER_NO];
  var arry = JSON.parse(getAutherProducts[5]);
  var art_list = [];
  for (i = 0; i < arry.length; i++) {
    var art = artApi_sort(arry[i]);
    art_list.push(art);
  }

  debug(art_list, "art_list");
  if (art_list.length > 10) {
    //10以上入ってる場合
    debug("art_list 10");
    return art_list.splice(10); //10子に制限
  } else {
    debug("art_list under10");
    return art_list;
  }
  return;

  var output = [];
  var start = 0;
  var end = start + num;

  for (var i = start; i < end; i++) {
    output.push(AutherProducts_arry[i]);
  }
  debug(output, "output");
  return output;
}

/**
 *
 * @param {*} AUTHER_NO 1~17までの数
 * @param {Number} num 表示する数
 * @return product_arry
 */
function getProduct(AUTHER_NO, num) {
  debug("getProduct start");

  //debug(sheet_d_values[AUTHER_NO][4], "JSON.parse(sheet_d_values[AUTHER_NO])")

  var getAutherProducts = sheet_d_values[AUTHER_NO];
  var obj = JSON.parse(getAutherProducts[4]);
  var AutherProductsNumber = obj.count;
  var AutherProducts_arry = obj.entities;

  var output = [];
  var start = 0;
  var end = start + num;

  for (var i = start; i < end; i++) {
    output.push(AutherProducts_arry[i]);
  }
  debug(output, "output");
  return output;
}

function getProductDetail(product_arry, AUTHER_NO) {
  var art_origin = [];
  debug(product_arry, "product_arry in");
  for (i = 0; i < product_arry.length; i++) {
    art_origin.push(artApi(product_arry[i].nid));
  }
  var range = sheet_d.getRange(6, AUTHER_NO + 1, 0, 0);
  range.setValue(JSON.stringify(art_origin));
}

function makeDataBaseAuther() {
  var AutherList = [
    ["40408", "Monet, Claude", "モネ"],
    ["42468", "Gustave Courbet", "クールベ"],
    [
      "24524",
      "Picasso, Pablo (Pablo Ruiz Blasco Picasso y Lopez, dit)",
      "ピカソ",
    ],
    ["5921", "Mucha, Alphonse", "ミュシャ"],
    ["5526", "Rembrandt (Rembrandt Harmensz Van Rijn, dit)", "レンブラント"],
    ["6135", "Delacroix, Eugène", "ドラクロワ"],
    ["40237", "Matisse, Henri", "マティス"],
    ["42468", "Courbet, Gustave", "クルーべ"],
    ["2256", '"Utrillo, Maurice (Maurice Valadon, dit)"', "ユトリロ"],
    ["40514", "Renoir, Auguste", "ルノワール"],
    ["40538", "Gauguin, Paul", "ゴーギャン"],
    ["13236", "Toulouse-Lautrec, Henri de", "ロートレック"],
    ["40401", "Signac, Paul", "シニャック"],
    ["9492", "Dufy, Raoul", "デュフィ"],
    ["42415", "Sisley, Alfred", "シスレー"],
    ["40191", "Laurencin, Marie", "ローランサン"],
    ["42444", "Millet, Jean-François", "ミレー"],
  ];
  var start = 14;
  var end = AutherList.length;

  if (start === 0) {
    sheet_d.clear();
    sheet_d.appendRow(["No.", "名前", "Name", "著者ID", "作品", "詳細"]);
  }

  for (i = start; i < end; i++) {
    var ID = AutherList[i][0];
    var name_en = AutherList[i][1];
    var name_ja = AutherList[i][2];
    var autherProducts = getAutherProducts(ID);
    sheet_d.appendRow([
      i + 1,
      name_ja,
      name_en,
      ID,
      JSON.stringify(autherProducts),
    ]);
  }
}

function makeDataBaseWorkDetail() {
  var start_auther = 1; //min=1
  var end_auther = 18;

  for (AUTHER_NO = start_auther; AUTHER_NO < end_auther; AUTHER_NO++) {
    //var AUTHER_NO = 1;

    var art_id = [];
    var getAutherProducts = sheet_d_values[AUTHER_NO];
    var obj = JSON.parse(getAutherProducts[4]);
    var AutherProducts_id_arry = obj.entities;
    var start = 0;
    var end = AutherProducts_id_arry.length;
    for (var i = start; i < end; i++) {
      art_id.push(AutherProducts_id_arry[i].nid);
    }
    //debug(art_id, "art_id in");
    var artApi_arry = [];
    for (i = 0; i < end; i++) {
      artApi_arry.push(artApi(art_id[i]));
    }
    debug(artApi_arry, "artApi_arry");

    var range = sheet_d.getRange(AUTHER_NO + 1, 6, 1, 1);
    //range.setValue(JSON.stringify(artApi_arry));

    if (AUTHER_NO === 1) {
      sheet_p.clear();
      sheet_p.appendRow(["ID", "URL", "picture URL", "fileName"]);
    }

    for (i = 0; i < artApi_arry.length; i++) {
      var putUrl = "enmpty";
      var art_id = artApi_arry[i].art_id;
      var absolutePath = artApi_arry[i].absolutePath;

      function html2jpg(url) {
        //var url = "http://parismuseescollections.paris.fr/node/226737";
        //var url = "http://parismuseescollections.paris.fr/node/249029" //not picture

        var response = UrlFetchApp.fetch(url).getContentText();
        //debug(response.match(".jpg"),"response")

        var result = "";
        var img0 = response.split('class="first-image');

        if (img0 !== undefined) {
          var img1 = img0[1].split("</span>");
          if (img1[0].indexOf('src="') !== -1) {
            var img2 = img1[0].split('src="');
            var img3 = img2[1].split("?itok");
            result = img3[0];
          } else {
            result = "do not have picture";
          }
        } else {
          result = "do not have picture";
        }
        debug(result, "result html2jpg");
        return result;
      }
      if (absolutePath === undefined || absolutePath === null) {
        putUrl = "absolutePath === undefined || absolutePath === null";
      } else {
        debug(artApi_arry[i], "artApi_arry[i] pub");
        if (artApi_arry[i].fieldVisuelsPrincipals[0] === undefined) {
          //publicUrlが存在しない
          putUrl = html2jpg(absolutePath);
        } else {
          var publicUrl =
            artApi_arry[i].fieldVisuelsPrincipals[0].entity.publicUrl;
          if (publicUrl === null) {
            putUrl = html2jpg(absolutePath);
          } else {
            putUrl = publicUrl;
          }

          debug(publicUrl, "publicUrl dev");
        }
        /*
                if (putUrl !== "enmpty") {

                    putUrl = publicUrl;
                    debug(putUrl, "putUrl")
                }


                else {
                    debug(publicUrl, "publicUrl null or undefined")
                }
                */
      }
      var auther_id =
        artApi_arry[i].fieldOeuvreAuteurs[0].entity.fieldAuteurAuteur.entity
          .fieldLrefAdlib;
      var id = AUTHER_NO + "-" + auther_id + "-" + art_id;
      var filename = id;

      debug(absolutePath, "absolutePath dev");
      debug(putUrl, "putUrl dev");
      sheet_p.appendRow([id, absolutePath, putUrl, filename]);
    }
  }
}

function createUser(user_id) {
  function getUserDisplayName(user_id) {
    var res = UrlFetchApp.fetch(line_endpoint_profile + "/" + user_id, {
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + CHANNEL_ACCESS_TOKEN,
      },
      method: "get",
    });
    return JSON.parse(res).displayName;
  }

  var row = sheet_u.getLastRow();
  var range = sheet_u.getRange(1, 1, row, 6);
  var user_ud_list = range.getValues();

  var find = false;
  var index = "";
  for (i = 0; i < row; i++) {
    if (user_ud_list[i][2].indexOf(user_id) !== -1) {
      find = true;
      index = i;
      break;
    }
  }
  debug(user_ud_list, "user_ud_list");
  debug(find, "find");
  if (find === true) {
    var user_times = sheet_u.getRange(index + 1, 4, 1, 1).getValues()[0]; //使用回数
    sheet_u.getRange(index + 1, 4, 1, 1).setValue(Number(user_times) + 1);

    var user_money = sheet_u.getRange(index + 1, 5, 1, 1).getValues()[0]; //所持金
    sheet_u.getRange(index + 1, 5, 1, 1).setValue(Number(user_money) - 10);
    //sheet_u.getRange(index + 1, 6, 1, 1).setValue("ready");
    if (user_money < -50 && user_money > -100) {
      state.userMoneyIsUnder = "50";
    } else if (user_money <= -100 && user_money > -200) {
      state.userMoneyIsUnder = "100";
    } else if (user_money <= -200) {
      state.userMoneyIsUnder = "200";
    }
    debug(state.userMoneyIsUnder, "state.userMoneyIsUnder");
  } else {
    var today = new Date();
    var USER_NAME = getUserDisplayName(user_id);
    debug();
    sheet_u.appendRow([today, USER_NAME, user_id, 1, 50, "ready"]);
  }
}
//}
function earnMoney(user_id, money) {
  var row = sheet_u.getLastRow();
  var range = sheet_u.getRange(1, 1, row, 5);
  var user_ud_list = range.getValues();

  var find = false;
  var index = "";
  for (i = 0; i < row; i++) {
    if (user_ud_list[i][2].indexOf(user_id) !== -1) {
      find = true;
      index = i;
      break;
    }
  }

  var user_money = Number(sheet_u.getRange(index + 1, 5, 1, 1).getValues()[0]); //所持金
  var help = sheet_u.getRange(index + 1, 7, 1, 1).getValues()[0][0];
  debug(help, "help");
  debug(index, "index");
  if (user_money < -200 && help !== "help") {
    sheet_u.getRange(index + 1, 7, 1, 1).setValue("help");

    var message =
      "借金しすぎ！\n\n助けて\n\nと入力すると、60%の確率で救われます。";
    pushMsg(user_id, message);
    //pushBuble(user_id);
  }

  sheet_u.getRange(index + 1, 5, 1, 1).setValue(user_money + money);
  return user_money + money;
}

function debug(msgConsole, msg) {
  var DEV_MODE = true;
  var RECIPIENT = "tool0628@gmail.com";
  var debug_type = typeof msgConsole;
  var json = msgConsole;
  //Logger.log("come to json");
  //Logger.log(json);

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

function simpleReply(reply_messages) {
  return [
    {
      type: "text",
      text: reply_messages,
    },
  ];
}

function replyDownlod() {
  /*
    for (i = 0; i < art_list.length; i++) {
        Art_id_list.push(art_list[i].art_id);
        for (i = 0; i < list.length; i++) {
            if (list[i][3].indexOf(art_list[i].art_id) !== -1) {

            }
        }
    }
    */
}
function replyDescripction() {}

function replyArt() {
  Art_id_arry = "";
  var insert_carousel = [];
  var recordBest = "";
  var AUTHER_NO = 3;
  var num = 5;

  var art_list = _getProduct_real(AUTHER_NO, num);

  var art_pic_url =
    "https://drive.google.com/uc?id=1nr3G9ig4v03vpEdbI1ALjf82IixYTuuX";
  var art_title = "title";
  var art_auther = "auther";
  var Art_id = "4353"; //for download
  var Art_id_list = [];
  var Art_totalid_list = [];

  // 範囲はB列を指定
  range = sheet_p.getRange("A2:D");

  debug(range, "range");
  // 画像URLが入力されている最後の行数を取得
  var row = sheet_p.getLastRow() - 1; //A2から開始してるので-1
  var list = range.getValues();

  var id = "";

  for (i = 0; i < art_list.length; i++) {
    id = art_list[i].art_id;
    Art_id_list.push(art_list[i].art_id);
  }

  for (i = 0; i < list.length - 1; i++) {
    Art_id_list.forEach(function (id) {
      if (list[i][3].indexOf(id) !== -1) {
        Art_totalid_list.push([list[i][2], list[i][3]]); //画像urlとファイル名をpush
      }
    });
  }

  debug(Art_id_list, "Art_id_list");
  debug(Art_totalid_list, "Art_totalid_list");

  debug(Art_totalid_list.length, "Art_totalid_list.length");
  //Art_totalid_list.length
  //for (i = 0; i < 10; i++) {
  var i = 0;
  art_list.forEach(function (el) {
    debug(i, "i in ");
    debug(el, "i in el ");

    Art_id = art_list[i].art_id;
    debug(art_list[i].title, "Art_id dev");

    art_title = art_list[i].title;
    art_auther = art_list[i].autherName;

    var picture_id = getArtUrlId(Art_id);

    debug(picture_id, "picture_id");
    if (picture_id !== undefined) {
      debug(picture_id, "picture_iind");
      art_pic_url = "https://drive.google.com/uc?id=" + picture_id;
    } else {
      art_pic_url =
        "https://amc1nai.net/wp/wp-content/uploads/2017/08/noimage.jpg";
    }

    debug(art_pic_url, "art_pic_url dev");

    insert_carousel.push({
      type: "bubble",
      size: "giga",
      hero: {
        type: "image",
        url: art_pic_url,
        size: "full",
        aspectMode: "cover",
        aspectRatio: "160:100",
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            align: "center",
            text: art_title,
            weight: "bold",
            size: "md",
            wrap: true,
          },
          {
            type: "separator",
            color: "#a0a0a0",
          },
          {
            type: "text",
            align: "end",
            style: "italic",
            text: art_auther + "/ CC0 Paris Musees*",
            size: "xs",
            wrap: true,
          },
          {
            type: "separator",
            color: "#a0a0a0",
          },
          {
            type: "button",
            style: "secondary",
            offsetTop: "10px",
            action: {
              type: "message",
              label: "ダウンロード",
              text: "【ダウンロード/" + Art_id + "】",
            },
          },
        ],
        spacing: "sm",
        paddingAll: "13px",
      },
    });

    //}for
    i++;
  });

  debug(insert_carousel, "insert_carousel");

  return [
    {
      type: "flex",
      altText: "art message",
      contents:
        //////////////////////////////////////////////////
        {
          type: "carousel",
          contents: insert_carousel,
        },
      //////////////////////////////////////////////////
    },
  ];
}

function replyOn(user_id) {
  var row = sheet_u.getLastRow();
  var range = sheet_u.getRange(1, 1, row, 5);
  var user_ud_list = range.getValues();

  var find = false;
  var index = "-";
  for (i = 0; i < row; i++) {
    if (user_ud_list[i][2].indexOf(user_id) !== -1) {
      find = true;
      index = i;
      break;
    }
  }
  if (index === "-") {
    var user_money = "∞";
  } else {
    var user_money = sheet_u.getRange(index + 1, 5, 1, 1).getValues(); //使用回数
  }
  debug(user_money, "user_money");

  return [
    {
      type: "flex",
      altText: "art message",
      contents:
        //////////////////////////////////////////////////
        {
          type: "bubble",
          body: {
            type: "box",
            layout: "vertical",
            contents: [
              {
                type: "text",
                align: "center",
                text: "美術ガチャ",
                weight: "bold",
                size: "xxl",
                wrap: true,
              },
              {
                type: "text",
                align: "center",
                text: "所持金: " + user_money + "億G",
                weight: "bold",
                size: "xs",
                wrap: true,
              },
              {
                type: "separator",
                color: "#a0a0a0",
              },
              {
                type: "button",
                style: "primary",
                offsetTop: "10px",
                action: {
                  type: "message",
                  label: "10億G",
                  text: "【10億】",
                },
              },
            ],
            spacing: "sm",
            paddingAll: "13px",
          },
        },
      //////////////////////////////////////////////////
    },
  ];
}
function pushMsg(user_id, message) {
  debug("pushmsg start");
  var row = sheet_u.getLastRow();
  var range = sheet_u.getRange(1, 1, row, 6);
  var user_ud_list = range.getValues();

  var msg =
    "10秒後に結果が表示されます。\n何度も投稿するとリセットされます。\n\n20秒以上たっても返信がない場合はもう一度入力してください。";
  var find = false;
  var index = "";
  for (i = 0; i < row; i++) {
    if (user_ud_list[i][2].indexOf(user_id) !== -1) {
      find = true;
      index = i;
      break;
    }
  }

  if (find === true) {
    //var user_state = sheet_u.getRange(index + 1, 6, 1, 1).getValues()[0];//使用回数
    sheet_u.getRange(index + 1, 6, 1, 1).setValue("post");
  } else {
  }

  var headers = {
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: "Bearer " + CHANNEL_ACCESS_TOKEN,
  };

  var postData = {
    to: user_id,
    messages: [
      {
        type: "text",
        text: message,
      },
    ],
  };

  var options = {
    headers: headers,
    method: "post",
    payload: JSON.stringify(postData),
  };

  var res = UrlFetchApp.fetch(LINE_ENDPOINT_PUSH, options);
}

function getPushNum() {
  //翌日集計される
  function getNowYMD() {
    var dt = new Date();
    var y = dt.getFullYear();
    var m = ("00" + (dt.getMonth() + 1)).slice(-2);
    var d = ("00" + dt.getDate()).slice(-2);
    var result = y + m + d;
    return result;
  }

  var day = getNowYMD();
  var headers = {
    Authorization: "Bearer " + CHANNEL_ACCESS_TOKEN,
  };

  var options = {
    headers: headers,
    method: "get",
  };

  var res = UrlFetchApp.fetch(LINE_ENDPOINT_PUSH_NUM + "?date=" + day, options);
  return res;
}

//ポストで送られてくるので、送られてきたJSONをパース
function doPost(e) {
  var json = JSON.parse(e.postData.contents);

  //返信するためのトークン取得
  var reply_token = json.events[0].replyToken;
  if (typeof reply_token === "undefined") {
    return;
  }
  var user_id = json.events[0].source.userId;
  debug(user_id, "user_id");

  var user_state = "-";
  var row = sheet_u.getLastRow();
  var range = sheet_u.getRange(1, 1, row, 6);
  var user_ud_list = range.getValues();

  var find = false;
  var index = "";
  for (i = 0; i < row; i++) {
    if (user_ud_list[i][2].indexOf(user_id) !== -1) {
      find = true;
      index = i;
      break;
    }
  }

  var user_money = 0;
  if (find === true) {
    user_state = sheet_u.getRange(index + 1, 6, 1, 1).getValues()[0][0]; //使用回数
    debug(user_state, "user_state");
    user_money = Number(sheet_u.getRange(index + 1, 6, 1, 1).getValues()[0]);
  } else {
    createUser(user_id);
    user_money = 50;
  }

  if (user_state === "ready") {
    function replyArt_random(art_res) {
      createUser(user_id);

      var url = art_res.url; //drive
      var auther = art_res.auther;
      var title = art_res.title;
      var artUrl = art_res.artUrl; //web
      var height = art_res.height + "";
      var width = art_res.width + "";
      var endYear = art_res.endYear;
      var comment = art_res.comment;

      var moreInfo01 = {
        type: "separator",
        color: "#a0a0a0",
      };
      var moreInfo02 = {
        type: "separator",
        color: "#a0a0a0",
      };
      var moreInfo03 = {
        type: "separator",
        color: "#a0a0a0",
      };
      if (endYear !== "-") {
        moreInfo01 = {
          type: "text",
          align: "end",

          text: endYear + "年",
          size: "xs",
          wrap: true,
        };

        moreInfo02 = {
          type: "separator",
          color: "#a0a0a0",
        };
      }
      if (comment !== null) {
        moreInfo03 = {
          type: "text",
          align: "start",
          text: comment,
          size: "xs",
          wrap: true,
        };
      }
      function art_price(art_id, comment) {
        var price = Math.floor(Number(art_id) / 100000); //1~9
        price = price * 6;
        if (comment !== null) {
          debug(price, "price1");
          price = price * Math.floor(Math.random() * 10); //コメントがあった場合は1~9倍
        }
        debug(comment, "comment");
        return price;
      }
      var money = art_price(art_res.art_id, comment);
      var user_money = earnMoney(user_id, money);
      var moreInfo04 = {
        type: "text",
        align: "center",
        weight: "bold",
        text: "獲得:" + money + "億G / 所持金:" + user_money + "億G",

        size: "md",
        wrap: true,
      };

      return [
        {
          type: "flex",
          altText: "art message",
          contents:
            //////////////////////////////////////////////////
            {
              type: "bubble",
              hero: {
                type: "image",
                url: url,
                size: "full",
                aspectRatio: width + ":" + height,
                aspectMode: "cover",
                action: {
                  type: "message",
                  label: "ダウンロード",
                  text: artUrl,
                },
              },
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    align: "center",
                    text: title,
                    weight: "bold",
                    size: "md",
                    wrap: true,
                  },
                  {
                    type: "separator",
                    color: "#a0a0a0",
                  },
                  {
                    type: "text",
                    align: "end",
                    style: "italic",
                    text: auther + "/ CC0 Paris Musees",
                    size: "xs",
                    wrap: true,
                  },
                  moreInfo02,
                  moreInfo04,
                  moreInfo02,
                  moreInfo01,
                  moreInfo02,
                  moreInfo03,
                  {
                    type: "separator",
                    color: "#a0a0a0",
                  },
                  {
                    type: "button",
                    style: "secondary",
                    offsetTop: "10px",
                    action: {
                      type: "message",
                      label: "ダウンロード",
                      text: artUrl,
                    },
                  },
                  {
                    type: "button",
                    style: "secondary",
                    offsetTop: "10px",
                    action: {
                      type: "message",
                      label: "10億G",
                      text: "【10億】",
                    },
                  },
                ],
                spacing: "sm",
                paddingAll: "13px",
              },
            },
          //////////////////////////////////////////////////
        },
      ];
    }

    function replyOff() {
      createUser(user_id);
      var money = 0;
      var user_money = earnMoney(user_id, money);
      return [
        {
          type: "flex",
          altText: "art message",
          contents:
            //////////////////////////////////////////////////
            {
              type: "bubble",
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    align: "center",
                    text: "ハズレ",
                    weight: "bold",
                    size: "xxl",
                    wrap: true,
                  },
                  {
                    type: "separator",
                    color: "#a0a0a0",
                  },
                  {
                    type: "text",
                    align: "center",
                    text: "所持金: " + user_money + "億G",
                    size: "md",
                    wrap: true,
                  },
                  {
                    type: "text",
                    align: "center",
                    text: "※返信に約5~20秒かかります",
                    size: "xs",
                    wrap: true,
                  },
                  {
                    type: "button",
                    style: "primary",
                    offsetTop: "10px",
                    action: {
                      type: "message",
                      label: "10億G",
                      text: "【10億】",
                    },
                  },
                ],
                spacing: "sm",
                paddingAll: "13px",
              },
            },
          //////////////////////////////////////////////////
        },
      ];
    }
    function pushBuble(user_id) {
      debug("pushBuble start");

      var messages2 = [
        {
          type: "flex",
          altText: "art message",
          contents:
            //////////////////////////////////////////////////
            {
              type: "bubble",
              body: {
                type: "box",
                layout: "vertical",
                contents: [
                  {
                    type: "text",
                    align: "center",
                    text: "借金しすぎ！",
                    weight: "bold",
                    size: "xxl",
                    wrap: true,
                  },
                  {
                    type: "separator",
                    color: "#a0a0a0",
                  },
                  {
                    type: "text",
                    align: "center",
                    text: "助けて　と入力すると、50%の確率で救われます。",
                    size: "md",
                    wrap: true,
                  },
                ],
                spacing: "sm",
                paddingAll: "13px",
              },
            },
          //////////////////////////////////////////////////
        },
      ];

      var row = sheet_u.getLastRow();
      var range = sheet_u.getRange(1, 1, row, 6);
      var user_ud_list = range.getValues();

      var msg =
        "10秒後に結果が表示されます。\n何度も投稿するとリセットされます。\n\n20秒以上たっても返信がない場合はもう一度入力してください。";
      var find = false;
      var index = "";
      for (i = 0; i < row; i++) {
        if (user_ud_list[i][2].indexOf(user_id) !== -1) {
          find = true;
          index = i;
          break;
        }
      }

      if (find === true) {
        //var user_state = sheet_u.getRange(index + 1, 6, 1, 1).getValues()[0];//使用回数
        sheet_u.getRange(index + 1, 6, 1, 1).setValue("post");
      } else {
      }

      var headers = {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + CHANNEL_ACCESS_TOKEN,
      };

      var postData = {
        to: user_id,
        messages: messages2,
      };

      var options = {
        headers: headers,
        method: "post",
        payload: JSON.stringify(postData),
      };

      var res = UrlFetchApp.fetch(LINE_ENDPOINT_PUSH, options);
    }

    var messages = [];
    if (
      json.events[0].message.text === "【10億】" ||
      json.events[0].message.text === "【美術】" ||
      json.events[0].message.text === "【もう一度】"
    ) {
      sheet_u.getRange(index + 1, 6, 1, 1).setValue("post");

      var random = random_id_XXXXXX(); //本番
      function randomArt(random) {
        //debug(sheet_p_rdm, "sheet_p_rdm")
        //var random = random_id_XXXXXX();
        debug(random, "random");

        var art_origin = artApi(random);
        if (art_origin === null) {
          var output = null;
          //var imgSize = { height: null, width: null };
        } else {
          var art = artApi_sort(art_origin);

          debug(art, "art");

          var url = art.absolutePath;

          var imgUrl = html2jpg(url);
          debug(imgUrl, "imgUrl");

          var replyImgUrl = "";
          //art_picture_random

          if (imgUrl === "do not have picture") {
            replyImgUrl =
              "https://amc1nai.net/wp/wp-content/uploads/2017/08/noimage.jpg";
            var imgSize = { height: "100", width: "100" };
            imgUrl = "http://parismuseescollections.paris.fr/node/" + random;
          } else {
            var fileName = art.art_id;
            var imgSize = downloadImagesUrl(imgUrl, fileName);
            var pic_id = getArtUrlId_ver_rdm(fileName);
            replyImgUrl = "https://drive.google.com/uc?id=" + pic_id;
          }
          debug(replyImgUrl, "replyImgUrl");
          var replyComment = "";
          if (art.artComment === null) replyComment = "-";
          else replyComment = art.artComment;
          var output = {
            art_id: random,
            height: imgSize.height,
            width: imgSize.width,
            url: replyImgUrl, //ドライブに保存した画像のurl
            title: LanguageApp.translate(art.title, "fr", "ja"),
            auther: art.autherName,
            artUrl: imgUrl, //web上にある画像のurl
            absolutePath: url, //詳細のurl
            endYear: art.finishWorkYear,
            comment: LanguageApp.translate(art.artComment, "fr", "ja"),
          };
        }

        if (output === null) {
          sheet_p_rdm.appendRow([random, "false"]);
        } else {
          sheet_p_rdm.appendRow([
            random,
            "true",
            imgSize.height,
            imgSize.width,
            output.title,
            output.auther,
            output.endYear,
            output.comment,
            output.url,
            output.artUrl,
          ]);
          if (output.comment === null) var message = "当たり！！";
          else var message = "大当たり！！！！";
          pushMsg(user_id, message);
        }

        debug(output, "output randomArt()");
        return output;
      }
      //var random = "226737";
      var row = sheet_p_rdm.getLastRow();
      var art_id_list_db = sheet_p_rdm.getRange(1, 1, row, 10).getValues();
      //debug(art_id_list_db, "art_id_list_db")
      //debug(art_id_list_db.indexOf(random), "art_id_list_db.indexOf(random)")
      var art = "-";
      for (i = 0; i < row; i++) {
        //debug(art_id_list_db[i][0], "33")
        if (JSON.stringify(art_id_list_db[i][0]).indexOf(random) !== -1) {
          art = art_id_list_db[i];
          break;
        }
      }
      debug(art, "art test");
      if (art === "-") {
        //dbにない場合
        //pushMsg(user_id);

        var art_res = randomArt(random);
      } else {
        //dbにある場合

        if (art[1] === true) {
          //検索結果有り

          var art_res = {
            art_id: art[0],
            height: art[2],
            width: art[3],
            url: art[8], //ドライブに保存した画像のurl
            title: art[4],
            auther: art[5],
            artUrl: art[9], //web上にある画像のurl
            endYear: art[6],
            comment: art[7],
          };
        } else {
          //検索結果無し
          var art_res = null;
        }
      }

      if (art_res === null) {
        //debug(state.userMoneyIsUnder, "state.userMoneyIsUnder in reply")
        // var user_money = sheet_u.getRange(index + 1, 5, 1, 1).getValues()[0];//所持金

        messages = replyOff();
      } else {
        //debug(state.userMoneyIsUnder, "state.userMoneyIsUnder in reply")
        //var user_money = sheet_u.getRange(index + 1, 5, 1, 1).getValues()[0];//所持金

        messages = replyArt_random(art_res);
      }

      debug(messages, "messages");
    } else if (json.events[0].message.text.match("http") !== null) {
      //httpを検知したら無反応
    } else if (json.events[0].message.text === "助けて") {
      var random = Number(Math.floor(random_id_XXXXXX() / 100000)); //1~9
      var plusMoney = "";
      if (Number(random) >= 9 || Number(random) <= 2) {
        plusMoney = -300;
      } else {
        plusMoney = 50 * random;
      }

      var user_money = sheet_u.getRange(index + 1, 5, 1, 1).getValues()[0]; //所持金
      sheet_u
        .getRange(index + 1, 5, 1, 1)
        .setValue(Number(user_money) + Number(plusMoney));
      messages = simpleReply("天からの恵み: " + plusMoney + "億");
    } else if (json.events[0].message.text === "【所持金】") {
      var user_money = sheet_u.getRange(index + 1, 5, 1, 1).getValues()[0]; //所持金
      messages = simpleReply("所持金: " + user_money + "億");
    } else if (json.events[0].message.text === "【100億】") {
      var row = sheet_d_rdm.getLastRow();
      var range = sheet_d_rdm.getRange(1, 1, row, 1);
      var art_list = range.getValues();

      sheet_u.getRange(index + 1, 6, 1, 1).setValue("post");

      var max = art_list.length;
      var random_index = Math.floor(Math.random() * max);

      var random = art_list[random_index];
      debug(random, "random 100億");
      function randomArt(randaom) {
        //debug(sheet_p_rdm, "sheet_p_rdm")
        //var random = random_id_XXXXXX();
        debug(random, "random");

        var art_origin = artApi(random);
        if (art_origin === null) {
          var output = null;
          //var imgSize = { height: null, width: null };
        } else {
          var art = artApi_sort(art_origin);

          debug(art, "art");

          var url = art.absolutePath;

          var imgUrl = html2jpg(url);
          debug(imgUrl, "imgUrl");

          var replyImgUrl = "";
          //art_picture_random

          if (imgUrl === "do not have picture") {
            replyImgUrl =
              "https://amc1nai.net/wp/wp-content/uploads/2017/08/noimage.jpg";
            var imgSize = { height: "100", width: "100" };
            imgUrl = "http://parismuseescollections.paris.fr/node/" + random;
          } else {
            var fileName = art.art_id;
            var imgSize = downloadImagesUrl(imgUrl, fileName);
            var pic_id = getArtUrlId_ver_rdm(fileName);
            replyImgUrl = "https://drive.google.com/uc?id=" + pic_id;
          }
          debug(replyImgUrl, "replyImgUrl");

          var output = {
            art_id: random,
            height: imgSize.height,
            width: imgSize.width,
            url: replyImgUrl, //ドライブに保存した画像のurl
            title: LanguageApp.translate(art.title, "fr", "ja"),
            auther: art.autherName,
            artUrl: imgUrl, //web上にある画像のurl
            endYear: art.finishWorkYear,
            comment: LanguageApp.translate(art.artComment, "fr", "ja"),
          };
        }

        if (output === null) {
          sheet_p_rdm.appendRow([random, "false"]);
        } else {
          sheet_p_rdm.appendRow([
            random,
            "true",
            imgSize.height,
            imgSize.width,
            output.title,
            output.auther,
            output.endYear,
            output.comment,
            output.url,
            output.artUrl,
          ]);
        }

        debug(output, "output randomArt()");
        return output;
      }
      //var random = "226737";
      var row = sheet_p_rdm.getLastRow();
      var art_id_list_db = sheet_p_rdm.getRange(1, 1, row, 10).getValues();
      //debug(art_id_list_db, "art_id_list_db")
      //debug(art_id_list_db.indexOf(random), "art_id_list_db.indexOf(random)")
      var art = "-";
      for (i = 0; i < row; i++) {
        //debug(art_id_list_db[i][0], "33")
        if (JSON.stringify(art_id_list_db[i][0]).indexOf(random) !== -1) {
          art = art_id_list_db[i];
          break;
        }
      }
      debug(art, "art test");
      if (art === "-") {
        //dbにない場合
        //pushMsg(user_id);

        var art_res = randomArt(random);
      } else {
        //dbにある場合

        if (art[1] === true) {
          //検索結果有り

          var art_res = {
            art_id: art[0],
            height: art[2],
            width: art[3],
            url: art[8], //ドライブに保存した画像のurl
            title: art[4],
            auther: art[5],
            artUrl: art[9], //web上にある画像のurl
            endYear: art[6],
            comment: art[7],
          };
        } else {
          //検索結果無し
          var art_res = null;
        }
      }

      if (art_res === null) {
        debug(state.userMoneyIsUnder, "state.userMoneyIsUnder in reply");

        if (state.userMoneyIsUnder !== "false") {
          messages.push(replyOff());
          messages.push(simpleReply("借金しすぎ"));
        } else {
          messages = replyOff();
        }
      } else {
        debug(state.userMoneyIsUnder, "state.userMoneyIsUnder in reply");
        if (state.userMoneyIsUnder !== "false") {
          messages.push(replyArt_random(art_res));
          messages.push(simpleReply("借金しすぎ"));
        } else {
          messages = replyArt_random(art_res);
        }
      }

      debug(messages, "messages");
    } else {
      //ガチャ反応なし
      debug("もう一度");
      messages = replyOn(user_id);
    }

    sheet_u.getRange(index + 1, 6, 1, 1).setValue("ready");
  } else {
    var messages = simpleReply(
      "リセットされました。連続で投稿しないでください。"
    );
    sheet_u.getRange(index + 1, 6, 1, 1).setValue("ready");
  }
  //messages.push(simpleReply(reply_messages)[0])

  //messages = replyArt();
  /*
        debug(state.userMoneyIsUnder, "state.userMoneyIsUnder in reply")
        messages[0].push(messages)
        messages[1].push(simpleReply("test"))
    debug(messages,"messages out")
    */
  //var url ="https://drive.google.com/uc?id="

  // メッセージを返信
  debug(messages, "last messages");
  UrlFetchApp.fetch(line_endpoint, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: "Bearer " + CHANNEL_ACCESS_TOKEN,
    },
    method: "post",
    payload: JSON.stringify({
      replyToken: reply_token,
      messages: messages,
    }),
  });
  debug(message, "message");
  return ContentService.createTextOutput(
    JSON.stringify({ content: "post ok" })
  ).setMimeType(ContentService.MimeType.JSON);
}

/* バックアップ　line flex
{
  "type": "carousel",
  "contents": [
    {
      "type": "bubble",
      "size": "giga",
      "hero": {
        "type": "image",
        "url": "https://drive.google.com/uc?id=1nr3G9ig4v03vpEdbI1ALjf82IixYTuuX*",
        "size": "full",
        "aspectMode": "cover",
        "aspectRatio": "160:100"
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "align": "center",
            "text": "Fouquetジュエリーストアのステンドグラスの段ボール*",
            "weight": "bold",
            "size": "md",
            "wrap": true
          },
          {
            "type": "separator",
            "color": "#a0a0a0"
          },
          {
            "type": "text",
            "align": "end",
            "style": "italic",
            "text": "作者/ CC0 Paris Musees*",
            "size": "xs",
            "wrap": true
          },
          {
            "type": "separator",
            "color": "#a0a0a0"
          },
          {
            "type": "button",
            "style": "secondary",
            "offsetTop": "10px",
            "action": {
              "type": "message",
              "label": "ダウンロード",
              "text": "【ダウンロード】*"
            }
          },
          {
            "type": "button",
            "style": "secondary",
            "offsetTop": "10px",
            "action": {
              "type": "message",
              "label": "詳細",
              "text": "【詳細】*"
            }
          }
        ],
        "spacing": "sm",
        "paddingAll": "13px"
      }
    },
    {
      "type": "bubble",
      "size": "giga",
      "hero": {
        "type": "image",
        "url": "https://amc1nai.net/wp/wp-content/uploads/2017/08/noimage.jpg",
        "size": "full",
        "aspectMode": "cover",
        "aspectRatio": "160:100"
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "align": "center",
            "text": "festival/ du marais/ 1974/ paris- 12 juin- 13 juillet/ 44 rue françois miron- paris 4",
            "weight": "bold",
            "size": "md",
            "wrap": true
          },
          {
            "type": "separator",
            "color": "#a0a0a0"
          },
          {
            "type": "text",
            "align": "end",
            "style": "italic",
            "text": "Picasso, Pablo (Pablo Ruiz Blasco Picasso y Lopez, dit)/ CC0 Paris Musees*",
            "size": "xs",
            "wrap": true
          },
          {
            "type": "separator",
            "color": "#a0a0a0"
          },
          {
            "type": "button",
            "style": "secondary",
            "offsetTop": "10px",
            "action": {
              "type": "message",
              "label": "ダウンロード",
              "text": "【ダウンロード/119520】"
            }
          }
        ],
        "spacing": "sm",
        "paddingAll": "13px"
      }
    }
  ]
}
*/
