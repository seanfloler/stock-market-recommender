import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { StockService } from './services/stock.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('range', { read: ElementRef }) range!: ElementRef;
  @ViewChild('input', { read: ElementRef }) input!: ElementRef;

  public recommendation: 'BUY' | 'HOLD' | 'SELL' | '' = '';
  public prices?: {
    ten: {
      val: number;
      mediaCount: number;
    };
    month: {
      val: number;
      mediaCount: number;
    };
    year: {
      val: number;
      mediaCount: number;
    };
    lastYear: {
      val: number;
      mediaCount: number;
    };
  };
  public price: string = '-1';
  public mediaCount: string = '-1';
  public showResults = false;

  constructor(private stockService: StockService) {}

  go() {
    const ticker = this.input.nativeElement.value;
    this.prices = {
      ten: {
        val: this.stockService.getTenDayAveragePrice(ticker),
        mediaCount: this.stockService.getTenDayAverageMediaCount(ticker),
      },
      month: {
        val: this.stockService.getMonthlyAveragePrice(ticker),
        mediaCount: this.stockService.getMonthlyAverageMediaCount(ticker),
      },
      year: {
        val: this.stockService.getYearlyAveragePrice(ticker),
        mediaCount: this.stockService.getYearlyAverageMediaCount(ticker),
      },
      lastYear: {
        val: this.stockService.getLastYearAveragePrice(ticker),
        mediaCount: this.stockService.getLastYearAverageMediaCount(ticker),
      },
    };
    this.recommendation = this.generateRecommendation();
  }

  generateRecommendation(): 'BUY' | 'HOLD' | 'SELL' {
    this.showResults = true;
    switch (this.range.nativeElement.value) {
      case 'ten':
        this.price = `10 day average price: ${this.prices!.ten.val.toFixed(2)}`;
        this.mediaCount = `10 day average media count: ${this.prices!.ten.mediaCount.toFixed(
          0
        )}`;
        return this.strategy(this.prices!.ten, this.prices!.month);
      case 'month':
        this.price = `Monthly average price ${this.prices!.month.val.toFixed(
          2
        )}`;
        this.mediaCount = `Monthly average media count: ${this.prices!.month.mediaCount.toFixed(
          0
        )}`;
        return this.strategy(this.prices!.month, this.prices!.year);
      case 'year':
        this.price = `Yearly average price ${this.prices!.year.val.toFixed(2)}`;
        this.mediaCount = `Yearly average media count: ${this.prices!.year.mediaCount.toFixed(
          0
        )}`;
        return this.strategy(this.prices!.month, this.prices!.lastYear);
      default:
        return 'HOLD';
    }
  }

  strategy(
    cur: {
      val: number;
      mediaCount: number;
    },
    prev: {
      val: number;
      mediaCount: number;
    }
  ): 'BUY' | 'HOLD' | 'SELL' {
    // Buy if the current price is lower than the previous average and the media count is up
    if (cur.val < prev.val && cur.mediaCount > prev.mediaCount) {
      return 'BUY';
      // Sell if the current price is higher than the previous average and the media count is down
    } else if (cur.val > prev.val && cur.mediaCount < prev.mediaCount) {
      return 'SELL';
      // Hold otherwise
    } else return 'HOLD';
  }

  public clear() {
    this.showResults = false;
    this.input.nativeElement.value = '';
    this.recommendation = '';
  }
}
