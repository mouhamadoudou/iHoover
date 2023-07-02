import { Component } from '@angular/core';
import { main_algo, asp_class, check_input } from '../algo';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent {
  Dimension = '';
  Position = '';
  Instructions = '';
  result = '';

  asp: asp_class = new asp_class({ x: 0, y: 0, d: '' }, { x: 0, y: 0, d: '' });

  setData () {
    var my_array = this.Dimension.split(' ');
    this.asp.Dimension.x = parseInt(my_array[0]);
    this.asp.Dimension.y = parseInt(my_array[1]);

    my_array = this.Position.split(' ');
    this.asp.Position.x = parseInt(my_array[0]);
    this.asp.Position.y = parseInt(my_array[1]);
    this.asp.Position.d = my_array[2];
    this.asp.Instructions = this.Instructions;
  }

  start_algo () {
    this.setData();
    this.result = main_algo(this.asp);
  }

  check_input() {
    var tmp = check_input(this.Dimension, this.Position, this.Instructions);
    if (tmp === "") {
      this.start_algo();
    }
    else {
      this.result = tmp;
    }
  }

  get_result() {
    return this.result;   
  }
}
