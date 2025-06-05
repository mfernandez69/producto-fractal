import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoSimpleComponent } from './grafico-simple.component';

describe('GraficoSimpleComponent', () => {
  let component: GraficoSimpleComponent;
  let fixture: ComponentFixture<GraficoSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraficoSimpleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraficoSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
