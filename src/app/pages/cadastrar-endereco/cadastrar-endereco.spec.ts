import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEndereco } from './cadastrar-endereco';

describe('CadastrarEndereco', () => {
  let component: CadastrarEndereco;
  let fixture: ComponentFixture<CadastrarEndereco>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarEndereco],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarEndereco);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
