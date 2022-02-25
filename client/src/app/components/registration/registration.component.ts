import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {User} from "../../../User";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  }

  addUser(user: User){
    this.userService.registerUser(user).subscribe( data => {
      this.router.navigate(['/login']);
      },
      err => {
        alert(err.msg);
      });
  }

}
