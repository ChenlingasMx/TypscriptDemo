import React, { useRef, useState, useEffect } from 'react';
import { Divider, Button, Popconfirm } from 'antd';
import remove from 'lodash/remove';
import random from 'lodash/random';
import { Table, Input, InputNumber, Form, Select, Cascader, Radio, AutoComplete, DatePicker } from 'antd';
import moment from 'moment'

const Option = Select.Option;
const { MonthPicker } = DatePicker
export const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = (options, attributes) => {
    if (this.props.inputType === 'number') {
      return <InputNumber {...attributes} />;
    } else if (this.props.inputType === 'select') {
      return (
        <Select {...attributes}>
          {options.map(({ value, label, ...others }) => (
            <Option key={value} value={value} {...others}>
              {label}
            </Option>
          ))}
        </Select>
      );
    } else if (this.props.inputType === 'cascader') {
      return <Cascader options={options} {...attributes} />;
    } else if (this.props.inputType === 'radio') {
      return (
        <Radio.Group {...attributes}>
          {options.map(({ value, label, ...others }, _idx) => (
            <Radio.Button value={value} key={_idx} {...others}>
              {label}
            </Radio.Button>
          ))}
        </Radio.Group>
      );
    } else if (this.props.inputType === 'autoComplete') {
      return <AutoComplete dataSource={options} {...attributes} />;
    } else if (this.props.inputType === 'datePicker') {
      return <DatePicker {...attributes} style={{ width: "100%" }} />
    } else if (this.props.inputType === 'monthPicker') {
      return <MonthPicker {...attributes} style={{ width: "100%" }} />
    }
    return <Input {...attributes} />;
  };

  renderCell = () => {
    const {
      editing,
      dataIndex,
      title,
      // eslint-disable-next-line
      inputType,
      options,
      attributes,
      record,
      // eslint-disable-next-line
      index,
      enumSelect,
      required = false,
      children,
      cascaderName,
      isRadio = false,
      rules = [],
      ...restProps
    } = this.props;
    let enumDataIndex = dataIndex;
    let initialValue = editing && record[enumDataIndex];
    // select单选的情况
    if (inputType === 'select' && enumSelect) {
      enumDataIndex = enumSelect;
      initialValue = record[enumDataIndex] && record[enumDataIndex].name;
    }
    // select多选的情况
    if (inputType === 'select' && enumSelect && attributes.mode === 'multiple') {
      enumDataIndex = enumSelect;
      // eslint-disable-next-line
      initialValue = record[enumDataIndex] && record[enumDataIndex].map(itm => ({ label: itm.localtion_name || itm.label, key: itm.localtion_code || itm.key || itm.value })) || [];
    }
    if (inputType === 'radio' && isRadio) {
      const { radioDataIndex } = attributes
      initialValue = record[radioDataIndex] && record[radioDataIndex].value && record[radioDataIndex].value
    }
    if (inputType === 'datePicker') {
      // eslint-disable-next-line
      let time = record[enumDataIndex] && moment(record[enumDataIndex], attributes.format && attributes.format || 'YYYY-MM-DD HH:mm:ss') || null
      initialValue = time
    }
    if (inputType === 'monthPicker') {
      // eslint-disable-next-line
      let time = record[enumDataIndex] && moment(record[enumDataIndex], attributes.format && attributes.format || 'YYYY-MM') || null
      initialValue = time
    }
    if (cascaderName) {
      initialValue = [record[cascaderName[0]], record[cascaderName[1]]];
    }
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            style={{ margin: 0 }}
            name={enumDataIndex}
            rules={[
              {
                required,
                message: `${inputType === 'select' ? '请选择' : '请输入'}${title}!`,
              }
            ].concat(rules).concat(attributes && attributes.rules && attributes.rules || [])}
            initialValue={initialValue}
          >
            {this.getInput(options, attributes)}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

const EditableTable = (props) => {
  useEffect(() => {
    props.getForm && props.getForm(form);
  }, [])
  const { columns, editingKey, ...others } = props;
  const isEditing = record => record[props.rowKey] === editingKey;
  const [form] = Form.useForm();
  const components = {
    body: {
      cell: EditableCell,
    },
  };
  const formColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.inputType,
        dataIndex: col.dataIndex,
        attributes: col.attributes,
        options: col.options,
        title: col.title,
        required: col.required,
        cascaderName: col.cascaderName,
        enumSelect: col.enumSelect,
        rules: col.rules,
        isRadio: col.isRadio,
        editing: isEditing(record),
      })
    };
  });
  return (
    <EditableContext.Provider value={form}>
      <Form form={form} component={false}>
        <Table
          components={components}
          columns={formColumns}
          rowClassName="editable-row"
          {...others}
        />
      </Form>
    </EditableContext.Provider>
  );
}

