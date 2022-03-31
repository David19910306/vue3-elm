<template>
  <section class="menu-detail-list">
    <div class="menu-detail-link">
      <section class="food-detail-img">
        <img :src="food.image_path.startsWith('blob')? 'http://img.daimg.com/uploads/allimg/140505/1-140505004P3.jpg'
          : food.image_path.startsWith('https')? `${food.image_path}`: `https://elm.cangdu.org/img/${food.image_path}`" alt="food-image" />
      </section>
      <section class="food-detail-description">
        <h3 class="food-description-head">
          <strong class="description-food-name">{{food.name}}</strong>
          <ul class="attribute-ul" v-if="food.attributes.length > 0 && food.attributes[0] !== null">
            <li class="attribute-new" v-if="food.attributes.find(attribute => attribute && attribute.icon_name === '新')">
              <p style="color:#fff">新品</p>
            </li>
            <li>
              <Tag style="margin-right: .03rem;" plain :color="attribute? `#${attribute.icon_color}`: '#ff1200'" v-for="(attribute, index) in food.attributes" :key="index">
                <template v-if="attribute">{{attribute.icon_name}}</template>
              </Tag>
            </li>
          </ul>
        </h3>
        <p class="food-description-content" v-if="food.description">{{food.description}}</p>
        <p class="food-sail-rating">
          <span>{{food.tips.split(' ')[1]}}</span>
          <span>好评率{{food.satisfy_rate}}%</span>
        </p>
        <p class="food-activity" v-if="food.activity">
          <Tag plain type="danger">{{food.activity.image_text}}</Tag>
        </p>
      </section>
    </div>
    <footer class="menu-detail-footer">
      <section class="food-price">
        <span>￥</span>
        <span>{{food.specfoods[0].price}}</span>
      </section>
      <section class="cart-module">
        <section class="cart-button" v-if="food.specifications.length === 0">
          <template v-if="store.state.cartFoods.length > 0 && store.state.cartFoods.find(cartFood => cartFood.item_id === food.item_id)">
            <span class="iconfont icon-jianshao" @click="deleteFood(food.item_id)"></span>
            <span class="cart-num">{{store.state.cartFoods.find(cartFood => cartFood.item_id === food.item_id).foodCount}}</span>
          </template>
          <span class="iconfont icon-jia" @click="chooseSpecFoods"></span>
        </section>
        <section class="choose-specification" v-else>
          <template v-if="store.state.cartFoods.length > 0 && store.state.cartFoods.find(cartFood => cartFood.item_id === food.item_id)">
            <span class="iconfont icon-jianshao choose-specifications" @click="Toast({message:'多规格商品请在购物车中删除...', position: 'bottom'})"></span>
            <span class="cart-num">{{specsTotal[food.item_id].reduce((previous, current) => previous + current.foodCount, 0)}}</span>
          </template>
          <Tag type="primary" size="medium" @click="show = !show">选规格</Tag>
        </section>
      </section>
    </footer>
  </section>
  <ConfigProvider :theme-vars="themeVars">
    <van-dialog v-model:show="show" :show-confirm-button="false">
      <section class="food-specification">
        <header class="spec-food-header">
          <h4>{{food.name}}</h4>
          <Icon name="cross" size="0.23rem" @click="show = false"/>
        </header>
        <section class="spec-food-content">
          <h5>规格</h5>
          <section class="spec-tag">
            <Tag @click="clickCurrentTag(spec.food_id)" v-for="spec in food.specfoods" :key="spec.food_id" plain
              :color="`${currentSpecsId === spec.food_id? '#3199e8': '#aaa'}`"
              style="margin: 0 0.08rem 0.07rem 0" size="large">{{spec.specs_name}}</Tag>
          </section>
        </section>
        <footer class="spec-footer">
          <div class="specs_price"><span>¥</span><span>{{currentPrice}}</span></div>
          <Button type="primary" size="small" @click="addToCart(),show = false">加入购物车</Button>
        </footer>
      </section>
    </van-dialog>
  </ConfigProvider>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { Tag, Dialog, Icon, ConfigProvider, Button, Toast } from 'vant'
import { addFoodsToCart, minusFoodInCart } from '@/hook/cart'
import { useStore } from 'vuex'

