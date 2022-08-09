import { defineComponent } from 'vue';

//1、函数式组件
// export default () => <div>textTsx</div>;

//2、render Options API
/* 
export default defineComponent({
  //其他配置项
  data() {
    return {
      info: 'Render Options API'
    };
  },
  render() {
    return <div>{this.info}</div>;
  }
});
*/

//3、setup  Composition API

export default defineComponent({
  setup() {
    const info = 'setup TSX';
    return () => (
      <>
        <div>{info}</div>
      </>
    );
  }
});
