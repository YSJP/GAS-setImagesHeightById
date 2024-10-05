//役割：ドキュメント内の全ての画像の高さを一括設定する。
//トリガー：わいじ：Webアプリとしてデプロイ
//⭕デプロイURL：


function doGet() {
  var template = HtmlService.createTemplateFromFile('index');
  return template.evaluate().setTitle('画像の高さを一括設定').setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function setImagesHeightByUrl(docUrl, newHeight) {
  try {
    // URLからドキュメントを開く
    const body = DocumentApp.openByUrl(docUrl);
    const fileName = body.getName();  // ドキュメントのファイル名を取得
    const imgs = body.getImages();

    Logger.log(`ドキュメントURL: ${docUrl}`);
    Logger.log(`${imgs.length} 枚の画像を処理中...`);
    
    for (let i = 0; i < imgs.length; i++) {
      const img = imgs[i];
      const originalHeight = img.getHeight();
      const originalWidth = img.getWidth();
      const aspectRatio = originalWidth / originalHeight;  // アスペクト比を計算

      // アスペクト比を維持しつつ高さを設定し、それに応じた幅を再設定
      img.setHeight(newHeight);
      img.setWidth(newHeight * aspectRatio);  // 新しい高さに基づいて幅を設定
    }

    return `処理が完了しました。<br>ファイル名: ${fileName}<br>合計画像枚数: ${imgs.length}枚<br>画像の高さを${newHeight}pxに設定しました（アスペクト比維持）。`;
  } catch (error) {
    Logger.log(`エラー: ${error.message}`);
    throw new Error(`無効な引数: ${error.message}`);
  }
}

// include関数
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
