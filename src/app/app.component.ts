import {
  Component,
  OnInit,
  Renderer,
  HostListener,
  Inject
} from "@angular/core";
import { Location } from "@angular/common";
import { DOCUMENT } from "@angular/common";

import { DataService } from './data.service';
import { Post } from './Posts';


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = 'Ubicacion';
  lat = -74.0817500;
  lng = 4.6097100;
  

  posts = [];
  constructor(
    private dataService: DataService,
    private renderer: Renderer,
    public location: Location,
    @Inject(DOCUMENT) document
  ) {
    this.dataService.getData().subscribe(data =>{
      this.posts=data;
    })
  }
  @HostListener("window:scroll", ["$event"])
  onWindowScroll(e) {
    if (window.pageYOffset > 100) {
      var element = document.getElementById("navbar-top");
      if (element) {
        element.classList.remove("navbar-transparent");
        element.classList.add("bg-danger");
      }
    } else {
      var element = document.getElementById("navbar-top");
      if (element) {
        element.classList.add("navbar-transparent");
        element.classList.remove("bg-danger");
      }
    }
  }
  ngOnInit() {
    this.onWindowScroll(event);
  }
}
