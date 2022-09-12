import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { GamelogicService } from './services/gamelogic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'word-guess-game';

  guess: string;

  details: Object = {
    Definition: 'Free',
    example: '2',
    synonym: '2',
    antonym: '1',
    jumbled: '2',
    length: 'Free',
  };

  constructor(private game: GamelogicService) {}

  randomWord: string = '';

  ngOnInit() {
    this.initialize();
  }

  async initialize() {
    await this.game.random();
    this.randomWord = this.game.randomWord;
    this.game.setDefinition();
  }

  handleGuess(guess: string) {
     this.game.handleGuess(guess);
    this.guess = '';
  }

  

  get_guesses() {
    return this.game.guess_list;
  }

  newWord() {
    this.game.getNewWord();
  }
}
