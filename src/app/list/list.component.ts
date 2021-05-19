import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  // with changeDetection: component is rendered when name or names reference change
  // or an event caught by this component occurs: eg. mouseover / click
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  @Input() name: string;
  @Input() names: string[] = [];

  isBold = false;

  changeList(): void {
    console.log(this.names);
    // names content is changed everywhere
    this.names[0] = '' + Math.random();
  }

  changeImmutableInnerList(): void {
    const tmp = [...this.names]; // clone the array first
    tmp[0] = '' + Math.random(); // modify
    this.names = tmp; // Once changed, names won't affect the list outside this component
    console.log(this.names);
  }
}
