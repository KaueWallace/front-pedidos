import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelecionarEnderecoDialog } from './selecionar-endereco-dialog';

describe('SelecionarEnderecoDialog', () => {
  let component: SelecionarEnderecoDialog;
  let fixture: ComponentFixture<SelecionarEnderecoDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelecionarEnderecoDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(SelecionarEnderecoDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
