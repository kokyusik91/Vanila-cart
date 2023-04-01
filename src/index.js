import getCartData from './api/getProdcutData.js'
import ProductList from './component/ProductList.js'
import CartList from './component/CartLst.js'

const $productListGrid = document.getElementById('product-card-grid')
const $openCartButton = document.getElementById('open-cart-btn')
const $closeCartButton = document.getElementById('close-cart-btn')
const $shoppingCart = document.getElementById('shopping-cart')
const $backdrop = document.getElementById('backdrop')
const $cartList = document.getElementById('cart-list')
const $paymentButton = document.getElementById('payment-btn')
const cartListFromLocalStorage = localStorage.getItem('cart')

let productData = []

// 최초 렌더링을 한번한다.
const productList = new ProductList($productListGrid, [])
const cartList = new CartList(
  $cartList,
  cartListFromLocalStorage ? JSON.parse(cartListFromLocalStorage) : []
)

const toggleCart = () => {
  $shoppingCart.classList.toggle('translate-x-full')
  $shoppingCart.classList.toggle('translate-x-0')

  $backdrop.hidden = !$backdrop.hidden
}

const main = async () => {
  const result = await getCartData()
  // 두번째 렌더링을 진행한다.
  productList.setState(result)
  productData = result
}
const addCartItem = (e) => {
  // 상품 장바구니에 추가하기

  const clickedProduct = productData.find(
    (product) => product.id == e.target.dataset.productid
  )
  // 유저가 다른 글씨를 클릭했을때는? 함수 return 으로 실행안되게 하기
  if (!clickedProduct) return
  cartList.addItem(clickedProduct)
  toggleCart()
}

const deleteCartItem = (e) => {
  // 현재 클릭한 상품을 장바구니
  // id를 메서드로 넘긴다.
  const id = e.target.closest('li').id

  // if (e.target.className === 'remove-btn') {
  //   cartList.deleteItem(+id)
  // }

  // if (e.target.className === 'increase-btn') {
  //   cartList.plusItem(+id)
  // }

  // if (e.target.className === 'decrease-btn') {
  //   cartList.minusItem(+id)
  // }

  switch (e.target.className) {
    case 'increase-btn':
      cartList.plusItem(+id)
      break
    case 'decrease-btn':
      cartList.minusItem(+id)
      break
    case 'remove-btn':
      cartList.deleteItem(+id)
      break
    default:
      return
  }
}

const onSave = () => {
  cartList.onSaveToLocalStorage()
}

main()

$openCartButton.addEventListener('click', toggleCart)
$closeCartButton.addEventListener('click', toggleCart)
$backdrop.addEventListener('click', toggleCart)
$productListGrid.addEventListener('click', addCartItem)
$cartList.addEventListener('click', deleteCartItem)
$paymentButton.addEventListener('click', onSave)
