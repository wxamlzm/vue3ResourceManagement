import type { TableColumnType } from "ant-design-vue";

interface TableItem {
  id: number;
  name: string;
  status: 0 | 1;
  [key: string]: any;
}
interface ActionButton {
  text: string;
  type?: "link" | "primary" | "default";
  danger?: boolean;
  confirmText?: string;
  visible?: (record: TableItem) => boolean;
  onClick: (record: TableItem) => void;
}

export const useTableAction = (actions: ActionButton[]) => {
  const renderActionButton = (button: ActionButton, record: TableItem) => {
    if (button.visible && !button.visible(record)) return null;

    const buttonContent = (
      <Button
        type={button.type || "link"}
        onClick={() => button.onClick(record)}
        danger={button.danger}
      >
        {button.text}
      </Button>
    );

    return buttonContent;
  };

  const actionColumn:TableColumnType = {
    title::'操作',
    key: 'action',
    fixed: 'right',
    align: 'center',
    width: 120,
    customRender:({record})=> {
      return (
        <Space>
          {
            actions.map((button,index) =>{
              <span>
                {renderActionButton(button,record)}
                {index<actions.length -1 && <Divider type='vertical"/>}
              </span>
            })
          }
        </Space>
      )
    }
  }
};
