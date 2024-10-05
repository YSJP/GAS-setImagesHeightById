//役割：ドキュメント内の全ての画像の高さを一括設定する。
//トリガー：手動 ※ 高さとドキュメントIDを指定して使用すること。

function setImagesHeightById() {

  //高さ（pix）とドキュメントの定義
  const id = "{ID}";　//⭕指定

  const url = "{URL}";
  const newHeight = 120; //⭕指定
  
  //処理
  const body = DocumentApp.openById(id);
  //const body = DocumentApp.openByUrl(url);
  Logger.log("次のドキュメントを開きました：\n　" + body.getName());
  const imgs = body.getImages();
  Logger.log(imgs.length +"枚の画像を処理中・・・");
  for (let i = 0; i<imgs.length; i++){
    const img = imgs[i];
    const height = img.getHeight();
    const width = img.getWidth();
    const ratio = width/height;
    img.setHeight(newHeight);
    img.setWidth(newHeight*ratio);
  }
}
