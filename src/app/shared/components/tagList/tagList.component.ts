import {CommonModule} from '@angular/common'
import {Component, Input} from '@angular/core'
import {PopularTagsType} from '../../types/popularTag.type'

@Component({
  selector: 'mc-tag-list',
  templateUrl: './tagList.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class TagListComponent {
  @Input() tags: PopularTagsType[] = []
}
