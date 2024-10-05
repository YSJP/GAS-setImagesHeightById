//役割：フォルダ内の全ての Google ドキュメントに setImagesHeight() を実行。
//トリガー：W：毎日０時～１時

function setImagesHeightByFileName() {
  const fileName = "PART_OF_FILENAME";
  const id = "FOLDER_ID"; //フォルダID　「Wの情報」
  const folder = DriveApp.getFolderById(id);
  const docs = folder.getFilesByType(MimeType.GOOGLE_DOCS);
  while (docs.hasNext()) {
    const doc = docs.next();
    if (doc.getName().indexOf(fileName) != -1) {
      const id = doc.getId();
      setImagsHeightById(id);
      }
  }

}
