import { Component, Output, EventEmitter, Renderer2, ElementRef, HostListener,NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {Customer} from '../../../interfaces/Customer';
import { CustomerService } from 'src/services/customer/customer.service';
import 'firebase/auth';
import { OtpService } from 'src/services/Authors/otp/otp.service';
import { CustomermainService } from 'src/services/customermain/customermain.service';
import { SharedataService } from 'src/services/sharedata/sharedata.service';

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
    errorPassword:string='';
    passConfirmNull:boolean=false;
    eye:boolean=true;
    eyeConfirm:boolean=true;
    changeid:string='';
    reCaptchaVerifier!: any;
    constructor( private customermain:CustomermainService,
      private customer: CustomerService, private router: Router,private el: ElementRef,
       private renderer: Renderer2, private otpService: OtpService,
       private sharedata:SharedataService) {}
    isInputDisabled :boolean=false;
    isInputDisabledOpt:boolean=true;
    verificationId: string = '';

  sendOTP() {
   const changephoneid=ChangeID(this.DataRegister.phone);
   if(!CheckPhoneNumber(this.DataRegister.phone))
   {
    this.errorMessagePhone = 'Số điện thoại không chính xác!';
    }else
    {

     this.customermain.CustomerId(changephoneid).subscribe(
       {
         next: (res) => {
        const phone = this.DataRegister.phone.substring(1);
        this.otpService.sendOTP(`+84${phone}`).then((result) => {
         this.errorMessagePhone="Kiễm tra tin nhắn để nhận mã otp"
         this.renderer.setStyle(this.errorMessagePhone, 'color', 'green');
          this.verificationId = result.verificationId;
          this.isInputDisabledOpt=false;
          console.log(this.verificationId)
        });
         },
         error: (err) => {
           this.errorMessagePhone='Số điện thoại này đã được đăng ký';

         }
       }
     );
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
        this.errorPassword=kiemTraMucDoManhMatKhau(this.DataRegister.password)

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
    const datasignup = {
      id: this.changeid,
      fullName: this.DataRegister.username,
      photo: '',
      activated: true,
      password: this.DataRegister.password,
      email: 'd@gmail.com',
      phone: this.DataRegister.phone,
      carts: [],
      orders: []
    };
    console.log(datasignup)
    if(!(this.DataRegister.password==this.DataRegister.confirmPassword))
     {
       this.errorConfirmPassword='Mật khẩu không khớp!';
     }else
     {
      this.customer.signUp(datasignup)
      .subscribe({
        next:(res=>{
          console.log(res.message);
          this.DataRegister={};
          this.router.navigate(['user']);
        }),
        error:(err=>{
          alert("Vui lòng nhập đúng thông tin ")
        })
      })
     }

    }
    login()
    {
      const datasignin=
      {
      id: "",
      fullName: "",
      photo:"",
      activated: true,
      password:this.Datalogin.passLogin,
      email:"",
      phone:this.Datalogin.phoneLogin,
      carts: [],
      };
      console.log(this.Datalogin)
      this.customer.signIn(datasignin).subscribe(
        {
            next:(res=>{
              console.log(res.message);
              this.sharedata.changeItemId(ChangeID(this.Datalogin.phoneLogin));
              this.Datalogin={};
              this.router.navigate(['home']);

            }),
            error:(err=>{
              alert(" Đăng nhập không thành công ")
            })
          }
      )
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
    // Kiểm tra xem chuoi có phải là một chuỗi hợp lệ không
    if (typeof chuoi === 'string') {
      // Sử dụng phương thức replace với biểu thức chính quy để thay thế tất cả các số
      return chuoi.replace(/\d/g, (so) => String.fromCharCode(parseInt(so) + 65));
    } else {
      // Xử lý trường hợp chuoi không phải là chuỗi
      console.error('Đầu vào không phải là một chuỗi hợp lệ.');
      return ''; // hoặc giá trị mặc định khác tùy thuộc vào yêu cầu của bạn
    }
  }

  function kiemTraMucDoManhMatKhau(matKhau: string): string {
    // Kiểm tra chiều dài
    if (matKhau.length < 8) {
      return 'Yếu';
    } else if (matKhau.length < 12) {
      return 'Trung bình';
    }
    // Kiểm tra ký tự đặc biệt
    const kyTuDacBiet = /[!@#$%^&*(),.?":{}|<>]/;
    if (!kyTuDacBiet.test(matKhau)) {
      return 'Trung bình';
    }

    // Kiểm tra chữ cái (chữ hoa và chữ thường)
    const coChuHoa = /[A-Z]/;
    const coChuThuong = /[a-z]/;
    if (!coChuHoa.test(matKhau) || !coChuThuong.test(matKhau)) {
      return 'Trung bình';
    }

    // Kiểm tra số
    const coSo = /\d/;
    if (!coSo.test(matKhau)) {
      return 'Trung bình';
    }

    // Nếu vượt qua tất cả các kiểm tra, mật khẩu được coi là mạnh
    return 'Mạnh';
  }


  // Sử dụng hàm kiểm tra
   // In ra true nếu mật khẩu hợp lệ, ngược lại in ra false

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
