import '@/vendor/gt'
export default function (options) {
  return new Promise((resolve, reject) => {
    window.initGeetest(options, catchaObj => {
      resolve(catchaObj)
    })
  })
}
