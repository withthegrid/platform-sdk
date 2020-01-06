/**
 * The base of custom errors in ES6. Extend this class if you want to create a new error type.
 *
 * @see http://stackoverflow.com/a/32749533
 */
class BaseError extends Error {
  readonly isWtg = true;

  readonly name: string;

  constructor(readonly key: string, readonly message: string) {
    super(message);
    this.name = this.constructor.name;

    this.stack = (new Error(message)).stack;
  }

  get formattedMessage(): string {
    return `${this.message} (${this.name}: ${this.key})`;
  }

  print(): void {
    console.log(this.formattedMessage);
  }
}

export default BaseError;
