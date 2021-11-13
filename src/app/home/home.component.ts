import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ResultDialogComponent } from '../result-dialog/result-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  panelOpenState = false;
  showChip = false;
  chances = 10;
  totalScore = 0;
  p1 = false;
  image1 = true;
  p2 = false;
  image2 = true;
  p3 = false;
  image3 = true;
  p4 = false;
  image4 = true;

  constructor(public dialog: MatDialog) {}

  onClick(num: any) {
    this.chances = this.chances - 1;
    let gen = this.generateRandomNumber();
    if (gen == num) {
      this.totalScore += 1;
    }
    switch (gen) {
      case 1: {
        this.p1 = true;
        this.image1 = false;

        setTimeout(() => {
          this.p1 = false;
          this.image1 = true;
        }, 500);
        break;
      }
      case 2: {
        this.p2 = true;
        this.image2 = false;
        setTimeout(() => {
          this.p2 = false;
          this.image2 = true;
        }, 500);
        break;
      }
      case 3: {
        this.p3 = true;
        this.image3 = false;
        setTimeout(() => {
          this.p3 = false;
          this.image3 = true;
        }, 500);
        break;
      }
      case 4: {
        this.p4 = true;
        this.image4 = false;
        setTimeout(() => {
          this.p4 = false;
          this.image4 = true;
        }, 500);
        break;
      }
    }

    if (this.chances == 0) {
      let isWon = this.totalScore >= 6;
      let header: string;
      let content: string;
      if (isWon) {
        header = 'You won!!!';
        content =
          'Congratulations, You won. Your total scrore is ' + this.totalScore;
      } else {
        header = 'You lose!!!';
        content = 'Sorry, You lost. Your total scrore is ' + this.totalScore;
      }
      this.openDialog(header, content);
    }
  }

  generateRandomNumber() {
    return Math.floor(Math.random() * (5 - 1) + 1);
  }

  resetGame() {
    this.showChip = false;
    this.chances = 10;
    this.totalScore = 0;
    this.p1 = false;
    this.image1 = true;
    this.p2 = false;
    this.image2 = true;
    this.p3 = false;
    this.image3 = true;
    this.p4 = false;
    this.image4 = true;
  }

  openDialog(header: string, content: string): void {
    const dialogRef = this.dialog.open(ResultDialogComponent, {
      // height: '400px',
      // width: '250px',
      data: {
        score: this.totalScore,
        header,
        content,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.resetGame();
    });
  }
}