export default defineComponent({
  components: { Tag, [Dialog.Component.name]: Dialog.Component, Icon, ConfigProvider, Button },
  props: ['food'],
  setup (props) {
    // 自定义样式风格
    const themeVars = {
      dialogBorderRadius: '.05rem',
      tagDefaultColor: '#333',
      tagLargePadding: '0.09rem 0.14rem'
    }
    const store = useStore()

    const show = ref(false) // 对话框默认关闭
    const specShow = ref(false)
    const currentSpecsId = ref(props.food.specfoods[0].food_id) // 默认选中第一个
    const currentPrice = ref(props.food.specfoods[0].price) // 显示第一个标签的价格

    // 选择当前的规格标签
    const clickCurrentTag = (foodId:number) => {
      currentSpecsId.value = foodId
      // eslint-disable-next-line camelcase
      currentPrice.value = props.food.specfoods.find((spec:Record<string, any>) => spec.food_id === foodId).price
    }

    // 直接選擇的商品
    const chooseSpecFoods = () => {
      specShow.value = true
      // console.log(props.food)
      addFoodsToCart(store, props.food, props.food.item_id)
      // console.log(itemId, store.state.cartFoods)
    }

    // watch(cartFoods, () => {
    //   console.log(cartFoods.length)
    // }, { immediate: true, deep: true })

    // 计算属性
    const specsTotal = computed(() => {
      // 返回item_id相同的food对象
      return store.state.cartFoods.reduce((acc:Record<string, any>, food:Record<string, any>) => {
        const key = food.item_id
        if (!acc[key]) {
          acc[key] = []
        }
        acc[key].push(food)
        return acc
      }, {})
      // for (const key in final) {
      //   return final[key].reduce((previous:number, current:Record<string, any>) => previous + current.foodCount, 0)
      // }
      // return 0
    })

    // 添加购物车
    const addToCart = () => {
      // console.log(props.food)
      addFoodsToCart(store, props.food, currentSpecsId.value)
      specShow.value = true
    }

    // 删除非多规格的商品
    const deleteFood = (itemId:number) => {
      // console.log(itemId)
      // const delFood = store.state.cartFoods.find((cartFood:Record<string, any>) => cartFood.item_id === itemId)
      // --delFood.foodCount
      minusFoodInCart(store, itemId)
    }

    return {
      themeVars,
      show,
      clickCurrentTag,
      currentSpecsId,
      currentPrice,
      addToCart,
      chooseSpecFoods,
      specShow,
      store,
      specsTotal,
      Toast,
      deleteFood
    }
  }
})
</script>

<style lang="less" scoped>
.menu-detail-list{
  height: 100%;
  background-color: #fff;
  padding: .14rem .09rem;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid #f8f8f8;
  .menu-detail-link{
    display: flex;
    .food-detail-img{
      margin-right: .09rem;
      img{
        width: .46rem;
        height: .46rem;
        display: block;
      }
    }
    .food-detail-description{
      width: 100%;
      .food-description-head{
        display: flex;
        justify-content: space-between;
        margin-bottom: .04rem;
        .description-food-name{
          color: #333;
          font-size: .16rem;
          font-weight: 600;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          max-width: 1.8rem;
        }
        .attribute-ul{
          display: flex;
          .attribute-new{
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            background-color: #4cd964;
            width: .46rem;
            height: .46rem;
            align-items: flex-end;
            transform: rotate(-45deg) translate(-0.023rem, -.345rem);
            border: none;
            border-radius: 0;
            p{
              font-size: .12rem;
              text-align: center;
              flex: 1;
              transform: scale(.8);
              color: #fff;
            }
          }
          li{
            font-size: .12rem;
            height: 0.14rem;
            line-height: .08rem;
            padding: 0.023rem;
            // border: 1px solid #666;
            border-radius: 0.07rem;
            margin-right: 0.023rem;
            transform: scale(.8);
          }
        }
      }
      .food-description-content{
        font-size: .12rem;
        color: #999;
        line-height: .138rem;
      }
      .food-sail-rating{
        line-height: .18rem;
        span:first-child{
          margin-right: .07rem;
        }
        span{
          color: #333;
          font-size: .12rem;
        }
      }
      .food-activity{
        line-height: .09rem;
      }
    }
  }
  .menu-detail-footer{
    margin-left: .56rem;
    // margin-top: .07rem;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    .food-price{
      span:first-child{
        font-size: .12rem;
        color: #f60;
        margin-right: .01rem;
      }
      span:last-child{
        font-size: .16rem;
        color: #f60;
        font-weight: 700;
        margin-right: .07rem;
      }
    }
    .cart-module{
      .cart-button{
        display: flex;
        align-items: center;
        span{
          color: #3190e8;
          font-size: .16rem;
        }
        .cart-num{
          font-size: .16rem;
          color: #666;
          min-width: .2rem;
          text-align: center;
          font-family: "Helvetica Neue,Tahoma";
        }
      }
      .choose-specification{
        display: flex;
        align-items: center;
        .choose-specifications {
          color: #3190e8;
          font-size: .16rem;
        }
        .cart-num{
          font-size: .16rem;
          color: #666;
          min-width: .2rem;
          text-align: center;
          font-family: "Helvetica Neue,Tahoma";
        }
      }
    }
  }
}

// 对话框样式风格
.food-specification{
  .spec-food-header{
    padding: .17rem .1rem;
    position: relative;
    h4{
      font-size: .18rem;
      color: #222;
      font-weight: 600;
      text-align: center;
    }
    i{
      position: absolute;
      top: .05rem;
      right: .05rem;
    }
  }
  .spec-food-content{
    padding: 0 .2rem;
    h5{
      font-size: .15rem;
      color: #666;
    }
    .spec-tag{
      padding: .1rem 0;
      display: flex;
      flex-wrap: wrap;
    }
  }
  .spec-footer{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f9f9f9;
    padding: 0.12rem;
    border: 1px;
    border-bottom-left-radius: 0.05rem;
    border-bottom-right-radius: 0.05rem;
    .specs_price{
      span{
        color: #ff6000;
      }
      span:first-child{
        font-size: .12rem;
      }
      span:last-child{
        font-size: .19rem;
        font-weight: 700;
        font-family: "Helvetica Neue,Tahoma";
      }
    }
  }
}
</style>
