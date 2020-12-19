

var panelTemplate;


function xmlRead(path) {
   return $.ajax({
    url: path,
    
  type: 'GET',
     dataType: 'xml',
     async: false
   
  })
    .done(function (data) {
      console.log("ロード成功");
  })
  .fail(function(hr, status, error) {
    alert("ロード失敗");
  });
  
  }


  //ロード時の処理
$(function(){
  fadeIn();
  
});

//import firebase from 'firebase';

//url:'./assets/xml/develop.xml',
// const firebaseConfig = {
//   apiKey: "AIzaSyA1Nf2o99BBuvP9tR_yS1_Rt3Q43aiea4g",
//   authDomain: "blue-eyes-white-dragon.firebaseapp.com",
//   databaseURL: "https://blue-eyes-white-dragon.firebaseio.com",
//   projectId: "blue-eyes-white-dragon",
//   storageBucket: "blue-eyes-white-dragon.appspot.com",
//   messagingSenderId: "776722082964",
//   appId: "1:776722082964:web:337b3e7ca931fd5c3d5881",
//   measurementId: "G-XE6RT76Y3R"
// };


// firebase.initializeApp(firebaseConfig);

function fadeIn() {
  $("#listWrapper").hide().fadeIn(2500);
}

//xml情報の読み取りとアペンド
function developXml() {
  var xml = xmlRead("./assets/xml/develop.xml");
  
  var responseText = xml.responseText;
  var itemLength = $(responseText).find("item").length;
  $(responseText).find("item").each(function (index,element) {
    var contentTitle = $(this).find("contentTitle").text();
    var photo = $(this).find("photo ").text();
    var links = $(this).find("links").text();
    createPanel(contentTitle,photo);
    createList(contentTitle,photo,links);

    if (index==itemLength-1) {
      timer();
    }
})
}

function createPanel(contentTitle,photo) {
  //パネルテンプレート取得
  //パネルテンプレートに値を代入
  //パネルテンプレートをアペンド
  var panelTemplate = $(".panelTemplate").clone();
  $(panelTemplate).find(".contentTitle").html(contentTitle);
  $(panelTemplate).find("img").attr("src", photo);
  $(".panelList").append("<div>"+ panelTemplate.html() +"</div>");
}

function timer() {
  console.log("タイマー発動");
  var page = 1;
  var lastPage = parseInt($(".tile").length - 1);
  $(".tile").css("display", "none");
  $(".tile").eq(page).css("display", "block");

  function changePage() {
    $(".tile").fadeOut();
    $(".tile").eq(page).fadeIn();
    
  };
  
  //秒間隔でイメージ切換の発火設定
var Timer;
function startTimer(){
Timer =setInterval(function(){
          if(page === lastPage){
                         page = 1;
                         changePage();
               }else{
                         page ++;
                         changePage();
          };
     },5000);
}
//秒間隔でイメージ切換の停止設定
function stopTimer(){
clearInterval(Timer);
}

//タイマースタート
startTimer();
}


//リストを生成し、リスト一覧に追加していく
function createList(contentTitle,photo,links) {
  console.log("リストクリエイト読み込み");
//テンプレートを取得
//divにアペンドしていく
$(".jobTileTemplate").css("display", "none");
  var jobTileTemplate = $(".jobTileTemplate").clone();
  $(jobTileTemplate).find(".jobTitle").html(contentTitle);
  $(jobTileTemplate).find("img").attr("src", photo);
  $(jobTileTemplate).find(".link").attr("href",links)
  var tunagi = $("<div>" + jobTileTemplate.html() + "</div>");
  $(".jobList").append(tunagi.addClass("jobTiles"));
  
}