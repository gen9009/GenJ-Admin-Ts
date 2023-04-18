/* 
  @actionsName imgSlice 图片文件切片上传
  @params {File} file  文件流参数 
  @params {Number} sliceSize 切片大小
  使用规范 imgSlice(params).then(res=>{})
  总结:
  1、使用File.prototype.slice按照sliceSize分片
  2、读取文件,文件片段生成唯一标识
  3、
*/
// export const imgSlice = (file: File, sliceSize: number) => {
//   const md5 = ''; //唯一标识
//   const { name, size: totalSize } = file;
// };

/* 
  @actionsName imgSlice 图片文件切片上传
  @params {File} file  文件流参数 
  @params {Number} sliceSize 切片大小
    使用规范 fileSlice(params).then(res=>{})
  总结:
*/
// export const fileSlice = (file: File, sliceSize: number) => {};
