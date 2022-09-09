import { Injectable } from '@angular/core';
import { WordapiService } from './wordapi.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { WordDetails } from '../word-details';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class GamelogicService {
  randomWord: string = '';
  score: number = 0;
  randomWordDetails: any = {
  };
  current_score:number = 0;
  guess_list: string[] = [];
  history:{word:string,correct:boolean,points:number}[] = [];

  temp = {} as WordDetails;

  private _word = new BehaviorSubject<WordDetails>(<WordDetails>{
    word: '',
    antonym: '',
    definition: '',
    synonym: '',
    example: '',
    jumbled: '',
    length:''
  });

  constructor(private api: WordapiService, private toastr: ToastrService) {}

  get_word(): Observable<WordDetails> {
    return this._word.asObservable();
  }

  jumbleWord = (word: string): string => {
    var a = word.split(''),
      n = a.length;

    for (let i = n - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a.join('');
  };

  async random() {
    const response = await this.api.getRandomWord();
    this.randomWord = response['word'];
    this.randomWordDetails = response;
    this.setDefinition();
  }

 

  setJumble() {
    this.score -= 2;
    this.current_score-=2;
    let jumbleword = this.jumbleWord(this.randomWord);
    this.temp['jumbled'] = jumbleword;
    this._word.next(this.temp);
  }

  setAntonym() {
    let temp=this.randomWordDetails['antonym'][0];
    if (temp) {
      this.temp['antonym'] = temp;
      this.current_score-=1;
      this.score -= 1;
    } else {
      console.log(this.score)
      this.temp['antonym'] = 'No antonyms present for this word!';
    }
    this._word.next(this.temp);
  }

  setSynonym() {
    this.current_score -= 2;
    this.score -= 2;
    this.temp['synonym'] = this.randomWordDetails['synonym'][0];

    this._word.next(this.temp);
  }

  setDefinition() {
    this.temp['definition'] = this.randomWordDetails['definition'][0].text;
    this._word.next(this.temp);
  }

  setExample() {
    this.current_score -= 2;
    this.score -= 2;
    this.temp['example'] = this.randomWordDetails['example'][0].text;
    this._word.next(this.temp);
  }

  setLength(){
    this.temp['length'] = this.randomWordDetails.word.length.toString();
    this._word.next(this.temp);
  }

  handleGuess(guess: string) {
    if (guess.trim()) this.guess_list.push(guess);
    this.checkAns(guess);
  }

  checkAns(guess: string) {
    if (guess === this.randomWord) {
      this.score += 4;
      this.current_score+=4;
      this.toastr.success('Hurrah! Correct Guess!');
      this.history.push({word:this.randomWord, correct:true,points:this.current_score})
      this.empty();
    } else {
      this.toastr.error('Oops!Wrong Guess!');
    }
  }

  reset() {
    this.history.push({word:this.randomWord, correct:false, points:this.current_score})
    this.score = 0;
    this.empty();
  }

  empty() {
    this.temp = {} as WordDetails;
    this._word.next(this.temp);
    this.guess_list = [];
    this.current_score=0;
    this.random();
  }

  getNewWord() {
    this.score -= 4;
    this.current_score-=4;
    this.history.push({word:this.randomWord, correct:false, points:this.current_score})
    this.empty();
  }
}
