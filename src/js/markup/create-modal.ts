import noLogo from '../../assets/png/nologo.png';

export function createModal(urlIsModalOpen: string) {
  return `<div class="modal ${urlIsModalOpen ? 'show-modal' : ''}">
            <div class="modal-content">
                <form action="#catalog" method="get" enctype="multipart/form-data" class="form form__modal">
                    <button type="button" class="close-button">&times;</button>
                    <div class="personal">
                        <h2>Personal details</h2>
                        <div class="personal__name form_item">
                          <input type="text" pattern="[a-zA-Z]{3,}(\\s[a-zA-Z]{3,})+" title="Please enter correct first and last name" placeholder="Name" class="form_item" id="name-input" required>
                        </div>
                        <div class="personal__phone form_item">
                          <input type="tel" pattern="\\+[0-9]{9,}" title="Please enter correct phone number: starts with '+', contains only digits, no shorter than 9 digits" placeholder="Phone number" class="form_item" id="phone-input" required>
                        </div>
                        <div class="personal__adress form_item">
                          <input type="text" pattern="[a-zA-Z]{5,}(\\s[a-zA-Z]{5,})(\\s[a-zA-Z]{5,})+" title="Please enter correct delivery adress: contains at least three words, each at least 5 characters long" placeholder="Delivery adress" class="form_item" id="address-input" required>
                        </div>
                        <div class="personal__email form_item">
                          <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Please enter correct e-mail adress" placeholder="E-mail" class="form_item" id="email-input" required>
                        </div>
                      </div>

                      <div class="card">
                        <h2>Credit card details</h2>
                        <div class="card__info">
                          <div class="card__numberlogo">
                            <div class="card__logo">
                            <img alt="nologo" class="card__img" src="${noLogo}" />
                            </div>
                            <div class="card__number">
                              <input type="number" id="card-number" min="1000000000000000" max="9999999999999999" title="Please enter correct 16 digital number of your card" placeholder="Card number" class="card__form_item" required>
                            </div>
                          </div>
                          <div class="card__other">
                            <div class="card__valid_info">
                              <h3 class="card__text">VALID:</h3>
                              <input type="text" id="expiration-date" title="The first two numbers must be less than twelve" placeholder="Valid Thru" class="card__form_item" required>
                              <span class="invalid-expiration"></span>
                            </div>
                            <div class="card__cvv_info">
                              <h3 class="card__text">CVV:</h3>
                              <input type="number" id="cvv" min="100" max="999" placeholder="Code" title="Please enter CVV code/period" class="card__form_item" required>
                            </div>
                          </div>
                        </div>
                        <div class="btn-confirm-wrapper">
                        <button class="btn-confirm" type="submit" value="CONFIRM"></button>
                        </div>
                    </div>
                    </form>
                  </div>
                </div>`;
}
