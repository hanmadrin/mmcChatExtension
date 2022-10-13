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
        skipSendingNewMessages:{
            title: 'Skip Sending New Messages',
            type: 'checkbox',
            defaultValue: false,
            point: 'checked',
            interactive: true,
            requiredToStart: false,
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
            defaultValue: 3,
            point: 'value',
            interactive: true,
            requiredToStart: true,
        },
        checkMessageDaysLimit:{
            title: 'Check message days limit',
            type: 'number',
            defaultValue: 3,
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
            defaultValue: 'https://xentola.com',
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
        home: 'https://m.facebook.com/?tbua=1',
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
            askForDetailsButton: '[type="submit"][value="Ask for Details"]',
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
        },
        sendUnsentMessage:{
            sold: `.${'_a58 _9_7 _2rgt _1j-g _2rgt'.split(' ').join('.')}`,
            messageInput: 'form [name="message"]',
            sendButton: 'button[type="submit"][value="Send"]',
        }
    },
    limits:{
        loadMessages: 10,
        // lastUnreadMesaage: (86400*3),
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
                date: 'date4'
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
    accountInfo : async()=>{
        const accountInfoDB = new ChromeStorage('accountInfo');
        let id = '';
        let name = '';
        try{
            const infos = JSON.parse(document.body.textContent.match(/{"ACCOUNT_ID":.+?}/)[0]);
            id = infos.ACCOUNT_ID;
            name = infos.NAME;
            await accountInfoDB.SET({id, name});
        }catch(e){
            const infos = await accountInfoDB.GET();
            id = infos.id;
            name = infos.name;
        }

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
            const metaInformationDB = new ChromeStorage('metaInformation');
            const metaInformation = await metaInformationDB.GET();
            const debugModeSwitch = metaInformation.debugModeSwitch;
            if(debugModeSwitch){
                const redirectButton = document.createElement('button');
                redirectButton.innerText = 'Redirect';
                redirectButton.onclick = ()=>{
                    window.location.href = url;
                }
                const consoleBoard = document.getElementById(fixedData.workingSelectors.content.console);
                consoleBoard.appendChild(redirectButton);
            }else{
                window.location.href = url;
            }
            
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
            body: JSON.stringify({fb_message_id: `${fb_message_id}`})
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
                const query1 = `
                    mutation {
                        archive_item(item_id: ${item_id}) {
                            id
                        }
                    }
                `;
                const itemDataJSON1 = await mondayFetch(query1);
                const itemData1 = await itemDataJSON1.json();
            }
            const metaInformationDB = new ChromeStorage('metaInformation');
            const metaInfromation = await metaInformationDB.GET();
            
            const serverLinkGoneUpdate = await fetch(`${metaInfromation.domain}/extension/serverLinkGoneUpdate`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({item_id: `${item_id}`})
            });
        }
    },
    markItemAsSecondMessage: async (item_id)=>{
        console.log('marking item as second message');
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
            if(boardId==fixedData.mondayFetch.borEffortBoardId){
                const columnId = fixedData.mondayFetch.columnValuesIds.borEffortBoard.status;
                const query = `
                    mutation {
                        change_simple_column_value(
                            item_id: ${item_id}, 
                            board_id: ${boardId}, 
                            column_id: "${columnId}", 
                            value: "2nd 1st Msg") {
                            id
                        }
                    }
                `;
                const itemDataJSON = await mondayFetch(query);
                const itemData = await itemDataJSON.json();
            }
        }
    },
    readCurrentMessage: async ()=>{
        contentScripts.showDataOnConsole('Reading current message');
        const accountInfo = await contentScripts.accountInfo();
        const messageData = [];
        let messages = document.querySelectorAll(fixedData.workingSelectors.readMessage.SingleMessages);
        for(let i=0;i<messages.length;i++){
            messages = document.querySelectorAll(fixedData.workingSelectors.readMessage.SingleMessages);
            let message = messages[i];
            const messageInfo = JSON.parse(message.getAttribute('data-store'));
            const timestamp = messageInfo.timestamp;
            const sent_from = (messageInfo.author==accountInfo.id || messageInfo.author==accountInfo.name)?'me':'seller';
            const text = message.querySelector(':scope > span');
            let attachment = message.querySelector(':scope > div');
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
                messages = document.querySelectorAll(fixedData.workingSelectors.readMessage.SingleMessages);
                message = messages[i];
                attachment = message.querySelector(':scope > div');
                let images = attachment.querySelectorAll('img,i');
                for(let j=0;j<images.length;j++){
                    await essentials.sleep(1000);
                    messages = document.querySelectorAll(fixedData.workingSelectors.readMessage.SingleMessages);
                    message = messages[i];
                    attachment = message.querySelector(':scope > div');
                    images = attachment.querySelectorAll('img,i');
                    const image = images[j];
                    const tagName = image.tagName.toLowerCase();
                    let imageSrc = '';
                    if(tagName=='img'){
                        imageSrc = image.src;
                    }else{
                        imageSrc = image.style.backgroundImage.replace('url(','').replace(')','').replace(/\"/gi, "");
                    }
                    console.log(image);
                    const attachmentLink = image.closest('.msg').querySelector('a');
                    let url = '';
                    let fileType = '';
                    if(attachmentLink){
                        const onpageUrl = attachmentLink.getAttribute('href');
                        if(onpageUrl.includes("https://") && !onpageUrl.includes("https://facebook.com")){
                            url = onpageUrl;
                            fileType = 'link';
                        }else{
                            url = await contentScripts.retrieveAttachementUrl(document.querySelector(`[href="${onpageUrl}"]`));
                            fileType = contentScripts.getFileTypeFromUrl(url);
                        }
                    }else{
                        url = imageSrc;
                        fileType = contentScripts.getFileTypeFromUrl(url);
                    }
                    
                    console.log(imageSrc)
                    const imageData = {
                        type: fileType,
                        sent_from,
                        message: url,
                        timestamp,
                        fb_id: accountInfo.id,
                        status: 'done'
                    }
                    messageData.push(imageData);

                    // const imageData = {
                    //     type: 'image',
                    //     sent_from,
                    //     message: imageSrc,
                    //     timestamp,
                    //     fb_id: accountInfo.id,
                    //     status: 'done'
                    // }
                    // messageData.push(imageData);
                }
            }
        }
        return messageData;
    },
    getFileTypeFromUrl: (url)=>{
        url = new URL(url);
        const path = url.pathname;
        const urlData = path.split('.');
        const type = urlData[urlData.length-1];
        const imageTypes = ['jpg','jpeg','png','gif','bmp','svg','webp'];
        if(imageTypes.includes(type)){
            return 'image';
        }else{
            return 'file';
        }
    },
    retrieveAttachementUrl: async (image)=>{
        image.click();
        let url = '';
        while(true){
            await essentials.sleep(1000);
            contentScripts.showDataOnConsole('Waiting for image to load');
            if(window.location.href.includes('https://m.facebook.com/messages/attachment_preview') || window.location.href.includes('https://m.facebook.com/messages/attachment_confirm')){
                const attachmentLinks = [...document.querySelectorAll('a')].filter((a)=>a.innerText=='Download'||a.innerText=='Open');
                const closeLinks = [...document.querySelectorAll('a')].filter((a)=>a.innerText=='Close'||a.innerText=='Cancel');
                if(attachmentLinks.length==1 && closeLinks.length!=0){
                    url = attachmentLinks[0].href;
                    closeLinks[closeLinks.length-1].click();
                    break;
                }
            }else{
                contentScripts.showDataOnConsole('Waiting for page to load');
            }
        }
        while(true){
            await essentials.sleep(1000);
            contentScripts.showDataOnConsole('Waiting for image to close');
            if(window.location.href.includes('https://m.facebook.com/messages/read/')){
                break;
            }
        }
        return url;
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
            body: JSON.stringify({fb_post_id: `${fb_post_id}`})
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
            body: JSON.stringify({fb_post_id: `${fb_post_id}`})
        });
        const itemIdData = await itemIdDataJSON.json();
        return itemIdData.item_id;
    },
    postIdByItemId: async (item_id)=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const postIdDataJSON = await fetch(`${metaInfromation.domain}/extension/postIdByItemId`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({item_id: `${item_id}`})
        });
        const postIdData = await postIdDataJSON.json();
        return postIdData.fb_post_id;
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
        const fb_id = (await contentScripts.accountInfo()).id;
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const domain = metaInfromation.domain;
        const unsentMessagesDataJSON = await fetch(`${domain}/extension/getUnsentMessagePostIds`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fb_id: `${fb_id}`})
        });
        const unsentMessagesData = await unsentMessagesDataJSON.json();
        return unsentMessagesData.post_ids;
    },
    getUnsentMessagesByPostId: async (fb_post_id)=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const domain = metaInfromation.domain;
        const unsentMessagesDataJSON = await fetch(`${domain}/extension/getUnsentMessagesByPostId`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fb_post_id: `${fb_post_id}`})
        });
        const unsentMessagesData = await unsentMessagesDataJSON.json();
        return unsentMessagesData.messages;
    },
    isValidMessageInSellerMessage: ()=>{
        // "left the group"
        // "Sold"
        // "removed the item from Marketplace"
        const error = document.body.innerText.includes('Sorry, something went wrong');
        const removed = document.body.innerText.includes('removed the item from Marketplace');
        const soldHolder = document.querySelector(fixedData.workingSelectors.sendUnsentMessage.sold);
        let sold = false;
        if(soldHolder){
            sold = soldHolder.innerText.includes('Sold');
        }
        console.log(`error: ${error}, removed: ${removed}, sold: ${sold}`);
        return !(error || removed || sold);
    },
    markMessageAsSent: async ( messageId)=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const domain = metaInfromation.domain;
        const markMessageAsSentJSON = await fetch(`${domain}/extension/markMessageAsSent`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message_id:`${messageId}`})
        });
        const markMessageAsSent = await markMessageAsSentJSON.json();
        return markMessageAsSent;
    },
    markItemMessagesdone: async (itemId)=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const domain = metaInfromation.domain;
        const markItemMessagesdoneJSON = await fetch(`${domain}/extension/markItemMessagesdone`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({item_id:`${itemId}`})
        });
        const markItemMessagesdone = await markItemMessagesdoneJSON.json();
        return markItemMessagesdone;
    },
    waitWithVisual: async (waitingTime)=>{
        waitingTime = parseInt(waitingTime);
        let stopTimer = false;
        const timer = document.createElement('div');
        timer.classList.add('font-header');
        const consoleBoard = document.getElementById(fixedData.workingSelectors.content.console);
        consoleBoard.replaceChildren(timer);
        const stopButton = document.createElement('button');
        stopButton.innerText = 'Stop';
        stopButton.classList.add('btn','btn-danger','btn-sm');
        stopButton.addEventListener('click',()=>{
            stopTimer = true;
        }); 
        consoleBoard.appendChild(stopButton);
        for(let i = waitingTime;i>=0;i--){
            timer.innerText = `Waiting for ${i} seconds`;
            await essentials.sleep(1000);
            if(stopTimer){
                break;
            }
        }
    },
    hasRepliesToSend: async ()=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const domain = metaInfromation.domain;
        const fb_id = (await contentScripts.accountInfo()).id;
        const hasRepliesToSendJSON = await fetch(`${domain}/extension/hasRepliesToSend`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fb_id:`${fb_id}`})
        });
        const hasRepliesToSend = await hasRepliesToSendJSON.json();
        return hasRepliesToSend;
    },
    hasSecondMessageToSend: async ()=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const domain = metaInfromation.domain;
        const fb_id = (await contentScripts.accountInfo()).id;
        const hasSecondMessageToSendJSON = await fetch(`${domain}/extension/hasSecondMessageToSend`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fb_id:`${fb_id}`})
        });
        const hasSecondMessageToSend = await hasSecondMessageToSendJSON.json();
        return hasSecondMessageToSend;
    },
    setSecondMessage: async (item_id)=>{
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInfromation = await metaInformationDB.GET();
        const domain = metaInfromation.domain;
        const fb_id = (await contentScripts.accountInfo()).id;
        const setSecondMessageJSON = await fetch(`${domain}/extension/setSecondMessage`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({fb_id:`${fb_id}`,item_id:`${item_id}`})
        });
        const setSecondMessage = await setSecondMessageJSON.json();
        return setSecondMessage;
    },
    updateFirstMessageTime: async()=>{
        const firstMessageTimeDB = new ChromeStorage('firstMessageTime');
        firstMessageTimeDB.SET(new Date().getTime()/1000);
    },
    sendNewSellerMessage: async ()=>{ 
        const sendNewSellerMessageDB = new ChromeStorage('sendNewSellerMessage');
        const sendNewSellerMessage = await sendNewSellerMessageDB.GET();
        const workingStepDB = new ChromeStorage('workingStep');
        const metaInformationDB = new ChromeStorage('metaInformation');
        const metaInformation = await new ChromeStorage('metaInformation').GET();
        const skipSendingNewMessages = metaInformation.skipSendingNewMessages;
        if(skipSendingNewMessages){
            await sendNewSellerMessageDB.SET(null);
            await workingStepDB.SET('collectUnseenMessage');
            contentScripts.pageRedirection(fixedData.workingUrls.messages,'skipping sending new messages');
            return;
        }else{
            const hasRepliesToSend = await contentScripts.hasRepliesToSend();
            const hasSecondMessageToSend = await contentScripts.hasSecondMessageToSend();
            // if(hasRepliesToSend.status || hasSecondMessageToSend.status){
            if(hasRepliesToSend.status){
                await sendNewSellerMessageDB.SET(null);
                await workingStepDB.SET('collectUnseenMessage');
                contentScripts.pageRedirection(fixedData.workingUrls.messages,'has replies or second message to send');
                return;
            }
        }

        if(sendNewSellerMessage==null){
            const domain = metaInformation.domain;
            const newPostJSON = await fetch(`${domain}/extension/newPostId`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fb_id: `${(await contentScripts.accountInfo()).id}`,
                    fb_user_name: `${(await contentScripts.accountInfo()).name}`
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
                await contentScripts.waitWithVisual(60*5);
                await sendNewSellerMessageDB.SET(null);
                await workingStepDB.SET('collectUnseenMessage');               
                contentScripts.pageRedirection(fixedData.workingUrls.messages,'No raw Item to work With');
            }
        }else{
            if(sendNewSellerMessage.fb_post_id){
                contentScripts.showDataOnConsole('fb post id collected');
                await essentials.sleep(5000); 
                // const markAsLinkGone = async ()=>{
                //     contentScripts.showDataOnConsole('marking as "Link Gone"');
                //     const query1 = `
                //         mutation {
                //             change_simple_column_value(
                //                 item_id: ${sendNewSellerMessage.item_id}, 
                //                 board_id: ${fixedData.mondayFetch.borEffortBoardId}, 
                //                 column_id: "${fixedData.mondayFetch.columnValuesIds.borEffortBoard.status}", 
                //                 value: "Link Gone") {
                //                 id
                //             }
                //         }
                //     `;
                //     try{
                //         const LinkGoneDataJSON = await mondayFetch(query1);
                        
                //         const LinkGoneData = await LinkGoneDataJSON.json();
                        
                //         await sendNewSellerMessageDB.SET(null);               
                //         contentScripts.pageRedirection(fixedData.workingUrls.home,'Link gone getting new one');
                //     }catch(e){
                //         contentScripts.showDataOnConsole('Error marking as "Link Gone"');
                //     }
                // }
                const markAsFirstMessage = async ()=>{
                    contentScripts.showDataOnConsole('marking as "First Message"');
                    
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
                    const formatDateToMondayAmerican = ()=>{
                        const americanTime = new Date(new Date().toLocaleString('en-US', {timeZone: 'America/New_York'}));
                        let month = '' + (americanTime.getMonth() + 1);
                        let day = '' + americanTime.getDate();
                        let year = americanTime.getFullYear();
                    
                        if (month.length < 2) 
                            month = '0' + month;
                        if (day.length < 2) 
                            day = '0' + day;
                    
                        return [year, month, day].join('-');
                    }
                    const query2 = `
                        mutation {
                            change_simple_column_value(
                                item_id: ${sendNewSellerMessage.item_id}, 
                                board_id: ${fixedData.mondayFetch.borEffortBoardId}, 
                                column_id: "${fixedData.mondayFetch.columnValuesIds.borEffortBoard.date}", 
                                value: "${formatDateToMondayAmerican()}") {
                                id
                            }
                        }
                    `;
                    try{
                        const firstMessageDataJSON = await mondayFetch(query);
                        const dateDataJSON = await mondayFetch(query2);
                        const dateData = await dateDataJSON.json();
                        const firstMessageData = await firstMessageDataJSON.json();
                        const metaInformation = await metaInformationDB.GET();
                        const domain = metaInformation.domain;
                        const saveFirstMessageActionJSON = await fetch(`${domain}/extension/saveFirstMessageAction`,{
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                item_id: `${sendNewSellerMessage.item_id}`,
                                fb_post_id: `${sendNewSellerMessage.fb_post_id}`,
                                fb_id: `${(await contentScripts.accountInfo()).id}`,
                                fb_user_name: `${(await contentScripts.accountInfo()).name}`
                            })
                        });
                        if(saveFirstMessageActionJSON.status==200){

                            console.log('first message action saved');
                            await sendNewSellerMessageDB.SET(null);       
                            await workingStepDB.SET('collectUnseenMessage');
                            contentScripts.pageRedirection(fixedData.workingUrls.home,'Message Sent and unseen messages started');
                        }else{
                            contentScripts.showDataOnConsole('Error marking as "1st Message"');
                        }
                        
                    }catch(e){
                        contentScripts.showDataOnConsole('Error marking as "1st Message"');
                    }
                }
                if(window.location.href.indexOf('unavailable-product')!=-1){
                    console.log('unavailable-product');
                    // markAsLinkGone replacement
                    await contentScripts.markItemAsLinkGone(sendNewSellerMessage.item_id);
                    await sendNewSellerMessageDB.SET(null);               
                    contentScripts.pageRedirection(fixedData.workingUrls.home,'Link gone getting new one');
                    // await markAsLinkGone();
                }else{
                    if(window.location.href==`${fixedData.workingUrls.itemSuffix}${sendNewSellerMessage.fb_post_id}`){
                        
                        if(document.querySelector(fixedData.workingSelectors.newMessage.seeConversationButton)){
                            await markAsFirstMessage();
                            await contentScripts.updateFirstMessageTime();
                        }else if(document.querySelector(fixedData.workingSelectors.newMessage.askForDetailsButton)){
                            const accountInfo = await contentScripts.accountInfo();
                            const metaInformation = await metaInformationDB.GET();
                            const domain = metaInformation.domain;
                            const messageTextJSON = await fetch(`${domain}/extension/firstMessageText`,{
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            });
                            const messageText = await messageTextJSON.json();
                            await contentScripts.sendMessagesToServer([
                                {
                                    item_id : sendNewSellerMessage.item_id,
                                    type: 'text',
                                    sent_from:'me',
                                    message: messageText,
                                    timestamp: `${parseInt(new Date().getTime())}`,
                                    fb_id: accountInfo.id,
                                    status: 'unsent',
                                }
                            ]);
                            await markAsFirstMessage();
                        }else if(!document.querySelector('form [name="message"]')){
                            // markAsLinkGone replacement
                            await contentScripts.markItemAsLinkGone(sendNewSellerMessage.item_id);
                            await sendNewSellerMessageDB.SET(null);               
                            contentScripts.pageRedirection(fixedData.workingUrls.home,'Link gone getting new one');
                            // await markAsLinkGone();
                        }else if(document.querySelector('form [name="message"]')){
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
                                if(i>20){
                                    await sendNewSellerMessageDB.SET(null); 
                                    contentScripts.pageRedirection(fixedData.workingUrls.home,'Message Sent and unseen messages started');
                                    return null;
                                }
                            }
                            await markAsFirstMessage();
                            await contentScripts.updateFirstMessageTime();
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
                    sendNewSellerMessage.fb_post_id = `${postId}`;
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
                    await processUrlAndContinue(await setNameOnMondayAndCollectURL());
                }catch(e){
                    const contentConsole = document.getElementById(fixedData.workingSelectors.contentConsole);
                    const collectAgainButton = document.createElement('button');
                    collectAgainButton.innerText = 'Collect & Set Again';
                    collectAgainButton.addEventListener('click',async ()=>{
                        try{
                            await processUrlAndContinue(await setNameOnMondayAndCollectURL());
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
        const metaInformationDB = new ChromeStorage('metaInformation');
        if(window.location.href==fixedData.workingUrls.messages){
            let atttemptCount = 0;
            await essentials.sleep(5000);
            while(true){
                atttemptCount++;
                const allUnseenMessages = document.querySelectorAll(fixedData.workingSelectors.messages.unseenMessages);
                const allUnseenMarketplaceMessages = document.querySelectorAll(`${fixedData.workingSelectors.messages.allMessages} `);
                const moreMessagesButton = document.querySelector(fixedData.workingSelectors.messages.moreMessagesButton);
                const lastMessageTimeObject = allUnseenMessages.length!=0?allUnseenMessages[allUnseenMessages.length-1].querySelector(fixedData.workingSelectors.messages.timeStamp).getAttribute('data-store'):'{"time":0}';
                const lastMessageTime = JSON.parse(lastMessageTimeObject).time;
                const timeNow = (new Date().getTime())/1000;
                const metaInformation = await metaInformationDB.GET();
                const checkMessageDaysLimit = metaInformation.checkMessageDaysLimit;
                if(allUnseenMarketplaceMessages.length >= fixedData.limits.loadMessages || moreMessagesButton==null || (timeNow - lastMessageTime) >= checkMessageDaysLimit*86400){
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
                const metaInformation = await metaInformationDB.GET();
                const checkMessageDaysLimit = metaInformation.checkMessageDaysLimit;
                if((timeNow - unseenMessageTime) <= checkMessageDaysLimit*86400){
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
                const itemData = {fb_message_id:`${readUnseenMessage[0]}`};
                if(postUrl){
                    const postId = postUrl.href.match(/\d+/g)[0];
                    itemData.fb_post_id = `${postId}`;
                    itemData.fb_id = `${(await contentScripts.accountInfo()).id}`;
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
                                const messageDatas = await contentScripts.readCurrentMessage();
                                const lastMessageFromServer = await contentScripts.lastMessageOnServerByPostId(itemData.fb_post_id);
                                const item_id = await contentScripts.itemIdByPostId(itemData.fb_post_id);
                                let newMessageDatas = [];
                                for(let i = messageDatas.length-1;i>=0;i--){
                                    const messageData = messageDatas[i];
                                    messageData.item_id = `${item_id}`;
                                    const message = messageData.message;
                                    if(message.replace(/[^a-zA-Z0-9]/g,'')==lastMessageFromServer.replace(/[^a-zA-Z0-9]/g,'')){
                                        break;
                                    }else{
                                        newMessageDatas = [messageData].concat(newMessageDatas);
                                    }
                                }
                                console.log(newMessageDatas);
                                const readUnseenMessageCountDB = new ChromeStorage('readUnseenMessageCount');
                                const readUnseenMessageCount = await readUnseenMessageCountDB.GET() || 0;
                                for(let i=0;i<newMessageDatas.length;i++){
                                    if(newMessageDatas[i].type=='image'){
                                        if(newMessageDatas[i].message.includes('https://scontent.fdac')){
                                            if(readUnseenMessageCount<2){
                                                await readUnseenMessageCountDB.SET(readUnseenMessageCount+1);
                                                contentScripts.pageRedirection(window.location.href,'redirecting to collect better image');
                                                return null;
                                            }
                                        }
                                    }
                                }
                                await readUnseenMessageCountDB.SET(0);
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
        let sendUnsentMessage = await sendUnsentMessageDB.GET();
        const metaInfromation = await metaInformationDB.GET();
        // const fb_id = (await contentScripts.accountInfo()).id;
        const afterSendingMessage = async ()=>{
            sendUnsentMessage.shift();
            if(sendUnsentMessage.length==0){
                await workingStepDB.SET(null);
                await sendUnsentMessageDB.SET(null);
                contentScripts.pageRedirection(fixedData.workingUrls.home,'start sending new message');
            }else{
                await sendUnsentMessageDB.SET(sendUnsentMessage);
                const fb_post_id = sendUnsentMessage[0];
                contentScripts.pageRedirection(`${fixedData.workingUrls.sellerMessageSuffix}${fb_post_id}/`,'Redirecting to seller message page');
            }
        }
        if(sendUnsentMessage==null){
            const hasRepliesToSend = await contentScripts.hasRepliesToSend();
            console.log(hasRepliesToSend);
            if(hasRepliesToSend.status){
                contentScripts.showDataOnConsole('has replies to send');
                sendUnsentMessage = await contentScripts.getUnsentMessagePostIds();
                // console.log('unsent message post ids',sendUnsentMessage);
                // console.log(sendUnsentMessage);
                // console.log(`item_id: ${hasRepliesToSend.item_id}`);
                // const fb_post_id = await contentScripts.postIdByItemId(hasRepliesToSend.item_id);
                // console.log(`fb_post_id: ${fb_post_id}`);
                // sendUnsentMessage =[fb_post_id];
                // console.log(`postIds to send: ${sendUnsentMessage}`);
                await sendUnsentMessageDB.SET(sendUnsentMessage);
            }else{
                // contentScripts.showDataOnConsole('no replies but checking for second message');
                // const hasSecondMessageToSend = await contentScripts.hasSecondMessageToSend();
                // if(hasSecondMessageToSend.status){
                //     contentScripts.showDataOnConsole('has second message to send');
                //     await contentScripts.setSecondMessage(hasSecondMessageToSend.item_id);
                //     await contentScripts.markItemAsSecondMessage(hasSecondMessageToSend.item_id);
                //     const fb_post_id = await contentScripts.postIdByItemId(hasSecondMessageToSend.item_id);
                //     sendUnsentMessage = [fb_post_id];
                //     await sendUnsentMessageDB.SET(sendUnsentMessage);
                // }else{
                    contentScripts.showDataOnConsole('no second message to send');
                    await workingStepDB.SET(null);
                    await sendUnsentMessageDB.SET([]);
                    contentScripts.pageRedirection(fixedData.workingUrls.home,'start sending new message');
                // }
                
            }
        }
        if(sendUnsentMessage.length!=0){
            const fb_post_id = sendUnsentMessage[0];
            if(window.location.href!=`${fixedData.workingUrls.sellerMessageSuffix}${fb_post_id}/`){
                if(fb_post_id==null){
                    await afterSendingMessage();
                }else{
                    contentScripts.pageRedirection(`${fixedData.workingUrls.sellerMessageSuffix}${fb_post_id}/`,'Redirecting to seller message page');
                }
            }else{
                const validTosendMessage = contentScripts.isValidMessageInSellerMessage();
                if(validTosendMessage){
                    const messages = await contentScripts.getUnsentMessagesByPostId(fb_post_id);
                    if(messages.length!=0){
                        await essentials.sleep(5000);
                        for(let i=0;i<messages.length;i++){
                            const messageData = messages[i];
                            if(messageData==null){
                                await afterSendingMessage();
                            }else{
                                const message = messageData.message;
                                const all_content = document.body.innerText.replace(/[^a-zA-Z0-9]/g,'');
                                const message_content = message.replace(/[^a-zA-Z0-9]/g,'');
                                if(all_content.includes(message_content)){
                                    await contentScripts.markMessageAsSent(messageData.id);
                                    await contentScripts.updateFirstMessageTime();
                                    if(i==messages.length-1){
                                        // updateFirstMessageTime
                                        await afterSendingMessage();
                                    }
                                }else{
                                    await essentials.sleep(5000);
                                    const messageInput = document.querySelector(fixedData.workingSelectors.sendUnsentMessage.messageInput);
                                    messageInput.value = message;
                                    const sendButton = document.querySelector(fixedData.workingSelectors.sendUnsentMessage.sendButton);
                                    sendButton.click();
                                    break;
                                }
                            }
                        }
                        contentScripts.showDataOnConsole('program should not be stucked here');
                    }else{
                        await afterSendingMessage();
                    }
                    
                }else{
                    const item_id = await contentScripts.itemIdByPostId(fb_post_id);
                    await contentScripts.markItemAsLinkGone(item_id);
                    await contentScripts.markItemMessagesdone(item_id);
                    await afterSendingMessage();
                }
                
            }

        }else{
            console.log('redirecting to home to start sending new message');
            await workingStepDB.SET(null);
            await sendUnsentMessageDB.SET(null);
            contentScripts.pageRedirection(fixedData.workingUrls.home,'start sending new message');
        }
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
    // testing-start
    // const messages = await contentScripts.readCurrentMessage();
    // console.log(messages);
    // testing-end
    if(await contentScripts.isProgramReady()){
        contentScripts.showDataOnConsole('Program is ready');
        if(contentScripts.isUserLoggedIn()){
            const workingStepDB = new ChromeStorage('workingStep');
            const workingStep = await workingStepDB.GET();
            const isValidTimeToSendFirstMessage = await contentScripts.isValidTimeToSendFirstMessage();
            switch(workingStep){
                case undefined:
                case null:
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
                    // await contentScripts.waitWithVisual(isValidTimeToSendFirstMessage.waitingTime);
                    // const isValidTimeToSendUnsentMessage = await contentScripts.isValidTimeToSendUnsentMessage();
                    if(isValidTimeToSendFirstMessage.status){
                        await contentScripts.waitWithVisual(isValidTimeToSendFirstMessage.waitingTime);
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

            await contentSetup();
        }
    }
})();



// license plate
// https://www.faxvin.com/license-plate-lookup/result?plate=959ECL&state=IN
// https://vincheck.info/prepare-license-search.php?state=IN&plate=959ECL
// https://www.autocheck.com/consumer-api/meta/v1/summary/plate/959ECL/state/IN -- https://www.autocheck.com/vehiclehistory/search-by-license-plate
// https://www.vinfreecheck.com/free-license-plate-lookup`