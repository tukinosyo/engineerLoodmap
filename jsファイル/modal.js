
test();
var modalTemplate =$("#otherModal").load("./modal.html").hide();


//モーダルフェードイン機能の設計
function test() {
    console.log("テスト発動");
    //クリックした箇所の文字列を取得
    $("svg").find("text").click(function () {
        var lit = $(this).html();
        console.log(lit);
        modalin(lit);
    })
    //その文字列をxmlファイルで検索し、そこのitemタグから必要な情報を取得
    //モーダルテンプレートにセット
    //モーダルの表示
}

//モーダルのフェードイン
function modalin(lit) {
    console.log("モーダルイン関数発動！");
    //モーダルテンプレートの取得
    //xmlよりタイトル取得、取得した文字列と一致していた場合そのアイテムから必要な
    //項目を取得し、処理をスキップ。
    //情報をモーダルテンプレートにセット
    //モーダルを表示
    
   var xml = xmlRead("./assets/xml/jobTile.xml");
    var responseText = xml.responseText;
    $(responseText).find("item").each(function (index, element) {
        //xmlファイルの比較対象のタイトルを取得
        var targetTitile = $(this).find("title").text();
       
        if (targetTitile !== lit) {
            return true;
        }

        var discription = $(this).find("discription").text();
        var difficulty = $(this).find("difficulty").text();
        var ability = $(this).find("ability").text();
        //モーダルに情報をセット
    $(modalTemplate).find(".modalHeader").text(lit);
    $(modalTemplate).find(".detail").text(discription);
    $(modalTemplate).find(".star").text(difficulty);
    $(modalTemplate).find(".contents").text(ability);
    $(modalTemplate).fadeIn();
        modalOut();
        return false;
    })
    
    
    
}

function modalOut() {
    $("#otherModal").find(".modal__bg").click(function () {
        $(modalTemplate).fadeOut();
    })
}