# Promise Button
This component presents a button that can be used to kick off an asynchronous process and display simple status feedback: ready, processing, and complete.

See the live demo at [http://rayhatfield.io/promise-button/](http://rayhatfield.io/promise-button/).

Usage is simple. Simply provide an onClick handler that returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). When the button is clicked it will kick off the process and show a spinner until the promise fulfills, at which point the button displays a momentary success state before returning to its initial ready state.

```<PromiseButton onClick=“doSomething”>Do Something</PromiseButton>```

Rejections are not yet handled, but adding support should be straightforward.
