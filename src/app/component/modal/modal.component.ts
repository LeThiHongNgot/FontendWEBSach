import { Component, Output, EventEmitter, Renderer2, ElementRef, HostListener } from '@angular/core';
import emailjs from '@emailjs/browser';
import { Router } from '@angular/router';
import {Customer} from './Customer';
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
      //--------Chuyển đổi ký tự------//

    ngOnInit() {  // Tạo yêu cầu GET đến URL của máy chủ để lấy dữ liệu

    }
    //--------------------------Xác nhận email-----------------------//
    // async send()
    // {
    //   emailjs.init('2UYX4H7eptXrQoreQ');
    //  let response=await emailjs.send("service_b01dw98","template_h6kn0rj",{
    //   from_name:this.DataRegister.username,
    //   to_name: "KANN BOOK STORE",
    //   code: "1242",
    //   });
    // }
    //------------Sự kiện----------//
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
      if(this.DataRegister.email==null||this.DataRegister.email=="")
    {
      console.log(this.DataRegister.email)
        this.emailnull=true;
    }else
    {
      this.emailnull=false;
      if(!CheckFormatEmail(this.DataRegister.email))
      {
       this. errorMessageEmail='Email không chính xác!';
      }
    }
     if(this.DataRegister.username==null||this.DataRegister.username=="")
    {
        this.namenull=true;
    }else
    {
      this.namenull=false;
    }
    if(this.DataRegister.phone==null||this.DataRegister.phone=="")
    {
        this.phonenull=true;
    }else
    {
      this.phonenull=false;
      if(!CheckPhoneNumber(this.DataRegister.phone))
     {
      this.errorMessagePhone='Số điện thoại không chính xác!';
     }

    }
    if(this.DataRegister.password==null||this.DataRegister.password=="")
    {
      this.passnull=true;
      this.eye=false;
    }else
    {
      this.passnull=false;
      this.eye=true;
    }
    if(this.DataRegister.confirmPassword==null||this.DataRegister.confirmPassword=="")
    {
      this.passConfirmNull=true;
      this.eyeConfirm=false;
    }else
    {
      this.passConfirmNull=false;
      this.eyeConfirm=true;
      if(!(this.DataRegister.password==this.DataRegister.confirmPassword))
      {
       this.errorConfirmPassword='Mật khẩu không khớp!';
      }
    }
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

    // //check email có tồn tại chưa
    // checkDuplicateEmail(email: string): boolean {
    //   const filteredCustomers = this.dt.filter((dt) => dt.email !== 'abc@gmail.com');
    //   return filteredCustomers.some((dt) => dt.email === email);
    // }
    // checkDuplicate(phone: string): boolean {
    //   return this.dt.some((dt) => {
    //     return dt.phone === phone;
    //   });
    // }

    // isChecking: boolean = false;
    // check() {
    //   let isSuccess = false;
    //   let p = ''; // Sử dụng let thay vì const
    //   let t = ''; // Sử dụng let thay vì const

    //   for (const dt of this.dt) {
    //     const cleanPhone = dt.phone.trim();
    //     const cleanPassword = dt.password.trim();

    //     if (cleanPhone === this.cus.sdt && cleanPassword === this.cus.pass) {
    //       isSuccess = true;
    //       p = cleanPhone; // Gán giá trị mới cho p
    //       t = cleanPassword; // Gán giá trị mới cho t
    //       break;
    //     }

    //     if (isSuccess) {
    //       break;
    //     }
    //   }

    //   console.log(p);
    //   console.log(t);

    //   if (isSuccess) {
    //     alert('Đăng nhập thành công');
    //   } else {
    //     alert('Đăng nhập không thành công');
    //   }
    // }

    // register() {
    //   // Kiểm tra xác nhận mật khẩu
    //   //!isEmail(this.user.email)&&
    //   if(!isPhoneNumber(this.user.email))
    //   {
    //     this.errorMessageEM='Số điện thoại không đúng.'
    //   }
    //   if (this.user.password !== this.user.confirmPassword) {
    //     console.log('Mật khẩu không khớp.');
    //     this.errorMessageMK = 'Mật khẩu không khớp.'
    //     return;
    //   }
    //   let p = '';
    //   let m = '';
      // const checkm = this.checkDuplicateEmail(this.user.email);
      // const checkp=this.checkDuplicate(this.user.email);
      // if (checkp) {
      //   console.log('Số điện đã tồn tại.');
      // } else {
      //   console.log('Email hợp lệ.');
      //    if (isPhoneNumber(this.user.email)) {
      //     p = this.user.email;
      //     m='abc@gmail.com'
      //   }
      // }

      // Tạo đối tượng dữ liệu cần gửi
      // const data = {
      //   id: p, // Sử dụng local part của địa chỉ email hoặc số điện thoại
      //   fullName: this.user.username,
      //   photo: '',
      //   activated: '',
      //   password: this.user.password,
      //   email: m,
      //   phone: p,
      //   carts: [],
      //   orders: []
      // };

    //   console.log(data);
    //   // Gửi dữ liệu đăng ký lên API
    //   this.http.post('https://localhost:7009/api/Customers', data).subscribe(
    //     (response) => {
    //       console.log('Đăng ký thành công', response);
    //       // Xóa dữ liệu sau khi đăng ký
    //       this.user = {};
    //       // this.router.navigate(['modal']);
    //       this.loggedIn = false;

    //     },
    //     (error) => {
    //       alert('Đăng ký không thành công vui lòng kiễm tra lại thông tin đăng nhập');
    //     }
    //   );
    // }

//}


     // if (isEmail(this.user.email)) {
      //   const parts = this.user.email.split('@'); // Tách địa chỉ email thành phần local part và domain
      //   if (parts.length === 2) {
      //     p = parts[0]; // Lấy phần local part
      //     m = this.user.email;
      //   }
      // } else


