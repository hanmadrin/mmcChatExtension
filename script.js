class ChromeStorage{
    constructor(name){
        if(typeof name!=='string') throw new Error ('unknown value for a storage key');
        this.name = name;
    }
    async GET() {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(this.name, (result) => { resolve(result[this.name]); }); 
        }); 
    }
    async SET(db) {
        return new Promise((resolve, reject) => {
            const obj = {};
            obj[this.name]=db;
            chrome.storage.local.set(obj, function() {resolve(db)});
        });
    }
}
class ChromeStorageDB{
    constructor({name,attributes}){
        let storageSetup =  this.#constructionCheck({name,attributes});
        /*db name (a string)*/
        this.name = storageSetup.name;
        /*
        attributes has 5 parameter
        type: ('string','number','boolean') -defalut 'number' 
        autoIncrement: (true,false) - default false
        primaryKey: (true,false) - default false
        allowNull: (true,false) - default false
        default: ('string','number','boolean',null) - default null
        */
        this.attributes = storageSetup.attributes;
    }   
    #constructionCheck({name,attributes}){
        if(!name) throw new Error ('storage must have a name value(string)');
        if(!attributes) throw new Error ('storage must have some attributes(object)');

        let attributeKeys = Object.keys(attributes);
        if(attributeKeys.length == 0) throw new Error ('attributes must have 1 or more keys');
        /* if(attributeKeys.length != [...new Set(attributeKeys)].length) throw new Error ('each attribute must be unique')*/
        for(let i=0;i<attributeKeys.length;i++){
            let attribute = attributes[attributeKeys[i]];
            if(typeof attribute.type == 'undefined') attribute.type = 'number';
            if(typeof attribute.autoIncrement == 'undefined') attribute.autoIncrement = false;
            if(typeof attribute.primaryKey == 'undefined') attribute.primaryKey = false;
            if(typeof attribute.allowNull == 'undefined') attribute.allowNull = false;
            if(typeof attribute.default == 'undefined') attribute.default = null;
            
            if(!(attribute.type=='number' || attribute.type=='boolean' || attribute.type=='string' /*|| attribute.type=='object' || attribute.type=='array'*/)) throw new Error ('unknown attribute type')
            if(!(attribute.autoIncrement === true || attribute.autoIncrement === false)) throw new Error ('unknown value for autoIncrement');
            if(!(attribute.primaryKey === true || attribute.primaryKey === false)) throw new Error ('unknown value for primaryKey');
            if(!(attribute.allowNull === true || attribute.allowNull === false)) throw new Error ('unknown value for allowNull');
            
            if(attribute.type!='number' && attribute.autoIncrement) throw new Error('autoIncrement is only for number data type');
            if(attribute.primaryKey && attribute.default!=null) throw new Error('primaryKey with default value is not possible');

            if(attribute.default!=null && typeof attribute.default != attribute.type) throw new Error('default value should be equal to key type')
        }
        return {name,attributes};
    }
    async #build(){
        let thisDB = await this.#getDB();
        if(typeof thisDB!='object' || !Array.isArray(thisDB)) {
            await this.#setDB([]);
            thisDB = await this.#getDB();
        }
    }
    async #getDB() {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(this.name, (result) => { resolve(result[this.name]); }); 
        }); 
    }
    async #setDB(db) {
        return new Promise((resolve, reject) => {
            let obj = {};
            obj[this.name]=db;
            chrome.storage.local.set(obj, function() {resolve(true)});
        });
    }
    #POSTCheck = (row) => {
        if(typeof row !='object' && Array.isArray(row)) throw new Error ('New row is not enough to get entried');
        if(!row) throw new Error('Row is just empty');
        let rowKeys = Object.keys(row);
        if(!rowKeys.length) throw new Error('Row is  empty');

        let attributes = this.attributes;
        let attributesKeys = Object.keys(attributes);
        for(let i=0;i<attributesKeys.length;i++){
            let attribute = attributes[attributesKeys[i]];
            if(!attribute.autoIncrement){
                if(typeof(row[attributesKeys[i]])!=attribute.type || typeof(row[attributesKeys[i]])=='undefined'){
                    if(typeof(row[attributesKeys[i]])!='undefined') throw new Error (`wrong data type for '${attributesKeys[i]}' key`);
                    if(attribute.primaryKey) throw new Error (`Primary key '${attributesKeys[i]}' must be a valid data`);
                    if(attribute.default==null && !attribute.allowNull) throw new Error (`No valid data provided for '${attributesKeys[i]}' key`);
                    row[attributesKeys[i]] = attribute.default;
                }
            }
        }
        return row;
    }
    async POST(row){
        await this.#build();
        let db = await this.#getDB();
        row = this.#POSTCheck(row);
        let attributes = this.attributes;
        let attributesKeys = Object.keys(attributes);
        for(let i=0;i<attributesKeys.length;i++){
            let attribute = attributes[attributesKeys[i]];
            if(attribute.autoIncrement){
                row[attributesKeys[i]] = 1;
                if(db.length!=0){
                    row[attributesKeys[i]] = (db[db.length-1].id)+1;
                }
            }
            if(attribute.primaryKey){
                if(db.find( data => {return data[attributesKeys[i]] === row[attributesKeys[i]]} ) != undefined)
                throw new Error (`primaryKey '${attributesKeys[i]}' value is not unique`);
                // console.log(`primaryKey '${attributesKeys[i]}' value is not unique`);
            }
        }
        db.push(row);
        await this.#setDB(db);
        return db;
    }
    async GET(where){
        await this.#build();
        where = this.#WHERECheck(where);
        const db = await this.#getDB();
        if(where==null) return db; 
        return this.#whereReturn({db,where,logic:true})
    }
    async DELETE(where){
        await this.#build();
        where = this.#WHERECheck(where);
        if(where==null) return 0;
        const db = await this.#getDB();
        const results = this.#whereReturn({db,where,logic:false});
        await this.#setDB(results);
        return results;
    }
    #WHERECheck(where){
        if(where===undefined) return null;

        if(where!=null)
            if(typeof where!='object' || Array.isArray(where))
                throw new Error('where key got unexpected value');
        let whereKeys = Object.keys(where);
        if(whereKeys.length==0) return null;
        let attributes = this.attributes;
        let attributeKeys = Object.keys(attributes);
        for(let i=0;i<whereKeys.length;i++){
            let whereKeyValues = where[whereKeys[i]];
            if(!attributeKeys.includes(whereKeys[i]))
                throw new Error('where key got keys that are not availabale on attribute keys.');
            if(!whereKeyValues)
                throw new Error('you must be valid object as where key value');
            if(!Array.isArray(whereKeyValues))
                throw new Error('where key value got unexpected value');
            if(whereKeyValues.length==0)
                throw new Error('where key value atleast need one item');
            whereKeyValues.forEach(whereKeyValue => {
                let whereKeyValueKeys = Object.keys(whereKeyValue);
                if(whereKeyValueKeys.length!=2)
                    throw new Error('where key value keys must have 2 key');
                if(typeof whereKeyValue.operation != 'string')
                    throw new Error('opeartion value must be string');
                if(typeof whereKeyValue.value != attributes[whereKeys[i]].type)
                    throw new Error('value type must match');   
            });
        }
        return where;
    }

    #SETCheck(set){
        if(set===undefined || set===null) return null;
        if(set!=null)
            if(typeof set!='object' || Array.isArray(set))
                throw new Error('set key got invalid value');
        const setKeys = Object.keys(set);
        if(setKeys.length==0) throw new Error('must have 1 or more keys in set');
        
        const attributes = this.attributes;
        const attributeKeys = Object.keys(attributes);
        for(let i=0;i<setKeys.length;i++){
            const setKey = setKeys[i];
            if(!attributeKeys.includes(setKeys) && typeof set[setKey] != attributes[setKey].type) 
               throw new Error('set keys value is not defined as key value'); 
            if(attributes[setKey].autoIncrement) throw new Error('autoIncrement should not be changed');
            if(attributes[setKey].primaryKey) throw new Error('primaryKey should not be changed');
        }
        return set;     
    }
    #whereReturn({db,where,logic,hook}){
        if(typeof logic !='boolean') throw new Error('there must be a boolean logic value');
        if(hook == undefined) hook = null;
        const dbLength = db.length;
        let result = [];
        for(let j=0;j<dbLength;j++){
            let row = db[j];
            const whereKeys = Object.keys(where);
            let interKey = true;
            for(let i=0; i<whereKeys.length;i++){
                const whereKey = whereKeys[i];
                const whereKeyValues = where[whereKey];
                let intraKey = false;
                for(let k=0;k<whereKeyValues.length;k++){
                    const operation = whereKeyValues[k].operation;
                    const value = whereKeyValues[k].value;
                    switch(operation){
                        case 'equal':
                            intraKey = intraKey || row[whereKey]===value;
                        break;
                        case 'notEqual':
                            intraKey = intraKey || row[whereKey]!==value;
                        break;
                        default:
                            throw new Error('invalid operation')
                        break;
                    }
                }
                interKey = interKey && intraKey;
            }
            if((interKey && logic) || (!interKey && !logic)){
                if(hook===null){
                    result.push(row);
                }else{
                    row = hook(row);
                }  
            }           
        }
        if(hook===null) return result; else return db;
    }
    async PUT({set,where}){
        await this.#build();
        where = this.#WHERECheck(where);
        set = this.#SETCheck(set);
        if(where==null) return 0;
        let db = await this.#getDB();
        const hook = (row)=>{
            const setKeys = Object.keys(set);
            const setValues = Object.values(set);
            for(let i=0;i<setKeys.length;i++){
                row[setKeys[i]] = setValues[i];
            }
            return row;
        }
        db = this.#whereReturn({db,where,logic:true,hook});
        
        await this.#setDB(db);
        return db;
    }
}
const essentials = {
    sleep: (ms)=>{
        return new Promise(resolve=>{
            setTimeout(resolve, ms);
        });
    }
}
const mondayFetch = async (query) => {
    const metaInformationDB = new ChromeStorage('metaInformation'); 
    const metaInformation = await metaInformationDB.GET();
    const mondayResponse = await fetch (
        `https://api.monday.com/v2`,
        {
            cache: "no-cache",
            method: 'post',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': metaInformation.defaultAPI
            },
            body: JSON.stringify({query})
        }
    );
    return mondayResponse;
}
const fixedData = {
    metaInformation: {
        facebookAccountName: {
            title: 'Facebook Account Name',
            interactive: false,
            requiredToStart: false,
        },
        extensionSwitch:{
            title: 'Extension Switch',
            type: 'checkbox',
            defaultValue: false,
            point: 'checked',
            interactive: true,
            requiredToStart: true,
        },
        debugModeSwitch:{
            title: 'Debug Switch',
            type: 'checkbox',
            defaultValue: false,
            point: 'checked',
            interactive: true,
            requiredToStart: false,
        },
        hourlyMessageLimit:{
            title: 'Hourly Message Limit',
            type: 'number',
            defaultValue: 0,
            point: 'value',
            interactive: true,
            requiredToStart: true,
        },
        messagingStartTime:{
            title: 'Messaging Start Time(24 HOURS)',
            type: 'number',
            defaultValue: 8,
            point: 'value',
            interactive: true,
            requiredToStart: true,
        },
        messagingEndTime:{
            title: 'Messaging End Time(24 HOURS)',
            type: 'number',
            defaultValue: 19,
            point: 'value',
            interactive: true,
            requiredToStart: true,
        },
        defaultAPI:{
            title: 'Default API',
            type: 'text',
            defaultValue: 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3MjU1MTMxNiwidWlkIjozMDI3MzE5NCwiaWFkIjoiMjAyMi0wNy0yN1QyMzowMzowNC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6ODg0NzExMCwicmduIjoidXNlMSJ9.OsVnuCUSnm-FF21sjAND10cWEKN9-UIqIkNx6Rz8Bfo',
            point: 'value',
            interactive: true,
            requiredToStart: true,
        },
        domain:{
            title: 'Domain',
            type: 'text',
            defaultValue: 'http://127.0.0.1:8282',
            point: 'value',
            interactive: true,
            requiredToStart: true,
        },
        accountEmail:{
            title: 'Account Email',
            type: 'text',
            defaultValue: '',
            point: 'value',
            interactive: true,
            requiredToStart: true,
        },
        accountPassword:{
            title: 'Account Password',
            type: 'text',
            defaultValue: '',
            point: 'value',
            interactive: true,
            requiredToStart: true,
        },

    },
    workingUrls:{
        messages: 'https://m.facebook.com/messages/?folder=unread',
        home: 'https://m.facebook.com/',
        itemSuffix: 'https://m.facebook.com/marketplace/item/',
        unknownMessageSuffix: 'https://m.facebook.com/messages/read/?tid=cid.g.',
        sellerMessageSuffix: 'https://m.facebook.com/marketplace/message_seller/',
    },
    workingSelectors:{
        messages:{
            allMessages: '[href^="/messages/read/?tid=cid.g."]',
            moreMessagesButton: '[href^="/messages/?pageNum"]',
            unseenMessages: `.${'_55wp _7om2 _5b6o _67iu _67ix _2ycx aclb del_area async_del abb touchable _592p _25mv'.split(' ').join('.')}`,
            timeStamp : '[data-sigil="timestamp"]',
        },
        newMessage:{
            messageInput: 'form [name="message"]',
            sendButton: '[type="submit"][value="Send"]',
            seeConversationButton: '[type="submit"][value="See Conversation"]',
        },
        content:{
            console: 'CONTENT_CONSOLE',
        },
        readMessage:{
            postUrl : 'a[href^="/marketplace/item/"]',
            olderMessage : '[href^="/messages/read/?tid=cid.g."]',
            SingleMessages : '.msg [data-sigil="message-text"]',
            messageDataHolder: ':scope > span,.messageAttachments',
            neutralMessages : '.msg .fcg',
        }
    },
    limits:{
        loadMessages: 5,
        lastUnreadMesaage: (86400*5),
    },
    mondayFetch:{
        appraisalCounterBoard : 1255820475,
        borEffortBoardId : 1250230293,
        myAccountId : 30273194,
        columnValuesIds:{
            borEffortBoard:{
                person : 'person',
                url: 'text7',
                status: 'status',
            },
            appraisalCounterBoard:{
                status: 'status',
            }
        },
        statuses: {
            borEffortBoard:{
                unVerified: 5,
                verified: 1,
                bad: 4,
                verifiedWithVin: 17,
            }
        }
    },
};
const contentScripts = {
    accountInfo : ()=>{
        const infos = JSON.parse(document.body.textContent.match(/{"ACCOUNT_ID":.+?}/)[0]);
        const id = infos.ACCOUNT_ID;
        const name = infos.NAME;
        return {id, name};
    },
    isUserLoggedIn: ()=>{
        // return getCookie('c_user')==''?false:true;
        let result = '';
        let name = 'c_user' + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
            c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                result = c.substring(name.length, c.length);
            }
        }
        return result==''?false:true;
    },
    isProgramReady: async()=>{
        let values = await new ChromeStorage('metaInformation').GET();
        values = values==null?{}:values;
        const metas = fixedData.metaInformation;
        const metaKeys = Object.keys(metas);
        for(let i=0;i<metaKeys.length;i++){
            const metaKey = metaKeys[i];
            const meta = metas[metaKey];
            if(meta.requiredToStart){
                if(!values[metaKey]){
                    return false;
                }
            }
        }
        return true;
    },
    setupConsoleBoard: ()=>{
        const consoleBoard = document.createElement('div');
        consoleBoard.id = fixedData.workingSelectors.content.console;
        dragElement(consoleBoard);
        function dragElement(elmnt) {
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            if (document.getElementById(elmnt.id + "header")) {
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
            } else {
            elmnt.onmousedown = dragMouseDown;
            }
        
            function dragMouseDown(e) {
            e = e || window.event;
            // e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
            }
        
            function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
            }
        
            function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
            }
        }
        document.body.appendChild(consoleBoard);
    },
    showDataOnConsole: (data)=>{
        const consoleBoard = document.getElementById(fixedData.workingSelectors.content.console);
        const content = document.createElement('div');
        content.classList.add('font-sub');
        content.innerText = data;
        consoleBoard.appendChild(content);
        console.log(data);
    },
    pageRedirection: async (url,message)=>{
        // show data on console
        contentScripts.showDataOnConsole('Redirection:'+url);
        contentScripts.showDataOnConsole('Message:'+message);
        const redirectionMessagesDB = new ChromeStorage('redirectionMessages');
        const isRedirectionAllowed = async (message)=>{
            let messages = await redirectionMessagesDB.GET();
            if(messages!=null){
                messages.unshift(message);
                messages = messages.slice(0,10);
                await redirectionMessagesDB.SET(messages);
                if(messages.length>5){
                    if(messages[0]==message && messages[1]==message && messages[2]==message && messages[3]==message && messages[4]==message ){
                        return false;
                    }else{
                        return true;
                    }
                }else{
                    return true;
                }
            }else{
                await redirectionMessagesDB.SET([`${message}`]);
                return true;
            }
        }
        if(await isRedirectionAllowed(message)){
            const redirectButton = document.createElement('button');
            redirectButton.innerText = 'Redirect';
            redirectButton.onclick = ()=>{
                window.location.href = url;
            }
            const consoleBoard = document.getElementById(fixedData.workingSelectors.content.console);
            consoleBoard.appendChild(redirectButton);
        }else{
            const messages = await redirectionMessagesDB.GET();
            for(let i=0;i<messages.length;i++){
                contentScripts.showDataOnConsole(messages[i]);
            }
            const button = document.createElement('button');
            button.innerText = 'Continue or Try again';
            button.onclick = ()=>{
                redirectionMessagesDB.SET([]);
                contentScripts.showDataOnConsole("Error data cleared");
                contentScripts.pageRedirection(url,message);
            }
            const consoleBoard = document.getElementById(fixedData.workingSelectors.content.console);
            consoleBoard.appendChild(button);
        }
    },
    getItemIdByMessageId: async (fb_message_id)=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const domain = metaInfromation.domain;
        const itemIdDataJSON = await fetch(`${domain}/extension/getItemIdByMessageId`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fb_message_id})
        });
        const itemIdData = await itemIdDataJSON.json();
        return itemIdData.item_id;
    },
    markItemAsLinkGone: async (item_id)=>{
        console.log('marking item as link gone');
        if(item_id){
            const query = `
                query{
                    items(ids: [${item_id}]){
                        board{
                            id
                        }
                    }
                }
            `;
            const boardDataJSON = await mondayFetch(query);
            const boardData = await boardDataJSON.json();
            const boardId = boardData.data.items[0].board.id;
            if(boardId==fixedData.mondayFetch.borEffortBoardId || boardId==fixedData.mondayFetch.appraisalCounterBoard){
                const columnId = boardId==fixedData.mondayFetch.borEffortBoardId?fixedData.mondayFetch.columnValuesIds.borEffortBoard.status:fixedData.mondayFetch.columnValuesIds.appraisalCounterBoard.status;
                const query = `
                    mutation {
                        change_simple_column_value(
                            item_id: ${item_id}, 
                            board_id: ${boardId}, 
                            column_id: "${columnId}", 
                            value: "Link Gone") {
                            id
                        }
                    }
                `;
                const itemDataJSON = await mondayFetch(query);
                const itemData = await itemDataJSON.json();
            }
        }
    },
    readCurrentMessage: ()=>{
        contentScripts.showDataOnConsole('Reading current message');
        const messages = document.querySelectorAll(fixedData.workingSelectors.readMessage.SingleMessages);
        const accountInfo = contentScripts.accountInfo();
        const messageData = [];
        for(let i=0;i<messages.length;i++){
            const message = messages[i];
            const messageInfo = JSON.parse(message.getAttribute('data-store'));
            const timestamp = messageInfo.timestamp;
            const sent_from = (messageInfo.author==accountInfo.id || messageInfo.author==accountInfo.name)?'me':'seller';
            const text = message.querySelector(':scope > span');
            const attachment = message.querySelector(':scope > div');
            if(text.children.length!=0){
                const textData = {
                    type: 'text',
                    sent_from,
                    message: text.innerText,
                    timestamp,
                    fb_id: accountInfo.id,
                    status: 'done'
                }
                messageData.push(textData);
            }
            if(attachment.children.length !=0){
                const images = attachment.querySelectorAll('img,i');
                for(let i=0;i<images.length;i++){
                    const image = images[i];
                    const tagName = image.tagName.toLowerCase();
                    let imageSrc = '';
                    if(tagName=='img'){
                        imageSrc = image.src;
                    }else{
                        imageSrc = image.style.backgroundImage.replace('url(','').replace(')','').replace(/\"/gi, "");
                    }
                    const imageData = {
                        type: 'image',
                        sent_from,
                        message: imageSrc,
                        timestamp,
                        fb_id: accountInfo.id,
                        status: 'done'
                    }
                    messageData.push(imageData);
                }
            }
        }
        return messageData;
    },
    sendMessagesToServer: async (messageData)=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const domain = metaInfromation.domain;
        const messageDataJSON = await fetch(`${domain}/extension/sendMessagesToServer`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({messageData})
        });
        const messageDataResponse = await messageDataJSON.json();
        return messageDataResponse;
    },
    isCurrentMessageValid: ()=>{
        // "You named the conversation"
        // "You changed the conversation picture"
        // "waiting for your response about this listing"
        // "changed the listing title"
        // "reduced the price"
        // "changed the listing description"
        // "left the group"
        // " sold "
        // "removed the item from Marketplace"
        const invalidIndicators = [
            "left the group",
            "removed the item from Marketplace",
            " sold ",
        ]
        const neutralMessages = document.querySelectorAll(fixedData.workingSelectors.readMessage.neutralMessages);
        for(let i=0;i<neutralMessages.length;i++){
            const neutralMessage = neutralMessages[i];
            const message = neutralMessage.innerText;
            // console.log(message);
            for(let j=0;j<invalidIndicators.length;j++){
                const indicator = invalidIndicators[j];
                if(message.includes(indicator)){
                    return false;
                }
            }
        }
        return true;
    },
    lastMessageOnServerByPostId: async (fb_post_id)=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const itemLastMessageDataJSON = await fetch(`${metaInfromation.domain}/extension/lastMessageOnServerByPostId`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fb_post_id})
        });
        const itemLastMessageData = await itemLastMessageDataJSON.json();
        return itemLastMessageData.message;
    },
    itemIdByPostId: async (fb_post_id)=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const itemIdDataJSON = await fetch(`${metaInfromation.domain}/extension/itemIdByPostId`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fb_post_id})
        });
        const itemIdData = await itemIdDataJSON.json();
        return itemIdData.item_id;
    },
    isValidTimeToSendFirstMessage:  async ()=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const firstMessageTimeDB = new ChromeStorage('firstMessageTime');
        const metaInfromation = await metaInformationDB.GET();
        const messagingStartHour = metaInfromation.messagingStartTime;
        const messagingEndHour = metaInfromation.messagingEndTime;  
        const time = new Date().getTime()/1000;

        const americanHour = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/New_York'})).getHours();
        const hourlyMessageLimit = metaInfromation.hourlyMessageLimit;
        const minimumDuration = 3600/hourlyMessageLimit;
        const firstMessageTime = (await firstMessageTimeDB.GET()) || 0;
        console.log('firstMessageTime',minimumDuration-(time-firstMessageTime));
        if(americanHour>=messagingStartHour && americanHour<=messagingEndHour){
            if(time-firstMessageTime>=minimumDuration){
                return {
                    status: true,
                    waitingTime: 0
                };
            }else{
                return {
                    status: true,
                    waitingTime: minimumDuration-(time-firstMessageTime)
                };
            }
        }else{
            return {
                status: false,
                waitingTime: 60*5
            };
        }
    },
    isValidTimeToSendUnsentMessage: async ()=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const messagingStartHour = metaInfromation.messagingStartTime;
        const messagingEndHour = metaInfromation.messagingEndTime;  

        const americanHour = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/New_York'})).getHours();
        return (americanHour>=messagingStartHour && americanHour<=messagingEndHour);
    },
    getUnsentMessagePostIds : async ()=>{

    },
    waitWithVisual: async (waitingTime)=>{
        waitingTime = parseInt(waitingTime);
        const timer = document.createElement('div');
        timer.classList.add('font-header');
        const consoleBoard = document.getElementById(fixedData.workingSelectors.content.console);
        consoleBoard.replaceChildren(timer);
        for(let i = waitingTime;i>=0;i--){
            timer.innerText = `Waiting for ${i} seconds`;
            await essentials.sleep(1000);
        }
    },
    sendNewSellerMessage: async ()=>{
        const sendNewSellerMessageDB = new ChromeStorage('sendNewSellerMessage');
        const sendNewSellerMessage = await sendNewSellerMessageDB.GET();
        const workingStepDB = new ChromeStorage('workingStep');
        const metaInformationDB = new ChromeStorage('metaInformation');
        if(sendNewSellerMessage==null){
            const metaInformation = await new ChromeStorage('metaInformation').GET();
            const domain = metaInformation.domain;
            const newPostJSON = await fetch(`${domain}/extension/newPostId`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fb_id: contentScripts.accountInfo().id,
                    fb_user_name: contentScripts.accountInfo().name
                })
            });
            if(newPostJSON.status==200){
                const newPost = await newPostJSON.json();
                newPost.has_unsent_message = true;
                await sendNewSellerMessageDB.SET(newPost);
                contentScripts.pageRedirection(fixedData.workingUrls.home,'New Post to message');
            }else if(newPostJSON.status==201){
                contentScripts.showDataOnConsole((await newPostJSON.json()).message)
            }
            else{
                contentScripts.showDataOnConsole('No raw Item to work With');
                await sendNewSellerMessageDB.SET(null);
                await workingStepDB.SET('collectUnseenMessage');               
                contentScripts.pageRedirection(fixedData.workingUrls.messages,'No raw Item to work With');
            }
        }else{
            if(sendNewSellerMessage.fb_post_id){
                contentScripts.showDataOnConsole('fb post id collected');
                await essentials.sleep(5000); 
                const markAsLinkGone = async ()=>{
                    contentScripts.showDataOnConsole('marking as "Link Gone"');
                    const query = `
                        mutation {
                            change_simple_column_value(
                                item_id: ${sendNewSellerMessage.item_id}, 
                                board_id: ${fixedData.mondayFetch.borEffortBoardId}, 
                                column_id: "${fixedData.mondayFetch.columnValuesIds.borEffortBoard.status}", 
                                value: "Link Gone") {
                                id
                            }
                        }
                    `;
                    try{
                        const LinkGoneDataJSON = await mondayFetch(query);
                        const LinkGoneData = await LinkGoneDataJSON.json();
                        await sendNewSellerMessageDB.SET(null);               
                        contentScripts.pageRedirection(fixedData.workingUrls.home,'Link gone getting new one');
                    }catch(e){
                        contentScripts.showDataOnConsole('Error marking as "Link Gone"');
                    }
                }
                const markAsFirstMessage = async ()=>{
                    contentScripts.showDataOnConsole('marking as "First Message"');
                    const firstMessageTimeDB = new ChromeStorage('firstMessageTime');
                    const query = `
                        mutation {
                            change_simple_column_value(
                                item_id: ${sendNewSellerMessage.item_id}, 
                                board_id: ${fixedData.mondayFetch.borEffortBoardId}, 
                                column_id: "${fixedData.mondayFetch.columnValuesIds.borEffortBoard.status}", 
                                value: "1st MSG") {
                                id
                            }
                        }
                    `;
                    try{
                        const firstMessageDataJSON = await mondayFetch(query);
                        const firstMessageData = await firstMessageDataJSON.json();
                        const metaInformation = await metaInformationDB.GET();
                        const domain = metaInformation.domain;
                        const saveFirstMessageActionJSON = await fetch(`${domain}/extension/saveFirstMessageAction`,{
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                item_id: sendNewSellerMessage.item_id,
                                fb_post_id: sendNewSellerMessage.fb_post_id,
                                fb_id: contentScripts.accountInfo().id,
                                fb_user_name: contentScripts.accountInfo().name
                            })
                        });
                        if(saveFirstMessageActionJSON.status==200){

                            console.log('first message action saved');
                            await sendNewSellerMessageDB.SET(null);       
                            firstMessageTimeDB.SET(new Date().getTime()/1000);
                            await workingStepDB.SET('collectUnseenMessage');
                            contentScripts.pageRedirection(fixedData.workingUrls.home,'Message Sent and unseen messages started');
                        }else{
                            contentScripts.showDataOnConsole('Error marking as "1st Message"');
                        }
                        
                    }catch(e){
                        contentScripts.showDataOnConsole('Error marking as "1st Message"');
                    }
                }
                // 335764422016209
                // 1260480281369165
                // 1697383433965404
                // https://m.facebook.com/marketplace/item/335764422016209/?refid=12
                if(window.location.href.indexOf('unavailable-product')!=-1){
                    console.log('unavailable-product');
                    await markAsLinkGone();
                }else{
                    if(window.location.href==`${fixedData.workingUrls.itemSuffix}${sendNewSellerMessage.fb_post_id}`){
                        
                        if(document.querySelector(fixedData.workingSelectors.newMessage.seeConversationButton)){
                            await markAsFirstMessage();
                        }else if(!document.querySelector('form [name="message"]')){
                            await markAsLinkGone();
                        }else  if(document.querySelector('form [name="message"]')){
                            contentScripts.showDataOnConsole('sending message');
                            const message = document.querySelector(fixedData.workingSelectors.newMessage.messageInput);
                            const button = document.querySelector(fixedData.workingSelectors.newMessage.sendButton);
                            const metaInformation = await metaInformationDB.GET();
                            const domain = metaInformation.domain;
                            const messageTextJSON = await fetch(`${domain}/extension/firstMessageText`,{
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });
                            const messageText = await messageTextJSON.json();
                            message.value = messageText;
                            button.click();
                            let i =0;
                            while(true){
                                if(document.querySelector(fixedData.workingSelectors.newMessage.seeConversationButton)){
                                    break;
                                }
                                await essentials.sleep(5000);
                                contentScripts.showDataOnConsole(`waiting for message to send ${++i}`);
                            }
                            await markAsFirstMessage();
                        }else{
                            contentScripts.showDataOnConsole('something unexpected happening!');
                        }
                    }else{
                        contentScripts.pageRedirection(`${fixedData.workingUrls.itemSuffix}${sendNewSellerMessage.fb_post_id}`,'Not on item page');
                    }
                }                
            }else{
                contentScripts.showDataOnConsole('fb post id not collected');
                const processUrlAndContinue = async(url)=>{
                    // get digits from url
                    const postId = url.match(/\d+/g).map(Number)[0];
                    sendNewSellerMessage.fb_post_id = postId;
                    await sendNewSellerMessageDB.SET(sendNewSellerMessage);
                    contentScripts.pageRedirection(`${fixedData.workingUrls.itemSuffix}${postId}`,'Redirecting to post page');
                }
                const setNameOnMondayAndCollectURL = async ()=>{
                    const query1 = `
                        query{
                            items(ids: [${sendNewSellerMessage.item_id}]){
                                column_values(ids:["${fixedData.mondayFetch.columnValuesIds.borEffortBoard.url}"]){
                                    value
                                }
                            }
                        }
                    `;
                    const urlDataJSON = await mondayFetch(query1);
                    const urlData = await urlDataJSON.json();
                    const url = urlData.data.items[0].column_values[0].value;
                    const query2 = `
                        mutation{
                            change_simple_column_value(board_id:${fixedData.mondayFetch.borEffortBoardId},
                            item_id:${sendNewSellerMessage.item_id},
                            column_id: "${fixedData.mondayFetch.columnValuesIds.borEffortBoard.person}",
                            value: "${fixedData.mondayFetch.myAccountId}") 
                            {
                                id
                            }
                        }
                    `;
                    const itemDataJSON = await mondayFetch(query2);
                    const itemData = await itemDataJSON.json();
                    const item = itemData.data.change_simple_column_value;
                    return url;
                }
                try{
                    processUrlAndContinue(await setNameOnMondayAndCollectURL());
                }catch(e){
                    const contentConsole = document.getElementById(fixedData.workingSelectors.contentConsole);
                    const collectAgainButton = document.createElement('button');
                    collectAgainButton.innerText = 'Collect & Set Again';
                    collectAgainButton.addEventListener('click',async ()=>{
                        try{
                            processUrlAndContinue(await setNameOnMondayAndCollectURL());
                        }catch(e){
                            contentScripts.showDataOnConsole('Error Collecting URL');
                        }
                    });
                    contentConsole.appendChild(collectAgainButton);
                }
                
                
            }
        }
        

    },
    collectUnseenMessage: async()=>{
        const workingStepDB = new ChromeStorage('workingStep');
        if(window.location.href==fixedData.workingUrls.messages){
            let atttemptCount = 0;
            await essentials.sleep(5000);
            while(true){
                atttemptCount++;
                const allUnseenMessages = document.querySelectorAll(fixedData.workingSelectors.messages.unseenMessages);
                const allUnseenMarketplaceMessages = document.querySelectorAll(`${fixedData.workingSelectors.messages.allMessages} `);
                const moreMessagesButton = document.querySelector(fixedData.workingSelectors.messages.moreMessagesButton);
                const lastMessageTimeObject = allUnseenMessages[allUnseenMessages.length-1].querySelector(fixedData.workingSelectors.messages.timeStamp).getAttribute('data-store');
                const lastMessageTime = JSON.parse(lastMessageTimeObject).time;
                const timeNow = (new Date().getTime())/1000;

                if(allUnseenMarketplaceMessages.length >= fixedData.limits.loadMessages || moreMessagesButton==null || (timeNow - lastMessageTime) >= fixedData.limits.lastUnreadMesaage){
                    break;
                }else{
                    contentScripts.showDataOnConsole(`Load More Attempt: ${atttemptCount}`);
                    moreMessagesButton.click();
                    await essentials.sleep(5000);
                }
            }
            const unseenMessages = document.querySelectorAll(fixedData.workingSelectors.messages.unseenMessages);
            const unseenMessageIds = [];
            for(let i=0;i<unseenMessages.length;i++){ 
                const unseenMessage = unseenMessages[i];
                const unseenMessageTimeObject = unseenMessage.querySelector(fixedData.workingSelectors.messages.timeStamp).getAttribute('data-store');
                const unseenMessageTime = JSON.parse(unseenMessageTimeObject).time;
                const timeNow = (new Date().getTime())/1000;
                if((timeNow - unseenMessageTime) <= fixedData.limits.lastUnreadMesaage){
                    const messageLink = unseenMessage.querySelector('a');
                    const url = new URL(messageLink.href);
                    const messageTID = url.searchParams.get('tid');
                    if(messageTID.indexOf('cid.g.')!=-1){
                        const messageID = messageTID.match(/\d+/g)[0];
                        unseenMessageIds.push(messageID);
                    }
                }
            }
            if(unseenMessageIds.length==0){
                await workingStepDB.SET('sendUnsentMessage');
                contentScripts.pageRedirection(fixedData.workingUrls.home,'start sending unsent message');
                contentScripts.showDataOnConsole(`Unseen Messages: ${unseenMessageIds.length}`);
            }else{
                await workingStepDB.SET('readUnseenMessage');
                const readUnseenMessageDB = new ChromeStorage('readUnseenMessage');
                await readUnseenMessageDB.SET(unseenMessageIds);
                contentScripts.showDataOnConsole(`Unseen Messages: ${unseenMessageIds.length}`);
                contentScripts.pageRedirection(`${fixedData.workingUrls.unknownMessageSuffix}${unseenMessageIds[0]}`,'start reading Unseen Message');
            }
        }else{
            contentScripts.pageRedirection(fixedData.workingUrls.messages,'Not on message page');
        }
    },
    readUnseenMessage: async ()=>{
        const workingStepDB = new ChromeStorage('workingStep');
        const readUnseenMessageDB = new ChromeStorage('readUnseenMessage');
        const readUnseenMessage = await readUnseenMessageDB.GET();
        const afterReadingMessage = async ()=>{
            readUnseenMessage.shift();
            await readUnseenMessageDB.SET(readUnseenMessage);
            if(readUnseenMessage.length==0){
                await workingStepDB.SET('sendUnsentMessage');
                await readUnseenMessageDB.SET(null);
                contentScripts.pageRedirection(fixedData.workingUrls.home,'start sending unsent message');
            }else{
                contentScripts.pageRedirection(`${fixedData.workingUrls.unknownMessageSuffix}${readUnseenMessage[0]}`,`unseen message : ${readUnseenMessage[0]}`);
            }
        }
        if(readUnseenMessage.length==0){
            await workingStepDB.SET('sendUnsentMessage');
            await readUnseenMessageDB.SET(null);
            contentScripts.pageRedirection(fixedData.workingUrls.home,'start sending unsent message');
        }else{
            if(window.location.href!=`${fixedData.workingUrls.unknownMessageSuffix}${readUnseenMessage[0]}`){
                contentScripts.pageRedirection(`${fixedData.workingUrls.unknownMessageSuffix}${readUnseenMessage[0]}`,'Redirecting to message page');
            }else{
                contentScripts.showDataOnConsole('reading message');
                const metaInformationDB = new ChromeStorage('metaInformation');
                const metaInfromation = await metaInformationDB.GET();
                const postUrl = document.querySelector(fixedData.workingSelectors.readMessage.postUrl);
                const itemData = {fb_message_id:readUnseenMessage[0]};
                if(postUrl){
                    const postId = postUrl.href.match(/\d+/g)[0];
                    itemData.fb_post_id = postId;
                    itemData.fb_id = contentScripts.accountInfo().id;
                    const isValidMessageIdJSON = await fetch(`${metaInfromation.domain}/extension/isValidMessageId`,{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(itemData)
                    });
                    if(isValidMessageIdJSON.status==200){
                        const validData = await isValidMessageIdJSON.json();
                        const valid = validData.valid;
                        if(valid){
                            await essentials.sleep(2000);
                            const isMessageValid = contentScripts.isCurrentMessageValid();
                            if(isMessageValid){
                                contentScripts.showDataOnConsole('message is valid to read or write');
                                const messageDatas = contentScripts.readCurrentMessage();
                                const lastMessageFromServer = await contentScripts.lastMessageOnServerByPostId(itemData.fb_post_id);
                                const item_id = await contentScripts.itemIdByPostId(itemData.fb_post_id);
                                let newMessageDatas = [];
                                for(let i = messageDatas.length-1;i>=0;i--){
                                    const messageData = messageDatas[i];
                                    messageData.item_id = item_id;
                                    const message = messageData.message;
                                    if(message==lastMessageFromServer){
                                        break;
                                    }else{
                                        newMessageDatas = [messageData].concat(newMessageDatas);
                                    }
                                }
                                console.log(newMessageDatas);
                                await contentScripts.sendMessagesToServer(newMessageDatas);
                            }else{
                                contentScripts.showDataOnConsole('message is not valid to read or write');
                                await contentScripts.markItemAsLinkGone();
                            }
                            await afterReadingMessage();
                        }else{
                            await afterReadingMessage();
                        }
                    }else{
                        contentScripts.showDataOnConsole('error validating message iD');
                    }
                }else{
                    const itemId = await contentScripts.getItemIdByMessageId(readUnseenMessage[0]);
                    if(itemId){
                        await contentScripts.markItemAsLinkGone(itemId);
                    }
                    await afterReadingMessage();
                }
            }
        }
    },
    sendUnsentMessage: async ()=>{
        // Sorry, something went wrong.
        const workingStepDB = new ChromeStorage('workingStep');
        const metaInformationDB = new ChromeStorage('metaInformation');
        const sendUnsentMessageDB = new ChromeStorage('sendUnsentMessage');
        const metaInfromation = await metaInformationDB.GET();
        const fb_id = contentScripts.accountInfo().id;
        if(await sendUnsentMessageDB.GET()==null){
            console.log('getting unsent messages');
        }
        


        // await workingStepDB.SET(null);
        // contentScripts.pageRedirection(fixedData.workingUrls.home,'start sending new message');
        // const fb_id = contentScripts.accountInfo().id;
        // await contentScripts.waitWithVisual(100);
    },
    
};
const popupSetup = async()=>{
    console.log('popup');
    document.body.id ="POPUP";
    const metas = fixedData.metaInformation;
    const popupMetaDB = new ChromeStorage('metaInformation');
    let popupMetaValues = await popupMetaDB.GET();
    popupMetaValues = popupMetaValues==null?{}:popupMetaValues;
    const metaKeys = Object.keys(metas);
    for(let i=0;i<metaKeys.length;i++){
        const metaKey = metaKeys[i];
        const meta = metas[metaKey];
        if(meta.interactive==true){
            const label = document.createElement('label');
            label.innerText = meta.title;
            const input = document.createElement('input');
            input.setAttribute('type', meta.type);
            input.setAttribute('id', metaKey);
            // input.setAttribute('placeholder', meta.title);
            // input.setAttribute(meta.point, meta.defaultValue);
            if(popupMetaValues[metaKey]==null){
                popupMetaValues[metaKey] = meta.defaultValue;
            }
            input[meta.point] = popupMetaValues[metaKey];
            document.body.append(label,input);
        }else{
            // readd only
            const label = document.createElement('label');
            label.innerText = `${meta.title}: ${popupMetaValues[metaKey]}`;
            document.body.append(label);
        }
    }
    const saveButton = document.createElement('button');
    saveButton.innerText = 'Save';
    saveButton.addEventListener('click', async ()=>{
        for(let i=0;i<metaKeys.length;i++){
            if(metas[metaKeys[i]].interactive==true){
                const metaKey = metaKeys[i];
                const meta = metas[metaKey];
                popupMetaValues[metaKey] = document.getElementById(metaKey)[meta.point];
            }
        }
        await popupMetaDB.SET(popupMetaValues);
        window.close();
    });
    document.body.appendChild(saveButton);
}
const contentSetup = async()=>{
    contentScripts.setupConsoleBoard();
    if(await contentScripts.isProgramReady()){
        contentScripts.showDataOnConsole('Program is ready');
        if(contentScripts.isUserLoggedIn()){
            const workingStepDB = new ChromeStorage('workingStep');
            const workingStep = await workingStepDB.GET();
            switch(workingStep){
                case undefined:
                case null:
                    const isValidTimeToSendFirstMessage = await contentScripts.isValidTimeToSendFirstMessage();
                    await contentScripts.waitWithVisual(isValidTimeToSendFirstMessage.waitingTime);
                    if(isValidTimeToSendFirstMessage.status){
                        await contentScripts.sendNewSellerMessage();
                    }else{
                        const workingStepDB = new ChromeStorage('workingStep');
                        await workingStepDB.SET('collectUnseenMessage');
                        contentScripts.pageRedirection(fixedData.workingUrls.home,'start collecting unseen message');
                    }
                break;
                case 'collectUnseenMessage':
                    await contentScripts.collectUnseenMessage();
                break;
                case 'readUnseenMessage':
                    // await essentials.sleep(5000);
                    await contentScripts.readUnseenMessage();
                break;
                case 'sendUnsentMessage':
                    const isValidTimeToSendUnsentMessage = await contentScripts.isValidTimeToSendUnsentMessage();
                    if(isValidTimeToSendUnsentMessage){
                        await contentScripts.sendUnsentMessage();
                    }else{
                        const workingStepDB = new ChromeStorage('workingStep');
                        await workingStepDB.SET(null);
                        contentScripts.pageRedirection(fixedData.workingUrls.home,'start sending new message');
                    }
                break;
                default:
                    
                    console.log('what??');
                break;
            }
            // see if its time to start working
            // collect unseen messages url
            // get product code for unknown message thread
            // assign url code for products
            // visit each from last to collect messages
            // check if there any meesage need to send to seller
            // send one new message
        }else{
            contentScripts.showDataOnConsole('User is not logged in');
            const metaValues = await new ChromeStorage('metaInformation').GET();
            contentScripts.showDataOnConsole(`Account Email: ${metaValues.accountEmail}`);
            contentScripts.showDataOnConsole(`Account Password: ${metaValues.accountPassword}`);
        }
    }else{
        contentScripts.showDataOnConsole('Please Save required values and restart');
    }
}
(async ()=>{
    if(typeof window=== 'undefined'){
        console.log('background');
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
              switch(request.action){
                case 'userLogout':
                  chrome.cookies.remove({"url": 'https://facebook.com', "name": 'c_user'}, function(cookie) {});
                  sendResponse('success');
                break;
              }
            }
        );
    }else{
        if(window.location.href.includes('chrome-extension')){
            await popupSetup();
        }else{
            // await essentials.sleep(5000);
            await contentSetup();
        }
    }
})();
// named the group
// changed the group photo
// removed the item from Marketplace
// sold
// changed the listing title
// reduced the price


