import { createLogger, transports, format } from 'winston';

export const vkApiLogger = createLogger({
  transports: [
    new transports.File({
      filename: 'vkApi.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
    })
  ]
})