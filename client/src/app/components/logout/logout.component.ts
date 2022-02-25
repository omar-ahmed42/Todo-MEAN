import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {AccessTokenStorageService} from "../../services/access-token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private userService: UserService, private accessTokenStorageService: AccessTokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.userService.logoutUser().subscribe(
      data => {
        this.accessTokenStorageService.logout();
        this.router.navigate(['/login']);
      },
      err => {
        alert(err.msg)
      }
    )
  }

}
