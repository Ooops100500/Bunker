import {genderArray,professionArray,healthArray,hobbyArray,addInfoArray,phobiaArray,baggageArray,traitArray,percent,age} from './characteristic'
import {catastrophe,population} from './catastrophe'
import {cards} from './cards'
import {rooms,things,size,bunkerTime} from './bunker'

import './styles/style.scss'

document.addEventListener("DOMContentLoaded",function() {

    const form = document.querySelector('.form')

    const gender = document.querySelector('.gender')
    const profession = document.querySelector('.profession')
    const health = document.querySelector('.health')
    const hobby = document.querySelector('.hobby')
    const addInfo = document.querySelector('.AddInfo')
    const phobia = document.querySelector('.phobia')
    const baggage = document.querySelector('.Baggage')
    const trait = document.querySelector('.Trait')
    const firstCard = document.querySelector('.first-card')
    const secondCard = document.querySelector('.second-card')
    const bunkerCatastrophe = document.querySelector('.bunker__catastrophe')
    const bunkerAddInfo = document.querySelector('.bunker__AddInfo')
    const select = document.querySelector('.select')
    const selectInput = document.querySelector('.select__input')
    const selectAge = document.querySelector('.select__age')
    const selectWork = document.querySelector('.select__work')
    const selectHobby = document.querySelector('.select__hobby')

    const buttonCreate = document.querySelector('.button__create')
    const buttonClear = document.querySelector('.button__clear')
    const buttonDownload = document.querySelector('.button__download')
    const buttonBunker = document.querySelector('.button__bunker')
    const buttonCreateSolo = document.querySelector('.select-button__create')
    const buttonDownloadSolo = document.querySelector('.select-button__download')
    const buttonCalc = document.querySelector('.select-button__calc')

    let addClick = 0

    let getRandom = (item,text) => {
        let randomNumber = getRandomNumber(0,10)
        let array = ''
        if (randomNumber >= 4 && randomNumber <= 10) {
            array = item[Math.floor(Math.random()*item.length)]
            for ( let i=0; i<=item.length; i++) {
                if (item[i] === array) {
                    item.splice(i,1)
                }
            }
        } else if (randomNumber >= 0 && randomNumber <= 3) {
            array = text
        }
        if (array == undefined) {
            array = 'А все уже.'
        }
        return array
    }

    let getRandomForAll = item => {
        let array = item[Math.floor(Math.random()*item.length)]
        for ( let i=0; i<=item.length; i++) {
            if (item[i] === array) {
                item.splice(i,1)
            }
        }
        if (array == undefined) {
            array = 'А все уже.'
        }
        return array
    }

    let getRandomGender = item => {
        let array = item[Math.floor(Math.random()*item.length)]
        return array
    }

    let getRandomNumber = (min,max) => {
        let number = Math.floor(Math.random()*(max-min)+min)
        return number
    }

    let getWorkExperience = year => {
        let WorkExperience = 0
        if (year <= 19) {
            WorkExperience = 0
        } else if (year >= 20 && year <= 25) {
            WorkExperience = getRandomNumber(0,4)
        } else if (year >= 26 && year <= 35) {
            WorkExperience = getRandomNumber(0,8)
        } else if (year >= 36 && year <= 45) {
            WorkExperience = getRandomNumber(2,20)
        } else if (year >= 46 && year <= 55) {
            WorkExperience = getRandomNumber(5,28)
        } else if (year >= 56 && year <= 65) {
            WorkExperience = getRandomNumber(7,37)
        } else if (year >= 65 && year <= 100) {
            WorkExperience = getRandomNumber(10,48)
        }
        return WorkExperience
    }

    let getStagePhobia = number => {
        let StagePhobia = 0
        if (number == 1 || number == 2) {
            StagePhobia = 'инкубационный период'
        } else if (number >=3 && number <=8) {
            StagePhobia = getRandomGender(percent) + '%'
        } else if (number == 9 || number == 10) {
            StagePhobia = 'ремиссия'
        }

        return StagePhobia
    }

    let getInfertility = number => {
        let res = ''
        let infertility= number
        if (infertility >= 0 && infertility <= 2) {
            res = 'бесплодие'
        } else if (infertility >= 6 && infertility <= 10) {
            res = ''
        }
        return res
    }

    let getCHeck = (item,percent,text) => {
        let check = item
        let result = ''
        if (check === text) {
            result = text
        } else {
            result = check + ' ' + percent
        }
        return result
    }

    let creatBlob = () => {
        const blob = new Blob([
            `Биологическая характеристика: ${gender.value}`,
            `\nПрофессия: ${profession.value}`,
            `\nСостояние здоровья: ${health.value}`,
            `\nХобби: ${hobby.value}`,
            `\nДополнительная информация: ${addInfo.value}`,
            `\nФобия: ${phobia.value}`,
            `\nБагаж: ${baggage.value}`,
            `\nХарактеристика: ${trait.value}`,
            `\n\nКарты действий`,
            `\nКарта №1 - ${firstCard.value}`,
            `\nКарта №2 - ${secondCard.value}`,
            `\n\nКатастрофа - ${bunkerCatastrophe.innerHTML}`,
            `\n\nБункер: ${bunkerAddInfo.innerHTML}`,
        ], {type: "text/plain"})

        downloadFile(blob, `card${addClick++}.txt`)
    }

    let creatSoloBlob = (info) => {
        const blob = new Blob([`${info}`], {type: "text/pain"})

        downloadFile(blob, `card.txt`)
    }

    let downloadFile = (blob, filename) => {
        const url = window.URL.createObjectURL(blob)
        const someProp = document.createElement('a')

        someProp.href = url
        someProp.download = filename
        someProp.click()
    }

    let getRandomRoom = itemSize => {
        let res = ''
        let sizeBunker = Number(itemSize)
        if (sizeBunker === 50) {
            res = getRandomForAll(rooms)
        }else if (sizeBunker >= 100 && sizeBunker <= 120) {
            res = getRandomForAll(rooms) + '\n' + getRandomForAll(rooms)
        }else if (sizeBunker >= 150 && sizeBunker <= 180) {
            res = getRandomForAll(rooms) + '\n' + getRandomForAll(rooms) + '\n' + getRandomForAll(rooms)
        }else if (sizeBunker >= 200 && sizeBunker <= 250) {
            res = getRandomForAll(rooms) + '\n' + getRandomForAll(rooms) + '\n' + getRandomForAll(rooms) + '\n' + getRandomForAll(rooms)
        }
        return res
    }

    let getRandomThing = itemSize => {
        let res = ''
        let sizeBunker = Number(itemSize)
        if (sizeBunker === 50) {
            res = getRandomForAll(things) + '\n' + getRandomForAll(things)
        }else if (sizeBunker >= 100 && sizeBunker <= 120) {
            res = getRandomForAll(things) + '\n' + getRandomForAll(things) + '\n' + getRandomForAll(things)
        }else if (sizeBunker >= 150 && sizeBunker <= 180) {
            res = getRandomForAll(things) + '\n' + getRandomForAll(things) + '\n' + getRandomForAll(things) + '\n' + getRandomForAll(things)
        }else if (sizeBunker >= 200 && sizeBunker <= 250) {
            res = getRandomForAll(things) + '\n' + getRandomForAll(things) + '\n' + getRandomForAll(things) + '\n' + getRandomForAll(things) + '\n' + getRandomForAll(things)
        }
        return res
    }

    let getSelect = () => {
        let selectOption = select.value
        let res = ''
        if (selectOption === 'gender') {
            res ='Биологическая характеристика:' + getRandomGender(genderArray) + ' ' + getRandomGender(age) + ' ' + getInfertility(getRandomNumber(0,10))
        }else if (selectOption === 'profession') {
            res = 'Профессия:' + getRandomForAll(professionArray)
        }else if (selectOption === 'health') {
            res = 'Состояние здоровья:' + getCHeck(getRandom(healthArray,'Идеально здоров'), getRandomGender(percent) + '%', 'Идеально здоров')
        }else if (selectOption === 'hobby') {
            res = 'Хобби:' + getRandomForAll(hobbyArray)
        }else if (selectOption === 'addInfo') {
            res = 'Доп. информация:' + getRandomForAll(addInfoArray)
        }else if (selectOption === 'phobia') {
            res = 'Фобия:' + getRandom(phobiaArray, 'Нет фобий')
        }else if (selectOption === 'baggage') {
            res ='Багаж:' +  getRandomForAll(baggageArray)
        }else if (selectOption === 'trait') {
            res = 'Характеристика:' + getRandomForAll(traitArray)
        }else if (selectOption === 'Card') {
            res = 'Карта:' + getRandomForAll(cards)
        }
        return res
    }

    form.addEventListener('submit',(evt) => {
        evt.preventDefault();
    })

    buttonCreate.addEventListener('click',(evt) => {

        let user = Object.create({}, {
            userGender: {
                value: getRandomGender(genderArray),
            },
            userAge: {
                value: getRandomGender(age)
            },
            userProfession: {
                value: getRandomForAll(professionArray)
            },
            userHealth: {
                value: getRandom(healthArray,'Идеально здоров')
            },
            userStageDisease: {
                value: getRandomGender(percent) + '%'
            },
            userHobby: {
                value: getRandomForAll(hobbyArray)
            },
            userAddInfo: {
                value: getRandomForAll(addInfoArray)
            },
            userPhobia: {
                value: getRandom(phobiaArray, 'Нет фобий')
            },
            userStagePhobia: {
                value: getStagePhobia(getRandomNumber(1,10))
            },
            userBaggage: {
                value: getRandomForAll(baggageArray)
            },
            userTrait: {
                value: getRandomForAll(traitArray)
            },
            userFirstCard: {
                value: getRandomForAll(cards)
            },
            userSecondCard: {
                value: getRandomForAll(cards)
            }
        })

        gender.value = user.userGender + ' ' + user.userAge + ' ' + getInfertility(getRandomNumber(0,10))
        profession.value = user.userProfession + ' ' + getWorkExperience(user.userAge) + ' ' + 'стаж'
        health.value = getCHeck(user.userHealth, user.userStageDisease , 'Идеально здоров')
        hobby.value = user.userHobby + ' ' + getWorkExperience(user.userAge) + ' ' + 'стаж'
        addInfo.value = user.userAddInfo
        phobia.value = getCHeck(user.userPhobia, user.userStagePhobia, 'Нет фобий')
        baggage.value = user.userBaggage
        trait.value = user.userTrait
        firstCard.value = user.userFirstCard
        secondCard.value = user.userSecondCard
    })

    buttonDownload.addEventListener('click',(evt) => {
        creatBlob()
    })

    buttonCreateSolo.addEventListener('click', (evt) => {
        selectInput.value = getSelect()
    })

    buttonDownloadSolo.addEventListener('click', (evt) => {
        creatSoloBlob(selectInput.value)
    })

    buttonClear.addEventListener('click',(evt) => {})

    buttonCalc.addEventListener('click', (evt => {
        selectHobby.value = 'Стаж раб.' + ' ' + getWorkExperience(selectAge.value)
        selectWork.value = 'Стаж хоб.' + ' ' + getWorkExperience(selectAge.value)
    }))

    buttonBunker.addEventListener('click', (evt) => {

        let bunkerSize = getRandomGender(size)
        let bunkerRoom = getRandomRoom(bunkerSize)
        let bunkerThing = getRandomThing(bunkerSize)


        bunkerCatastrophe.innerHTML = getRandomGender(catastrophe) + `\n` + `Остаток населения: ${getRandomGender(population)}` + '\n' + `Разрушаемость ${getRandomGender(percent) + '%'}`
        bunkerAddInfo.innerHTML = '\n' + `Время нахождения в бункере ${getRandomGender(bunkerTime)}. Еда и питье расчитаны на весь переиод пребывания.` +
            `\n` + `Размер бункера ${bunkerSize} кв. метров.` + `\n` + `\nВ бункере есть:\n${bunkerRoom}` + '\n' + `\nИнвентарь в бункере:\n${bunkerThing}`
    })
})