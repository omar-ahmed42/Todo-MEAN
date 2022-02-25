import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccessTokenStorageService} from "../../services/access-token-storage.service";
import {User} from "../../../User";

@Component({
  selector: 'app-log-user-in',
  templateUrl: './log-user-in.component.html',
  styleUrls: ['./log-user-in.component.css']
})
export class LogUserInComponent implements OnInit {
  @Output() onLogin: EventEmitter<User> = new EventEmitter();
  name!:string;
  email!: string;
  password!: string;
  isLoggedIn = false;
  role!: string;

  constructor(private accessTokenStorageService: AccessTokenStorageService) { }

  ngOnInit(): void {
    if (this.accessTokenStorageService.getAccessToken()) {
      this.isLoggedIn = true;
      this.role = this.accessTokenStorageService.getUser().roles;
    }
  }

  onSubmit() {
    if (!this.email || !this.password) {
      alert('Some fields are blank');
      return;
    }

    const authUser = {
      name:this.name,
      email : this.email,
      password : this.password
    }

    console.log("AuthUser: " + authUser.email);

    this.onLogin.emit(authUser);

    this.email = '';
    this.password = '';

  }

}
