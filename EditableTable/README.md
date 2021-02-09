# 编辑表格组件

<!--DemoStart-->

```js
import TableEdited from '@/components/EdittableTable'
import React, { useState } from 'react';
const Demo = () => {
  const [ dataSource ] = useState( [] )
  const [ isView ] = useState( false )
  // columns
  const tableColums = () => [
      {
        title: '备注',
        dataIndex: 'remark',
        align: 'center',
        ellipsis: true,
        width: '100%',
        editable: true,
        attributes: {},
        options: [],
        inputType: "input",
        rules: [
          { required: false, message: '请输入!' }
        ],
      }
    ]
    return (
      <div>
        <TableEdited
          isView={isView}
          columns={tableCloums}
          dataSource={dataSource}
          onValueChange={value => window.console.log("value",value)}
        />
      </div>
    );
}
```

## 参数

### TableEdited

#### 基础参数

| 参数       | 说明                                                 | 类型          | 默认值 |
| :--------- | :--------------------------------------------------- | :------------ | :----- |
| dataSource | 表格数据                                              | object[]      |   -   |
| columns    | 表格列的配置描述,具体项见下表                            | function(value): object[]       |   -    |
| isView     | 是编辑模式还是查看模式                                  | Boolean       | false  |
| showAdd    | 是否显示增加按钮                                       | Boolean       | true   |
| showEdit   | 是否显示编辑按钮                                       | Boolean       | true   |
| showDelete | 是否显示删除按钮                                       | Boolean       | true   |
| onValueChange    | 获取操作后的值                                         | function(value): object[]      |   -    |

#### columns参数

| 参数       | 说明                                                   | 类型                     | 默认值 |
| :--------- | :--------------------------------------------------- | :------------------------| :----- |
| title      | 标题                                                  | string                   |   -   |
| dataIndex  | 列数据在数据项中对应的路径，支持通过数组查询嵌套路径          | string                   |   -    |
| align      | 	设置列的对齐方式                                       | 	left | right | center   | left  |
| ellipsis   | 超过宽度将自动省略                                      | boolean                   |  -   |
| inputType  | 编辑表格表单组件类型                                     | string                    | input   |
| rules      | 校验规则，设置字段的校验逻辑                              | Rule[]                    | true   |
| options    | 选择时填充的值                                          | object[]                  |   -    |
| attributes | 表单组件多余参数,详见antd表单组件                         | object{}                  |   -    |


