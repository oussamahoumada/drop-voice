import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/interfaces/user/user-interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {
  public user: UserInterface = {
    name: '',
    totalDrops: 0
  }

  constructor(
    private userService: UserService
  ) {
  }

  ngOnInit(): void
  {
    this.userService.getUser().subscribe({
      next: (response: any) => {
        this.user.name = response.name 
        this.user.totalDrops = response._drops.length
      },
      error: (error: any) => {
        console.error(error)
        alert('Une erreur server est survenue')
      }
    })
  }

}
