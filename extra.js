// const openMarketPlaceMessage = async ()=>{
//     const messengerItemsHolderSelector = `[aria-label="Chats"] .${('alzwoclg cqf1kptm cgu29s5g i15ihif8 sl4bvocy lq84ybu9 efm7ts3d om3e55n1 mfclru0v').split(' ').join('.')}`;
//     //wait for message item holder to appear
//     while(true){
//         console.log('inside loop')
//         const checkElement = document.querySelector(messengerItemsHolderSelector);
//         await sleep(1000);
//         if(checkElement){
//             console.log(checkElement);
//             break;
//         }
//     }
//     let messageCount = 0;
//     let timingCount = 0;
//     const messengerAllItemsSelector = `${messengerItemsHolderSelector} .om3e55n1 > [data-testid="mwthreadlist-item-open"]`;
//     const messengerMarketplaceSelector = `${messengerItemsHolderSelector} .om3e55n1 > [data-testid="mwthreadlist-item"]`;
//     while(!(timingCount>120 || messageCount>100)){
//         const marketplaceAppeared = document.querySelector(messengerMarketplaceSelector);
//         if(marketplaceAppeared){
//             if(marketplaceAppeared.textContent.includes('Marketplace')){
//                 console.log('Marketplace message found');
//                 break;
//             }
//         }else{
//             await sleep(5000);
//             timingCount++;
//             messageCount = document.querySelectorAll(messengerAllItemsSelector).length;
//             document.querySelector(messengerItemsHolderSelector).scrollTop +=1000;
//         }
//     }
//     const messengerMarketplace = document.querySelector(messengerMarketplaceSelector);
//     if(messengerMarketplace){
//         const marketplaceButton = messengerMarketplace.querySelector('[role="button"]');
//         marketplaceButton.click();
//     }else{
//         console.log('Marketplace message not found');
//     }
// };
// const getCarVinFromText = (text)=>{
//     text = text+'';
//     text = text.toUpperCase();
//     text = text.replace(/[^A-Z0-9]/g, '');
//     const vinRegex = /([A-HJ-NPR-Z\d]{8})([X\d]{1})([E-HJ-NPR-TV]{1})([A-HJ-NPR-Z\d]{2})([\d]{5})/;
//     const vinMatch = vinRegex.exec(text);
//     let vin = '';
//     if(vinMatch){
//         vin = vinMatch[0];
//         const beforeCheckDigit = vin.substring(0, 8);
//         const checkDigit = vin.substring(8, 9)=="X"?"10":parseInt(vin.substring(8, 9));
//         const afterCheckDigit = vin.substring(9);
//         const stringWithoutCheckDigit = beforeCheckDigit + afterCheckDigit;
//         const changeLetterToNumberValue = (letter)=>{
//             // no i,O,Q
//             letter = letter.replace(/[AJ]/g, '1');
//             letter = letter.replace(/[BKS]/g, '2');
//             letter = letter.replace(/[CLT]/g, '3');
//             letter = letter.replace(/[DMU]/g, '4');
//             letter = letter.replace(/[ENV]/g, '5');
//             letter = letter.replace(/[FW]/g, '6');
//             letter = letter.replace(/[GPX]/g, '7');
//             letter = letter.replace(/[HY]/g, '8');
//             letter = letter.replace(/[RZ]/g, '9');
//             return letter;
//         };
//         const numberWithoutCheckDigit = changeLetterToNumberValue(stringWithoutCheckDigit);
//         const numberWeights = [8, 7, 6, 5, 4, 3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2];
//         const numberArray = numberWithoutCheckDigit.split('');
//         let sum = 0;
//         for(let i=0; i<numberArray.length; i++){
//             sum += numberArray[i]*numberWeights[i];
//         }
//         const checkDigitCalculatedValue = sum%11;
//         if(checkDigitCalculatedValue==checkDigit){
//             return vin;
//         }else{
//             console.log('Wrong Vin');
//             return null;
//         }
//     }else{
//         console.log('No vin found');
//         return null;
//     }
// }

// const aString ='rimon';
// const bString = 'kimot';

// const isBStringSubString = ({aString,bString})=>{
//     for(let i=0;i<aString.length;i++){
//         if(aString[i]==bString[0]){
//             for(let j=0,k=i,l=0;l<bString.length;j++,k++,l++){

//                 if(aString[k]!=bString[j]){
//                     j--;
//                     // break;
//                 }
//                 if(l+1==bString.length){
//                     return true;
//                 }
//             }
//         }
//     }
//     return false;
// };

// console.log(isBStringSubString({
//     aString: 'Rimon',
//     bString: 'im8n'
// }));

