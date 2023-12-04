import { Component, Output, EventEmitter, Renderer2, ElementRef, HostListener,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {Customer} from '../../../interfaces/Customer';
import { CustomerService } from 'src/services/customer/customer.service';
import 'firebase/auth';
import { OtpService } from 'src/services/Authors/otp/otp.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
    @Output() closeModalEvent = new EventEmitter<void>();
    //-------------------------------------------------------------------//
    DataRegister: any = {}; // Đối tượng để lưu trữ dữ liệu nhập từ form
    Datalogin: any = {};
    errorMessagePhone:string ='';
    errorMessageEmail:string ='';
    errorConfirmPassword:string='';
    namenull:boolean=false;
    emailnull:boolean=false;
    phonenull:boolean=false;
    passnull:boolean=false;
    passConfirmNull:boolean=false;
    eye:boolean=true;
    eyeConfirm:boolean=true;
    changeid:string='';
    loggedIn: boolean = true;
    reCaptchaVerifier!: any;
    constructor( private customer: CustomerService, private router: Router,private el: ElementRef, private renderer: Renderer2, private otpService: OtpService) {}
   isInputDisabled :boolean=true;
    isInputDisabledOpt:boolean=true;
    verificationId: string = '';

  sendOTP() {
    if(!CheckPhoneNumber(this.DataRegister.phone))
     {
      this.errorMessagePhone='Số điện thoại không chính xác!';
     }else{
      const phone = this.DataRegister.phone.substring(1);
      this.otpService.sendOTP(`+84${this.DataRegister.phone}`).then((result) => {
        this.verificationId = result.verificationId;
        this.isInputDisabledOpt=false;
        console.log(this.verificationId)
      });
     }
  }
  verifyOTP(event:any) {
    const inputValue = event.target.value;
    console.log(inputValue)
    if (inputValue.length === 6) {
      const formLogin = this.el.nativeElement.querySelector('#formlogin');
      const formRegisterElement = this.el.nativeElement.querySelector('#formregister');
      this.otpService.verifyOTP(this.verificationId,inputValue).then((user) => {
        event.target.value='';
        // this.renderer.setStyle(formLogin, 'display', 'block');
        // this.renderer.setStyle(formRegisterElement, 'display', 'none');
        this.isInputDisabled=false;
      }).catch((error) => {
        console.error('Mã Otp chưa đúng:', error);
      });
    }
  }
    closeModal(): void {
      this.closeModalEvent.emit();
    }
    dt: Customer[] = [];
    showPassword:boolean= false;
    showPasswordConfirm:boolean=false;
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
    togglePasswordConfirmVisibility()
    {
      this.showPasswordConfirm=!this.showPasswordConfirm;
    }
    eyeError()
    {
      if(this.DataRegister.password!=null||this.DataRegister.password!=""){
        this.passnull=false;
        this.eye=true;
      }
    }
    eyeConfirmError()
    {
      if(this.DataRegister.confirmPassword!=null||this.DataRegister.confirmPassword!=""){
        this.passConfirmNull=false;
        this.eyeConfirm=true;
      }
    }
  // ------------------------------------------------------------------//
    register()
    {
    this.changeid= ChangeID(this.DataRegister.phone);
    const data = {
      id: this.changeid,
      fullName: this.DataRegister.username,
      photo: '',
      activated: true,
      password: this.DataRegister.password,
      email: this.DataRegister.email,
      phone: this.DataRegister.phone,
      carts: [],
      orders: []
    };
      this.customer.signUp(data)
      .subscribe({
        next:(res=>{
          console.log(res.message);
          this.DataRegister={};
          // this.router.navigate(['modal']);
           this.loggedIn = false;
          alert(res.message)
        }),
        error:(err=>{
          alert("Vui lòng nhập đúng thông tin ")
        })
      })
    }
    
    checkDuplicateEmail(email: string): boolean {
      const filteredCustomers = this.dt.filter((dt) => dt.email !== 'abc@gmail.com');
      return filteredCustomers.some((dt) => dt.email === email);
    }
    checkDuplicate(phone: string): boolean {
      return this.dt.some((dt) => {
        return dt.phone === phone;
      });
    }
    FormLoginRegister() {
      const formRegisterElement = this.el.nativeElement.querySelector('#formregister');
      const formLogin = this.el.nativeElement.querySelector('#formlogin');
      const formRegisterDisplay = window.getComputedStyle(formRegisterElement).display;
      if (formRegisterDisplay === 'none') {
        this.renderer.setStyle(formRegisterElement, 'display', 'block');
        this.renderer.setStyle(formLogin, 'display', 'none');
      } else {
        this.renderer.setStyle(formLogin, 'display', 'block');
        this.renderer.setStyle(formRegisterElement, 'display', 'none');
      }
    }

  }
  //---------------------Tạo function--------------------------------//
  function CheckPhoneNumber(phone: string): boolean {
    const regex = /^(0|\+84)[1-9]\d{8}$/;
    return regex.test(phone);
  }
 function CheckFormatEmail(input: string): boolean {
   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(input);
  }
  function ChangeID(chuoi: string): string {
    // Sử dụng phương thức replace với biểu thức chính quy để thay thế tất cả các số
    return chuoi.replace(/\d/g, (so) => String.fromCharCode(parseInt(so) + 65));
  }


 //   if(this.DataRegister.email==null||this.DataRegister.email=="")
    // {
    //     this.emailnull=true;
    // }else
    // {
    //   this.emailnull=false;
    //   if(!CheckFormatEmail(this.DataRegister.email))
    //   {
    //    this. errorMessageEmail='Email không chính xác!';
    //   }
    // }
    //  if(this.DataRegister.username==null||this.DataRegister.username=="")
    // {
    //     this.namenull=true;
    // }else
    // {
    //   this.namenull=false;
    // }
    // if(this.DataRegister.phone==null||this.DataRegister.phone=="")
    // {
    //     this.phonenull=true;
    // }else
    // {
    //   this.phonenull=false;
    //   if(!CheckPhoneNumber(this.DataRegister.phone))
    //  {
    //   this.errorMessagePhone='Số điện thoại không chính xác!';
    //  }
    // }
    // if(this.DataRegister.password==null||this.DataRegister.password=="")
    // {
    //   this.passnull=true;
    //   this.eye=false;
    // }else
    // {
    //   this.passnull=false;
    //   this.eye=true;
    // }
    // if(this.DataRegister.confirmPassword==null||this.DataRegister.confirmPassword=="")
    // {
    //   this.passConfirmNull=true;
    //   this.eyeConfirm=false;
    // }else
    // {
    //   this.passConfirmNull=false;
    //   this.eyeConfirm=true;
    //   if(!(this.DataRegister.password==this.DataRegister.confirmPassword))
    //   {
    //    this.errorConfirmPassword='Mật khẩu không khớp!';
    //   }
    // }
