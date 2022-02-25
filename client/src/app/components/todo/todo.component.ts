import { Component, OnInit } from '@angular/core';
import {TodoService} from "../../services/todo.service";
import {Todo} from "../../../Todo";
import {AccessTokenStorageService} from "../../services/access-token-storage.service";
import {Router} from "@angular/router";
import {Subject, Subscription} from "rxjs";

function sortAsc(a: Todo, b: Todo) {
  if ( a.creationDate < b.creationDate ){
    return -1;
  }
  if ( a.creationDate > b.creationDate ){
    return 1;
  }
  return 0;
}
function sortDESC(a: Todo, b: Todo) {
  if ( a.creationDate > b.creationDate ){
    return -1;
  }
  if ( a.creationDate < b.creationDate ){
    return 1;
  }
  return 0;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todoes: Todo[] = [];
  sortType: boolean = false;
  subscription!: Subscription;
  private subject= new Subject<any>();


  constructor(private todoService: TodoService, private accessTokenStorageService: AccessTokenStorageService, private router: Router) { }

  ngOnInit(): void {
    // console.log("ACCESS TOKEN TODO: " + this.accessTokenStorageService.getAccessToken());
    if (!this.accessTokenStorageService.getAccessToken()){
      this.router.navigate(['/login']);
    }
    this.todoService.getTodoList().subscribe((todoes) => (this.todoes = todoes.allTodoListItems, console.log(todoes),
      this.sortType ? this.todoes.sort(sortDESC) : this.todoes.sort(sortAsc)
    ));
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }

  deleteTodo(todo: Todo){
    console.log("todo id: " + todo.title);
    this.todoService
      .deleteTodo(todo)
      .subscribe(
        () => (this.todoes = this.todoes.filter((t) => t._id !== todo._id ))
      );
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  toggleDone(todo: Todo){
    todo.done = !todo.done;
    this.todoService.modifyTodo(todo).subscribe();
  }

  addTodo(todo: Todo){
    this.todoService.addTodo(todo).subscribe((todo) => {this.todoes.push(todo.todoItem), this.ngOnChanges()});
  }

  toggleSortTodo(){
    this.sortType = !this.sortType;
    this.ngOnChanges();
    this.subject.next(this.sortType);
  }

  hasRoute(route: string){
    return this.router.url === route;
  }

}
