import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { bookhome } from 'src/interfaces/bookhome';
import { bookimg } from 'src/interfaces/bookimg';
import { Author } from 'src/interfaces/Author';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  pro: any = {}
  constructor(private http: HttpClient) {}
  dt: bookhome[] = [];
  img: bookimg[]=[];
  author:Author |null=null;
  isModalVisible = false;
  loadpro(name: string): string {
    const pro= this.dt.find((dt) => dt.title === name);
    return pro ? pro.id : '';
  }
}
