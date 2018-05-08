/**
 * ファイルオープン時に独自メニューを追加する
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("独自メニュー")
    .addItem("追加", "procAdd")
    .addToUi();
}
