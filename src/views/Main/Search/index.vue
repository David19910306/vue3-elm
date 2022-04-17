<template>
  <div class="search">
    <Header>
      <template v-slot:left><span><i class="iconfont icon-fangxiang-zuo arrowLeft leftIcon"></i></span></template>
      <template v-slot:center><span class="detail-center">搜索</span></template>
    </Header>
    <section class="search-container">
      <section class="input-content">
        <input placeholder="请输入商家或美食名称" type="text" @input="inputChangeHandler"/>
        <button @click="submit">提交</button>
      </section>
      <section class="search-history" v-if="researchWord.length > 0 && keyWord === ''">
        <header>搜索历史</header>
        <ul class="history-ul">
          <li v-for="word in researchWord" :key="word"><span>{{word}}</span>
            <Icon color="#33333" name="cross" @click="delCurrentWord(word)" />
          </li>
        </ul>
        <footer class="clear-history" @click="researchWord = []">清空搜索历史</footer>
      </section>
      <section class="result-content" v-if="result.length > 0 && keyWord !== ''">
        <header>商家</header>
        <ul class="list-ul">
          <li class="list-li" v-for="restaurant in result" :key="restaurant.id" @click="router.push({ path: `/shop/${restaurant.id}` })">
            <section class="item-left"><img :src="`https://elm.cangdu.org/img/${restaurant.image_path}`" /></section>
            <section class="item-right">
              <div class="item-right-text">
                <p>
                  <span class="shop-name">{{restaurant.name}}</span>
                  <Tag color="#FF6000" plain>支付</Tag>
                </p>
                <p>{{`月售 ${restaurant.recent_order_num} 单`}}</p>
                <p>{{`${restaurant.float_minimum_order_amount} 元起送 / 距离${restaurant.distance}公里`}}</p>
              </div>
              <ul class="item-right-detail"></ul>
            </section>
          </li>
        </ul>
      </section>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Tag, Icon } from 'vant'
import Header from '@/components/header/index.vue'
import httpRequest from '@/api'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainSearch',
  components: { Header, Tag, Icon },
  setup () {
    const store = useStore()
    const router = useRouter() // 点击路由跳转
    const keyWord = ref('')
    const result = ref([])
    const researchWord = ref([] as string[]) // 搜索历史
    // 输入框输入事件
    const inputChangeHandler = (event: InputEvent) => {
      // 每次输入前，清空上一次的搜索结果列表
      result.value = []
      const element = event.target as HTMLInputElement
      // console.log(element.value)
      keyWord.value = element.value
    }

    // 搜索按钮点击事件
    const submit = async () => {
      researchWord.value.unshift(keyWord.value) // 收集搜索的关键字
      const response = await httpRequest('/api/v4/restaurants', 'get', { geohash: store.getters.getGeoHash, keyword: keyWord.value })
      // console.log(response)
      result.value = response.data
    }

    // 搜索历史叉叉点击
    const delCurrentWord = (delWord: string) => {
      researchWord.value = researchWord.value.filter(word => word !== delWord)
    }

    return { submit, inputChangeHandler, result, keyWord, researchWord, delCurrentWord, router }
  }
})
</script>

<style lang="less" scoped>
.search{
  display: flex;
  flex-direction: column;
  height: 100%;
  .detail-center{
    font-size: .2rem;
    font-weight: 700;
  }
  .arrowLeft{
    font-size: .25rem;
  }
  .search-container{
    overflow-y: auto;
    background-color: #f5f5f5;
    flex: 1;
    .input-content{
      background-color: #fff;
      padding: .1rem;
      display: flex;
      height: 0.4rem;
      input{
        flex: 4;
        border: 0.005rem solid #e4e4e4;
        font-size: .15rem;
        color: #333;
        border-radius: 0.03rem;
        background-color: #f2f2f2;
        font-weight: 700;
        padding: 0 0.058rem;
      }
      button{
        flex: 1;
        border: 0.005rem solid #3190e8;
        margin-left: 0.046rem;
        font-size: .15rem;
        color: #fff;
        border-radius: 0.03rem;
        background-color: #3190e8;
        font-weight: 700;
        padding: 0 0.058rem;
      }
    }
    .result-content{
      header{
        font-size: .14rem;
        line-height: .46rem;
        text-indent: 0.12rem;
        font-weight: 700;
        color: #666;
      }
      .list-ul{
        background-color: #fff;
        .list-li{
          display: flex;
          padding: .117rem;
          border-bottom: .0058rem solid #e4e4e4;
          .item-left{
            margin-right: .06rem;
            img{
              width: .4rem;
              height: .4rem;
            }
          }
          .item-right{
            font-size: .13rem;
            flex: 1;
            .item-right-text{
              padding-bottom: 0.058rem;
              border-bottom: 0.0058rem solid #e4e4e4;
              p{
                line-height: .2rem;
                .shop-name{
                  margin-right: .1rem;
                }
              }
            }
          }
        }
      }
    }
    .search-history{
      header{
        font-size: .14rem;
        line-height: .46rem;
        text-indent: 0.12rem;
        font-weight: 700;
        color: #666;
      }
      .history-ul{
        background-color: #fff;
        li{
          display: flex;
          justify-content: space-between;
          padding: 0 .1rem;
          font: 0.16rem/.46rem Microsoft YaHei;
          align-items: center;
          border-bottom: .005rem solid #e4e4e4;
        }
      }
      .clear-history{
        background-color: #fff;
        color: #3190e8;
        font: 0.16rem/.46rem Microsoft YaHei;
        font-weight: 700;
        text-align: center;
      }
    }
  }
}
</style>
