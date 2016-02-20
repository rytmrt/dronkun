

var s = io.connect();

//サーバから受け取るイベント
s.on("connect", function () {});  // 接続時
s.on("disconnect", function (client) {});  // 切断時

function sendCommand(msg) {
  s.emit("CTR_to_RCV__message", {value:msg});
}



//========================================
// 録音レシーバー
//========================================

//----------------------------------------
// 文言リスト＆コマンドリスト
//----------------------------------------
var RECOGNITION_WORD = {
	"ゆっくり前進":			"FRONT_SLOW",				// 前系
	"前進":					"FRONT",
	"右":					"RIGHT",					// 右系
	"少し右":				"RIGHT_SMALL",
	"ちょっと右":			"RIGHT_SMALL_MORE",
	"停止":					"STOP",						// 停止系
	"ちょっと左":			"LEFT_SMALL_MORE",			// 左系
	"少し左":				"LEFT_SMALL",
	"左":					"LEFT",
	"こうしん":				"BACK",						// 後系
	"ゆっくりこうしん":		"BACK_SLOW",
};

//----------------------------------------
// 録音レシーバーの準備
//----------------------------------------
window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
var recorderButton = null;		// ボタン情報更新用のオブジェクト
var recorderCancel = false;		// 録音を中止する

function buttonClick(btn)
{
	if (recorderButton == null) {			// 初回のみの初期化
		recorderButton = btn;
		RecorderController.init();
	}
	
	if (recorderButton.textContent == "音声解析開始") {
		RecorderController.start();
	}
	else 
	if (recorderButton.textContent == "音声解析中止") {
		RecorderController.stop();
		recorderCancel = true;
	}
}

//----------------------------------------
// 録音処理開始
//----------------------------------------

var Recorder = 
{
	recognition : null,
	
	//----------------------------------------
	// 初期化
	//----------------------------------------
	init: function()
	{
		this.recognition = new webkitSpeechRecognition();
		this.recognition.lang = 'ja';							// 日本語
	//	this.recognition.continuous = true;						// 連続音節認識(うまく認識しないので使わない)
		this.recognition.maxAlternatives = 10;					// 変換候補数
	},
	
	//----------------------------------------
	// 解析開始
	//----------------------------------------
	start: function()
	{
		this.recognition.start();
	},
	
	//----------------------------------------
	// 解析終了
	//----------------------------------------
	stop: function()
	{
		this.recognition.stop();
	},
	
	//----------------------------------------
	// テキスト解析
	//----------------------------------------
	getRecText: function(results)
	{
	//	console.log("recognition event");
		for (var i = 0; i < results.length; i++)									// 解析
		{
			var items = results.item(i);
			for (var j = 0; j < items.length; j++)
			{
				var transcript = items.item(j).transcript;
				console.log("->items["+i+"]["+j+"]: "+transcript);
				
				var wordIndex = transcript in RECOGNITION_WORD;						// 判定
				if (wordIndex == true) {
					console.log("->該当ワード["+transcript+"]");
					return RECOGNITION_WORD[transcript];							// ワード取得;
				}
			}
		}
		console.log("->該当ワードなし");
		return null;
	},
}

var RecorderController = 
{
	//----------------------------------------
	// 解析開始
	//----------------------------------------
	start: function()
	{
		Recorder.start();
	},
	
	//----------------------------------------
	// 解析終了
	//----------------------------------------
	stop: function()
	{
		Recorder.stop();
	},
	
	//----------------------------------------
	// 初期化
	//----------------------------------------
	init: function()
	{
		Recorder.init();
		Recorder.recognition.addEventListener('start', function()			// 録音開始
		{
			console.log("音声解析開始");
			recorderButton.textContent = "音声解析中止";
			$("#recorder").removeClass("is-primary");
			$("#recorder").addClass("is-danger");
		});
		Recorder.recognition.addEventListener('end', function()				// 録音終了
		{
			console.log("音声解析終了");
			recorderButton.textContent = "音声解析開始";
			$("#recorder").removeClass("is-danger");
			$("#recorder").addClass("is-primary");
			if (recorderCancel == false) {
				setTimeout(RecorderController.start, 1000);
			}
			recorderCancel = false;
		});
		Recorder.recognition.addEventListener('result', function(event)		// 録音内容解析
		{
			var text = Recorder.getRecText(event.results);
			if (text != null) {
				console.log("->コマンド送信["+text+"]");
				sendCommand(text);
			}
		});
	},
}
