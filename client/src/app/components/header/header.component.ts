import { Component, OnInit } from '@angular/core';
import { UiService } from '../../services/ui.service';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title: string = 'Todo';
  showAddTodo: boolean = false;
  subscription!: Subscription;


  constructor(private uiService: UiService, private router: Router) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe((value: boolean) => (this.showAddTodo = value));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  toggleAddTodo(){
    this.uiService.toggleAddTodo();
  }

  hasRoute(route: string){
    return this.router.url === route;
  }

}
