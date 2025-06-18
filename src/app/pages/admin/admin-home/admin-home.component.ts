import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav';
import {NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {UserService} from '../login/user.service';
import {BreakpointObserver} from '@angular/cdk/layout';
import {Auth, signOut} from '@angular/fire/auth';
import {filter} from 'rxjs';
import {showDialogError} from '../../../common/dialog/showDialogError';
import {MatNavList} from '@angular/material/list';
import {Button} from 'primeng/button';
import {MatToolbar} from '@angular/material/toolbar';
import {NgClass} from '@angular/common';
import {ConsultationListComponent} from '../consultation-list/consultation-list.component';
import {LoginComponent} from '../login/login.component';
import {User} from '../login/user.model';
import {ScheduleListComponent} from '../schedule-list/schedule-list.component';

@Component({
  selector: 'app-admin-home',
  imports: [
    MatSidenavContainer,
    MatNavList,
    MatSidenav,
    RouterLink,
    Button,
    MatToolbar,
    RouterOutlet,
    NgClass,
    RouterLinkActive
  ],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {
  static readonly ROUTER = 'admin-home';
  static readonly NAVIGATE = '/admin-home';


  title = '';
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  btnIsVisible = true;
  isMobile= true;

  userDetail: User = {} as User

  constructor(
    private router: Router,
    private userService: UserService,
    private auth: Auth,
    private observer: BreakpointObserver,

  ) {
  }

  ngOnInit(): void {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches){
        this.isMobile = true;
        this.btnIsVisible = false;
      } else {
        this.isMobile = false;
        this.btnIsVisible = true;
      }
    });
    this.getUserDetail()

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateTitle(this.router.url);
    });
    this.updateTitle(this.router.url);

  }

  toggleMenu() {
    if(this.isMobile){
      this.sidenav.toggle().then( );
    } else {
      // do nothing for now
    }
  }

  // GET USER DETAIL AND ROLE FUNCTIONS
  getUserDetail(): void{
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.userDetail = user as User;
      },
      error: (err) => {
        showDialogError(err)
      },
    });
  }

  updateTitle(url: string) {
    const titleMap: Record<string, string> = {
      '/consultation-list': ConsultationListComponent.TITLE,
      '/schedule-list': ScheduleListComponent.TITLE,
    };

    this.title = 'Dashboard';

    for (const key in titleMap) {
      if (url.includes(key)) {
        this.title = titleMap[key];
        break;
      }
    }
  }

  logout(): void {
    signOut(this.auth)
      .then(() => {
        // Navigasi ke halaman login
        this.router.navigate([LoginComponent.ROUTER]).then();
      })
      .catch(error => {
        console.error('Gagal logout:', error);
      });
  }

  protected readonly ConsultationListComponent = ConsultationListComponent;
  protected readonly ScheduleListComponent = ScheduleListComponent;
}
