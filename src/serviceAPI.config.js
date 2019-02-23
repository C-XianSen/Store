const BASEURL = "https://www.easy-mock.com/mock/5b85fb6cb6eb682fc7f9f013/vueshop/"
const LOCALURL = "http://localhost:3000/"
const URL = {
  getShoppingMallInfo: BASEURL + 'index',
  getGoodsInfo: BASEURL +'getGoodsInfo',
  registerUser: LOCALURL +'user/register',  // 用户注册接口
  loginUser: LOCALURL +'user/login',  // 用户登录接口
  getDetailGoodsInfo: LOCALURL + 'goods/getDetailGoodsInfo',  // 获取商品详情
  getCategoryList: LOCALURL + 'goods/getCategoryList',  // 获取大类别信息
  getCategorySubList: LOCALURL + 'goods/getCategorySubList',  // 获取小类别信息
  getGoodsListByCategorySubID: LOCALURL + 'goods/getGoodsListByCategorySubID',  // 获取小类别商品信息
}

module.exports = URL