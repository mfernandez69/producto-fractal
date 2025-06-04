import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubidaMaterialComponent } from './subida-material.component';

describe('SubidaMaterialComponent', () => {
  let component: SubidaMaterialComponent;
  let fixture: ComponentFixture<SubidaMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubidaMaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubidaMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
