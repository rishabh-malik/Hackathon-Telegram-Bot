'use strict'

const Telegram=require('telegram-node-bot');

class adminController extends Telegram.TelegramBaseController {
    
    addHandler($) {
       let hackathon=$.message.text.split(' ').slice(1).join(' ');

       if(!hackathon){
           return $.sendMessage('Sorry please pass a hackathon item.')
       }
       //using user session storage to store the hackathon
       $.getUserSession('hackathons')
       .then(hackathons=>{
           //if no hackathons yet
           if(!Array.isArray(hackathons)) $.setUserSession('hackathons',[hackathon]);
           
           else $.setUserSession('hackathons',hackathons.concat([hackathon]));
           
           console.log(hackathon);
           $.sendMessage('Added new hackathon!')
        })
    }

    getHandler($){
        $.getUserSession('hackathons').then(hackathons=>{
            console.log(hackathons);
            $.sendMessage(this._serialisehackathonList(hackathons),{parse_mode:'Markdown'});
        })
    }

    deleteHandler($){
        
        let index=parseInt($.message.text.split(' ').slice(1)[0]);
        
        if(isNaN(index)){
            return $.message('Sorry You did not entered a valid input');
        }

        $.getUserSession('hackathons').then(hackathons=>{
            if(index>=hackathons.length) return $.message('Sorry You did not entered a valid index');
            console.log(index);
            hackathons.splice(index-1,1);
            console.log(hackathons);
            $.setUserSession('hackathons',hackathons);
            $.sendMessage('deleted hackathon!');
        });
    }

    enterHandler($){
        let index=parseInt($.message.text.split(' ').slice(1)[0]);
        
        if(isNaN(index)){
            return $.message('Sorry You did not entered a valid input');
        }
        const form = {
            date: {
                q: 'Enter event date',
                error: 'sorry, wrong input',
                validator: (message, callback) => {
                    if(message.text) {
                        callback(true, message.text) //you must pass the result also
                        return
                    }
        
                    callback(false)
                }
            },
            venue: {
                q: 'Enter venue',
                error: 'sorry, wrong input',
                validator: (message, callback) => {
                    if(message.text) {
                        callback(true, message.text)
                        return
                    }
        
                    callback(false)
                }
            },
            schedule: {
                q: 'Enter event schedule',
                error: 'sorry, wrong input',
                validator: (message, callback) => {
                    if(message.text) {
                        callback(true, message.text)
                        return
                    }
        
                    callback(false)
                }
            }
        }
        
        $.runForm(form, (result) => {
            console.log(result)
            $.getUserSession('hackathoninfo'+`${index}`)
            .then(hackathoninfo=>{
                //if no hackathon info yet
                if(!Array.isArray(hackathoninfo)) $.setUserSession('hackathoninfo',[hackathoninfo]);
                
                else $.setUserSession('hackathoninfo',hackathoninfo.concat([result]));
                
                $.sendMessage('Added hackathon info!')
             })
        })
        }

    

    get routes() {
        return {
            'addCommand': 'addHandler',
            'getCommand': 'getHandler',
            'deleteCommand':'deleteHandler',
            'enterCommand':'enterHandler'
        }
    }
    
    _serialisehackathonList(hackathonList){
        let serialized='*Your hackathons: \n*';
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

module.exports=adminController;