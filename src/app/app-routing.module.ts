import {Component, NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductComponent } from './pages/product/product.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { CartComponent } from './pages/cart/cart.component';
import { ModalComponent } from './component/modal/modal.component';
import { AdminComponent } from './pages/admin/admin.component';




const routes: Routes=[
    {
    path:'cart',
    component: CartComponent
    },
    {
      path:'home',
      component: HomeComponent,

      },
    {
    path:'',
    component: HomeComponent,
    pathMatch: 'full',
    },
    {
    path:'user',
    component: UserComponent,
    },
    {
    path:'category',
    component: CategoryComponent,
    },
    {
    path:'product/:id',
    component: ProductComponent,
    },
    {
    path:'category-product',
    component: ProductComponent,
    },
    {
    path:'payment',
    component: PaymentComponent,
    },
    {
    path:'produc/:id',
    component: ProductComponent,
    },
    {
    path:'admin',
    component: AdminComponent,
    },
    { path: 'modal', component: ModalComponent},
    


]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule{

}
