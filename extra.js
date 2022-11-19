const openMarketPlaceMessage = async ()=>{
    const messengerItemsHolderSelector = `[aria-label="Chats"] .${('alzwoclg cqf1kptm cgu29s5g i15ihif8 sl4bvocy lq84ybu9 efm7ts3d om3e55n1 mfclru0v').split(' ').join('.')}`;
    //wait for message item holder to appear
    while(true){
        console.log('inside loop')
        const checkElement = document.querySelector(messengerItemsHolderSelector);
        await sleep(1000);
        if(checkElement){
            console.log(checkElement);
            break;
        }
    }
    let messageCount = 0;
    let timingCount = 0;
    const messengerAllItemsSelector = `${messengerItemsHolderSelector} .om3e55n1 > [data-testid="mwthreadlist-item-open"]`;
    const messengerMarketplaceSelector = `${messengerItemsHolderSelector} .om3e55n1 > [data-testid="mwthreadlist-item"]`;
    while(!(timingCount>120 || messageCount>100)){
        const marketplaceAppeared = document.querySelector(messengerMarketplaceSelector);
        if(marketplaceAppeared){
            if(marketplaceAppeared.textContent.includes('Marketplace')){
                console.log('Marketplace message found');
                break;
            }
        }else{
            await sleep(5000);
            timingCount++;
            messageCount = document.querySelectorAll(messengerAllItemsSelector).length;
            document.querySelector(messengerItemsHolderSelector).scrollTop +=1000;
        }
    }
    const messengerMarketplace = document.querySelector(messengerMarketplaceSelector);
    if(messengerMarketplace){
        const marketplaceButton = messengerMarketplace.querySelector('[role="button"]');
        marketplaceButton.click();
    }else{
        console.log('Marketplace message not found');
    }
};
const getCarVinFromText = (text)=>{
    text = text.toUpperCase();
    text = text.replace(/[^A-Z0-9]/g, '');
    const vinRegex = /([A-HJ-NPR-Z\d]{8})([X\d]{1})([E-HJ-NPR-TV]{1})([A-HJ-NPR-Z\d]{2})([\d]{5})/;
    const vinMatch = vinRegex.exec(text);
    let vin = '';
    if(vinMatch){
        vin = vinMatch[0];
        const beforeCheckDigit = vin.substring(0, 8);
        const checkDigit = vin.substring(8, 9)=="X"?"10":parseInt(vin.substring(8, 9));
        const afterCheckDigit = vin.substring(9);
        const stringWithoutCheckDigit = beforeCheckDigit + afterCheckDigit;
        const changeLetterToNumberValue = (letter)=>{
            // no i,O,Q
            letter = letter.replace(/[AJ]/g, '1');
            letter = letter.replace(/[BKS]/g, '2');
            letter = letter.replace(/[CLT]/g, '3');
            letter = letter.replace(/[DMU]/g, '4');
            letter = letter.replace(/[ENV]/g, '5');
            letter = letter.replace(/[FW]/g, '6');
            letter = letter.replace(/[GPX]/g, '7');
            letter = letter.replace(/[HY]/g, '8');
            letter = letter.replace(/[RZ]/g, '9');
            return letter;
        };
        const numberWithoutCheckDigit = changeLetterToNumberValue(stringWithoutCheckDigit);
        const numberWeights = [8, 7, 6, 5, 4, 3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2];
        const numberArray = numberWithoutCheckDigit.split('');
        let sum = 0;
        for(let i=0; i<numberArray.length; i++){
            sum += numberArray[i]*numberWeights[i];
        }
        const checkDigitCalculatedValue = sum%11;
        if(checkDigitCalculatedValue==checkDigit){
            return vin;
        }else{
            console.log('Wrong Vin');
            return null;
        }
    }else{
        console.log('No vin found');
        return null;
    }
}
// 1G1ZE5ST7HF216961
a = getCarVinFromText(` I get home I will take som1G1ZE5ST7  HF216961e pictures and se1G1ZE5ST7HF216962nd them to you but mechanical165431`);
const prepareOutgoingMessage= ()=>{
        
};

console.log(prepareOutgoingMessage());