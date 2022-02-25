import { Component, OnInit } from '@angular/core';
import {User} from "../../../User";
import {UserService} from "../../services/user.service";
import {AccessTokenStorageService} from "../../services/access-token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private accessTokenStorageService: AccessTokenStorageService, private router: Router) { }

  ngOnInit(): void {

  }

  login(user: User){
    this.userService.loginUser(user).subscribe( data => {
      this.accessTokenStorageService.saveAccessToken(data.token);
      this.accessTokenStorageService.saveUser(data.user);
      this.router.navigate(['/']);
    },
    err => {
      alert('Invalid Credentials');
    });
  }

}
