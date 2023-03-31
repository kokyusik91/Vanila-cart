class CartList {
  constructor($target, initialData) {
    this.$target = $target
    this.$container = document.createElement('ul')
    this.$container.className = 'divide-y divide-gray-200'
    this.$totalCount = document.getElementById('total-count')
    this.state = initialData
    this.$target.append(this.$container)
    this.totalArray = []
    this.render()
  }

  setState(newState) {
    this.state = newState
    console.log(this.state)
    this.render()
  }

  addItem(productData) {
    let newState
    // 현재 장바구니 데이터에, 지금 추가하려고 하는 아이템이 존재하는지를 파악
    const productId = productData.id
    const checkedIndex = this.state.findIndex((item) => item.id === productId)
    if (checkedIndex === -1) {
      newState = [...this.state, { ...productData, count: 1 }]
    } else {
      newState = [...this.state]
      // 와우 이게 대박이다!! 나는 forEach 썼는데... 🤣
      newState[checkedIndex].count++
    }
    this.setState(newState)
  }

  deleteItem(id) {
    const newState = this.state.filter((item) => item.id !== id)
    // 새로운 state로 변경해준다.
    this.setState(newState)
  }

  getTotalPrice() {
    return this.state.reduce((acc, cul) => acc + cul.price * cul.count, 0)
  }

  plusItem(id) {
    const newState = [...this.state]
    const checkedIndex = this.state.findIndex((item) => item.id === id)
    if (newState[checkedIndex].count < 10) {
      newState[checkedIndex].count += 1
    } else {
      alert('최대 수량은 10개 입니다')
      return
    }
    this.setState(newState)
  }

  minusItem(id) {
    const newState = [...this.state]
    newState.forEach((item) => {
      if (item.id === id) {
        if (item.count === 1) {
          alert('최소 수량은 1개 입니다')
          return
        } else item.count--
      }
    })
    this.setState(newState)
  }

  render() {
    this.$totalCount.innerHTML = `${this.getTotalPrice().toLocaleString(
      'ko-KR'
    )} 원`
    this.$container.innerHTML = this.state
      .map((item) => {
        return `
              <li class="flex py-6" id=${item.id}>
                    <div
                      class="h-24 w-24 overflow-hidden rounded-md border border-gray-200"
                    >
                      <img
                        src=${item.imgSrc}
                        class="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div class="ml-4 flex flex-1 flex-col">
                      <div>
                        <div
                          class="flex justify-between text-base font-medium text-gray-900"
                        >
                          <h3>${item.name}</h3>
                          <p class="ml-4">${(
                            item.price * item.count
                          ).toLocaleString('ko-KR')}원</p>
                        </div>
                      </div>
                      <div class="flex flex-1 items-end justify-between">
                        <div class="flex text-gray-500">
                          <button class="decrease-btn">-</button>
                          <div class="mx-2 font-bold">${item.count}</div>
                          <button class="increase-btn">+</button>
                        </div>
                        <button
                          type="button"
                          class="font-medium text-sky-400 hover:text-sky-500"
                        >
                          <p class="remove-btn">삭제하기</p>
                        </button>
                      </div>
                    </div>
                  </li>
      `
      })
      .join('')
  }
}

export default CartList
