import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FinancialYearService, FinancialYear } from '../service/data/financial-year.service';
import { GlobalVariablesService } from '../global-variables.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  username = ''
  currentFinancialYear: FinancialYear

  constructor(private route : ActivatedRoute,
              private globalVariables: GlobalVariablesService) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.params['name']
    this.currentFinancialYear = this.globalVariables.currentYear
  }

}
