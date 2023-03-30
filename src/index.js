// 이 곳에 정답 코드를 작성해주세요.
class Cart {
  carts = [];
  $cardGrid;
  $cartOpenButton;
  $cartCloseButton;
  $backdrop;
  $shoppingCart;
  mainCart = [];
  constructor() {
    this.#assignElement();
    this.handleDomEvent();
    this.getCartList()
      .then(() => {
        this.makeTemplates(this.carts);
      })
      .catch((err) => console.error(err));
  }

  #assignElement() {
    this.$cardGrid = document.getElementById('product-card-grid');
    this.$cartOpenButton = document.getElementById('open-cart-btn');
    this.$cartCloseButton = document.getElementById('close-cart-btn');
    this.$backdrop = document.getElementById('backdrop');
    this.$shoppingCart = document.getElementById('shopping-cart');
  }

  handleDomEvent() {
    this.$cartOpenButton.addEventListener('click', () =>
      this.toggleSideBar('open')
    );

    this.$cartCloseButton.addEventListener('click', () =>
      this.toggleSideBar('close')
    );

    this.$backdrop.addEventListener(
      'click',
      this.handleClickBackDrop.bind(this)
    );

    this.$cardGrid.addEventListener('click', this.handleClickList.bind(this));
  }

  handleClickList(e) {
    // 이벤트 위임
    // 누른거의 data-item을 가져와야함.
    // const article = this.$cardGrid.querySelector('#product-card');
    // li요소를 만들어서 붙여야함.

    const target = e.target;
    const parent = target.closest('#product-card');
    const id = parent.dataset.item;
    const imageUrl = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h3').innerText;
    const price = parent.querySelector('p').innerText;
    const item = {
      id,
      title,
      imageUrl,
      price,
      count: 0,
    };

    // 최초에 하나 주입
    this.mainCart.push(item);
    this.toggleSideBar('open');
  }

  handleClickBackDrop() {
    this.$backdrop.setAttribute('hidden', '');
    this.$shoppingCart.classList.remove('translate-x-0');
    this.$shoppingCart.classList.add('translate-x-full');
  }

  toggleSideBar(status) {
    // 열림
    if (status === 'open') {
      this.$backdrop.removeAttribute('hidden');
      this.$shoppingCart.classList.remove('translate-x-full');
      this.$shoppingCart.classList.add('translate-x-0');
    } else {
      // 닫힘
      this.$backdrop.setAttribute('hidden', '');
      this.$shoppingCart.classList.remove('translate-x-0');
      this.$shoppingCart.classList.add('translate-x-full');
    }

    // this.$shoppingCart.toggle('');
  }

  async getCartList() {
    try {
      const response = await fetch('./api/productData.json');
      if (response.ok) {
        const data = await response.json();
        this.carts = data;
      } else {
        // 에러 데이터 객체 임
        const errorData = await response.json();
        throw errorData;
      }
    } catch (err) {
      console.log(err);
    }
  }

  makeTemplates(carts) {
    const template =
      carts && carts.length !== 0
        ? carts
            .map(
              ({ id, imgSrc, name, price }) =>
                `<article id="product-card" data-item=${id}>
              <div class="rounded-lg overflow-hidden border-2 relative">
                <img
                  src=${imgSrc}
                  class="object-center object-cover"
                />
                <div
                  class="hover:bg-sky-500 w-full h-full absolute top-0 left-0 opacity-90 transition-colors ease-linear duration-75"
                >
                  <div
                    data-productid="1"
                    class="hover:opacity-100 opacity-0 w-full h-full flex justify-center items-center text-xl text-white font-bold cursor-pointer"
                  >
                    장바구니에 담기
                  </div>
                </div>
              </div>
              <h3 class="mt-4 text-gray-700">${name}</h3>
              <p class="mt-1 text-lg font-semibold text-gray-900">${
                Number(price).toLocaleString('ko-KR') + '원'
              }</p>
            </article>`
            )
            .join('')
        : `<p>상품이 없습니다</p>`;

    this.$cardGrid.innerHTML = template;
  }
}

new Cart();

// 닫기 버튼 눌렀을때
// 1. backdrop 에 hidden attribute 붙이기
// 2. shopping cart에 class 이름 붙이기 translate-x-full

// 상품 목록을 각각 누르게 되면?

// 아이템을 클릭을 하게 되면 해당 정보들을 객체로 저장한다.
