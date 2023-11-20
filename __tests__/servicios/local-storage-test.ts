import { Message } from "../../src/models/models"
import LocalStorageService from "../../src/services/LocalStorageService"

it('get messages', async () => {
    expect(await LocalStorageService.getMessages())
    .toBeInstanceOf(Array<Message>)
})