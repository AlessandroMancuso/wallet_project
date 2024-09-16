import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpesaComponent } from './spesa.component';

describe('SpesaComponent', () => {
  let component: SpesaComponent;
  let fixture: ComponentFixture<SpesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpesaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
