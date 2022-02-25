import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../../../User";
import {UiService} from "../../services/ui.service";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  @Output() onRegistration: EventEmitter<User> = new EventEmitter();
  name!: string;
  email!: string;
  password!: string;
  creationDate!: string;

  constructor(private uiService: UiService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (!this.name || !this.email || !this.password) {
      alert('Some fields are blank');
      return;
    }

    if (this.name.length < 2){
      alert('Name cannot be less than 2 characters');
      return;
    }

    if (this.name.length > 50){
      alert('Name cannot be more than 50 characters');
      return;
    }

    if (this.email.length < 2){
      alert('Name cannot be less than 2 characters');
      return;
    }

    if (this.password.length < 8){
      alert('Password cannot be less than 2 characters')
      return;
    }

    const newUser = {
      name: this.name,
      email: this.email,
      password: this.password,
      creationDate: this.creationDate
    };

    this.onRegistration.emit(newUser);

    this.name = '';
    this.email = '';
    this.password = '';
    this.creationDate = '';

  }


}
