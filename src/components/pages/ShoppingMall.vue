<template>
    <div>
        <!-- search bar layout -->
        <div class="search-bar">
            <van-row gutter="5">
                <van-col span="3">
                    <img :src="locationIcon" width="80%" class="location-icon">
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input">
                </van-col>
                <van-col span="5">
                    <van-button size="mini">查找</van-button>
                </van-col>
            </van-row>
        </div>
        <!-- swipe area -->
        <div class="swipe-area">
            <van-swipe :autoplay="2000">
                <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
                    <img v-lazy="banner.image" width="100%">
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- type-bar -->
        <div class="type-bar">
            <div class="type-item" v-for="(cate, index) in category" :key="index">
                <img v-lazy="cate.image" width="90%">
                <span>{{cate.mallCategoryName}}</span>
            </div>
        </div>
        <!-- AD banner area -->
        <div class="ad-banner">
            <img v-lazy="adBanner" width="100%">
        </div>
        <!-- Recommend goods area -->
        <div class="recommend-area">
            <div class="recommend-title">商品推荐</div>
            <div class="recommend-body">
                <!-- swiper -->
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item, index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                            <img :src="item.image" width="80%">
                            <div>{{item.goodsName}}</div>
                            <div>￥{{item.price | moneyFilter}}(￥{{item.mallPrice | moneyFilter}})</div>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <!-- floor -->
        <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
        <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
        <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
        <!-- Hot Area -->
        <div class="hot-area">
            <div class="hot-title">热卖商品</div>
            <div class="hot-goods">
                <van-list>
                    <van-row gutter="20">
                        <van-col span="12" v-for="(item, index) in hotGoods" :key="index">
                            <goods-info :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
                        </van-col>
                    </van-row>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import 'swiper/dist/css/swiper.css'
import {swiper, swiperSlide} from 'vue-awesome-swiper'

import floorComponent from '../component/floorComponent'
import goodsInfo from '../component/goodsInfoComponent'
import {toMoney} from '@/filter/moneyFilter.js'
import url from '@/serviceAPI.config.js'

export default {
    components: {
        swiper,
        swiperSlide,
        floorComponent,
        goodsInfo
    },
    data() {
        return {
            locationIcon: require('../../assets/images/location.png'),
            bannerPicArray: [],
            category: [],
            adBanner: '',
            recommendGoods: [],
            swiperOption: {
                slidesPerView: 3
            },
            floor1: [],
            floor2: [],
            floor3: [],
            floorName: {},
            hotGoods: [],
        }
    },
    created() {
        axios({
            url: url.getShoppingMallInfo,
            method: 'get'
        })
        .then(response => {
            console.log(response)
            if (response.status == 200) {
                this.bannerPicArray = response.data.data.slides;
                this.category = response.data.data.category;
                this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS;
                this.recommendGoods = response.data.data.recommend;
                this.floor1 = response.data.data.floor1;
                this.floor2 = response.data.data.floor2;
                this.floor3 = response.data.data.floor3;
                this.floorName = response.data.data.floorName;
                this.hotGoods = response.data.data.hotGoods
            }
        })
        .catch((error) => {
            console.log(error)
        })
    },
    filters: {
        moneyFilter(money) {
            return toMoney(money)
        }
    }
}
</script>

<style scoped>
/* search */
.search-bar{
    height: 2.2rem;
    background-color: #e5017d;
    line-height: 2.2rem;
    overflow: hidden;
}
.search-input{
    width: 100%;
    height: 1.3rem;
    border: none;
    border-bottom: 1px solid 1px !important;
    background-color:#e5017d;
    color: #fff;
}
.location-icon{
    padding-top: .2rem;
    padding-left: .3rem;
}
/* swiper */
.swipe-area{
    width: 20rem;
    clear: both;
}
/* type-bar */
.type-bar{
    background-color: #fff;
    margin: 0 .3rem .3rem .3rem;
    border-radius: .3rem;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
}
.type-item{
    flex: 1;
    padding: .3rem;
    font-size: 12px;
    text-align: center;
}
/* recommend */
.recommend-area{
    background-color: #fff;
    margin-top: .3rem;
}
.recommend-title{
    border-bottom: 1px solid #eee;
    font-size: 14px;
    padding: .2rem;
    color: #e5017d;
}
.recommend-body{
    border-bottom: 1px solid #eee;
}
.recommend-item{
    width: 99%;
    border-right: 1px solid #eee;
    font-size: 12px;
    text-align: center;
}
/* floor */

/* Hot Area */
.hot-area{
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
}
.hot-goods{
    height: 130rem;
    overflow: hidden;;
    background-color: #fff;
}
</style>
