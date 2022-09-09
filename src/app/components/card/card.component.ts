import { Component, Input, OnInit } from '@angular/core';
import { GamelogicService } from 'src/app/services/gamelogic.service';
import { WordDetails } from 'src/app/word-details';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() title: string;
  @Input() point: string;
  @Input() index: string;
  @Input() words: WordDetails;

  constructor(private game: GamelogicService) {
    game.get_word().subscribe((response) => {
      this.words = response;
    });
  }

  ngOnInit(): void {}

  getword(title:string){
    title=title.toLowerCase();
    console.log((this.words as any)[title])
    return (this.words as any)[title]
  }

  setDefinition() {
    this.game.setDefinition();
  }

  setAntonym() {
    this.game.setAntonym();
  }

  setSynonym() {
    this.game.setSynonym();
  }

  setExample() {
    this.game.setExample();
  }

  setJumble() {
    this.game.setJumble();
  }

  setLength(){
    this.game.setLength();
  }
}
