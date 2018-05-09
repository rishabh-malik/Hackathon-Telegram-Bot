'use strict'

const Telegram=require('telegram-node-bot');

class participantController extends Telegram.TelegramBaseController {
    
    participateHandler($) {
        $.getUserSession('hackathons').then(hackathons=>{
            console.log(hackathons);
            $.sendMessage(this._serialisehackathonList(hackathons),{parse_mode:'Markdown'});
            $.sendMessage('In which hackathon do you want to participate: ')
        })

        $.waitForRequest
        .then($ => {
        $.sendMessage(`Participated Successfully in hackathon ${$.message.text}!`)
        })

    }

    get routes() {
        return {
            'participateCommand': 'participateHandler',
        }
    }
    
    _serialisehackathonList(hackathonList){
        let serialized='*Active hackathons: \n*';
        // hackathonList.array.forEach(element => {
        //     serialized+=`${element}\n`;
        // })
        var arrayLength = hackathonList.length;

        for (var i = 0; i < arrayLength; i++) {
            serialized= serialized+(i+1) +'. ' +hackathonList[i];
            serialized+='\n';
        }
        return serialized;
    }
}

module.exports=participantController;