export class CustomResponse {
  status: boolean;
  msg: string;
  data: any;
  constructor(status, msg, data, ...options: string[]) {
    this.status = status;
    this.msg = this.formatMessage(msg, options);
    this.data = data;
  }
  formatMessage(msg, options) {
    if (options.length > 0) {
      for (let i = 0; i < options.length; i++) {
        msg = msg.replace('{' + (i + 1) + '}', options[i]);
      }
    }
    return msg;
  }
}
