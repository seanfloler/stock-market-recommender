import { Injectable } from '@angular/core';
import { getRandomArbitrary } from '../utils/random-number-helper';

@Injectable({
  providedIn: 'root',
})
// TODO use yahoo api to fetch real data
export class StockService {
  private _tenPrice = 0;
  private _monthPrice = 0;
  private _yearPrice = 0;
  private _lastYearPrice = 0;

  private _tenMediaCount = 0;
  private _monthMediaCount = 0;
  private _yearMediaCount = 0;
  private _lastYearMediaCount = 0;

  // *************************    Prices   ************************
  // Returns the ten day average for a given ticker
  getTenDayAveragePrice(ticker: string) {
    // Returns a random integer from 0 to 100:
    this._tenPrice = getRandomArbitrary(50, 100);
    return this._tenPrice;
  }

  // Returns the monthly average for a given ticker
  getMonthlyAveragePrice(ticker: string) {
    // Return the 10 day +/- 10%
    this._monthPrice = this._tenPrice * getRandomArbitrary(0.9, 1.1);
    return this._monthPrice;
  }

  // Returns the yearly average for a given ticker
  getYearlyAveragePrice(ticker: string) {
    // Return the Monthly +/- 5%
    this._yearPrice = this._monthPrice * getRandomArbitrary(0.95, 1.05);
    return this._yearPrice;
  }

  getLastYearAveragePrice(ticker: string): number {
    // Return the yearly +/- 3%
    this._lastYearPrice = this._yearPrice * getRandomArbitrary(0.97, 1.03);
    return this._lastYearPrice;
  }

  // *************************    Media Counts   ************************
  // Returns the ten day average media count
  getTenDayAverageMediaCount(ticker: string) {
    // Returns a random integer from 0 to 100:
    this._tenMediaCount = getRandomArbitrary(100, 10000);
    return this._tenMediaCount;
  }

  // Returns the monthly average for a given ticker
  getMonthlyAverageMediaCount(ticker: string) {
    // Return the 10 day +/- 10%
    this._monthMediaCount = this._tenMediaCount * getRandomArbitrary(0.9, 1.1);
    return this._monthMediaCount;
  }

  // Returns the yearly average for a given ticker
  getYearlyAverageMediaCount(ticker: string) {
    // Return the Monthly +/- 5%
    this._yearMediaCount =
      this._monthMediaCount * getRandomArbitrary(0.95, 1.05);
    return this._yearMediaCount;
  }

  getLastYearAverageMediaCount(ticker: string): number {
    // Return the yearly +/- 3%
    this._lastYearMediaCount =
      this._yearMediaCount * getRandomArbitrary(0.97, 1.03);
    return this._lastYearMediaCount;
  }
}
