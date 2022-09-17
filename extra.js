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