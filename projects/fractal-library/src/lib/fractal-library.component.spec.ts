import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FractalLibraryComponent } from './fractal-library.component';

describe('FractalLibraryComponent', () => {
  let component: FractalLibraryComponent;
  let fixture: ComponentFixture<FractalLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FractalLibraryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FractalLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
