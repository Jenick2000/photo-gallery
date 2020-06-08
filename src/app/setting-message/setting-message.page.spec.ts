import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SettingMessagePage } from './setting-message.page';

describe('SettingMessagePage', () => {
  let component: SettingMessagePage;
  let fixture: ComponentFixture<SettingMessagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingMessagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingMessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
