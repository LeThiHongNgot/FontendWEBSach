import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Thư viện cpn
import { StarRatingComponent } from './component/star-rating/star-rating.component';
import { AuthorCardComponent } from './component/author-card/author-card.component';
// Thư viện page
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductComponent } from './pages/product/product.component';
import { PaymentComponent } from './pages/payment/payment.component'; 
// import { LoginComponent } from './component/login/login.component';

import { CartComponent } from './pages/cart/cart.component';
// Thư viện angular và khác
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {FormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ModalComponent} from './component/modal/modal.component';

import {HttpClientModule } from '@angular/common/http';
import { AddressComponent } from './component/address/address.component';
import { MapComponent } from './component/map/map.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import {environment} from './environments/environment';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    ProductComponent,
    StarRatingComponent,
    AuthorCardComponent,
    CategoryComponent,
    PaymentComponent,
    ModalComponent,
    // LoginComponent,
    CartComponent,
    AddressComponent,
    MapComponent,
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatRadioModule,
    MatSliderModule,
    MatMenuModule,
    MatTabsModule,
    MatCardModule,
    MatBadgeModule,
    MatSelectModule,
    MatFormFieldModule,
    MatTreeModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SlickCarouselModule,
    NgbModule,
    HttpClientModule,




  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

