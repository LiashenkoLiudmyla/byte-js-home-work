// Homework 20

// Реализуйте класс PublicService для подсчета коммунальных платежей.

// В классе должны быть реализованы такие методы:
// addMeterReadings для добавления показаний счетчиков, принимает 2 аргумента: название показателя и объем потребеления
// deleteMeterReadings для удаления показаний счетчиков, принимает 1 аргумент: название показателя
// getSum для подсчета суммы платежей исходя из показаний поданых счетчиков и текущих тарифов.
// Тарифы можете придумать свои, или взять из примера.
// Метод addMeterReadings должен быть защищен от передачи некорректных значений. Если при его вызове, было передано название показателя, которое не перечислено в тарифах, то метод должен выбросить ошибку с текстом: Service --название сервиса-- is unavailble. Так же, если показания подаются повторно (метод вызван второй раз с таким же названием показателя), то должна быть выброшена ошибка с текстом: Service --название сервиса-- is already included
// Метод getSum возвращает результат подсчета суммы.
// Все методы должны быть записаны в prototype.

function PublicService (){
    this.service = [];

    this.tarrifs = {
        hotWater: 7,
        coldWater: 1,
        gas: 0.3,
        electricity: 1.6,
    }
};

PublicService.prototype.addMeterReading = function(amount, serviceName){

    if(!Object.keys(this.tarrifs).includes(serviceName)){
        throw new Error(`Service"${serviceName}" is unvailbale`)
    }

    if(this.service.some(( {key} ) => key === serviceName)){
        throw new Error(`Service "${serviceName}" is already includes`)
    }

    this.service.push({key: serviceName, amount})
};

PublicService.prototype.deleteMeterReadings = function(serviceName){
    this.service = this.service.filter(({key}) => key !== serviceName)
};

PublicService.prototype.getSum = function(){

    let sum = 0

    this.service.forEach(({key, amount}) => {
        sum += this.tarrifs[key] * amount
    })

    return sum
};



const service = new PublicService();

service.addMeterReading(100, "hotWater");
service.addMeterReading(200, "coldWater");
service.deleteMeterReadings("coldWater");
service.addMeterReading(300, "electricity");


const res = service.getSum();
 console.log(res)