import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  currentPage: string = 'hoSo';

  showPage(pageName: string) {
    this.currentPage = pageName;
  }

  selectedMenuItem: string = 'hoSo';

  selectMenuItem(itemName: string) {
    this.selectedMenuItem = itemName;
  }

  userImageSrc: string = '/assets/exaut.png';

  constructor() {
    const savedImageSrc = localStorage.getItem('userImageSrc');
    if (savedImageSrc) {
      this.userImageSrc = savedImageSrc;
    }
  }

  selectImage(): void {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  onImageSelected(event: any): void {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      console.log('Đã chọn tệp:', selectedFile);

      this.userImageSrc = URL.createObjectURL(selectedFile);

      localStorage.setItem('userImageSrc', this.userImageSrc);
    }
  }
}
