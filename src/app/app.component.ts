import { Component } from '@angular/core';
import { FileUpload } from './FileUpload';
import { UploadService } from './upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  selectedFiles: any[];
  currentFile: File;
  fileUpload: FileUpload[];
  onProgress = false;
  exibirMensagem: boolean = false;

  constructor(private uploadService: UploadService) { }

  novo() {
    this.fileUpload = [];
    this.exibirMensagem = false;
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;

    for (var file of this.selectedFiles) {
      this.fileUpload.push(new FileUpload(0, file))
    }

  }

  async upload(): Promise<void> {
    this.onProgress = true;
    this.exibirMensagem = false;
    await this.delay(1000); //LER METODO ABAIXO
    for (var file of this.fileUpload) {
      this.uploadService.upload(file.currentFile).subscribe(res => {if (res) this.selectedFiles = []});
    }
    this.onProgress = false;
    this.exibirMensagem = true;
    this.fileUpload = [];
    this.selectedFiles = [];
  }

  //ESTE DELAY FOI COLOCADO APENAS PARA EXIBIR O LOADER, SEM ELE O UPLOAD É RAPIDO DEMAIS, E NÃO DA TEMPO DE RENDERIZAR O COMPONENTE
  async delay(ms: number) {
    await new Promise<void>(resolve => setTimeout(() => resolve(), ms)).then(() => console.log("Carregando..."));
  }
}

