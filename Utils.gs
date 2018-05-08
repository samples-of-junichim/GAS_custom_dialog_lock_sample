/**
 * 時刻文字列変換
 * ISO-8601形式のUTC時刻の文字列を返す
 *
 * @param dt  時刻オブジェクト
 */
function dtstr(dt) {
  return   fmt04(dt.getUTCFullYear()) + '-'
         + fmt02(dt.getUTCMonth()+1)  + '-'
         + fmt02(dt.getUTCDate())     + 'T'
         + fmt02(dt.getUTCHours())    + ':'
         + fmt02(dt.getUTCMinutes())  + ':'
         + fmt02(dt.getUTCSeconds())  + '.'
         + fmt03(dt.getUTCMilliseconds()) + 'Z';
}
function fmt02(num) {
  return ('00' + num).slice(-2);
}
function fmt03(num) {
  return ('000' + num).slice(-3);
}
function fmt04(num) {
  return ('0000' + num).slice(-4);
}

/**
 * 処理開始時刻から一定時間が経過したか否か
 *
 * 処理開始時刻が未設定の場合は、一定時間が経過したと判断する
 *
 * @param target  ISO-8601形式の時刻文字列
 * @return true: 一定時間以内（経過していない）, false: それ以上経過
 */
function doesSomeTimeElapsed(target) {
  
  var stDt = new Date(target);
  var cur = new Date();

  // 現在時刻の一定時間以内なら true, 比較はミリ秒で行う
  Logger.log('cur  :' + dtstr(cur)  + ', ' + cur.getTime());
  Logger.log('stDt :' + dtstr(stDt) + ', ' + stDt.getTime());
  Logger.log('cur-elapsed: ' + (cur.getTime() - Constants().ELAPSED_TIME_FOR_SAME_PROC));
  Logger.log('doesSomeTimeElapsed: ' + ((cur.getTime() - Constants().ELAPSED_TIME_FOR_SAME_PROC) < stDt.getTime()));
  
  return (cur.getTime() - Constants().ELAPSED_TIME_FOR_SAME_PROC) < stDt.getTime();
  
}

// グローバルプロパティをログに出す
function propertyToLog() {
  Logger.log(getProcStart());
}
// グローバルプロパティをクリアする
function propertyClear() {
  setProcEnd();
}