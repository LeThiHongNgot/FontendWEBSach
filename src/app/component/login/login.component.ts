import { Component,  Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() closeloginEvent = new EventEmitter<void>();
  isloginVisible = false;
  closelogin(): void {
    this.closeloginEvent.emit();
}
}
