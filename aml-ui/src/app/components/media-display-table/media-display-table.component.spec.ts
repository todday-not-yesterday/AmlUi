import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaDisplayTableComponent } from './media-display-table.component';

describe('MediaDisplayTableComponent', () => {
  let component: MediaDisplayTableComponent;
  let fixture: ComponentFixture<MediaDisplayTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaDisplayTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaDisplayTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
