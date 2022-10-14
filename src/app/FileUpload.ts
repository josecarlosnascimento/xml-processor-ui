export class FileUpload{
    progress: number = 0;
    currentFile: File;
    constructor(progress: number, currentFile: File) {
        this.progress = progress;
        this.currentFile = currentFile
      }
}