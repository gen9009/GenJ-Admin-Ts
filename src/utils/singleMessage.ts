import { ElMessage, MessageHandler, MessageOptions, messageType } from 'element-plus';
class QiMessage {
  private instance: MessageHandler | null | undefined;
  message(options: MessageOptions | string) {
    this.instance?.close();
    if (typeof options === 'string') {
      options = { message: options };
    }
    this.instance = ElMessage(options);
  }
  success(options: MessageOptions | string) {
    this.setMessage('success', options);
  }
  error(options: MessageOptions | string) {
    this.setMessage('error', options);
  }
  wrong(options: MessageOptions | string) {
    this.setMessage('warning', options);
  }
  info(options: MessageOptions | string) {
    this.setMessage('info', options);
  }
  setMessage(type: messageType, options: MessageOptions | string) {
    if (typeof options === 'string') {
      options = { message: options };
    }
    options.type = type;
    this.message(options);
  }
}
export default new QiMessage();
