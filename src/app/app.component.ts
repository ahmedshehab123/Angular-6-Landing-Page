import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Optional, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef, MatSnackBar, MatTableDataSource} from '@angular/material';
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  isDarkTheme = false;
  value: number;
  coinBasePrimeBTCPrice: number;
  coinBasePrimeETHPrice: number;
  coinBaseProBTCPrice: number;
  coinBaseProETHPrice: number;
  binanceBTCClosePrice: number;
  binanceBTCPriceChange: number;
  binanceETHClosePrice: number;
  binanceETHPriceChange: number;
  bittrexBTCLastPrice: number;
  bittrexETHLastPrice: number;
  polonixBtcPrice: number;
  polonixEthPrice: number;
  timeZone: string;


  @ViewChild('dateInput')
  public datePicker: ElementRef;


  public games = [
    {value: 'BITTREX', viewValue: 'BITTREX'},
    {value: 'BINANCE', viewValue: 'BINANCE'},
    {value: 'POLONIEX', viewValue: 'POLONIEX'},
    {value: 'COINBASEPRIME', viewValue: 'COINBASEPRIME'},
    {value: 'COINBASEPRO', viewValue: 'COINBASEPRO'},
    {value: 'BITFINEX', viewValue: 'BITFINEX'},
    {value: 'KRAKEN', viewValue: 'KRAKEN'}
  ];

  public coinsNames = [
    {value: 'BTCUSDT', viewValue: 'BTCUSDT'},
    {value: 'ETHUSDT', viewValue: 'ETHUSDT'}
  ];

  startDate = new Date(1990, 0, 1);

  exchange: string;
  coinName: string;
  date: string;
  showTable: boolean;
  displayedColumns = ['eventTime', 'price', 'saveTime'];


  dataSource = new MatTableDataSource([]);

  constructor(private cd: ChangeDetectorRef, private _dialog: MatDialog, private _snackbar: MatSnackBar, private appService: AppService) {
    // Update the value for the progress-bar on an interval.

    this.getPrices();
    this.timeZone = new Date().toString().match(/\((.*)\)/).pop();

    this.getScript('assets/js/index.js', function () {
    });

    this.getScript('assets/js/datetimepicker.js', function () {

    });
  }

  getScript(url, success) {

    var head = document.getElementsByTagName('head')[0], done = false;
    var script = document.createElement('script');
    script.src = url;

    // // Attach handlers for all browsers
    // script.onload = script.onreadystatechange = function(){
    //     if ( !done && (!this.readyState ||
    //             this.readyState == "loaded" || this.readyState == "complete") ) {
    //         done = true;
    //         success();
    //     }
    // };

    head.appendChild(script);
  }

  ngAfterViewInit() {
    this.datePicker.nativeElement.onchange = (args) => {
      const dateStr = args.target.value;
      this.date = dateStr;
      this.getCoin();
    };
  }

  getCoin() {
    if (this.exchange === 'COINBASEPRIME' || this.exchange === 'COINBASEPRO'  || this.exchange === 'KRAKEN') {
      this.coinsNames = [
        {value: 'BTCUSD', viewValue: 'BTCUSD'},
        {value: 'ETHUSD', viewValue: 'ETHUSD'}
      ];
    } else if (this.exchange === 'BITTREX') {
      this.coinsNames = [
        {value: 'BTCUSD', viewValue: 'BTCUSD'},
        {value: 'ETHUSD', viewValue: 'ETHUSD'},
        {value: 'BCHUSD', viewValue: 'BCHUSD'},
        {value: 'LTCUSD', viewValue: 'LTCUSD'},
        {value: 'XRPUSD', viewValue: 'XRPUSD'}
      ];
    } else if (this.exchange === 'BINANCE' || this.exchange === 'BITFINEX' || this.exchange === 'POLONIEX' ) {
      this.coinsNames = [
        {value: 'BTCUSDT', viewValue: 'BTCUSDT'},
        {value: 'ETHUSDT', viewValue: 'ETHUSDT'},
        {value: 'LTCUSDT', viewValue: 'LTCUSDT'},
        {value: 'XRPUSDT', viewValue: 'XRPUSDT'}
      ];
    } else {
      this.coinsNames = [];
    }

    this.dataSource = new MatTableDataSource();
    if (this.exchange && this.coinName && this.date) {
      this.showTable = true;
      this.appService.getCoin(this.exchange, this.coinName, this.date + ' ' + this.timeZone).subscribe(data => {
        if (data) {
          this.dataSource = new MatTableDataSource([{time: data[0], price: data[1], savedDate: data[2]}]);
          this.cd.detectChanges();
        } else {
          this.appService.getCoin2(this.exchange, this.coinName, this.date + ' ' + this.timeZone).subscribe(data => {
            if (data) {
              this.dataSource = new MatTableDataSource([{time: data[0], price: data[1], savedDate: data[2]}]);
              this.cd.detectChanges();
            } else {
              this.dataSource = null;
              this._snackbar.open('There is no record for this date please try another', 'OK', {
                verticalPosition: 'top',
                duration: 20000
              });
            }
          });
        }
      });


    }
  }

  getPrices() {
    this.appService.getPrices().subscribe(data => {
      if (data) {
        this.binanceBTCClosePrice = data.binanceBtcPrice[1];
        this.binanceBTCPriceChange = data.binanceBtcPrice[0];
        this.binanceETHClosePrice = data.binanceEthPrice[1];
        this.binanceETHPriceChange = data.binanceEthPrice[0];
        this.bittrexBTCLastPrice = data.bittrexBtcPrice;
        this.bittrexETHLastPrice = data.bittrexEthPrice;
        this.polonixBtcPrice = data.polonixBtcPrice;
        this.polonixEthPrice = data.polonixEthPrice;
        this.coinBasePrimeBTCPrice = data.coinbasePrimeBTCPrice;
        this.coinBasePrimeETHPrice = data.coinbasePrimeETHPrice;
        this.coinBaseProBTCPrice = data.coinbaseProBTCPrice;
        this.coinBaseProETHPrice = data.coinbaseProETHPrice;
        this.getPrices();
      }
    });
  }

}

@Component({
  template: `
    <h1 matDialogTitle>This is a dialog</h1>
    <div matDialogContent>
      <mat-form-field>
        <label>
          This is a text box inside of a dialog.
          <input matInput #dialogInput>
        </label>
      </mat-form-field>
    </div>

  `,
})
export class DialogContentComponent {
  constructor(@Optional() public dialogRef: MatDialogRef<DialogContentComponent>) {
  }
}
