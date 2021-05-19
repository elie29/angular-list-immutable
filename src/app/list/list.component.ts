import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

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

  @Output() changedList = new EventEmitter<string[]>();

  isBold = false;

  changeList(): void {
    console.log(this.names);
    // names content is changed everywhere
    this.names[0] = '' + Math.random();
  }

  changeImmutableList(): void {
    const tmp = [...this.names]; // clone te array first
    tmp[0] = '' + Math.random(); // modify
    this.changedList.emit(tmp); // send to parent a new copy
  }
}
