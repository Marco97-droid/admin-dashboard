import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadingPaginaComponent } from './heading-pagina.component';

describe('HeadingPaginaComponent', () => {
  let component: HeadingPaginaComponent;
  let fixture: ComponentFixture<HeadingPaginaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadingPaginaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadingPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
