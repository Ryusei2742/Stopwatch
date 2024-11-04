$(document).ready(function() {
  // 開始時刻、経過時間、タイマー制御のためのID
  let startTime, elapsedTime = 0, timerInterval;

 // time経過時間をフォーマットしてhh:mm:ss.s形式の文字列にする
function timeToString(time) {
  // new Date(time) 経過時間をDateオブジェクトに変換 時間を抽出しやすく
  let date = new Date(time);
  // getUTCHours hh時間を取得して2桁表示にする
  // getUTCHours()は協定世界時間の時間の部分を数字で取得するメソッド
  // dateは経過時間を格納したDateオブジェクト
  // String(date.getUTCHours())はdate.getUTCHours()で取得した数値をString関数で文字列に変換
  // padStartメソッドで使うために文字列に変換
  // padStartメソッドは指定した桁数になるまで先頭に0を追加する
  // 1桁の文字列"1"に対してpadStart(2, '0')を使うと先頭に0を追加して"01"になる
  let hh = String(date.getUTCHours()).padStart(2, '0');
  let mm = String(date.getUTCMinutes()).padStart(2, '0');
  let ss = String(date.getUTCSeconds()).padStart(2, '0');
  // ミリ秒を100で割って少数を切り捨て1桁だけ表示
  let ms = String(Math.floor(date.getUTCMilliseconds() / 100)); //ミリ秒を一桁表示に
  // バッククォートを使うと式を展開できる
  return `${hh}:${mm}:${ss}:${ms}`;
}

// txtを受け取り.displayを持つHTML要素のテキスト通して表示する。ストップウォッチの時間表示部分を更新するのに使う
function print(txt) {
  $(".display").text(txt);
}

// ストップウォッチ開始
function start() {
  // Date.now()で現在の時刻を取得してelapsedTimeを引いてからstartTimeに保存する
  startTime = Date.now() - elapsedTime;
  // setIntervalは100ミリ秒ごとに実行されelapsedTimeに現在の経過時間を計算して保存
  // print(timeToString(elapsedTime));で表示を更新
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 100); //100ミリ秒ごとに更新
  // 開始ボタンを無効化し、停止ボタンを有効化
  // .prop()メソッドはHTML要素のプロパティを取得または設定するjQueryメソッド
  // disabledプロパティはボタンや入力フォームに使われ、trueの場合押せなくなる
  $(".start").prop("disabled", true);
  $(".stop").prop("disabled", false);
}

// ストップウォッチ停止
function stop() {
  // clearInterval(timerInterval)でsetIntervalを止めストップウォッチを一時停止する
  clearInterval(timerInterval);
  // 開始ボタンを有効化、停止ボタンを無効化
  $(".start").prop("disabled", false);
  $(".stop").prop("disabled", true);
}

function reset() {
  // clearInterval(timerInterval)でタイマーを停止し、elapsedTimeを0にリセット
  clearInterval(timerInterval);
  elapsedTime = 0;
  // 表示をリセット
  print("00:00:00.0");
  // 開始ボタンを有効化、停止ボタンを無効化
  $(".start").prop("disabled", false);
  $(".stop").prop("disabled", true);
}

// それぞれのクラスにクリックイベントを設定 クリック時に関数を呼び出す
$(".start").click(start);
$(".stop").click(stop);
$(".reset").click(reset);

// ページ読み込み時にリセット
reset();
});