// license plate
// https://www.faxvin.com/license-plate-lookup/result?plate=959ECL&state=IN
// https://vincheck.info/prepare-license-search.php?state=IN&plate=959ECL
// https://www.autocheck.com/consumer-api/meta/v1/summary/plate/959ECL/state/IN -- https://www.autocheck.com/vehiclehistory/search-by-license-plate
// https://www.vinfreecheck.com/free-license-plate-lookup




// if(readUnseenMessage.unknownIds.length>0){
//     const unknownId = readUnseenMessage.unknownIds[0];
//     if(window.location.href != `${fixedData.workingUrls.unknownMessageSuffix}${unknownId}`){
//         contentScripts.pageRedirection(`${fixedData.workingUrls.unknownMessageSuffix}${unknownId}`,`Redirecting to unknown message ${unknownId}`);
//     }else{
//         const postUrl = document.querySelector(fixedData.workingSelectors.readMessage.postUrl);
//         const postId = postUrl.href.match(/\d+/g)[0];
//         readUnseenMessage.unknownIds.shift();
//         readUnseenMessage.postIds.push(postId);
//         await readUnseenMessageDB.SET(readUnseenMessage);
//         if(readUnseenMessage.unknownIds.length>0){
//             contentScripts.pageRedirection(`${fixedData.workingUrls.unknownMessageSuffix}${readUnseenMessage.unknownIds[0]}`,`Redirecting to unknown message ${readUnseenMessage.unknownIds[0]}`);
//         }else{
//             if(readUnseenMessage.postIds.length>0){
//                 contentScripts.pageRedirection(`${fixedData.workingUrls.sellerMessageSuffix}${readUnseenMessage.postIds[0]}`,`Redirecting to post ${readUnseenMessage.postIds[0]}`);
//             }else{
//                 await workingStepDB.SET('sentUnsentMessage');
//                 await readUnseenMessageDB.SET(null);
//                 contentScripts.pageRedirection(fixedData.workingUrls.home,'Starting sending unsent message');
//             }
//         }
//     }

// }else 



// {
//     contentScripts.showDataOnConsole(`Unseen Messages: ${unseenMessageIds.length}`);
//     const metaInformation = await new ChromeStorage('metaInformation').GET();
//     const domain = metaInformation.domain;
//     try{
//         const unseenMessageResultJSON = await fetch(`${domain}/extension/unseenMessageIDs`,{
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 ids: unseenMessageIds,
//                 fb_id: contentScripts.accountInfo().id
//             })
//         });
//         if(unseenMessageResultJSON.status==200){
//             const unseenMessageResult = await unseenMessageResultJSON.json();
//             const workingStepDB = new ChromeStorage('workingStep');
//             const readUnseenMessageDB = new ChromeStorage('readUnseenMessage');
//             await readUnseenMessageDB.SET(unseenMessageResult);
//             await workingStepDB.SET('readUnseenMessage');
//             contentScripts.pageRedirection(fixedData.workingUrls.home,'Start Reading Unseen Messages');
//         }else{
//             contentScripts.showDataOnConsole('server error sending unseen message ids');
//         }
//     }catch(e){
//         contentScripts.showDataOnConsole('server error sending unseen message ids');
//     }
// }