import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container">
    <h1>Recipe Box - Current as of: {{month}}/{{day}}/{{year}}</h1>
    <h3>{{currentFocus}}</h3>
    <li [class]="completeColor(currentRecipe)" (click)="haveItems(currentRecipe)" *ngFor='let currentRecipe of recipe'(click)="showContent(currentRecipe)">{{currentRecipe.title}} <button (click)="editRecipe(currentRecipe)">Edit!</button>
      <div *ngIf="currentRecipe.content">
        <h4>Ingredients</h4>
            <li *ngFor='let ingredients of currentRecipe.ingredients'>{{ingredients}}</li>
      </div>
      <div *ngIf="currentRecipe.content">
        <h4>Directions</h4>
            <li *ngFor='let direction of currentRecipe.directions'>{{direction}}</li>
      </div>
    </li>
    <div>
      <div *ngIf="selectedRecipe">
        <h3>{{selectedRecipe.title}}</h3>
        <p>All items available? {{selectedRecipe.done}}</p>
        <hr>
        <h3>Edit Recipe</h3>
        <label>Enter Recipe Title:</label>
        <input [(ngModel)]="selectedRecipe.title">
        <label>Do you have the ingredients? (yes/no):</label><br>
        <input type="radio" [(ngModel)]="selectedRecipe.complete" [value]="1">Yes (Have Ingredients)<br>
        <input type="radio" [(ngModel)]="selectedRecipe.complete" [value]="2">No (Need Ingredients)<br>
        <button (click)="finishedEditing()">Done</button>
      </div>
    </div>
  </div>
  `
})


export class AppComponent {
  currentFocus: string = 'Recipes';
  currentTime = new Date();
  month: number = this.currentTime.getMonth() + 1;
  day: number = this.currentTime.getDate();
  year: number = this.currentTime.getFullYear();
  recipe: Recipe[] = [
    new Recipe("Rich's Pesto Sauce",2, ["sauce ingredient"], ["sauce directions"]),
    new Recipe("Rich's Ribs",2, ["rib ingredient"], [" rib directions"]),
    new Recipe("Rich's Amish White Bread",2, ["bread ingredient"], ["bread directions"])
  ];
  selectedRecipe = null;

  editRecipe(clickedRecipe) {
    this.selectedRecipe = clickedRecipe;
  }

  haveItems(clickedRecipe: Recipe) {
    if(clickedRecipe.done === true) {
      alert("This recipe is ready to make!");
    } else {
      alert("This recipe is not ready. Better get to shopping!");
    }
  }

  completeColor(currentRecipe){
    if (currentRecipe.complete === 2){
      return "bg-danger";
    } else if (currentRecipe.complete === 1) {
      this.selectedRecipe.done = true;
      return  "bg-success";
    } else {
      return "bg-info";
    }
  }

  finishedEditing() {
    this.selectedRecipe = null;
  }

  showContent(clickedRecipe: Recipe){
    console.log("content clicked");
    clickedRecipe.content = !clickedRecipe.content;
    }

}

export class Recipe {
  public content: boolean = false;
  public done: boolean = false;
  constructor(public title: string, public complete: number, public ingredients: String[], public directions: String[]) {}
}
