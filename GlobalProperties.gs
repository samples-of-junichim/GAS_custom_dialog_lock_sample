/**
 * 処理開始を記録
 *
 * ドキュメントプロパティを利用して、処理開始時刻を記録する
 * 各処理呼び出し時には、isinTime 関数を用いてこの時刻をチェックして
 * 排他処理を行う
 */
function setProcStart() {
  
  var prop = PropertiesService.getDocumentProperties();
  prop.setProperty(Constants().PROPERTY_KEY_PROC_ST_DT, (new Date()).toISOString());

}

/**
 * 処理開始時刻を取得
 *
 * @return 処理開始時刻を表す文字列, ISO8601形式(UTC)
 */
function getProcStart() {
  
  var prop = PropertiesService.getDocumentProperties();
  var st_str = prop.getProperty(Constants().PROPERTY_KEY_PROC_ST_DT);
  //Logger.log('getProcStart: ' + st_str);
  return st_str;

}

/**
 * 処理開始時刻から一定時間が経過したか否か
 *
 * 処理開始時刻が未設定の場合は、一定時間が経過した判断する
 *
 * @return true: 一定時間以内（経過していない）, false: それ以上経過
 */
function isInTime() {
  
  var st_str = getProcStart();
  if (! st_str) {
    Logger.log('no procStart time:' + st_str);
    return false;
  }
  
  var stDt = new Date(st_str);
  var cur = new Date();

  // 現在時刻の一定時間以内なら true, 比較はミリ秒で行う
  Logger.log('cur   :' + cur.getTime());
  Logger.log('cur-10:' + (cur.getTime() - Constants().ELAPSED_TIME_FOR_SAME_PROC));
  Logger.log('stDt  :' + stDt.getTime());
  Logger.log('isInTime:' + ((cur.getTime() - Constants().ELAPSED_TIME_FOR_SAME_PROC) < stDt.getTime()));
  
  return (cur.getTime() - Constants().ELAPSED_TIME_FOR_SAME_PROC) < stDt.getTime();
  
}

/**
 * 処理開始時刻をクリア
 */
function setProcEnd() {
  
  var prop = PropertiesService.getDocumentProperties();
  prop.deleteProperty(Constants().PROPERTY_KEY_PROC_ST_DT);
  
}