<template>
  <div class="content">
<van-card
  v-for="(item,index) of products"
  :key="index"
  tag="标签"
  :price="item.productPrice"
  :desc="item.productInfo"
  :title="item.productName"
  :thumb="item.productCover"
>
  <view slot="footer">
    <van-stepper  :value="item.productCount" @change="handleSte" :data-id="item.id"/>
      <van-checkbox  :value="item.isSelected" @change="handleChe(item.id)" >选中</van-checkbox>
    <van-button size="mini" @click="handleDle(index)">删除</van-button>
  </view>
</van-card>

<van-submit-bar
  :price="sum"
  button-text="提交订单"
  bind:submit="onClickButton"
>
  <van-checkbox :value="checkAll" @change="handleClick">全选</van-checkbox>
</van-submit-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      products:[],
      checkAll:true
    }
  },
  onLoad () {
     var url = "http://yapi.demo.qunar.com/mock/34622/";
    this.$http.get(url).then(res=>{
      this.products = res.data
    })
},
  computed: {
    sum() {
      var total = 0;
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].isSelected) {
          total =
            total +
            this.products[i].productCount * this.products[i].productPrice;
        } else {
          continue;
        }
      }
      return total * 100;
    }
  },
  methods: {
    handleChe(id){
      this.products.forEach(item=>{
        if(item.id==id){
         item.isSelected = !item.isSelected
        }
      })
      this.checkAll = this.products.every(item=>item.isSelected)

    },
    handleClick(){
      this.checkAll = !this.checkAll
      this.products.forEach(item=>{
        item.isSelected = this.checkAll
      })
    },
    handleSte(e){
      var id = e.target.dataset.id
       this.products.forEach(item=>{
        if(item.id==id){
         item.productCount = e.mp.detail
        }
      })
    },
    handleDle(index){
       this.products.splice(index, 1);
    }
  },

}
</script>
<style scoped>
.content{
  height: 1500px;
}
</style>