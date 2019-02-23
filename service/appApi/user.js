const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.get('/', async(ctx)=> {
  ctx.body= "这是用户操作首页"
})

// 注册
router.post('/register', async(ctx)=> {
  // 获取model
  const User = mongoose.model('User')

  // 封装前端接收的POST数据成一个新的user对象
  let newUser = new User(ctx.request.body)

  // 用mongoose的方法save直接存储,然后判断是否成功,返回结果
  await newUser.save()
  .then(()=> {
    console.log(newUser)    
    // 成功就输出code=200,并返回成功信息
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  })
  .catch(error=> {
    console.log(newUser)
    // 失败就输出code=500,并返回错误信息
    ctx.body = {
      code: 500,
      message: error
    }
  })
})

// 登录
router.post('/login', async(ctx)=> {
  // 获取前端传递的数据
  let loginUser = ctx.request.body
  console.log(loginUser)
  let userName = loginUser.userName
  let passWord = loginUser.passWord
  // 引入User的model
  const User = mongoose.model('User')
  // 查找用户名是否存在，如果存在开始比对信息
  await User.findOne({userName: userName}).exec().then(async(result) => {
    console.log(result)
    if (result) {
      // 当用户名存在时，开始比对密码
      let newUser = new User()
      await newUser.comparePassword(passWord, result.passWord)
      .then((isMatch) => {
        // 返回比对结果
        ctx.body = {
          code: 200,
          message: isMatch
        }
      })
      .catch(error => {
        // 出现异常,返回异常
        console.log(error)
        ctx.body = {
          code: 500,
          message: error
        }
      })
    } else {
      ctx.body = {
        code: 200,
        message: error
      }
    }
  }).catch(error => {
    console.log(error)
    ctx.body = {
      code: 500,
      message: error
    }
  })
})

module.exports = router;