// C помощью классов реализовать функционала моладльного окна.

// 1. Модальное окно должно быть двух типов:
//    - Alert - просто отображает сообщение и кнопку Ок
//    - Сonfirm - отображает сообщение и 2 кнопки: Ок и Отмена
//      опционально может выполнить какой-либо колбек при нажатии
//      на любую из кнопок.
// 2. В случае, если в Confirm модалку, передан колбек, который
//    должен выполнится при нажатии на кнопку Oк, и этот колбек
//    возвращает Promise, дождаться резолва промиса.
// 3. Модальные окна должны иметь возможность отображать кастомный
//    текст и заголовок.
// 4. По клику на любое место вне модалки, модалка должна закрыться

class Modal {
    constructor(options) {
      const { title, text } = options;
      this.title = title;
      this.text = text;
      this.modal = document.createElement("div");
      this.render();
    }
  
    render() {
      const backdrop = document.createElement("div");
      const container = document.createElement("div");
      const title = document.createElement("p");
      const body = document.createElement("p");
      const footer = document.createElement("div");
  
      this.modal.classList.add("modal");
      backdrop.classList.add("modal-backdrop");
      title.classList.add("modal-title");
      body.classList.add("modal-body");
      footer.classList.add("modal-footer");
      container.classList.add("modal-container");
  
      title.innerText = this.title;
      body.innerText = this.text;
  
      backdrop.addEventListener("click", () => {
        this.hide();
      });
  
      container.append(title, body, footer);
      this.modal.append(backdrop, container);
  
      // return footer;
    }
  
    show() {
      document.body.append(this.modal);
    }
  
    hide() {
      this.modal.remove();
    }
  }
  
  class AlertModal extends Modal {
    render() {
      // const footer = super.render();
  
      super.render();
      const footer = this.modal.querySelector(".modal-footer");
      const submitBtn = document.createElement("button");
      submitBtn.classList.add("btn", "btn__submit");
      submitBtn.innerText = "Ок";
  
      submitBtn.addEventListener("click", () => {
        this.hide();
      });
  
      footer.append(submitBtn);
    }
  }
  
  class ConfirmModal extends Modal {
    constructor(options) {
      const { onDecline = () => {}, onSubmit = () => {}, ...rest } = options;
      super(rest);
      this.onDecline = onDecline;
      this.onSubmit = onSubmit;
    }
  
    render() {
      // const footer = super.render();
  
      super.render();
      const footer = this.modal.querySelector(".modal-footer");
      const declineBtn = document.createElement("button");
      const confirmBtn = document.createElement("button");
      declineBtn.classList.add("btn", "btn__cancel");
      confirmBtn.classList.add("btn", "btn__submit");
  
      declineBtn.innerText = "Відмінити";
      confirmBtn.innerText = "Підтвердити";
  
      declineBtn.addEventListener("click", () => {
        this.onDecline();
        this.hide();
      });
  
      confirmBtn.addEventListener("click", async () => {
        const cbResult = this.onSubmit();
        console.log(`cbResult`, cbResult)
        if(cbResult instanceof Promise) {
          confirmBtn.setAttribute('disabled', '');
          await cbResult
          confirmBtn.removeAttribute('disabled');
  
        }
        this.hide();
      });
  
      footer.append(declineBtn, confirmBtn);
    }
  }
  
  const cartBtn = document.getElementById('alert');
  const buyBtn  = document.getElementById('confirm');
  
  cartBtn.addEventListener('click', () => {
    const addToCartModal = new AlertModal({
      title: "Кошик",
      text: 'Товар додано до кошику'
    })
  
    addToCartModal.show()
  })
  
  buyBtn.addEventListener('click', () => {
    const addToCartModal = new ConfirmModal({
      title: "Замовлення",
      text: 'Ви підтверджуєту замовлення?',
      onSubmit: () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve()
          }, 1500)
        })
      }
    })
  
    addToCartModal.show()
  })