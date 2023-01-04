export function vasilyExampleOfFunction(param: string) {
    return console.log(`${param}`);
}

//эта функция для ввода банковской карты, чтобы когда вводишь 16 цифр автоматически разбивало по такому шаблону "xxxx xxxx xxxx xxxx" + валидация на ввод только цифр. Когда в HTML вставляю этот скрипт, то работает. Не получается, чтобы здесь работало.

/*
document.getElementById('card-number')!.oninput = function() {
    this.value = this.value.replace(/[^\d]/g, '').replace(/(\d{4})/g, '$1 ').trim();
  }
*/


//эта функция для ввода срока действия карты в формате XX/XX с валидацией
/*
document.getElementById('expiration-date').oninput = function() {
    this.value = this.value.replace(/[^\d]/g, '').replace(/(\d{2})/g, '$1/').slice(0, 5);
  }
*/


//эта функция для ввода кода CVV с валидацией
/*
document.getElementById('cvv').oninput = function() {
    this.value = this.value.replace(/[^\d]/g, '').slice(0, 3);
  }
  */