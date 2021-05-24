// import { getFileServerToken, deleteFileServer } from '@/api/qiniu'
// export default {
//   data() {
//     return {
//       postData: {
//         token: ''
//       },
//       uploadUrl: 'https://upload.qiniup.com/mall-imag.linxyun.com'
//     }
//   },
//   methods: {
//     getToken() {
//       return new Promise((resolve) => {
//         getFileServerToken().then(res => {
//           this.postData.token = (JSON.parse(res.data.data).Token)
//           console.log('mixins', this.postData.token)
//           resolve()
//         })
//       })
//     },
//     getImgUrl(res, file, fileList) {
//       console.log('mixins', 'http://mall-imag.linxyun.com/' + res.key)
//       return 'http://mall-imag.linxyun.com/' + res.key
//     },
//     deleteImg(url) {
//       if (url) {
//         let key = ''
//         if (url.includes('com/')) {
//           key = url.split('com/')[1]
//         } else {
//           key = url
//         }
//         try {
//           deleteFileServer({ FileID: key })
//         } catch (error) {
//           console.log('图片不存在', error)
//         }
//       }
//     }
//   }}
