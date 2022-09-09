import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http'

import {environment} from '../../environments/environment'
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class WordapiService {

  api_host = environment.api_host
  api_key = environment.api_key

  constructor(private http:HttpClient) { }

  getDefinition(word:string) {
    return axios
      .get(`${this.api_host}/word/${word}/definitions?api_key=${this.api_key}`)
      .then((response) => {
        return (response.data);
      })
      .catch((err) => this.handleError(err));
  }

  getRelatedWord(word:string) {
    return axios
      .get(`${this.api_host}/word/${word}/relatedWords?api_key=${this.api_key}`)
      .then((response) => {
        return response.data;
      })
      .catch((err) => this.handleError(err));
  }

  getExample(word:string) {
    return axios
      .get(`${this.api_host}/word/${word}/examples?api_key=${this.api_key}`)
      .then((response) => {
        return (response.data.examples);
      })
      .catch((err) => this.handleError(err));
  }

  async getAntonym(word:string) {
    const res = await this.getRelatedWord(word);
    if (res.length > 1) return res[0].words;
    else return 'No antonym found';
  }

  async getSynonym(word:string) {
    const res = await this.getRelatedWord(word);
    if (res.length > 1) return res[1].words;
    else return res[0].words;
  }

  async getRandomWord() {
    try {
      const res = await axios.get(
        `${this.api_host}/words/randomWord?api_key=${this.api_key}`
      );
      let randWordDetails:any = {};

      const randomWord = res.data.word;
      const definitions = this.getDefinition(randomWord);
      const example = this.getExample(randomWord);
      const relatedWords = this.getRelatedWord(randomWord);

      const values = await Promise.all([definitions, example, relatedWords]);

      randWordDetails['word'] = randomWord;
      randWordDetails['definition'] = values[0];
      randWordDetails['example'] = values[1];
      if (values[2].length > 1) {
        randWordDetails['antonym'] = values[2][0].words;
        randWordDetails['synonym'] = values[2][1].words;
      } else {
        randWordDetails['synonym'] = values[2][0].words;
        randWordDetails['antonym'] = [''];
      }
      return randWordDetails;
    } catch (err) {
      this.handleError(err);
    }
  }

  handleError(err:any) {
    //to handle authorization
    if (err.response.status === 401) {
      console.log(
        'Invalid API key -Go to https://fourtytwowords.herokuapp.com'
      );
    } else if (err.response.status === 404) {   // to handle unreachable condition
      console.log('Cannot reach the server, Try again later');
    } else {                  //to handle when word doesn't exists
      console.log('Something went wrong!'); 
    }
  }

  
}
