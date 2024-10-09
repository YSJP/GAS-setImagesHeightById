/*
 *🔧役割：ドキュメント内の全ての画像の高さを一括設定する。
 *💡トリガー：わいじ：Webアプリとしてデプロイ
 *🔗デプロイURL：https://ysjp.github.io/GAS-setImagesHeightById/
*/

function doGet() {
  var template = HtmlService.createTemplateFromFile('main');
  return template.evaluate().setTitle('画像の高さを一括設定').setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function setImagesHeightByUrl(docUrl, newHeight) {
  try {
    // URLからドキュメントIDを取得
    Logger.log(`ドキュメントURL: ${docUrl}`);
    
    const docId = extractDocIdFromUrl(docUrl);
    Logger.log(`抽出されたドキュメントID: ${docId}`);
    
    const doc = DocumentApp.openById(docId);  // ドキュメントIDを使用してドキュメントを開く
    Logger.log(`ドキュメントが正常に開かれました: ${doc.getName()}`);
    
    const body = doc.getBody();  // ドキュメント本文を取得
    const imgs = body.getImages();
    Logger.log(`${imgs.length} 枚の画像を検出しました`);
    
    // 画像が存在しない場合の対応
    if (imgs.length === 0) {
      Logger.log("ドキュメント内に画像がありません。");
      return "ドキュメント内に画像がありません。";
    }
    
    for (let i = 0; i < imgs.length; i++) {
      const img = imgs[i];
      const originalHeight = img.getHeight();
      const originalWidth = img.getWidth();
      const aspectRatio = originalWidth / originalHeight;  // アスペクト比を計算

      Logger.log(`画像${i+1}: 元の高さ ${originalHeight}px, 元の幅 ${originalWidth}px`);
      
      // アスペクト比を維持しつつ高さを設定し、それに応じた幅を再設定
      img.setHeight(newHeight);
      img.setWidth(newHeight * aspectRatio);  // 新しい高さに基づいて幅を設定

      Logger.log(`画像${i+1}: 新しい高さ ${newHeight}px, 新しい幅 ${newHeight * aspectRatio}px`);
    }

    const fileName = doc.getName();  // ドキュメントのファイル名を取得
    return `処理が完了しました。<br>ファイル名: ${fileName}<br>合計画像枚数: ${imgs.length}枚<br>画像の高さを${newHeight}pxに設定しました（アスペクト比維持）。`;

  } catch (error) {
    Logger.log(`エラーの詳細: ${error.message}`);
    
    // スコープ関連エラーの可能性を追加メッセージで通知
    if (error.message.includes('Permissions') || error.message.includes('scope')) {
      Logger.log('スコープまたは権限の問題が発生した可能性があります。');
      throw new Error(`スコープまたは権限の問題が発生しました。エラー: ${error.message}`);
    } else {
      throw new Error(`無効な引数または操作: ${error.message}`);
    }
  }
}


// URLからドキュメントIDを抽出
function extractDocIdFromUrl(url) {
  const idMatch = url.match(/[-\w]{25,}/);
  if (idMatch && idMatch.length > 0) {
    return idMatch[0];
  } else {
    throw new Error('有効なドキュメントIDがURLから取得できませんでした。');
  }
}

// include関数
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
