import { HttpErrorHandler } from '@infra/http/errors/HttpErrorHandler'
import { Express } from 'express'
import 'express-async-errors'

export async function setuprequestHandlers(app: Express): Promise<void> {
    app.use(HttpErrorHandler.handle)
}