import axios from "axios";

export class Api {
    // endPoint = 'https://greenpers.bot.psyreply.com'
    endPoint = 'http://localhost:3000'
    constructor() {}

    async getData(month) {
        const jbId = parseInt(localStorage.getItem('jetBotId'))
        const tgId = parseInt(localStorage.getItem('telegramId'))

        return await axios.get(`${this.endPoint}/get/${month}/${jbId}/${tgId}`).then(r => {
            return r.data;
        }).catch(() => {
            return [];
        })
    }

    saveData(data) {
        const jbId = parseInt(localStorage.getItem('jetBotId'))
        const tgId = parseInt(localStorage.getItem('telegramId'))

        axios.post(`${this.endPoint}/save/${jbId}/${tgId}`, {data}).then(data => {
            console.log(data);
        }).catch(err => {
            console.error(err);
        })
    }
}