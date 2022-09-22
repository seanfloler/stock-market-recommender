import { AppComponent } from './app.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockService } from './services/stock.service';

describe('Stock Market Recommender Tests', () => {
  let fixture: AppComponent;

  let stockServiceMock: StockService;

  beforeEach(() => {
    fixture = new AppComponent(stockServiceMock);
  });

  describe('Recommendation Strategy Tests', () => {
    it('should return BUY if the current price is lower than the previous average and the media count is up', () => {
      const current = {
        val: 100,
        mediaCount: 1001,
      };

      const previous = {
        val: 101,
        mediaCount: 1000,
      };

      expect(fixture.strategy(current, previous)).toBe('BUY');
    });

    it('should return SELL if the current price is higher than the previous average and the media count is down', () => {
      const current = {
        val: 101,
        mediaCount: 1000,
      };

      const previous = {
        val: 100,
        mediaCount: 1001,
      };

      expect(fixture.strategy(current, previous)).toBe('SELL');
    });

    it('should return HOLD if its not a buy or a sell', () => {
      const current = {
        val: 100,
        mediaCount: 1000,
      };

      const previous = {
        val: 100,
        mediaCount: 1001,
      };

      expect(fixture.strategy(current, previous)).toBe('HOLD');
    });
  });
});
