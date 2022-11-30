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
    text = text+'';
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
// a = getCarVinFromText(` I get home I will take som1G1ZE5ST7  HF216961e pictures and se1G1ZE5ST7HF216962nd them to you but mechanical165431`);

console.log(getCarVinFromText(`{
    "cropHintsAnnotation": {
      "cropHints": [
        {
          "boundingPoly": {
            "vertices": [
              {
                "x": 89
              },
              {
                "x": 1265
              },
              {
                "x": 1265,
                "y": 1470
              },
              {
                "x": 89,
                "y": 1470
              }
            ]
          },
          "confidence": 0.3458416,
          "importanceFraction": 1
        },
        {
          "boundingPoly": {
            "vertices": [
              {},
              {
                "x": 1471
              },
              {
                "x": 1471,
                "y": 1470
              },
              {
                "y": 1470
              }
            ]
          },
          "confidence": 0.27667323,
          "importanceFraction": 1
        },
        {
          "boundingPoly": {
            "vertices": [
              {},
              {
                "x": 1765
              },
              {
                "x": 1765,
                "y": 1470
              },
              {
                "y": 1470
              }
            ]
          },
          "confidence": 0.23056102,
          "importanceFraction": 1
        }
      ]
    },
    "fullTextAnnotation": {
      "pages": [
        {
          "blocks": [
            {
              "blockType": "TEXT",
              "boundingBox": {
                "vertices": [
                  {
                    "x": -50,
                    "y": 135
                  },
                  {
                    "x": 1174,
                    "y": -59
                  },
                  {
                    "x": 1243,
                    "y": 377
                  },
                  {
                    "x": 19,
                    "y": 572
                  }
                ]
              },
              "confidence": 0.96730745,
              "paragraphs": [
                {
                  "boundingBox": {
                    "vertices": [
                      {
                        "x": 362,
                        "y": 92
                      },
                      {
                        "x": 661,
                        "y": 22
                      },
                      {
                        "x": 670,
                        "y": 63
                      },
                      {
                        "x": 372,
                        "y": 133
                      }
                    ]
                  },
                  "confidence": 0.8938517,
                  "words": [
                    {
                      "boundingBox": {
                        "vertices": [
                          {
                            "x": 362,
                            "y": 92
                          },
                          {
                            "x": 661,
                            "y": 22
                          },
                          {
                            "x": 670,
                            "y": 63
                          },
                          {
                            "x": 372,
                            "y": 133
                          }
                        ]
                      },
                      "confidence": 0.8938517,
                      "property": {
                        "detectedLanguages": [
                          {
                            "confidence": 1,
                            "languageCode": "en"
                          }
                        ]
                      },
                      "symbols": [
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 362,
                                "y": 92
                              },
                              {
                                "x": 411,
                                "y": 81
                              },
                              {
                                "x": 420,
                                "y": 121
                              },
                              {
                                "x": 371,
                                "y": 132
                              }
                            ]
                          },
                          "confidence": 0.9094712,
                          "text": "C"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 393,
                                "y": 85
                              },
                              {
                                "x": 455,
                                "y": 70
                              },
                              {
                                "x": 465,
                                "y": 110
                              },
                              {
                                "x": 402,
                                "y": 125
                              }
                            ]
                          },
                          "confidence": 0.9013513,
                          "text": "A"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 463,
                                "y": 69
                              },
                              {
                                "x": 513,
                                "y": 57
                              },
                              {
                                "x": 522,
                                "y": 97
                              },
                              {
                                "x": 472,
                                "y": 109
                              }
                            ]
                          },
                          "confidence": 0.8838376,
                          "text": "T"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 505,
                                "y": 59
                              },
                              {
                                "x": 541,
                                "y": 51
                              },
                              {
                                "x": 550,
                                "y": 90
                              },
                              {
                                "x": 514,
                                "y": 99
                              }
                            ]
                          },
                          "confidence": 0.87785655,
                          "text": "I"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 544,
                                "y": 50
                              },
                              {
                                "x": 599,
                                "y": 37
                              },
                              {
                                "x": 609,
                                "y": 77
                              },
                              {
                                "x": 553,
                                "y": 90
                              }
                            ]
                          },
                          "confidence": 0.85316974,
                          "text": "O"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 602,
                                "y": 36
                              },
                              {
                                "x": 661,
                                "y": 22
                              },
                              {
                                "x": 671,
                                "y": 62
                              },
                              {
                                "x": 611,
                                "y": 76
                              }
                            ]
                          },
                          "confidence": 0.93742377,
                          "property": {
                            "detectedBreak": {
                              "type": "LINE_BREAK"
                            }
                          },
                          "text": "N"
                        }
                      ]
                    }
                  ]
                },
                {
                  "boundingBox": {
                    "vertices": [
                      {
                        "x": -15,
                        "y": 234
                      },
                      {
                        "x": 1194,
                        "y": 73
                      },
                      {
                        "x": 1226,
                        "y": 311
                      },
                      {
                        "x": 17,
                        "y": 472
                      }
                    ]
                  },
                  "confidence": 0.97017455,
                  "words": [
                    {
                      "boundingBox": {
                        "vertices": [
                          {
                            "x": 99,
                            "y": 241
                          },
                          {
                            "x": 292,
                            "y": 210
                          },
                          {
                            "x": 302,
                            "y": 272
                          },
                          {
                            "x": 109,
                            "y": 303
                          }
                        ]
                      },
                      "confidence": 0.92270863,
                      "property": {
                        "detectedLanguages": [
                          {
                            "confidence": 1,
                            "languageCode": "en"
                          }
                        ]
                      },
                      "symbols": [
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 99,
                                "y": 242
                              },
                              {
                                "x": 155,
                                "y": 233
                              },
                              {
                                "x": 165,
                                "y": 294
                              },
                              {
                                "x": 109,
                                "y": 303
                              }
                            ]
                          },
                          "confidence": 0.9379168,
                          "text": "N"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 151,
                                "y": 233
                              },
                              {
                                "x": 210,
                                "y": 223
                              },
                              {
                                "x": 220,
                                "y": 285
                              },
                              {
                                "x": 161,
                                "y": 294
                              }
                            ]
                          },
                          "confidence": 0.93700594,
                          "text": "A"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 209,
                                "y": 224
                              },
                              {
                                "x": 245,
                                "y": 218
                              },
                              {
                                "x": 254,
                                "y": 279
                              },
                              {
                                "x": 219,
                                "y": 285
                              }
                            ]
                          },
                          "confidence": 0.905078,
                          "text": "I"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 234,
                                "y": 220
                              },
                              {
                                "x": 291,
                                "y": 211
                              },
                              {
                                "x": 301,
                                "y": 272
                              },
                              {
                                "x": 244,
                                "y": 281
                              }
                            ]
                          },
                          "confidence": 0.9108339,
                          "property": {
                            "detectedBreak": {
                              "type": "SPACE"
                            }
                          },
                          "text": "C"
                        }
                      ]
                    },
                    {
                      "boundingBox": {
                        "vertices": [
                          {
                            "x": 308,
                            "y": 207
                          },
                          {
                            "x": 638,
                            "y": 154
                          },
                          {
                            "x": 648,
                            "y": 216
                          },
                          {
                            "x": 318,
                            "y": 269
                          }
                        ]
                      },
                      "confidence": 0.9816979,
                      "property": {
                        "detectedLanguages": [
                          {
                            "confidence": 1,
                            "languageCode": "en"
                          }
                        ]
                      },
                      "symbols": [
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 308,
                                "y": 208
                              },
                              {
                                "x": 367,
                                "y": 198
                              },
                              {
                                "x": 377,
                                "y": 260
                              },
                              {
                                "x": 318,
                                "y": 269
                              }
                            ]
                          },
                          "confidence": 0.9832656,
                          "text": "N"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 364,
                                "y": 199
                              },
                              {
                                "x": 414,
                                "y": 191
                              },
                              {
                                "x": 424,
                                "y": 252
                              },
                              {
                                "x": 374,
                                "y": 260
                              }
                            ]
                          },
                          "confidence": 0.94804484,
                          "text": "u"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 415,
                                "y": 190
                              },
                              {
                                "x": 488,
                                "y": 178
                              },
                              {
                                "x": 498,
                                "y": 239
                              },
                              {
                                "x": 425,
                                "y": 251
                              }
                            ]
                          },
                          "confidence": 0.98528236,
                          "text": "m"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 498,
                                "y": 177
                              },
                              {
                                "x": 553,
                                "y": 168
                              },
                              {
                                "x": 563,
                                "y": 229
                              },
                              {
                                "x": 508,
                                "y": 238
                              }
                            ]
                          },
                          "confidence": 0.9942855,
                          "text": "b"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 547,
                                "y": 169
                              },
                              {
                                "x": 597,
                                "y": 161
                              },
                              {
                                "x": 607,
                                "y": 222
                              },
                              {
                                "x": 557,
                                "y": 230
                              }
                            ]
                          },
                          "confidence": 0.9946809,
                          "text": "e"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 594,
                                "y": 162
                              },
                              {
                                "x": 637,
                                "y": 155
                              },
                              {
                                "x": 647,
                                "y": 216
                              },
                              {
                                "x": 604,
                                "y": 223
                              }
                            ]
                          },
                          "confidence": 0.98462844,
                          "text": "r"
                        }
                      ]
                    },
                    {
                      "boundingBox": {
                        "vertices": [
                          {
                            "x": 630,
                            "y": 156
                          },
                          {
                            "x": 655,
                            "y": 152
                          },
                          {
                            "x": 665,
                            "y": 213
                          },
                          {
                            "x": 640,
                            "y": 217
                          }
                        ]
                      },
                      "confidence": 0.98182815,
                      "property": {
                        "detectedLanguages": [
                          {
                            "confidence": 1,
                            "languageCode": "en"
                          }
                        ]
                      },
                      "symbols": [
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 630,
                                "y": 156
                              },
                              {
                                "x": 655,
                                "y": 152
                              },
                              {
                                "x": 665,
                                "y": 213
                              },
                              {
                                "x": 640,
                                "y": 217
                              }
                            ]
                          },
                          "confidence": 0.98182815,
                          "property": {
                            "detectedBreak": {
                              "type": "SPACE"
                            }
                          },
                          "text": ":"
                        }
                      ]
                    },
                    {
                      "boundingBox": {
                        "vertices": [
                          {
                            "x": 693,
                            "y": 145
                          },
                          {
                            "x": 914,
                            "y": 109
                          },
                          {
                            "x": 924,
                            "y": 172
                          },
                          {
                            "x": 703,
                            "y": 207
                          }
                        ]
                      },
                      "confidence": 0.99112964,
                      "property": {
                        "detectedLanguages": [
                          {
                            "confidence": 1,
                            "languageCode": "en"
                          }
                        ]
                      },
                      "symbols": [
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 693,
                                "y": 146
                              },
                              {
                                "x": 724,
                                "y": 141
                              },
                              {
                                "x": 733,
                                "y": 202
                              },
                              {
                                "x": 703,
                                "y": 207
                              }
                            ]
                          },
                          "confidence": 0.9872892,
                          "text": "1"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 738,
                                "y": 139
                              },
                              {
                                "x": 769,
                                "y": 134
                              },
                              {
                                "x": 778,
                                "y": 195
                              },
                              {
                                "x": 748,
                                "y": 200
                              }
                            ]
                          },
                          "confidence": 0.99152106,
                          "text": "1"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 779,
                                "y": 132
                              },
                              {
                                "x": 825,
                                "y": 125
                              },
                              {
                                "x": 835,
                                "y": 186
                              },
                              {
                                "x": 789,
                                "y": 193
                              }
                            ]
                          },
                          "confidence": 0.9931612,
                          "text": "8"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 828,
                                "y": 124
                              },
                              {
                                "x": 873,
                                "y": 117
                              },
                              {
                                "x": 883,
                                "y": 178
                              },
                              {
                                "x": 838,
                                "y": 185
                              }
                            ]
                          },
                          "confidence": 0.9944953,
                          "text": "5"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 881,
                                "y": 115
                              },
                              {
                                "x": 914,
                                "y": 110
                              },
                              {
                                "x": 923,
                                "y": 171
                              },
                              {
                                "x": 891,
                                "y": 176
                              }
                            ]
                          },
                          "confidence": 0.9891814,
                          "property": {
                            "detectedBreak": {
                              "type": "EOL_SURE_SPACE"
                            }
                          },
                          "text": "1"
                        }
                      ]
                    },
                    {
                      "boundingBox": {
                        "vertices": [
                          {
                            "x": 72,
                            "y": 303
                          },
                          {
                            "x": 468,
                            "y": 254
                          },
                          {
                            "x": 477,
                            "y": 330
                          },
                          {
                            "x": 81,
                            "y": 378
                          }
                        ]
                      },
                      "confidence": 0.98765767,
                      "property": {
                        "detectedLanguages": [
                          {
                            "confidence": 1,
                            "languageCode": "en"
                          }
                        ]
                      },
                      "symbols": [
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 72,
                                "y": 304
                              },
                              {
                                "x": 127,
                                "y": 297
                              },
                              {
                                "x": 136,
                                "y": 372
                              },
                              {
                                "x": 81,
                                "y": 378
                              }
                            ]
                          },
                          "confidence": 0.96623975,
                          "text": "E"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 113,
                                "y": 298
                              },
                              {
                                "x": 169,
                                "y": 291
                              },
                              {
                                "x": 178,
                                "y": 366
                              },
                              {
                                "x": 122,
                                "y": 372
                              }
                            ]
                          },
                          "confidence": 0.9624723,
                          "text": "x"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 153,
                                "y": 294
                              },
                              {
                                "x": 205,
                                "y": 288
                              },
                              {
                                "x": 214,
                                "y": 362
                              },
                              {
                                "x": 162,
                                "y": 368
                              }
                            ]
                          },
                          "confidence": 0.9878566,
                          "text": "p"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 207,
                                "y": 287
                              },
                              {
                                "x": 237,
                                "y": 283
                              },
                              {
                                "x": 246,
                                "y": 358
                              },
                              {
                                "x": 216,
                                "y": 361
                              }
                            ]
                          },
                          "confidence": 0.9922848,
                          "text": "i"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 232,
                                "y": 284
                              },
                              {
                                "x": 270,
                                "y": 279
                              },
                              {
                                "x": 279,
                                "y": 354
                              },
                              {
                                "x": 241,
                                "y": 358
                              }
                            ]
                          },
                          "confidence": 0.9936465,
                          "text": "r"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 262,
                                "y": 280
                              },
                              {
                                "x": 311,
                                "y": 274
                              },
                              {
                                "x": 320,
                                "y": 348
                              },
                              {
                                "x": 271,
                                "y": 354
                              }
                            ]
                          },
                          "confidence": 0.9938938,
                          "text": "a"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 309,
                                "y": 274
                              },
                              {
                                "x": 347,
                                "y": 269
                              },
                              {
                                "x": 356,
                                "y": 344
                              },
                              {
                                "x": 318,
                                "y": 348
                              }
                            ]
                          },
                          "confidence": 0.99336076,
                          "text": "t"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 339,
                                "y": 271
                              },
                              {
                                "x": 374,
                                "y": 267
                              },
                              {
                                "x": 383,
                                "y": 341
                              },
                              {
                                "x": 348,
                                "y": 345
                              }
                            ]
                          },
                          "confidence": 0.9961794,
                          "text": "i"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 368,
                                "y": 267
                              },
                              {
                                "x": 416,
                                "y": 261
                              },
                              {
                                "x": 425,
                                "y": 336
                              },
                              {
                                "x": 377,
                                "y": 341
                              }
                            ]
                          },
                          "confidence": 0.9948492,
                          "text": "o"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 419,
                                "y": 261
                              },
                              {
                                "x": 468,
                                "y": 255
                              },
                              {
                                "x": 477,
                                "y": 329
                              },
                              {
                                "x": 428,
                                "y": 335
                              }
                            ]
                          },
                          "confidence": 0.9957936,
                          "property": {
                            "detectedBreak": {
                              "type": "SPACE"
                            }
                          },
                          "text": "n"
                        }
                      ]
                    },
                    {
                      "boundingBox": {
                        "vertices": [
                          {
                            "x": 502,
                            "y": 251
                          },
                          {
                            "x": 702,
                            "y": 227
                          },
                          {
                            "x": 711,
                            "y": 301
                          },
                          {
                            "x": 511,
                            "y": 325
                          }
                        ]
                      },
                      "confidence": 0.99144995,
                      "property": {
                        "detectedLanguages": [
                          {
                            "confidence": 1,
                            "languageCode": "en"
                          }
                        ]
                      },
                      "symbols": [
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 502,
                                "y": 251
                              },
                              {
                                "x": 568,
                                "y": 243
                              },
                              {
                                "x": 577,
                                "y": 317
                              },
                              {
                                "x": 511,
                                "y": 325
                              }
                            ]
                          },
                          "confidence": 0.99123174,
                          "text": "D"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 565,
                                "y": 243
                              },
                              {
                                "x": 616,
                                "y": 237
                              },
                              {
                                "x": 625,
                                "y": 311
                              },
                              {
                                "x": 574,
                                "y": 317
                              }
                            ]
                          },
                          "confidence": 0.9934419,
                          "text": "a"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 614,
                                "y": 237
                              },
                              {
                                "x": 653,
                                "y": 232
                              },
                              {
                                "x": 662,
                                "y": 307
                              },
                              {
                                "x": 623,
                                "y": 311
                              }
                            ]
                          },
                          "confidence": 0.99375826,
                          "text": "t"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 649,
                                "y": 233
                              },
                              {
                                "x": 702,
                                "y": 227
                              },
                              {
                                "x": 711,
                                "y": 301
                              },
                              {
                                "x": 658,
                                "y": 307
                              }
                            ]
                          },
                          "confidence": 0.98736787,
                          "text": "e"
                        }
                      ]
                    },
                    {
                      "boundingBox": {
                        "vertices": [
                          {
                            "x": 703,
                            "y": 226
                          },
                          {
                            "x": 727,
                            "y": 223
                          },
                          {
                            "x": 736,
                            "y": 298
                          },
                          {
                            "x": 712,
                            "y": 300
                          }
                        ]
                      },
                      "confidence": 0.97616017,
                      "property": {
                        "detectedLanguages": [
                          {
                            "confidence": 1,
                            "languageCode": "en"
                          }
                        ]
                      },
                      "symbols": [
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 703,
                                "y": 226
                              },
                              {
                                "x": 727,
                                "y": 223
                              },
                              {
                                "x": 736,
                                "y": 298
                              },
                              {
                                "x": 712,
                                "y": 300
                              }
                            ]
                          },
                          "confidence": 0.97616017,
                          "property": {
                            "detectedBreak": {
                              "type": "SPACE"
                            }
                          },
                          "text": ":"
                        }
                      ]
                    },
                    {
                      "boundingBox": {
                        "vertices": [
                          {
                            "x": 757,
                            "y": 219
                          },
                          {
                            "x": 1207,
                            "y": 164
                          },
                          {
                            "x": 1216,
                            "y": 239
                          },
                          {
                            "x": 766,
                            "y": 294
                          }
                        ]
                      },
                      "confidence": 0.9858452,
                      "property": {
                        "detectedLanguages": [
                          {
                            "confidence": 1,
                            "languageCode": "en"
                          }
                        ]
                      },
                      "symbols": [
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 757,
                                "y": 219
                              },
                              {
                                "x": 805,
                                "y": 213
                              },
                              {
                                "x": 814,
                                "y": 288
                              },
                              {
                                "x": 766,
                                "y": 293
                              }
                            ]
                          },
                          "confidence": 0.98902595,
                          "text": "0"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 808,
                                "y": 213
                              },
                              {
                                "x": 858,
                                "y": 207
                              },
                              {
                                "x": 867,
                                "y": 281
                              },
                              {
                                "x": 817,
                                "y": 287
                              }
                            ]
                          },
                          "confidence": 0.98557836,
                          "text": "5"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 850,
                                "y": 208
                              },
                              {
                                "x": 894,
                                "y": 203
                              },
                              {
                                "x": 903,
                                "y": 277
                              },
                              {
                                "x": 859,
                                "y": 282
                              }
                            ]
                          },
                          "confidence": 0.98918283,
                          "text": "/"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 881,
                                "y": 204
                              },
                              {
                                "x": 932,
                                "y": 198
                              },
                              {
                                "x": 941,
                                "y": 272
                              },
                              {
                                "x": 890,
                                "y": 278
                              }
                            ]
                          },
                          "confidence": 0.99280256,
                          "text": "2"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 934,
                                "y": 198
                              },
                              {
                                "x": 982,
                                "y": 192
                              },
                              {
                                "x": 991,
                                "y": 267
                              },
                              {
                                "x": 943,
                                "y": 272
                              }
                            ]
                          },
                          "confidence": 0.99056697,
                          "text": "7"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 974,
                                "y": 193
                              },
                              {
                                "x": 1016,
                                "y": 188
                              },
                              {
                                "x": 1025,
                                "y": 262
                              },
                              {
                                "x": 983,
                                "y": 267
                              }
                            ]
                          },
                          "confidence": 0.98965955,
                          "text": "/"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 1005,
                                "y": 189
                              },
                              {
                                "x": 1056,
                                "y": 183
                              },
                              {
                                "x": 1065,
                                "y": 257
                              },
                              {
                                "x": 1014,
                                "y": 263
                              }
                            ]
                          },
                          "confidence": 0.9811865,
                          "text": "2"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 1057,
                                "y": 183
                              },
                              {
                                "x": 1106,
                                "y": 177
                              },
                              {
                                "x": 1115,
                                "y": 251
                              },
                              {
                                "x": 1066,
                                "y": 257
                              }
                            ]
                          },
                          "confidence": 0.9723443,
                          "text": "0"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 1109,
                                "y": 176
                              },
                              {
                                "x": 1159,
                                "y": 170
                              },
                              {
                                "x": 1168,
                                "y": 244
                              },
                              {
                                "x": 1118,
                                "y": 250
                              }
                            ]
                          },
                          "confidence": 0.9862319,
                          "text": "2"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 1158,
                                "y": 170
                              },
                              {
                                "x": 1207,
                                "y": 164
                              },
                              {
                                "x": 1216,
                                "y": 238
                              },
                              {
                                "x": 1167,
                                "y": 244
                              }
                            ]
                          },
                          "confidence": 0.9818731,
                          "property": {
                            "detectedBreak": {
                              "type": "EOL_SURE_SPACE"
                            }
                          },
                          "text": "3"
                        }
                      ]
                    },
                    {
                      "boundingBox": {
                        "vertices": [
                          {
                            "x": 7,
                            "y": 387
                          },
                          {
                            "x": 235,
                            "y": 361
                          },
                          {
                            "x": 243,
                            "y": 429
                          },
                          {
                            "x": 15,
                            "y": 456
                          }
                        ]
                      },
                      "confidence": 0.9501765,
                      "property": {
                        "detectedLanguages": [
                          {
                            "confidence": 1,
                            "languageCode": "en"
                          }
                        ]
                      },
                      "symbols": [
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 7,
                                "y": 388
                              },
                              {
                                "x": 59,
                                "y": 382
                              },
                              {
                                "x": 66,
                                "y": 450
                              },
                              {
                                "x": 15,
                                "y": 456
                              }
                            ]
                          },
                          "confidence": 0.93313307,
                          "text": "F"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 49,
                                "y": 383
                              },
                              {
                                "x": 106,
                                "y": 376
                              },
                              {
                                "x": 113,
                                "y": 444
                              },
                              {
                                "x": 57,
                                "y": 451
                              }
                            ]
                          },
                          "confidence": 0.9241902,
                          "text": "R"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 102,
                                "y": 376
                              },
                              {
                                "x": 169,
                                "y": 368
                              },
                              {
                                "x": 176,
                                "y": 436
                              },
                              {
                                "x": 110,
                                "y": 444
                              }
                            ]
                          },
                          "confidence": 0.95668083,
                          "text": "O"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 160,
                                "y": 370
                              },
                              {
                                "x": 235,
                                "y": 361
                              },
                              {
                                "x": 243,
                                "y": 429
                              },
                              {
                                "x": 168,
                                "y": 438
                              }
                            ]
                          },
                          "confidence": 0.9867019,
                          "property": {
                            "detectedBreak": {
                              "type": "SPACE"
                            }
                          },
                          "text": "M"
                        }
                      ]
                    },
                    {
                      "boundingBox": {
                        "vertices": [
                          {
                            "x": 263,
                            "y": 357
                          },
                          {
                            "x": 701,
                            "y": 306
                          },
                          {
                            "x": 709,
                            "y": 375
                          },
                          {
                            "x": 271,
                            "y": 426
                          }
                        ]
                      },
                      "confidence": 0.9358922,
                      "property": {
                        "detectedLanguages": [
                          {
                            "confidence": 1,
                            "languageCode": "en"
                          }
                        ]
                      },
                      "symbols": [
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 263,
                                "y": 358
                              },
                              {
                                "x": 315,
                                "y": 352
                              },
                              {
                                "x": 322,
                                "y": 420
                              },
                              {
                                "x": 271,
                                "y": 426
                              }
                            ]
                          },
                          "confidence": 0.97926646,
                          "text": "E"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 310,
                                "y": 352
                              },
                              {
                                "x": 363,
                                "y": 346
                              },
                              {
                                "x": 370,
                                "y": 413
                              },
                              {
                                "x": 318,
                                "y": 420
                              }
                            ]
                          },
                          "confidence": 0.9618451,
                          "text": "F"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 356,
                                "y": 347
                              },
                              {
                                "x": 409,
                                "y": 341
                              },
                              {
                                "x": 416,
                                "y": 408
                              },
                              {
                                "x": 364,
                                "y": 415
                              }
                            ]
                          },
                          "confidence": 0.8973855,
                          "text": "F"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 404,
                                "y": 342
                              },
                              {
                                "x": 460,
                                "y": 336
                              },
                              {
                                "x": 467,
                                "y": 403
                              },
                              {
                                "x": 412,
                                "y": 410
                              }
                            ]
                          },
                          "confidence": 0.8959851,
                          "text": "E"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 456,
                                "y": 335
                              },
                              {
                                "x": 512,
                                "y": 329
                              },
                              {
                                "x": 519,
                                "y": 396
                              },
                              {
                                "x": 464,
                                "y": 403
                              }
                            ]
                          },
                          "confidence": 0.8363231,
                          "text": "C"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 511,
                                "y": 329
                              },
                              {
                                "x": 561,
                                "y": 323
                              },
                              {
                                "x": 568,
                                "y": 391
                              },
                              {
                                "x": 519,
                                "y": 397
                              }
                            ]
                          },
                          "confidence": 0.94115037,
                          "text": "T"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 558,
                                "y": 324
                              },
                              {
                                "x": 591,
                                "y": 320
                              },
                              {
                                "x": 599,
                                "y": 388
                              },
                              {
                                "x": 566,
                                "y": 392
                              }
                            ]
                          },
                          "confidence": 0.93091965,
                          "text": "I"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 593,
                                "y": 320
                              },
                              {
                                "x": 650,
                                "y": 313
                              },
                              {
                                "x": 657,
                                "y": 381
                              },
                              {
                                "x": 601,
                                "y": 388
                              }
                            ]
                          },
                          "confidence": 0.985404,
                          "text": "V"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 652,
                                "y": 313
                              },
                              {
                                "x": 702,
                                "y": 307
                              },
                              {
                                "x": 709,
                                "y": 375
                              },
                              {
                                "x": 660,
                                "y": 381
                              }
                            ]
                          },
                          "confidence": 0.99475086,
                          "property": {
                            "detectedBreak": {
                              "type": "SPACE"
                            }
                          },
                          "text": "E"
                        }
                      ]
                    },
                    {
                      "boundingBox": {
                        "vertices": [
                          {
                            "x": 735,
                            "y": 303
                          },
                          {
                            "x": 970,
                            "y": 276
                          },
                          {
                            "x": 978,
                            "y": 343
                          },
                          {
                            "x": 743,
                            "y": 371
                          }
                        ]
                      },
                      "confidence": 0.96272475,
                      "property": {
                        "detectedLanguages": [
                          {
                            "confidence": 1,
                            "languageCode": "en"
                          }
                        ]
                      },
                      "symbols": [
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 735,
                                "y": 303
                              },
                              {
                                "x": 795,
                                "y": 296
                              },
                              {
                                "x": 802,
                                "y": 364
                              },
                              {
                                "x": 743,
                                "y": 371
                              }
                            ]
                          },
                          "confidence": 0.973894,
                          "text": "D"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 796,
                                "y": 296
                              },
                              {
                                "x": 862,
                                "y": 288
                              },
                              {
                                "x": 869,
                                "y": 356
                              },
                              {
                                "x": 804,
                                "y": 364
                              }
                            ]
                          },
                          "confidence": 0.97889304,
                          "text": "A"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 867,
                                "y": 288
                              },
                              {
                                "x": 916,
                                "y": 282
                              },
                              {
                                "x": 923,
                                "y": 350
                              },
                              {
                                "x": 875,
                                "y": 356
                              }
                            ]
                          },
                          "confidence": 0.9413714,
                          "text": "T"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 920,
                                "y": 282
                              },
                              {
                                "x": 971,
                                "y": 276
                              },
                              {
                                "x": 978,
                                "y": 344
                              },
                              {
                                "x": 928,
                                "y": 350
                              }
                            ]
                          },
                          "confidence": 0.9567405,
                          "property": {
                            "detectedBreak": {
                              "type": "LINE_BREAK"
                            }
                          },
                          "text": "E"
                        }
                      ]
                    }
                  ]
                },
                {
                  "boundingBox": {
                    "vertices": [
                      {
                        "x": 6,
                        "y": 467
                      },
                      {
                        "x": 752,
                        "y": 385
                      },
                      {
                        "x": 759,
                        "y": 454
                      },
                      {
                        "x": 14,
                        "y": 536
                      }
                    ]
                  },
                  "confidence": 0.98446006,
                  "words": [
                    {
                      "boundingBox": {
                        "vertices": [
                          {
                            "x": 6,
                            "y": 467
                          },
                          {
                            "x": 94,
                            "y": 457
                          },
                          {
                            "x": 102,
                            "y": 525
                          },
                          {
                            "x": 13,
                            "y": 535
                          }
                        ]
                      },
                      "confidence": 0.92919934,
                      "property": {
                        "detectedLanguages": [
                          {
                            "confidence": 1,
                            "languageCode": "en"
                          }
                        ]
                      },
                      "symbols": [
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 6,
                                "y": 467
                              },
                              {
                                "x": 59,
                                "y": 461
                              },
                              {
                                "x": 66,
                                "y": 529
                              },
                              {
                                "x": 13,
                                "y": 535
                              }
                            ]
                          },
                          "confidence": 0.93322307,
                          "text": "C"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 51,
                                "y": 462
                              },
                              {
                                "x": 95,
                                "y": 457
                              },
                              {
                                "x": 102,
                                "y": 525
                              },
                              {
                                "x": 58,
                                "y": 530
                              }
                            ]
                          },
                          "confidence": 0.92517567,
                          "property": {
                            "detectedBreak": {
                              "type": "SPACE"
                            }
                          },
                          "text": "o"
                        }
                      ]
                    },
                    {
                      "boundingBox": {
                        "vertices": [
                          {
                            "x": 127,
                            "y": 454
                          },
                          {
                            "x": 751,
                            "y": 385
                          },
                          {
                            "x": 759,
                            "y": 454
                          },
                          {
                            "x": 135,
                            "y": 523
                          }
                        ]
                      },
                      "confidence": 0.99235445,
                      "property": {
                        "detectedLanguages": [
                          {
                            "confidence": 1,
                            "languageCode": "en"
                          }
                        ]
                      },
                      "symbols": [
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 127,
                                "y": 454
                              },
                              {
                                "x": 162,
                                "y": 450
                              },
                              {
                                "x": 169,
                                "y": 518
                              },
                              {
                                "x": 134,
                                "y": 522
                              }
                            ]
                          },
                          "confidence": 0.9925294,
                          "text": "1"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 159,
                                "y": 451
                              },
                              {
                                "x": 188,
                                "y": 448
                              },
                              {
                                "x": 195,
                                "y": 515
                              },
                              {
                                "x": 166,
                                "y": 519
                              }
                            ]
                          },
                          "confidence": 0.99091554,
                          "text": "-"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 195,
                                "y": 447
                              },
                              {
                                "x": 244,
                                "y": 442
                              },
                              {
                                "x": 251,
                                "y": 509
                              },
                              {
                                "x": 202,
                                "y": 515
                              }
                            ]
                          },
                          "confidence": 0.99385315,
                          "text": "8"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 242,
                                "y": 441
                              },
                              {
                                "x": 290,
                                "y": 436
                              },
                              {
                                "x": 297,
                                "y": 503
                              },
                              {
                                "x": 249,
                                "y": 509
                              }
                            ]
                          },
                          "confidence": 0.9941093,
                          "text": "0"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 289,
                                "y": 436
                              },
                              {
                                "x": 336,
                                "y": 431
                              },
                              {
                                "x": 343,
                                "y": 498
                              },
                              {
                                "x": 296,
                                "y": 504
                              }
                            ]
                          },
                          "confidence": 0.9926668,
                          "text": "0"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 335,
                                "y": 431
                              },
                              {
                                "x": 364,
                                "y": 428
                              },
                              {
                                "x": 371,
                                "y": 495
                              },
                              {
                                "x": 342,
                                "y": 499
                              }
                            ]
                          },
                          "confidence": 0.9796236,
                          "text": "-"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 374,
                                "y": 427
                              },
                              {
                                "x": 419,
                                "y": 422
                              },
                              {
                                "x": 426,
                                "y": 490
                              },
                              {
                                "x": 381,
                                "y": 495
                              }
                            ]
                          },
                          "confidence": 0.9952593,
                          "text": "7"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 420,
                                "y": 422
                              },
                              {
                                "x": 464,
                                "y": 417
                              },
                              {
                                "x": 471,
                                "y": 485
                              },
                              {
                                "x": 427,
                                "y": 490
                              }
                            ]
                          },
                          "confidence": 0.99571127,
                          "text": "7"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 467,
                                "y": 417
                              },
                              {
                                "x": 513,
                                "y": 412
                              },
                              {
                                "x": 520,
                                "y": 480
                              },
                              {
                                "x": 474,
                                "y": 485
                              }
                            ]
                          },
                          "confidence": 0.9961484,
                          "text": "6"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 515,
                                "y": 412
                              },
                              {
                                "x": 545,
                                "y": 409
                              },
                              {
                                "x": 552,
                                "y": 476
                              },
                              {
                                "x": 522,
                                "y": 480
                              }
                            ]
                          },
                          "confidence": 0.9960426,
                          "text": "-"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 545,
                                "y": 408
                              },
                              {
                                "x": 593,
                                "y": 403
                              },
                              {
                                "x": 600,
                                "y": 470
                              },
                              {
                                "x": 552,
                                "y": 476
                              }
                            ]
                          },
                          "confidence": 0.99043584,
                          "text": "4"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 601,
                                "y": 402
                              },
                              {
                                "x": 651,
                                "y": 397
                              },
                              {
                                "x": 658,
                                "y": 464
                              },
                              {
                                "x": 608,
                                "y": 470
                              }
                            ]
                          },
                          "confidence": 0.99282855,
                          "text": "7"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 646,
                                "y": 397
                              },
                              {
                                "x": 699,
                                "y": 391
                              },
                              {
                                "x": 706,
                                "y": 459
                              },
                              {
                                "x": 653,
                                "y": 465
                              }
                            ]
                          },
                          "confidence": 0.99151015,
                          "text": "3"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 703,
                                "y": 391
                              },
                              {
                                "x": 752,
                                "y": 386
                              },
                              {
                                "x": 759,
                                "y": 453
                              },
                              {
                                "x": 710,
                                "y": 459
                              }
                            ]
                          },
                          "confidence": 0.9913286,
                          "property": {
                            "detectedBreak": {
                              "type": "LINE_BREAK"
                            }
                          },
                          "text": "7"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "blockType": "TEXT",
              "boundingBox": {
                "vertices": [
                  {
                    "x": 3,
                    "y": 789
                  },
                  {
                    "x": 1351,
                    "y": 753
                  },
                  {
                    "x": 1365,
                    "y": 1298
                  },
                  {
                    "x": 18,
                    "y": 1335
                  }
                ]
              },
              "confidence": 0.920058,
              "paragraphs": [
                {
                  "boundingBox": {
                    "vertices": [
                      {
                        "x": 3,
                        "y": 800
                      },
                      {
                        "x": 1347,
                        "y": 753
                      },
                      {
                        "x": 1359,
                        "y": 1078
                      },
                      {
                        "x": 14,
                        "y": 1126
                      }
                    ]
                  },
                  "confidence": 0.9208131,
                  "words": [
                    {
                      "boundingBox": {
                        "vertices": [
                          {
                            "x": 3,
                            "y": 800
                          },
                          {
                            "x": 1347,
                            "y": 753
                          },
                          {
                            "x": 1359,
                            "y": 1078
                          },
                          {
                            "x": 14,
                            "y": 1126
                          }
                        ]
                      },
                      "confidence": 0.9208131,
                      "property": {
                        "detectedLanguages": [
                          {
                            "confidence": 1,
                            "languageCode": "en"
                          }
                        ]
                      },
                      "symbols": [
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 3,
                                "y": 801
                              },
                              {
                                "x": 256,
                                "y": 792
                              },
                              {
                                "x": 267,
                                "y": 1117
                              },
                              {
                                "x": 14,
                                "y": 1126
                              }
                            ]
                          },
                          "confidence": 0.91448253,
                          "text": "E"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 176,
                                "y": 794
                              },
                              {
                                "x": 461,
                                "y": 784
                              },
                              {
                                "x": 472,
                                "y": 1109
                              },
                              {
                                "x": 187,
                                "y": 1119
                              }
                            ]
                          },
                          "confidence": 0.89754647,
                          "text": "S"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 381,
                                "y": 787
                              },
                              {
                                "x": 671,
                                "y": 777
                              },
                              {
                                "x": 682,
                                "y": 1102
                              },
                              {
                                "x": 392,
                                "y": 1112
                              }
                            ]
                          },
                          "confidence": 0.88040936,
                          "text": "S"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 614,
                                "y": 779
                              },
                              {
                                "x": 814,
                                "y": 772
                              },
                              {
                                "x": 825,
                                "y": 1097
                              },
                              {
                                "x": 625,
                                "y": 1104
                              }
                            ]
                          },
                          "confidence": 0.9287299,
                          "text": "I"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 794,
                                "y": 773
                              },
                              {
                                "x": 1081,
                                "y": 763
                              },
                              {
                                "x": 1092,
                                "y": 1088
                              },
                              {
                                "x": 805,
                                "y": 1098
                              }
                            ]
                          },
                          "confidence": 0.93544775,
                          "text": "V"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 1060,
                                "y": 763
                              },
                              {
                                "x": 1347,
                                "y": 753
                              },
                              {
                                "x": 1358,
                                "y": 1078
                              },
                              {
                                "x": 1071,
                                "y": 1088
                              }
                            ]
                          },
                          "confidence": 0.96826243,
                          "property": {
                            "detectedBreak": {
                              "type": "LINE_BREAK"
                            }
                          },
                          "text": "E"
                        }
                      ]
                    }
                  ]
                },
                {
                  "boundingBox": {
                    "vertices": [
                      {
                        "x": 578,
                        "y": 1239
                      },
                      {
                        "x": 765,
                        "y": 1235
                      },
                      {
                        "x": 766,
                        "y": 1314
                      },
                      {
                        "x": 579,
                        "y": 1318
                      }
                    ]
                  },
                  "confidence": 0.91854787,
                  "words": [
                    {
                      "boundingBox": {
                        "vertices": [
                          {
                            "x": 578,
                            "y": 1239
                          },
                          {
                            "x": 765,
                            "y": 1235
                          },
                          {
                            "x": 766,
                            "y": 1314
                          },
                          {
                            "x": 579,
                            "y": 1318
                          }
                        ]
                      },
                      "confidence": 0.91854787,
                      "symbols": [
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 578,
                                "y": 1240
                              },
                              {
                                "x": 654,
                                "y": 1239
                              },
                              {
                                "x": 655,
                                "y": 1317
                              },
                              {
                                "x": 579,
                                "y": 1318
                              }
                            ]
                          },
                          "confidence": 0.9414923,
                          "text": "V"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 653,
                                "y": 1238
                              },
                              {
                                "x": 686,
                                "y": 1237
                              },
                              {
                                "x": 687,
                                "y": 1315
                              },
                              {
                                "x": 654,
                                "y": 1316
                              }
                            ]
                          },
                          "confidence": 0.9031501,
                          "text": "I"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 690,
                                "y": 1237
                              },
                              {
                                "x": 765,
                                "y": 1236
                              },
                              {
                                "x": 766,
                                "y": 1314
                              },
                              {
                                "x": 691,
                                "y": 1315
                              }
                            ]
                          },
                          "confidence": 0.91100115,
                          "property": {
                            "detectedBreak": {
                              "type": "LINE_BREAK"
                            }
                          },
                          "text": "N"
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "blockType": "TEXT",
              "boundingBox": {
                "vertices": [
                  {
                    "x": 587,
                    "y": 1363
                  },
                  {
                    "x": 1515,
                    "y": 1334
                  },
                  {
                    "x": 1517,
                    "y": 1416
                  },
                  {
                    "x": 590,
                    "y": 1445
                  }
                ]
              },
              "confidence": 0.9707046,
              "paragraphs": [
                {
                  "boundingBox": {
                    "vertices": [
                      {
                        "x": 587,
                        "y": 1363
                      },
                      {
                        "x": 1515,
                        "y": 1334
                      },
                      {
                        "x": 1517,
                        "y": 1416
                      },
                      {
                        "x": 590,
                        "y": 1445
                      }
                    ]
                  },
                  "confidence": 0.9707046,
                  "words": [
                    {
                      "boundingBox": {
                        "vertices": [
                          {
                            "x": 587,
                            "y": 1363
                          },
                          {
                            "x": 1515,
                            "y": 1334
                          },
                          {
                            "x": 1517,
                            "y": 1416
                          },
                          {
                            "x": 590,
                            "y": 1445
                          }
                        ]
                      },
                      "confidence": 0.9707046,
                      "symbols": [
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 587,
                                "y": 1364
                              },
                              {
                                "x": 637,
                                "y": 1362
                              },
                              {
                                "x": 639,
                                "y": 1443
                              },
                              {
                                "x": 590,
                                "y": 1445
                              }
                            ]
                          },
                          "confidence": 0.9601152,
                          "text": "5"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 641,
                                "y": 1362
                              },
                              {
                                "x": 689,
                                "y": 1361
                              },
                              {
                                "x": 691,
                                "y": 1441
                              },
                              {
                                "x": 644,
                                "y": 1443
                              }
                            ]
                          },
                          "confidence": 0.97617614,
                          "text": "F"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 689,
                                "y": 1360
                              },
                              {
                                "x": 746,
                                "y": 1358
                              },
                              {
                                "x": 748,
                                "y": 1439
                              },
                              {
                                "x": 692,
                                "y": 1441
                              }
                            ]
                          },
                          "confidence": 0.92918146,
                          "text": "P"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 740,
                                "y": 1359
                              },
                              {
                                "x": 810,
                                "y": 1357
                              },
                              {
                                "x": 812,
                                "y": 1438
                              },
                              {
                                "x": 743,
                                "y": 1440
                              }
                            ]
                          },
                          "confidence": 0.88452184,
                          "text": "Y"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 804,
                                "y": 1357
                              },
                              {
                                "x": 868,
                                "y": 1355
                              },
                              {
                                "x": 870,
                                "y": 1436
                              },
                              {
                                "x": 807,
                                "y": 1438
                              }
                            ]
                          },
                          "confidence": 0.94723475,
                          "text": "K"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 864,
                                "y": 1355
                              },
                              {
                                "x": 912,
                                "y": 1354
                              },
                              {
                                "x": 914,
                                "y": 1434
                              },
                              {
                                "x": 867,
                                "y": 1436
                              }
                            ]
                          },
                          "confidence": 0.99035674,
                          "text": "3"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 920,
                                "y": 1353
                              },
                              {
                                "x": 967,
                                "y": 1352
                              },
                              {
                                "x": 969,
                                "y": 1433
                              },
                              {
                                "x": 923,
                                "y": 1434
                              }
                            ]
                          },
                          "confidence": 0.98787206,
                          "text": "F"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 964,
                                "y": 1352
                              },
                              {
                                "x": 1014,
                                "y": 1350
                              },
                              {
                                "x": 1016,
                                "y": 1431
                              },
                              {
                                "x": 967,
                                "y": 1433
                              }
                            ]
                          },
                          "confidence": 0.9869299,
                          "text": "6"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 1026,
                                "y": 1350
                              },
                              {
                                "x": 1075,
                                "y": 1348
                              },
                              {
                                "x": 1077,
                                "y": 1429
                              },
                              {
                                "x": 1029,
                                "y": 1431
                              }
                            ]
                          },
                          "confidence": 0.992691,
                          "text": "7"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 1078,
                                "y": 1348
                              },
                              {
                                "x": 1135,
                                "y": 1346
                              },
                              {
                                "x": 1137,
                                "y": 1427
                              },
                              {
                                "x": 1081,
                                "y": 1429
                              }
                            ]
                          },
                          "confidence": 0.98790085,
                          "text": "K"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 1134,
                                "y": 1347
                              },
                              {
                                "x": 1189,
                                "y": 1345
                              },
                              {
                                "x": 1191,
                                "y": 1426
                              },
                              {
                                "x": 1137,
                                "y": 1428
                              }
                            ]
                          },
                          "confidence": 0.9842988,
                          "text": "B"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 1187,
                                "y": 1345
                              },
                              {
                                "x": 1240,
                                "y": 1343
                              },
                              {
                                "x": 1242,
                                "y": 1424
                              },
                              {
                                "x": 1190,
                                "y": 1426
                              }
                            ]
                          },
                          "confidence": 0.98066896,
                          "text": "0"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 1246,
                                "y": 1343
                              },
                              {
                                "x": 1288,
                                "y": 1342
                              },
                              {
                                "x": 1290,
                                "y": 1423
                              },
                              {
                                "x": 1249,
                                "y": 1424
                              }
                            ]
                          },
                          "confidence": 0.98197114,
                          "text": "1"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 1299,
                                "y": 1341
                              },
                              {
                                "x": 1349,
                                "y": 1339
                              },
                              {
                                "x": 1351,
                                "y": 1420
                              },
                              {
                                "x": 1302,
                                "y": 1422
                              }
                            ]
                          },
                          "confidence": 0.98044944,
                          "text": "5"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 1351,
                                "y": 1340
                              },
                              {
                                "x": 1407,
                                "y": 1338
                              },
                              {
                                "x": 1409,
                                "y": 1419
                              },
                              {
                                "x": 1354,
                                "y": 1421
                              }
                            ]
                          },
                          "confidence": 0.9752993,
                          "text": "7"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 1406,
                                "y": 1338
                              },
                              {
                                "x": 1459,
                                "y": 1336
                              },
                              {
                                "x": 1461,
                                "y": 1417
                              },
                              {
                                "x": 1409,
                                "y": 1419
                              }
                            ]
                          },
                          "confidence": 0.9833816,
                          "text": "7"
                        },
                        {
                          "boundingBox": {
                            "vertices": [
                              {
                                "x": 1461,
                                "y": 1336
                              },
                              {
                                "x": 1515,
                                "y": 1334
                              },
                              {
                                "x": 1517,
                                "y": 1415
                              },
                              {
                                "x": 1464,
                                "y": 1417
                              }
                            ]
                          },
                          "confidence": 0.9729294,
                          "property": {
                            "detectedBreak": {
                              "type": "LINE_BREAK"
                            }
                          },
                          "text": "7"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ],
          "confidence": 0.95269006,
          "height": 1471,
          "property": {
            "detectedLanguages": [
              {
                "confidence": 0.8115086,
                "languageCode": "en"
              }
            ]
          },
          "width": 1781
        }
      ],
      "text": "CATION\nNAIC Number: 11851\nExpiration Date: 05/27/2023\nFROM EFFECTIVE DATE\nCo 1-800-776-4737\nESSIVE\nVIN\n5FPYK3F67KB015777"
    },
    "imagePropertiesAnnotation": {
      "cropHints": [
        {
          "boundingPoly": {
            "vertices": [
              {
                "x": 89
              },
              {
                "x": 1265
              },
              {
                "x": 1265,
                "y": 1470
              },
              {
                "x": 89,
                "y": 1470
              }
            ]
          },
          "confidence": 0.3458416,
          "importanceFraction": 1
        },
        {
          "boundingPoly": {
            "vertices": [
              {},
              {
                "x": 1471
              },
              {
                "x": 1471,
                "y": 1470
              },
              {
                "y": 1470
              }
            ]
          },
          "confidence": 0.27667323,
          "importanceFraction": 1
        },
        {
          "boundingPoly": {
            "vertices": [
              {},
              {
                "x": 1765
              },
              {
                "x": 1765,
                "y": 1470
              },
              {
                "y": 1470
              }
            ]
          },
          "confidence": 0.23056102,
          "importanceFraction": 1
        }
      ],
      "dominantColors": {
        "colors": [
          {
            "color": {
              "blue": 196,
              "green": 199,
              "red": 204
            },
            "hex": "CCC7C4",
            "percent": 54.70017107302443,
            "percentRounded": 55,
            "pixelFraction": 0.567043,
            "rgb": "204, 199,\n 196",
            "score": 0.5470017
          },
          {
            "color": {
              "blue": 220,
              "green": 224,
              "red": 226
            },
            "hex": "E2E0DC",
            "percent": 44.1913078668776,
            "percentRounded": 44,
            "pixelFraction": 0.35037634,
            "rgb": "226, 224,\n 220",
            "score": 0.44191307
          },
          {
            "color": {
              "blue": 156,
              "green": 160,
              "red": 161
            },
            "hex": "A1A09C",
            "percent": 0.9435651185094197,
            "percentRounded": 1,
            "pixelFraction": 0.046451613,
            "rgb": "161, 160,\n 156",
            "score": 0.009435651
          },
          {
            "color": {
              "blue": 122,
              "green": 126,
              "red": 127
            },
            "hex": "7F7E7A",
            "percent": 0.14687840288123624,
            "percentRounded": 0,
            "pixelFraction": 0.02139785,
            "rgb": "127, 126,\n 122",
            "score": 0.001468784
          },
          {
            "color": {
              "blue": 76,
              "green": 79,
              "red": 84
            },
            "hex": "544F4C",
            "percent": 0.014964899293558542,
            "percentRounded": 0,
            "pixelFraction": 0.010376344,
            "rgb": "84, 79,\n 76",
            "score": 0.00014964899
          },
          {
            "color": {
              "blue": 58,
              "green": 61,
              "red": 66
            },
            "hex": "423D3A",
            "percent": 0.0031126370610589605,
            "percentRounded": 0,
            "pixelFraction": 0.003655914,
            "rgb": "66, 61,\n 58",
            "score": 0.00003112637
          },
          {
            "color": {
              "blue": 38,
              "green": 32,
              "red": 32
            },
            "hex": "202026",
            "percent": 2.3526955461515887e-9,
            "percentRounded": 0,
            "pixelFraction": 0.0006989247,
            "rgb": "32, 32,\n 38",
            "score": 2.3526955e-11
          }
        ]
      }
    },
    "labelAnnotations": [
      {
        "description": "Font",
        "mid": "/m/03gq5hm",
        "score": 0.8169535,
        "topicality": 0.8169535
      },
      {
        "description": "Publication",
        "mid": "/m/01h1dd",
        "score": 0.68463504,
        "topicality": 0.68463504
      },
      {
        "description": "Paper",
        "mid": "/m/0641k",
        "score": 0.6780779,
        "topicality": 0.6780779
      },
      {
        "description": "Signage",
        "mid": "/m/0bkqqh",
        "score": 0.66238564,
        "topicality": 0.66238564
      },
      {
        "description": "Brand",
        "mid": "/m/01cd9",
        "score": 0.61591995,
        "topicality": 0.61591995
      },
      {
        "description": "Document",
        "mid": "/m/015bv3",
        "score": 0.5994224,
        "topicality": 0.5994224
      },
      {
        "description": "Event",
        "mid": "/m/081pkj",
        "score": 0.59393233,
        "topicality": 0.59393233
      },
      {
        "description": "Book",
        "mid": "/m/0bt_c3",
        "score": 0.5356349,
        "topicality": 0.5356349
      },
      {
        "description": "Label",
        "mid": "/m/05c0n6k",
        "score": 0.53347343,
        "topicality": 0.53347343
      },
      {
        "description": "Graphics",
        "mid": "/m/021sdg",
        "score": 0.5263182,
        "topicality": 0.5263182
      }
    ],
    "localizedObjectAnnotations": [
      {
        "boundingPoly": {
          "normalizedVertices": [
            {
              "y": 0.00065994804
            },
            {
              "x": 0.9973958,
              "y": 0.00065994804
            },
            {
              "x": 0.9973958,
              "y": 0.9953813
            },
            {
              "y": 0.9953813
            }
          ]
        },
        "mid": "/j/5qg9b8",
        "name": "Packaged goods",
        "score": 0.62523234
      }
    ],
    "safeSearchAnnotation": {
      "adult": "VERY_UNLIKELY",
      "medical": "UNLIKELY",
      "racy": "VERY_UNLIKELY",
      "spoof": "VERY_UNLIKELY",
      "violence": "UNLIKELY"
    },
    "textAnnotations": [
      {
        "boundingPoly": {
          "vertices": [
            {
              "x": -50,
              "y": -59
            },
            {
              "x": 1517,
              "y": -59
            },
            {
              "x": 1517,
              "y": 1445
            },
            {
              "x": -50,
              "y": 1445
            }
          ]
        },
        "description": "CATION\nNAIC Number: 11851\nExpiration Date: 05/27/2023\nFROM EFFECTIVE DATE\nCo 1-800-776-4737\nESSIVE\nVIN\n5FPYK3F67KB015777",
        "locale": "en"
      },
      {
        "boundingPoly": {
          "vertices": [
            {
              "x": 362,
              "y": 92
            },
            {
              "x": 661,
              "y": 22
            },
            {
              "x": 670,
              "y": 63
            },
            {
              "x": 372,
              "y": 133
            }
          ]
        },
        "description": "CATION"
      },
      {
        "boundingPoly": {
          "vertices": [
            {
              "x": 99,
              "y": 241
            },
            {
              "x": 292,
              "y": 210
            },
            {
              "x": 302,
              "y": 272
            },
            {
              "x": 109,
              "y": 303
            }
          ]
        },
        "description": "NAIC"
      },
      {
        "boundingPoly": {
          "vertices": [
            {
              "x": 308,
              "y": 207
            },
            {
              "x": 638,
              "y": 154
            },
            {
              "x": 648,
              "y": 216
            },
            {
              "x": 318,
              "y": 269
            }
          ]
        },
        "description": "Number"
      },
      {
        "boundingPoly": {
          "vertices": [
            {
              "x": 630,
              "y": 156
            },
            {
              "x": 655,
              "y": 152
            },
            {
              "x": 665,
              "y": 213
            },
            {
              "x": 640,
              "y": 217
            }
          ]
        },
        "description": ":"
      },
      {
        "boundingPoly": {
          "vertices": [
            {
              "x": 693,
              "y": 145
            },
            {
              "x": 914,
              "y": 109
            },
            {
              "x": 924,
              "y": 172
            },
            {
              "x": 703,
              "y": 207
            }
          ]
        },
        "description": "11851"
      },
      {
        "boundingPoly": {
          "vertices": [
            {
              "x": 72,
              "y": 303
            },
            {
              "x": 468,
              "y": 254
            },
            {
              "x": 477,
              "y": 330
            },
            {
              "x": 81,
              "y": 378
            }
          ]
        },
        "description": "Expiration"
      },
      {
        "boundingPoly": {
          "vertices": [
            {
              "x": 502,
              "y": 251
            },
            {
              "x": 702,
              "y": 227
            },
            {
              "x": 711,
              "y": 301
            },
            {
              "x": 511,
              "y": 325
            }
          ]
        },
        "description": "Date"
      },
      {
        "boundingPoly": {
          "vertices": [
            {
              "x": 703,
              "y": 226
            },
            {
              "x": 727,
              "y": 223
            },
            {
              "x": 736,
              "y": 298
            },
            {
              "x": 712,
              "y": 300
            }
          ]
        },
        "description": ":"
      },
      {
        "boundingPoly": {
          "vertices": [
            {
              "x": 757,
              "y": 219
            },
            {
              "x": 1207,
              "y": 164
            },
            {
              "x": 1216,
              "y": 239
            },
            {
              "x": 766,
              "y": 294
            }
          ]
        },
        "description": "05/27/2023"
      },
      {
        "boundingPoly": {
          "vertices": [
            {
              "x": 7,
              "y": 387
            },
            {
              "x": 235,
              "y": 361
            },
            {
              "x": 243,
              "y": 429
            },
            {
              "x": 15,
              "y": 456
            }
          ]
        },
        "description": "FROM"
      },
      {
        "boundingPoly": {
          "vertices": [
            {
              "x": 263,
              "y": 357
            },
            {
              "x": 701,
              "y": 306
            },
            {
              "x": 709,
              "y": 375
            },
            {
              "x": 271,
              "y": 426
            }
          ]
        },
        "description": "EFFECTIVE"
      },
      {
        "boundingPoly": {
          "vertices": [
            {
              "x": 735,
              "y": 303
            },
            {
              "x": 970,
              "y": 276
            },
            {
              "x": 978,
              "y": 343
            },
            {
              "x": 743,
              "y": 371
            }
          ]
        },
        "description": "DATE"
      },
      {
        "boundingPoly": {
          "vertices": [
            {
              "x": 6,
              "y": 467
            },
            {
              "x": 94,
              "y": 457
            },
            {
              "x": 102,
              "y": 525
            },
            {
              "x": 13,
              "y": 535
            }
          ]
        },
        "description": "Co"
      },
      {
        "boundingPoly": {
          "vertices": [
            {
              "x": 127,
              "y": 454
            },
            {
              "x": 751,
              "y": 385
            },
            {
              "x": 759,
              "y": 454
            },
            {
              "x": 135,
              "y": 523
            }
          ]
        },
        "description": "1-800-776-4737"
      },
      {
        "boundingPoly": {
          "vertices": [
            {
              "x": 3,
              "y": 800
            },
            {
              "x": 1347,
              "y": 753
            },
            {
              "x": 1359,
              "y": 1078
            },
            {
              "x": 14,
              "y": 1126
            }
          ]
        },
        "description": "ESSIVE"
      },
      {
        "boundingPoly": {
          "vertices": [
            {
              "x": 578,
              "y": 1239
            },
            {
              "x": 765,
              "y": 1235
            },
            {
              "x": 766,
              "y": 1314
            },
            {
              "x": 579,
              "y": 1318
            }
          ]
        },
        "description": "VIN"
      },
      {
        "boundingPoly": {
          "vertices": [
            {
              "x": 587,
              "y": 1363
            },
            {
              "x": 1515,
              "y": 1334
            },
            {
              "x": 1517,
              "y": 1416
            },
            {
              "x": 590,
              "y": 1445
            }
          ]
        },
        "description": "5FPYK3F67KB015777"
      }
    ]
  }`));