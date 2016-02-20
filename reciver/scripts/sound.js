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
    }
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
    createjs.Sound.play(soundID, {pan: 0.01});
}



