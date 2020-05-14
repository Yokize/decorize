import { Suite, options } from 'benchmark';
import { bind } from '~legacy/bind';

// Min samples.
options.minSamples = 100;

// Benchmark suite.
const suite: Suite = new Suite('@bind', {
  onComplete(): void {
    for (let i: number = 0; i < this.length; i++) {
      console.log(this[i].name);
      console.log(`${this[i].hz} ops/sec with ${this[i].stats.sample.length} samples\n`);
    }
  }
});

// Testing native bind.
suite.add('Native bind', (): void => {
  class Test {
    public method(): Test {
      return this;
    }
  }

  new Test().method.bind(null)();
});

// Testing decorator bind.
suite.add('Decorator bind', (): void => {
  class Test {
    @bind
    public method(): Test {
      return this;
    }
  }

  new Test().method();
});

// Run async tests.
suite.run();
