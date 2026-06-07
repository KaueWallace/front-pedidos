import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEndereco } from './editar-endereco';

describe('EditarEndereco', () => {
  let component: EditarEndereco;
  let fixture: ComponentFixture<EditarEndereco>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarEndereco],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarEndereco);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
