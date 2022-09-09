import { Component, Input } from '@angular/core';
import { GamelogicService } from 'src/app/services/gamelogic.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent {

  
  constructor(private game:GamelogicService,private toastr:ToastrService) { }


  getScore(){
    return this.game.score;
  }

  getHistory(){
    return this.game.history;
  }

  getNew(){
    this.game.getNewWord();
  }

  
  resetGame(){
    this.game.reset();
  }

  handleHistory(index:number){
    this.game.handleHistory(index);
  }

}
