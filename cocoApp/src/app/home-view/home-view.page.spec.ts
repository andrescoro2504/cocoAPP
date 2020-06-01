import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeViewPage } from './home-view.page';

describe('HomeViewPage', () => {
  let component: HomeViewPage;
  let fixture: ComponentFixture<HomeViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeViewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
