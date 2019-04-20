import readline = require('readline')
export default class ReadLinePromised {
  private readlineInterface: readline.ReadLine
  constructor() {
    this.readlineInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
  }

  public question(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.readlineInterface.question(question, resolve)
    })
  }

  public close() {
    this.readlineInterface.close()
  }
}