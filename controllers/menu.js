'use strict'

const Telegram=require('telegram-node-bot');

class menuController extends Telegram.TelegramBaseController {
    
    menuHandler($) {
        $.runMenu({
            message: 'Select:',
            layout: 1,
            'Admin': () => {
                $.sendMessage('Hey Admin! \n You have the following commands:')
            }, 
            'Judge': () => {
                $.sendMessage('Hey Judge! We are obliged to be on our forum')
            }, 
            'Participant': () => {
                $.sendMessage('Hey hacker!')
            }
           
        })
    }

    get routes() {
        return {
            'menuCommand': 'menuHandler',
        }
    }
  
}

module.exports=menuController;