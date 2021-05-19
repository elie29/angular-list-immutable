import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  names = ['Elie', 'Jean', 'Arnaud'];

  changeList(): void {
    console.log(this.names);
    // names content is changed everywhere but not the reference
    // so with onPush strategy, we will not detect the change unless
    // an event is occurred on the component (eg. mouseover on list.component)
    this.names[1] = '' + Math.random();
  }

  changeImmutableList(): void {
    const tmp = [...this.names]; // clone te array first
    tmp[1] = '' + Math.random(); // modify
    this.names = tmp; // change
    console.log(this.names);
  }
}