/*处理业务逻辑*/
const TableEdited = props => {
  const {
    isView,// 查看还是编辑
    dataSource = [], // 数据数组
    columns, // table cloumns
    onValueChange, // 父组件接受最新的数据
    showAdd = true,
    showEdit = true,
    showDelete = true,
    ...prop
  } = props

  const [dataArrary, setDataArrary] = useState([]) // table数据
  const [editingKey, setKey] = useState('') // 编辑的key
  const editRef = useRef();

  // 传递dataSource过来发生变化时更新子组件state里的dataArrary
  useEffect(() => {
    setDataArrary(dataSource)
  }, [dataSource])

  //处理表单ref异步
  const asyncAwaitForm = async current => {
    return (
      current && current.validateFields &&
      current.validateFields().then((vals) => {
        return vals
      }).catch((errorInfo) => {
        return errorInfo
      })
    ) || {}
  };
  /* 刷新form */
  const resetFields = () => {
    editRef && editRef.current && editRef.current.resetFields && editRef.current.resetFields()
  }
  /*
    新增
  */
  const handleAdd = async () => {
    resetFields()
    // 生成id
    let newIdx = random(1, 10000000)
    // 生成新数组
    let arr = [
      {
        id: newIdx,
      }
    ]
    // 合并数组
    let newMonthdataArrary = dataArrary.concat(arr)
    setDataArrary(newMonthdataArrary)
    // 数据传递给父组件
    onValueChange(newMonthdataArrary)
  }

  /*
    table栏操作
  */
  const handleTableEdit = async (record, type) => {
    // 编辑
    if (type === 'edit') {
      resetFields()
      let key = record.id
      setKey(key)
    }
    // 删除
    if (type === 'delete') {
      const tableData = dataArrary.concat()
      remove(tableData, (itm) => itm.id === record.id)
      setDataArrary(tableData)
      // 数据传递给父组件
      onValueChange(tableData)
    }
    // 取消
    if (type === 'cancel') {
      setKey("")
    }
    if (type === 'save') {
      const editInfo = await asyncAwaitForm(editRef.current);
      let value = {
        ...editInfo,
      }
      const newData = dataArrary && [...dataArrary]
      let index = newData.findIndex(item => item.id === record.id)
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...value,
        });
      }
      setDataArrary(newData)
      setKey('')
      // 传递最新数据给父组件
      onValueChange(newData)
    }
  }
  return (
    <div>
      <EditableTable
        {...prop}
        rowKey="id"
        getForm={form => editRef.current = form}
        scroll={{ x: '100%', y: 300 }}
        pagination={{ pageSize: 20 }}
        editingKey={editingKey}
        columns={
          columns().concat(
            [
              {
                title: '操作',
                width: 150,
                align: 'center',
                fixed: 'right',
                render: (record, text, idx) => {
                  const editable = record.id === editingKey
                  return isView ? null : editable ? (
                    <div>
                      <Popconfirm
                        title="确定取消修改?"
                        overlayStyle={{ width: 150 }}
                        onConfirm={() => handleTableEdit(record, 'cancel')}
                      >
                        <span className="ane-Table-Tooltip-span">取消</span>
                      </Popconfirm>
                      <Divider type="vertical" />
                      <span
                        onClick={() => handleTableEdit(record, 'save')}
                        className="ane-Table-Tooltip-span"
                      >
                        保存
                      </span>
                    </div>
                  ) : (
                    <div>
                      {/* 编辑按钮 */}
                      {showEdit && (
                          <>
                            <Button
                              size="small"
                              onClick={() => handleTableEdit(record, 'edit', idx)}
                            >
                              编辑
                            </Button>
                            <Divider type="vertical" />
                          </>
                      )
                      }
                      {/* 删除按钮 */}
                      {
                        showDelete && (
                            <>
                              <Popconfirm
                                //disabled={editingKey !== ''}
                                title="确定删除本条?"
                                overlayStyle={{ width: 150 }}
                                onConfirm={() => handleTableEdit(record, 'delete')}
                              >
                                {/* className="ane-Table-Tooltip-span" */}
                                <Button
                                  size="small"
                                >
                                  删除
                                </Button>
                              </Popconfirm>
                            </>
                        )
                      }
                    </div>
                  );
                },
              }
            ]
          )
        }
        dataSource={dataArrary}
        bordered
        size="small"
      />
      {!isView && showAdd &&
        <Button
          type="dashed"
          block
          style={{ marginTop: 10 }}
          onClick={handleAdd.bind(this)}
        >
          添加
        </Button> || null
      }
    </div>
  );
}
export default TableEdited

