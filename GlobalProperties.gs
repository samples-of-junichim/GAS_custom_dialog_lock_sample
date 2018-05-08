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

  // セットされるまで待つ
  //   プロパティへの値の設定・取得時に遅延があるように思われるので、
  //   トリッキーだが、一定時間待つようにする
  for (var i = 0; i < 100; i++) { // 最大 10 sec
    if (getProcStart()) {
      Logger.log('wait time: ' + i);
      Logger.log('st time: ' + getProcStart());
      break;
    }
    Utilities.sleep(100); // 一回当たり 100 msec まつ
  }
  
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
  
  // 取得できるまで待つ
  //   プロパティへの値の設定・取得時に遅延があるように思われるので、
  //   トリッキーだが、一定時間待つようにする
  var st_str;
  for (var i = 0; i < 100; i++) { // 最大 10sec まつ
    st_str = getProcStart();
    if (st_str) {
      Logger.log('isInTime, wait: ' + i);
      break;
    }
    Utilities.sleep(100); // 一回当たり 100 msec まつ
  }
  
  if (! st_str) {
    Logger.log('no procStart time:' + st_str);
    return false;
  }
  
  return doesSomeTimeElapsed(st_str);  
}

/**
 * 処理開始時刻をクリア
 */
function setProcEnd() {
  
  var prop = PropertiesService.getDocumentProperties();
  prop.deleteProperty(Constants().PROPERTY_KEY_PROC_ST_DT);
  
}