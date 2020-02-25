import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image, Button, Checkbox} from '@tarojs/components'
import './index.css'
import {  AtInputNumber} from 'taro-ui'

export default class Index extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      book: [],
      allchecked: true
    }
  }
  handleNumber(id,e){
    var book = this.state.book
    book.forEach(item=>{
      if(id==item.id){
        item.productCount =e
      }
      this.setState({
        book
      })
    })
  }

  handleChange(id, e) {
    var book = this.state.book
    book.forEach(item => {
      if (id == item.id) {
        item.isSelected = !item.isSelected
      }
    })
    this.setState({
      book
    })
    var allchecked = book.every(item => item.isSelected)
    this.setState({
      allchecked
    })
  }
  handleClick(e) {
    var allchecked = this.state.allchecked
    this.setState({
      allchecked: !allchecked
    })
    var book = this.state.book
    book.map(item => (item.isSelected = !allchecked));
    this.setState({
      book
    })
  }
  handleDle(index) {
    var book = this.state.book
    book.splice(index, 1)
    this.setState({
      book
    })
  }

  sum() {
    var total = 0;
    var book = this.state.book
    for (let i = 0; i < book.length; i++) {
      if (book[i].isSelected) {
        total =
          total +
          book[i].productCount * book[i].productPrice;
      } else {
        continue;
      }
    }
    return total.toFixed(2)
  }

  componentWillMount() {
    Taro.request({
      url: 'http://yapi.demo.qunar.com/mock/34622/',
      data: {
        foo: 'foo',
        bar: 10
      },
      header: {
        'content-type': 'application/json'
      }
    })
      .then(res =>
        this.setState({
          book: res.data
        })
      )
  }

  render() {
    return (
      <View className='index'>
        <View>{this.state.book.map((item, index) => {
          return (
            <View className="nav" key={item.id}>
              <Checkbox checked={item.isSelected} onClick={this.handleChange.bind(this, item.id)} />
              <Image src={item.productCover} />
              <view className="nav-content">
                <view>{item.productName}</view>
                <view>{item.productInfo}</view>
                <Viwe>$:{item.productPrice}</Viwe>
                <View><AtInputNumber
                  min={0}
                  max={10}
                  step={1}
                  value={item.productCount}
                  onChange={this.handleNumber.bind(this,item.id)}
                /></View>
                <view>小计：{item.productPrice * item.productCount}</view>
                <Text onClick={this.handleDle.bind(this, index)}>删除</Text>
              </view>

            </View>
          )
        })}</View>
        <Checkbox checked={this.state.allchecked} onClick={this.handleClick.bind(this)}>全选</Checkbox>
        <View>总价：{this.sum()}</View>
      </View>
    )
  }
}
