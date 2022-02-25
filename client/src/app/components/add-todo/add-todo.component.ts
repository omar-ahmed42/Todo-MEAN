import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {UiService} from '../../services/ui.service';
import {Subscription} from "rxjs";
import {Todo} from "../../../Todo";

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})

export class AddTodoComponent implements OnInit {
  @Output() onAddTodo: EventEmitter<Todo> = new EventEmitter();
  id!:string;
  title!: string;
  description!: string;
  creationDate!: string;
  done!: boolean;
  showAddTodo!: boolean;
  subscription!: Subscription;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe( (value: boolean) =>(this.showAddTodo = value));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onSubmit(){
    if (!this.title || !this.description){
      alert('Please add a task!');
      return;
    }

    if (this.title.length < 2){
      alert(`Title can't be less than 2 characters`);
      return;
    }

    if (this.title.length > 30){
      alert(`Title can't be more than 30 characters`);
      return;
    }

    if (this.description.length < 2){
      alert(`Description can't be less than 5 characters`);
      return;
    }

    if (this.description.length > 70){
      alert(`Description can't be more than 70 characters`);
      return;
    }


    const newTodo = {
      title: this.title,
      description: this.description,
      creationDate: this.creationDate,
      done:this.done
    };

    this.onAddTodo.emit(newTodo);

    this.title='';
    this.description='';
    this.creationDate='';
    this.done=false;

  }

}