// (async()=>{
// 	const deleteItem = async(item_id)=>{
//         console.log('workinh on '+ item_id)
//         const query = `
//             mutation {
//                 archive_item(item_id: ${item_id}) {
//                     id
//                 }
//             }
//         `;
//         mondayJSON = await fetch (`https://api.monday.com/v2`,
//             {
//                 cache: "no-cache",
//                 method: 'post',
//                 headers:{
//                     'Content-Type': 'application/json',
//                     'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3MjU1MTMxNiwidWlkIjozMDI3MzE5NCwiaWFkIjoiMjAyMi0wNy0yN1QyMzowMzowNC4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6ODg0NzExMCwicmduIjoidXNlMSJ9.OsVnuCUSnm-FF21sjAND10cWEKN9-UIqIkNx6Rz8Bfo'
//                 },
//                 body: JSON.stringify({query})
//             }
//         );
//         console.log(await mondayJSON.json())
//         serverJSON = await fetch(`https://xentola.com/extension/serverLinkGoneUpdate`,{
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({
//                         item_id: `${item_id}`,
//                         fb_id: ``
//                     })
//         });
//         console.log(await serverJSON.json())
//     }
//     const sleep  = async(ms)=>{
//         return new Promise(resolve=>{
//             setTimeout(resolve, ms)
//         })
//     }
//     const a = [3695283607,3695283673,3695284116,3695284125,3695283693,3695283774,3695283851,3695283879,3695283892,3695284137,3695283736,3695283573,3695283812,3695283635,3695283505,3695283567,3695283818,3695283857,3695283926,3695284051,3695284106,3695283681,3695283927,3695284098,3695284094,3689196232,3689196270,3689196437,3689196236,3689196313,3689196400,3689196451,3689196057,3689196429,3689196376,3689196275,3689196326,3689196351,3689196072,3689196138,3689196248,3689196047,3689196096,3689196190,3689196435,3689196052,3689196132,3689196328,3689196583,3689196281,3689196059,3689196374,3689196019,3689196206,3689196220,3689196383,3689196345,3689196363,3689196015,3689196336,3689196490,3689196511,3689195998,3682867851,3682868320,3682867892,3682867979,3682868591,3682867791,3682868113,3682868325,3682868343,3682867923,3682868025,3682868104,3682868134,3682868456,3682867833,3682868686,3682868123,3682868190,3682868430,3682868479,3682868541,3682868621,3682868070,3682867761,3682868572,3682867930,3682867964,3682868361,3682867773,3682867843,3682868036,3682868230];
// 	for(let i=1;i<a.length;i++){
//         console.log(`working on ${i} of ${a.length}`);
//         await deleteItem(a[i]);
//         // await sleep(1000);
// 	}
// })();


// await fetch('https://vision.googleapis.com/v1/images:annotate?key=', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         "requests": [
//             {
//                 "image": {
//                     "content": imageContent
//                 },
//                 "features": [
//                     {
//                         "type": "DOCUMENT_TEXT_DETECTION"
//                     }
//                 ]
//             }
//         ]
//     })
// });
// // base64 from image url

// (async()=>{
//     const base64EncodedImageFromUrl = async (url) => {
//         const response = await fetch(url);
//         const blob = await response.blob();
//         return await new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onloadend = () => resolve(reader.result);
//             reader.onerror = reject;
//             reader.readAsDataURL(blob);
//         });
//     }
//     const a = await base64EncodedImageFromUrl('https://scontent-dfw5-2.xx.fbcdn.net/v/t1.15752-9/316867429_526013892569617_8159594848875509731_n.jpg?stp=cp0_dst-jpg_e15_fr_q65&_nc_cat=106&ccb=1-7&_nc_sid=58c789&efg=eyJpIjoidCJ9&_nc_ohc=H_AwvcudsmwAX_YCzKx&_nc_oc=AQmXheyBwMByNDrUIt8ZRq0gn2mkq7pkmBIMWNSlNv5fy9cpaEsYsAThZU47MY8fJis&_nc_ht=scontent-dfw5-2.xx&oh=03_AdRgujJVCBcLlRYmxjEq0PxNpK9QxtYDiYBpXUlMj4ptcQ&oe=63B15F59');
//     // console.log(a.replace(/^data:image\/?[A-z]*;base64,/,''));
//     let result = {};
//     if(a.match(/^data:image\/?[A-z]*;base64,/)){
//         result = {
//             status: true,
//             image: a.replace(/^data:image\/?[A-z]*;base64,/,'')
//         }
//     }else{
//         result = {
//             status: false
//         }
//     }
//     console.log(result);
//     return result;
// });

// const input = [
//     [1,2,3,4,5],
//     [2,3,4],
//     [1,2,3,4]
// ];
// let output = input[0];
// for(let i=0;i<input.length;i++){
//     const remove = [];
//     for(j=0;j<output.length;j++){
//         if(!input[i].includes(output[j])){
//             console.log(`deleting on ${i} :${output[j]}`);
//             remove.push(output[j]);
//         }
//     }
//     for(let j=0;j<remove.length;j++){
//         const index = output.indexOf(remove[j]);
//         if(index!=-1){
//             output.splice(index,1);
//         }
//     }
// }


