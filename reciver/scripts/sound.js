// ogg形式のファイルが使えない場合にmp3形式のファイルを使う
createjs.Sound.alternateExtensions = ["mp3"];
// マニフェストの作成
var manifest = [
    {
      src: "dtmf.ogg",
        data: {
            channels: 2,    // 同時に鳴らす音の数
            audioSprite: [
                {id: "0", startTime: 0,    duration: 100},
                {id: "1", startTime: 200,  duration: 100},
                {id: "2", startTime: 400,  duration: 100},
                {id: "3", startTime: 600,  duration: 100},
                {id: "4", startTime: 800,  duration: 100},
                {id: "5", startTime: 1000, duration: 100},
                {id: "6", startTime: 1200, duration: 100},
                {id: "7", startTime: 1400, duration: 100},
                {id: "8", startTime: 1600, duration: 100},
                {id: "9", startTime: 1800, duration: 100},
                {id: "-", startTime: 2000, duration: 100},
                {id: "#", startTime: 2200, duration: 100},
                {id: "a", startTime: 2400, duration: 100},
                {id: "b", startTime: 2600, duration: 100},
                {id: "c", startTime: 2800, duration: 100},
                {id: "d", startTime: 3000, duration: 100}
            ]
        }
    },
    {src: "r2d2_r00.ogg", id: "r00"},
    {src: "r2d2_r01.ogg", id: "r01"},
    {src: "r2d2_r02.ogg", id: "r02"},
    {src: "r2d2_r03.ogg", id: "r03"},
    {src: "r2d2_r04.ogg", id: "r04"},
    {src: "r2d2_r05.ogg", id: "r05"},
    {src: "r2d2_r06.ogg", id: "r06"},
    {src: "r2d2_r07.ogg", id: "r07"},
    {src: "r2d2_r08.ogg", id: "r08"},
    {src: "r2d2_r09.ogg", id: "r09"},
    {src: "r2d2_r10.ogg", id: "r10"},
    {src: "r2d2_r11.ogg", id: "r11"},
    {src: "r2d2_r12.ogg", id: "r12"},
    {src: "r2d2_r13.ogg", id: "r13"},
    {src: "r2d2_r14.ogg", id: "r14"},
    {src: "r2d2_r15.ogg", id: "r15"},
    {src: "r2d2_r16.ogg", id: "r16"},
    {src: "r2d2_r17.ogg", id: "r17"},
    {src: "r2d2_r18.ogg", id: "r18"},
    {src: "r2d2_r19.ogg", id: "r19"},
];

// マニフェストを登録
createjs.Sound.registerSounds(manifest);
// ファイル読み込み時の処理を設定
//createjs.Sound.addEventListener("fileload", () => this.fileLoadHandler());

/**
 * 指定のIDの音を鳴らす
 */
function playSound(soundID) {
    // パンを設定しているのは、Google Chromeで音が片方からしか聞こえないバグの対応のため
    return createjs.Sound.play(soundID, {pan: 0.01});
}

var r2d2_voice_timeout_id;
var r2d2_voice_instance;;
var c = 0;
function playR2D2Voice() {
  if (r2d2_voice_timeout_id != null) {
    clearTimeout(r2d2_voice_timeout_id);
  }
  if (r2d2_voice_instance != null) {
    r2d2_voice_instance.stop();
  }

  var r2d2_rand = "r"+("0"+Math.floor( Math.random() * (19) )).slice(-2);
  r2d2_voice_instance = playSound(r2d2_rand);

  r2d2_voice_timeout_id = setTimeout(playR2D2Voice, 5000);
}
