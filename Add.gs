/**
 * 追加処理
 */
function procAdd() {

  var ui = SpreadsheetApp.getUi();
  
  if (isInTime()) {
    ui.alert('処理中です。しばらく待ってから再度試してください。');
    return;
  }
  var lock = LockService.getDocumentLock();
  if (lock.tryLock(1000)) {
    // ロック取得成功
    setProcStart();
    lock.releaseLock();
  } else {
    // ロック取得失敗
    ui.alert('ロック取得に失敗しました。しばらく待ってから再度試してください。');
    return;
  }
  
  // ダイアログ表示
  var dialogHtml = HtmlService.createTemplateFromFile('SampleCustomDialog');
  
  ui.showModalDialog(dialogHtml.evaluate(), '追加したいテキストを入力');
}

/**
 * ダイアログでOKボタンが押された場合の処理
 *
 * @param inputText  入力されたテキスト
 */
function onOkButtonClick(inputText) {
  Logger.log('onOkButtonClick, OKボタンがおされました: ' + inputText);

  var ui = SpreadsheetApp.getUi();
  
  if (! isInTime()) {
    ui.alert('処理を開始してから、一定時間以上たったので処理を中止します。再度処理を行ってください。');
    setProcEnd();
    return;
  }

  // 追記先の取得
  var sheet = SpreadsheetApp.getActiveSheet();
  var maxRow = sheet.getDataRange().getLastRow();
  var target = sheet.getRange(maxRow+1, 1); // 常にＡ列に追加, 1行目が空白の場合は2行目になる

  // 追記処理
  target.setValue(inputText);
  
  Logger.log('追記先:' + target.getA1Notation());
  
  setProcEnd();
  
  // ダイアログ表示
  ui.alert('以下を追記しました。\n' +
           inputText);
  return;
}

function onCancelButtonClick() {
  Logger.log('onCancelButtonClick');
  setProcEnd();
}
